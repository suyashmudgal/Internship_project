"""
FastAPI server entry point.

Usage:
    python server.py

Starts the uvicorn server exposing the /query endpoint.
"""

import uvicorn
from fastapi import FastAPI

from app import config
from app.api.routes import router

app = FastAPI(
    title="PDF Vector Search API",
    description="Similarity search over ingested PDF documents.",
    version="1.0.0",
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
