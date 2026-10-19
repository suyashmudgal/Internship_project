"""
CLI entry point for PDF ingestion.

Usage:
    python ingest.py --file document.pdf

Invokes the LangGraph ingestion pipeline (load -> split -> embed -> store)
and prints progress information.
"""

import argparse
import sys

from app.ingestion.pipeline import run_ingestion


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Ingest a PDF into the vector store.",
    )
    parser.add_argument(
        "--file",
        required=True,
        help="Path to the PDF file to ingest.",
    )
    args = parser.parse_args()

    print()
    print("Ingestion pipeline")
    print("------------------")
    print("load -> split -> embed -> store")
    print()
    print(f"  Loading: {args.file}")

    try:
        result = run_ingestion(args.file)
    except (FileNotFoundError, ValueError, RuntimeError) as exc:
        print(f"\n  ERROR: {exc}", file=sys.stderr)
        sys.exit(1)

    print()
    print("Ingestion completed successfully.")
    print(f"  Pages:    {result['num_pages']}")
    print(f"  Chunks:   {result['num_chunks']}")
    print(f"  Model:    {result['embedding_model']}")
    print(f"  Store:    Chroma ({result['persist_directory']})")
    print()


if __name__ == "__main__":
    main()
