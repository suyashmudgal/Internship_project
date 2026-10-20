"""
Retrieval service: similarity search against the persisted vector store.

Uses Chroma's similarity_search_with_score() directly.
No RetrievalQA, no LLM chains — just raw vector similarity.

Score semantics:
    Chroma returns L2 (Euclidean) distance by default.
    Lower values indicate higher similarity (0.0 = identical).
"""

from __future__ import annotations

import os
from typing import Any

from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from app import config


# ---------------------------------------------------------------------------
# Shared instances (initialized lazily)
# ---------------------------------------------------------------------------

_vectorstore: Chroma | None = None


def _get_vectorstore() -> Chroma:
    """Return a cached Chroma client connected to the persisted store.

    Raises:
        RuntimeError: If the vector store directory does not exist or the
            collection is empty (i.e., no PDFs have been ingested yet).
    """
    global _vectorstore
    if _vectorstore is None:
        persist_dir = config.CHROMA_PERSIST_DIR

        # Check that the persistence directory actually contains data
        if not os.path.isdir(persist_dir) or not any(
            f for f in os.listdir(persist_dir) if f != ".gitkeep"
        ):
            raise RuntimeError(
                "Vector store has not been initialized. "
                "Please ingest at least one PDF first: "
                "python ingest.py --file <path-to-pdf>"
            )

        import chromadb
        from chromadb.config import Settings

        client_settings = Settings(anonymized_telemetry=False, is_persistent=True)
        chroma_client = chromadb.PersistentClient(path=persist_dir, settings=client_settings)

        # Check if collection exists and has documents before loading embeddings
        existing_cols = [c.name for c in chroma_client.list_collections()]
        if config.CHROMA_COLLECTION not in existing_cols:
            raise RuntimeError(
                "Vector store collection does not exist. "
                "Please ingest at least one PDF first: "
                "python ingest.py --file <path-to-pdf>"
            )

        col = chroma_client.get_collection(config.CHROMA_COLLECTION)
        if col.count() == 0:
            raise RuntimeError(
                "Vector store collection is empty. "
                "Please ingest at least one PDF first: "
                "python ingest.py --file <path-to-pdf>"
            )

        embeddings = HuggingFaceEmbeddings(
            model_name=config.EMBEDDING_MODEL,
            encode_kwargs={"batch_size": 1},
        )
        _vectorstore = Chroma(
            client=chroma_client,
            collection_name=config.CHROMA_COLLECTION,
            embedding_function=embeddings,
        )

    return _vectorstore


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def similarity_search(query: str, top_k: int = 5) -> list[dict[str, Any]]:
    """Run a similarity search against the vector store.

    Args:
        query: The natural-language search query.
        top_k: Maximum number of results to return (default 5).

    Returns:
        A list of dicts, each containing:
            - chunk_text: The matched text chunk.
            - page_number: Source page in the original PDF (1-based).
            - score: L2 distance score (lower = more similar).
    """
    if top_k < 1:
        raise ValueError("top_k must be at least 1")

    store = _get_vectorstore()
    results = store.similarity_search_with_score(query, k=top_k)

    output: list[dict[str, Any]] = []
    for doc, score in results:
        output.append({
            "chunk_text": doc.page_content,
            "page_number": doc.metadata.get("page_number"),
            "score": round(float(score), 6),
        })

    return output
