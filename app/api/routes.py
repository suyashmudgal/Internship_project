"""
FastAPI route definitions.

Will expose:
  POST /query
    Request:  { "query": "string", "top_k": 5 }
    Response: [ { "chunk_text": "...", "page_number": 1, "score": 0.123 } ]
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.retrieval.service import similarity_search


# ---------------------------------------------------------------------------
# Router
# ---------------------------------------------------------------------------

router = APIRouter()


# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------

class QueryRequest(BaseModel):
    """Incoming search request."""
    query: str = Field(..., min_length=1, description="Search query string")
    top_k: int = Field(default=5, ge=1, le=50, description="Number of results")


class ChunkResult(BaseModel):
    """A single matched chunk."""
    chunk_text: str
    page_number: int | None
    source: str | None
    score: float


class QueryResponse(BaseModel):
    """Response wrapping the list of results."""
    query: str
    results: list[ChunkResult]
    count: int


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/query", response_model=QueryResponse)
async def query_vectorstore(request: QueryRequest):
    """Search the vector store for chunks similar to the given query.

    Returns the top-k most similar chunks with their page numbers,
    source filenames, and similarity scores.
    """
    try:
        results = similarity_search(
            query=request.query,
            top_k=request.top_k,
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Vector store query failed: {exc}",
        ) from exc

    return QueryResponse(
        query=request.query,
        results=results,
        count=len(results),
    )
