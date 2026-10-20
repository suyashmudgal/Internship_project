"""
Centralized configuration loaded from environment variables.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Environment guards for Windows compatibility
os.environ.setdefault("ANONYMIZED_TELEMETRY", "False")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")
os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
os.environ.setdefault("TQDM_DISABLE", "1")

try:
    import torch
    torch.set_num_threads(1)
except Exception:
    pass

try:
    import tqdm
    tqdm.tqdm.monitor_interval = 0
except Exception:
    pass

# Embedding model
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

# ChromaDB
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./vectorstore")
CHROMA_COLLECTION = os.getenv("CHROMA_COLLECTION", "pdf_chunks")

# Initialize ChromaDB client & collection early on Windows to prevent DLL/thread conflicts
def get_chroma_collection():
    import chromadb
    from chromadb.config import Settings
    _settings = Settings(anonymized_telemetry=False, is_persistent=True)
    _client = chromadb.PersistentClient(path=CHROMA_PERSIST_DIR, settings=_settings)
    return _client.get_or_create_collection(CHROMA_COLLECTION)

chroma_collection = get_chroma_collection()

# Text splitter
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "1000"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "150"))

# Server
SERVER_HOST = os.getenv("SERVER_HOST", "0.0.0.0")
SERVER_PORT = int(os.getenv("SERVER_PORT", "8000"))
