"""
SQLAlchemy engine and session factory.

Provides:
  - `engine` — the SQLAlchemy Engine bound to DATABASE_URL.
  - `SessionLocal` — a sessionmaker for creating scoped sessions.
  - `get_db()` — a FastAPI dependency that yields a session and
    guarantees cleanup.
"""

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.config import get_settings

settings = get_settings()

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,  # verify connections before checkout
    pool_size=5,
    max_overflow=10,
    echo=(settings.app_env == "development"),
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency — yields a DB session and closes it after use."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
