"""
LangGraph ingestion pipeline: load -> split -> embed -> store

Orchestrates PDF ingestion as a LangGraph StateGraph with four nodes.
Each node performs one stage of the pipeline using LangChain integrations.
"""

from __future__ import annotations

import hashlib
import os
from typing import Any, TypedDict

from app import config

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import END, START, StateGraph

# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

class IngestionState(TypedDict):
    """Typed state passed between LangGraph nodes."""

    file_path: str
    documents: list[Any]
    chunks: list[Any]
    collection_name: str
    persist_directory: str
    num_pages: int
    num_chunks: int
    embedding_model: str


# ---------------------------------------------------------------------------
# Shared clients (Chroma collection must be initialized before PyTorch on Windows)
# ---------------------------------------------------------------------------

_chroma_client: Any = None
_chroma_col: Any = None
_embeddings: Any = None


def _get_chroma_collection(persist_dir: str | None = None, collection_name: str | None = None):
    """Return the cached chromadb Collection initialized at startup in config."""
    return config.chroma_collection


def _get_embeddings() -> Any:
    """Return a cached HuggingFaceEmbeddings instance."""
    global _embeddings
    if _embeddings is None:
        from langchain_huggingface import HuggingFaceEmbeddings

        _embeddings = HuggingFaceEmbeddings(
            model_name=config.EMBEDDING_MODEL,
            encode_kwargs={"batch_size": 1},
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

    print(f"  Loaded pages: {len(documents)}", flush=True)

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

    print(f"  Created chunks: {len(chunks)}", flush=True)

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

    print(f"  Embedding model: {config.EMBEDDING_MODEL}", flush=True)

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
    """Persist chunks into ChromaDB with their embeddings."""
    chunks = state["chunks"]
    file_path = state["file_path"]
    persist_dir = state["persist_directory"]
    collection = state["collection_name"]
    texts = [chunk.page_content for chunk in chunks]
    metadatas = [
        {
            "page_number": int(chunk.metadata.get("page_number", 1)),
            "source": os.path.basename(file_path),
        }
        for chunk in chunks
    ]
    ids = [_generate_chunk_id(chunk, file_path) for chunk in chunks]

    embeddings = _get_embeddings()
    vectors = embeddings.embed_documents(texts)

    try:
        col = _get_chroma_collection(persist_dir, collection)

        existing_ids = set(col.get(include=[])["ids"])
        new_indices = [i for i, chunk_id in enumerate(ids) if chunk_id not in existing_ids]
        if new_indices:
            sub_ids = [ids[i] for i in new_indices]
            sub_texts = [texts[i] for i in new_indices]
            sub_metadatas = [metadatas[i] for i in new_indices]
            sub_vectors = [vectors[i] for i in new_indices]
            col.add(
                ids=sub_ids,
                documents=sub_texts,
                metadatas=sub_metadatas,
                embeddings=sub_vectors,
            )
    except Exception as exc:
        raise RuntimeError(f"Failed to persist to vector store: {exc}") from exc

    print(f"  Vector store: Chroma", flush=True)
    print(f"  Collection: {collection}", flush=True)
    print(f"  Persistence directory: {persist_dir}", flush=True)

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

    Executes the 4-stage pipeline: load -> split -> embed -> store.

    Args:
        file_path: Path to the PDF file to ingest.

    Returns:
        The final pipeline state with ingestion metadata.
    """
    abs_path = os.path.abspath(file_path)

    state: IngestionState = {
        "file_path": abs_path,
        "documents": [],
        "chunks": [],
        "collection_name": config.CHROMA_COLLECTION,
        "persist_directory": config.CHROMA_PERSIST_DIR,
        "num_pages": 0,
        "num_chunks": 0,
        "embedding_model": config.EMBEDDING_MODEL,
    }

    state.update(load(state))
    state.update(split(state))
    state.update(embed(state))
    state.update(store(state))

    return state
