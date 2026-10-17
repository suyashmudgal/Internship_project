"""
Import tracking models.

Every data file load is recorded as an Import. Each source row processed
creates an ImportRow with its validation outcome. This enables:
  - Tracing any canonical record back to its source file and row.
  - Reporting accepted / rejected / duplicate counts after ingestion.
  - Preventing silent data loss by requiring every row to have a status.
"""

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class ImportStatus(str, enum.Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class RowStatus(str, enum.Enum):
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    DUPLICATE = "DUPLICATE"
    CONFLICT = "CONFLICT"


class Import(TimestampMixin, Base):
    """Tracks a single data file import operation."""

    __tablename__ = "imports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    dataset: Mapped[str] = mapped_column(String(100), nullable=False)
    source_file: Mapped[str | None] = mapped_column(String(500))
    status: Mapped[ImportStatus] = mapped_column(
        Enum(ImportStatus), nullable=False, default=ImportStatus.PENDING
    )
    accepted_count: Mapped[int] = mapped_column(Integer, default=0)
    rejected_count: Mapped[int] = mapped_column(Integer, default=0)
    duplicate_count: Mapped[int] = mapped_column(Integer, default=0)
    conflict_count: Mapped[int] = mapped_column(Integer, default=0)
    error_summary: Mapped[str | None] = mapped_column(Text)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class ImportRow(Base):
    """Per-row outcome from an import — provides row-level traceability."""

    __tablename__ = "import_rows"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    import_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    row_number: Mapped[int] = mapped_column(Integer, nullable=False)
    source_record_id: Mapped[str | None] = mapped_column(String(200))
    status: Mapped[RowStatus] = mapped_column(Enum(RowStatus), nullable=False)
    error_message: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
