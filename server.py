"""
FastAPI server entry point.

Usage:
    python server.py

Starts the uvicorn server exposing the /query endpoint.
"""

from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI

from app import config
from app.api.routes import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Warm up vector store and embedding model on startup if initialized."""
    try:
        from app.retrieval.service import _get_vectorstore
        _get_vectorstore()
    except Exception:
        pass
    yield


app = FastAPI(
    title="PDF Vector Search API",
    description="Similarity search over ingested PDF documents.",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(router)


@app.get("/health")
async def health_check():
    """Simple health-check endpoint — independent of vector store state."""
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host=config.SERVER_HOST,
        port=config.SERVER_PORT,
    )
