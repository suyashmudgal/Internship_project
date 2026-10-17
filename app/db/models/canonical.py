"""
Canonical business entity models.

These represent the normalised, source-independent business facts.
Source-specific identifiers are preserved in alias tables and through
the import_id / source fields on each record.

Key design invariants
---------------------
- PurchaseOrderLine and GoodsReceiptLine carry unique constraints on
  source_record_id to guarantee idempotent imports.
- Quantities are stored in the product's declared base UOM.
- All datetime columns use timezone-aware types.
- Alias/mapping tables record the conversion rules used, so that
  findings can cite the mapping version that produced them.
"""

import enum
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    DateTime,
    Enum,
    Integer,
    Numeric,
    String,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


# ── Products ──────────────────────────────────────────────────────────


class Product(TimestampMixin, Base):
    """Canonical product — one per real-world SKU."""

    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    canonical_product_id: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )
    display_name: Mapped[str | None] = mapped_column(String(200))
    base_uom: Mapped[str] = mapped_column(String(20), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="ACTIVE")


class ProductAlias(TimestampMixin, Base):
    """Maps a source-system product code to a canonical product and UOM."""

    __tablename__ = "product_aliases"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_system: Mapped[str] = mapped_column(String(20), nullable=False)
    external_item_id: Mapped[str] = mapped_column(String(100), nullable=False)
    canonical_product_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    source_uom: Mapped[str] = mapped_column(String(20), nullable=False)
    base_uom: Mapped[str] = mapped_column(String(20), nullable=False)
    to_base_factor: Mapped[Decimal] = mapped_column(Numeric(10, 4), nullable=False)

    __table_args__ = (
        UniqueConstraint("source_system", "external_item_id", name="uq_product_alias_source"),
    )


# ── Locations ─────────────────────────────────────────────────────────


class Location(TimestampMixin, Base):
    """Canonical location — one per physical store / warehouse."""

    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    canonical_location_id: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )
    region_id: Mapped[str | None] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(20), default="ACTIVE")


class LocationAlias(TimestampMixin, Base):
    """Maps a source-system location code to a canonical location."""

    __tablename__ = "location_aliases"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_system: Mapped[str] = mapped_column(String(20), nullable=False)
    external_location_id: Mapped[str] = mapped_column(String(100), nullable=False)
    canonical_location_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    region_id: Mapped[str | None] = mapped_column(String(50))

    __table_args__ = (
        UniqueConstraint("source_system", "external_location_id", name="uq_location_alias_source"),
    )


# ── Purchase Orders ───────────────────────────────────────────────────


class POLineStatus(str, enum.Enum):
    OPEN = "OPEN"
    CANCELLED = "CANCELLED"
    CLOSED = "CLOSED"


class PurchaseOrderLine(TimestampMixin, Base):
    """Canonical PO line — quantities stored in base UOM."""

    __tablename__ = "purchase_order_lines"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    # Source lineage
    source_system: Mapped[str] = mapped_column(String(20), nullable=False, default="ERP")
    source_record_id: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    import_id: Mapped[int | None] = mapped_column(Integer)

    # Business key
    po_number: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    line_number: Mapped[int] = mapped_column(Integer, nullable=False)

    # Relationships
    supplier_code: Mapped[str] = mapped_column(String(50), nullable=False)
    canonical_location_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    canonical_product_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    # Quantities in base UOM
    ordered_qty_base: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
    base_uom: Mapped[str] = mapped_column(String(20), nullable=False)

    # Original source UOM (for audit)
    ordered_qty_source: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
    source_uom: Mapped[str] = mapped_column(String(20), nullable=False)
    uom_conversion_factor: Mapped[Decimal] = mapped_column(Numeric(10, 4), nullable=False)

    status: Mapped[POLineStatus] = mapped_column(Enum(POLineStatus), nullable=False)
    expected_receipt_by: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (
        UniqueConstraint("po_number", "line_number", name="uq_po_line_business_key"),
    )


# ── Goods Receipts ────────────────────────────────────────────────────


class GoodsReceiptLine(TimestampMixin, Base):
    """Canonical receipt line — quantities stored in base UOM."""

    __tablename__ = "goods_receipt_lines"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    # Source lineage
    source_system: Mapped[str] = mapped_column(String(20), nullable=False, default="WMS")
    source_record_id: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    import_id: Mapped[int | None] = mapped_column(Integer)

    # Business key
    receipt_number: Mapped[str] = mapped_column(String(50), nullable=False)
    receipt_line: Mapped[int] = mapped_column(Integer, nullable=False)

    # Link to PO
    po_number: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    po_line_number: Mapped[int] = mapped_column(Integer, nullable=False)

    # Relationships
    canonical_location_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    canonical_product_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    # Quantities in base UOM
    accepted_qty_base: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
    base_uom: Mapped[str] = mapped_column(String(20), nullable=False)

    # Original source UOM (for audit)
    accepted_qty_source: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
    source_uom: Mapped[str] = mapped_column(String(20), nullable=False)
    uom_conversion_factor: Mapped[Decimal] = mapped_column(Numeric(10, 4), nullable=False)

    posting_status: Mapped[str] = mapped_column(String(20), nullable=False)
    received_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)


# ── Employees ─────────────────────────────────────────────────────────


class EmploymentStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


class Employee(TimestampMixin, Base):
    """Employee from HRMS roster.

    canonical_location_id is nullable because regional employees
    (e.g. regional_operations) are scoped to a region, not a store.
    """

    __tablename__ = "employees"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_employee_id: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )
    import_id: Mapped[int | None] = mapped_column(Integer)

    display_name: Mapped[str] = mapped_column(String(200), nullable=False)
    employment_status: Mapped[EmploymentStatus] = mapped_column(
        Enum(EmploymentStatus), nullable=False
    )
    role: Mapped[str] = mapped_column(String(50), nullable=False)
    canonical_location_id: Mapped[str | None] = mapped_column(String(50), index=True)
    manager_employee_id: Mapped[str | None] = mapped_column(String(50))
    region_id: Mapped[str | None] = mapped_column(String(50))


# ── Workforce Status ──────────────────────────────────────────────────


class AvailabilityStatus(str, enum.Enum):
    ON_SHIFT = "ON_SHIFT"
    OFF_SHIFT = "OFF_SHIFT"


class WorkforceStatus(TimestampMixin, Base):
    """Point-in-time availability snapshot for an employee."""

    __tablename__ = "workforce_status"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source_employee_id: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    import_id: Mapped[int | None] = mapped_column(Integer)

    availability_status: Mapped[AvailabilityStatus] = mapped_column(
        Enum(AvailabilityStatus), nullable=False
    )
    shift_start: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    shift_end: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    observed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "source_employee_id", "observed_at", name="uq_workforce_status_snapshot"
        ),
    )
