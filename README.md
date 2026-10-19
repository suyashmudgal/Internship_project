# PDF Vectorisation Pipeline

A Python pipeline that ingests PDF documents into a local vector store and exposes a similarity search API.

## Architecture

```
load → split → embed → store   (LangGraph ingestion pipeline)
         ↓
    ChromaDB (local)
         ↓
   POST /query (FastAPI)        (Direct similarity_search_with_score)
```

## Setup

```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env        # Windows
# cp .env.example .env        # Linux/macOS
```

## Usage

### Ingest a PDF

```bash
python ingest.py --file path/to/document.pdf
```

### Start the query server

```bash
python server.py
```

### Query the vector store

```bash
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "your search query", "top_k": 5}'
```

## Project Structure

```
├── ingest.py              # CLI entry point for PDF ingestion
├── server.py              # FastAPI server entry point
├── requirements.txt       # Python dependencies
├── .env.example           # Environment variable template
├── results.json           # Pipeline run results
│
├── app/
│   ├── config.py          # Centralized configuration
│   ├── ingestion/
│   │   └── pipeline.py    # LangGraph ingestion pipeline
│   ├── retrieval/
│   │   └── service.py     # Vector store similarity search
│   └── api/
│       └── routes.py      # FastAPI route definitions
│
├── data/                  # Place PDF files here
└── vectorstore/           # ChromaDB persistent storage
```

## Tech Stack

- **LangChain** — PDF loading, text splitting, embeddings, vector store
- **LangGraph** — Ingestion workflow orchestration
- **ChromaDB** — Local persistent vector store
- **HuggingFace** — Sentence-transformer embeddings (all-MiniLM-L6-v2)
- **FastAPI** — REST API server
