"""
LangGraph ingestion pipeline: load -> split -> embed -> store

Orchestrates PDF ingestion as a LangGraph StateGraph with four nodes.
Each node performs one stage of the pipeline using LangChain integrations.
"""

from __future__ import annotations

import hashlib
import os
from typing import Any, TypedDict

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import END, START, StateGraph

from app import config


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

class IngestionState(TypedDict):
    """Typed state passed between LangGraph nodes."""

    file_path: str
    """Absolute path to the source PDF."""

    documents: list[Any]
    """Raw LangChain Document objects from the PDF loader (one per page)."""

    chunks: list[Any]
    """Split Document objects with preserved metadata."""

    collection_name: str
    """ChromaDB collection name."""

    persist_directory: str
    """Path to the ChromaDB persistence directory."""

    num_pages: int
    """Number of pages loaded from the PDF."""

    num_chunks: int
    """Number of chunks after splitting."""

    embedding_model: str
    """Name of the HuggingFace embedding model used."""


# ---------------------------------------------------------------------------
# Shared embedding model (initialized once)
# ---------------------------------------------------------------------------

_embeddings: HuggingFaceEmbeddings | None = None


def _get_embeddings() -> HuggingFaceEmbeddings:
    """Return a cached HuggingFaceEmbeddings instance."""
    global _embeddings
    if _embeddings is None:
        _embeddings = HuggingFaceEmbeddings(
            model_name=config.EMBEDDING_MODEL,
        )
    return _embeddings


# ---------------------------------------------------------------------------
# Node: load
# ---------------------------------------------------------------------------

def load(state: IngestionState) -> dict:
    """Load a PDF file using LangChain's PyPDFLoader.

    Validates that the file exists, has a .pdf extension, and produces
    at least one page. Preserves all page metadata from the loader.
    """
    file_path: str = state["file_path"]

    # --- Validate file exists ---
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"PDF file not found: {file_path}")

    # --- Validate extension ---
    if not file_path.lower().endswith(".pdf"):
        raise ValueError(f"File is not a PDF (expected .pdf extension): {file_path}")

    # --- Load via LangChain ---
    try:
        loader = PyPDFLoader(file_path)
        documents = loader.load()
    except Exception as exc:
        raise RuntimeError(f"Failed to load PDF '{file_path}': {exc}") from exc

    # --- Validate non-empty ---
    if not documents:
        raise ValueError(f"PDF produced no pages (empty or corrupt): {file_path}")

    # --- Normalize page metadata to 1-based page_number ---
    for doc in documents:
        raw_page = doc.metadata.get("page", 0)
        doc.metadata["page_number"] = int(raw_page) + 1

    print(f"  Loaded pages: {len(documents)}")

    return {
        "documents": documents,
        "num_pages": len(documents),
    }


# ---------------------------------------------------------------------------
# Node: split
# ---------------------------------------------------------------------------

def split(state: IngestionState) -> dict:
    """Split loaded documents into chunks using RecursiveCharacterTextSplitter.

    Chunk size and overlap are read from centralized config.
    All original metadata (including page_number) is preserved on each chunk.
    """
    documents = state["documents"]

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=config.CHUNK_SIZE,
        chunk_overlap=config.CHUNK_OVERLAP,
        length_function=len,
        add_start_index=True,
    )

    chunks = splitter.split_documents(documents)

    if not chunks:
        raise ValueError(
            "Text splitting produced no chunks. "
            "The PDF may contain only images or non-extractable content."
        )

    print(f"  Created chunks: {len(chunks)}")

    return {
        "chunks": chunks,
        "num_chunks": len(chunks),
    }


# ---------------------------------------------------------------------------
# Node: embed
# ---------------------------------------------------------------------------

def embed(state: IngestionState) -> dict:
    """Initialize the embedding model and validate it is ready.

    The actual embedding computation happens inside Chroma during the
    store step (Chroma calls the embedding function internally).
    This node ensures the model is loaded and warms it up, keeping
    the pipeline's embedding stage explicit.
    """
    embeddings = _get_embeddings()

    # Warm up the model with a small test to catch errors early
    try:
        embeddings.embed_query("test")
    except Exception as exc:
        raise RuntimeError(f"Embedding model failed to initialize: {exc}") from exc

    print(f"  Embedding model: {config.EMBEDDING_MODEL}")

    return {
        "embedding_model": config.EMBEDDING_MODEL,
    }


# ---------------------------------------------------------------------------
# Node: store
# ---------------------------------------------------------------------------

def _generate_chunk_id(chunk, file_path: str) -> str:
    """Generate a deterministic ID for a chunk based on content + metadata.

    This ensures that re-ingesting the same PDF does not create
    duplicate entries in ChromaDB.
    """
    page = chunk.metadata.get("page_number", 0)
    start = chunk.metadata.get("start_index", 0)
    source = os.path.basename(file_path)
    key = f"{source}:page{page}:start{start}:{chunk.page_content}"
    return hashlib.sha256(key.encode("utf-8")).hexdigest()


def store(state: IngestionState) -> dict:
    """Persist chunks into ChromaDB with their embeddings.

    Uses LangChain's Chroma integration which handles embedding
    computation internally. Deterministic IDs prevent duplicates
    on repeated ingestion of the same file.
    """
    chunks = state["chunks"]
    file_path = state["file_path"]
    persist_dir = state["persist_directory"]
    collection = state["collection_name"]

    embeddings = _get_embeddings()

    # Generate deterministic IDs
    ids = [_generate_chunk_id(chunk, file_path) for chunk in chunks]

    try:
        Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            ids=ids,
            collection_name=collection,
            persist_directory=persist_dir,
        )
    except Exception as exc:
        raise RuntimeError(f"Failed to persist to vector store: {exc}") from exc

    print(f"  Vector store: Chroma")
    print(f"  Collection: {collection}")
    print(f"  Persistence directory: {persist_dir}")

    return {}


# ---------------------------------------------------------------------------
# Graph construction
# ---------------------------------------------------------------------------

def build_ingestion_graph() -> Any:
    """Build and compile the LangGraph ingestion pipeline.

    Graph structure:
        START -> load -> split -> embed -> store -> END

    Returns:
        A compiled LangGraph StateGraph ready to invoke.
    """
    graph = StateGraph(IngestionState)

    graph.add_node("load", load)
    graph.add_node("split", split)
    graph.add_node("embed", embed)
    graph.add_node("store", store)

    graph.add_edge(START, "load")
    graph.add_edge("load", "split")
    graph.add_edge("split", "embed")
    graph.add_edge("embed", "store")
    graph.add_edge("store", END)

    return graph.compile()


# ---------------------------------------------------------------------------
# Public runner
# ---------------------------------------------------------------------------

def run_ingestion(file_path: str) -> IngestionState:
    """Run the full ingestion pipeline on a PDF file.

    Args:
        file_path: Path to the PDF file to ingest.

    Returns:
        The final pipeline state with ingestion metadata.
    """
    abs_path = os.path.abspath(file_path)

    initial_state: IngestionState = {
        "file_path": abs_path,
        "documents": [],
        "chunks": [],
        "collection_name": config.CHROMA_COLLECTION,
        "persist_directory": config.CHROMA_PERSIST_DIR,
        "num_pages": 0,
        "num_chunks": 0,
        "embedding_model": "",
    }

    pipeline = build_ingestion_graph()
    result = pipeline.invoke(initial_state)
    return result
