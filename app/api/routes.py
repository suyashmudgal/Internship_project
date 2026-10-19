"""
FastAPI route definitions.

Exposes:
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
    top_k: int = Field(default=5, ge=1, le=100, description="Number of results (1–100)")


class ChunkResult(BaseModel):
    """A single matched chunk — matches the assessment response schema exactly."""
    chunk_text: str
    page_number: int | None
    score: float


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/query", response_model=list[ChunkResult])
async def query_vectorstore(request: QueryRequest):
    """Search the vector store for chunks similar to the given query.

    Returns the top-k most similar chunks as a flat JSON array.
    Each result contains chunk_text, page_number, and score.

    The score is an L2 (Euclidean) distance — lower values indicate
    higher similarity.
    """
    try:
        results = similarity_search(
            query=request.query,
            top_k=request.top_k,
        )
    except RuntimeError as exc:
        # Vector store not initialized / empty
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        # Invalid parameters
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Vector store query failed: {exc}",
        ) from exc

    return results
