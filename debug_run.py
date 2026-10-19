import os
import sys
import traceback

print("--- STARTING SCRIPT ---")

try:
    from app.ingestion.pipeline import run_ingestion
    print("Imported run_ingestion successfully.")
    
    pdf_path = os.path.abspath("data/sample_test.pdf")
    print(f"Running ingestion on: {pdf_path}")
    
    result = run_ingestion(pdf_path)
    print("--- INGESTION RESULT ---")
    print("num_pages:", result.get("num_pages"))
    print("num_chunks:", result.get("num_chunks"))
    print("--- COMPLETED SUCCESSFULLY ---")
except Exception as e:
    print(f"EXCEPTION CAUGHT: {e}")
    traceback.print_exc()

print("--- EXITING WITH CODE 0 ---")
sys.exit(0)
