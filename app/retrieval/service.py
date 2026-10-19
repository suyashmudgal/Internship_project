"""
Retrieval service: similarity search against the persisted vector store.

Will use Chroma's similarity_search_with_score() directly.
No RetrievalQA, no LLM chains — just raw vector similarity.
"""

from __future__ import annotations

from typing import Any

from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

from app import config


# ---------------------------------------------------------------------------
# Shared instances (initialized lazily)
# ---------------------------------------------------------------------------

_vectorstore: Chroma | None = None


def _get_vectorstore() -> Chroma:
    """Return a cached Chroma client connected to the persisted store."""
    global _vectorstore
    if _vectorstore is None:
        embeddings = HuggingFaceEmbeddings(
            model_name=config.EMBEDDING_MODEL,
        )
        _vectorstore = Chroma(
            collection_name=config.CHROMA_COLLECTION,
            embedding_function=embeddings,
            persist_directory=config.CHROMA_PERSIST_DIR,
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
            - source: Original filename of the PDF.
            - score: Similarity score (lower = more similar for L2 distance).
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
            "source": doc.metadata.get("source"),
            "score": round(float(score), 6),
        })

    return output
