import chromadb
from chromadb.config import Settings
from app import config

client_settings = Settings(anonymized_telemetry=False, is_persistent=True)
client = chromadb.PersistentClient(path=config.CHROMA_PERSIST_DIR, settings=client_settings)
col = client.get_or_create_collection("debug_col")

print("Test A: short id, short text, dummy emb", flush=True)
col.add(ids=["a1"], documents=["hello"], embeddings=[[0.1]*384])
print("Test A passed", flush=True)

print("Test B: 64-char id, short text, dummy emb", flush=True)
col.add(ids=["7d4fae33a79c5695d31eba9863e6a1628454b898826a7c6583c46cde4724fc5d"], documents=["hello"], embeddings=[[0.1]*384])
print("Test B passed", flush=True)

print("Test C: 64-char id, metadata with int, dummy emb", flush=True)
col.add(ids=["b2"], documents=["hello"], metadatas=[{"page_number": 1, "source": "test.pdf"}], embeddings=[[0.1]*384])
print("Test C passed", flush=True)

from app.ingestion.pipeline import load, split
state = {"file_path": "data/sample_test.pdf", "documents": [], "chunks": [], "collection_name": "", "persist_directory": "", "num_pages": 0, "num_chunks": 0, "embedding_model": ""}
state.update(load(state))
state.update(split(state))
chunk0_text = state["chunks"][0].page_content

print("Test D: chunk0 text with dummy emb", flush=True)
col.add(ids=["c3"], documents=[chunk0_text], embeddings=[[0.1]*384])
print("Test D passed", flush=True)

from app.ingestion.pipeline import _get_embeddings
emb = _get_embeddings()
real_vec = emb.embed_documents([chunk0_text])
print("Test E: real emb with short text", flush=True)
col.add(ids=["d4"], documents=["hello"], embeddings=real_vec)
print("Test E passed", flush=True)

print("Test F: real emb with chunk0 text and metadata", flush=True)
col.add(ids=["e5"], documents=[chunk0_text], metadatas=[{"page_number": 1, "source": "sample_test.pdf"}], embeddings=real_vec)
print("Test F passed", flush=True)
