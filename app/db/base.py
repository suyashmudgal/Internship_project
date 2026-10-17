"""
SQLAlchemy declarative base and common column mixins.

Every model inherits from Base. The TimestampMixin adds consistent
created_at / updated_at columns with timezone-aware defaults.
"""

from datetime import datetime

from sqlalchemy import DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""

    pass


class TimestampMixin:
    """Mixin that adds created_at and updated_at columns.

    Uses database server time (func.now()) for consistency across
    concurrent workers.
    """

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
