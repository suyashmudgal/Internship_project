import sys, os
from app.ingestion.pipeline import load, split, IngestionState, _get_embeddings, _generate_chunk_id
from langchain_community.vectorstores import Chroma
from app import config

print("Running test_ingest_direct...")
state = {
    'file_path': os.path.abspath('data/sample_test.pdf'),
    'documents': [],
    'chunks': [],
    'collection_name': config.CHROMA_COLLECTION,
    'persist_directory': config.CHROMA_PERSIST_DIR,
    'num_pages': 0,
    'num_chunks': 0,
    'embedding_model': '',
}
state.update(load(state))
state.update(split(state))

chunks = state['chunks']
file_path = state['file_path']
persist_dir = state['persist_directory']
collection = state['collection_name']

print('Getting embeddings...')
embeddings = _get_embeddings()

print('Generating ids...')
ids = [_generate_chunk_id(chunk, file_path) for chunk in chunks]

print('Calling Chroma.from_documents...')
try:
    db = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        ids=ids,
        collection_name=collection,
        persist_directory=persist_dir,
    )
    print('Chroma.from_documents SUCCESS! Count:', db._collection.count())
except Exception as e:
    import traceback
    print('EXCEPTION:', e)
    traceback.print_exc()

print('SCRIPT COMPLETED SUCCESSFULLY')
