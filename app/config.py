"""
Central application configuration.

All environment-dependent settings are loaded here via pydantic-settings.
Business logic should reference `settings.frozen_evaluation_time` instead
of calling datetime.now() for any deadline / scenario comparison.
"""

from datetime import datetime
from functools import lru_cache
from zoneinfo import ZoneInfo

from pydantic_settings import BaseSettings, SettingsConfigDict


# Default frozen evaluation time from the assessment fixture README.
_DEFAULT_FROZEN_TIME = "2026-10-16T15:00:00+05:30"

IST = ZoneInfo("Asia/Kolkata")


class Settings(BaseSettings):
    """Application settings loaded from environment / .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # ── Database ──────────────────────────────────────────────────────
    database_url: str = "postgresql://opsib:opsib_dev@localhost:5432/opsib"

    # ── Application ───────────────────────────────────────────────────
    app_env: str = "development"
    log_level: str = "INFO"

    # ── Frozen evaluation time ────────────────────────────────────────
    # The assessment supplies a deterministic reference point so that
    # deadline comparisons are reproducible regardless of when or where
    # the code runs.  All scenario logic MUST use this value instead of
    # the system clock.
    frozen_evaluation_time: str = _DEFAULT_FROZEN_TIME

    # ── Fixture data ──────────────────────────────────────────────────
    fixture_dir: str = "features"

    @property
    def evaluation_time(self) -> datetime:
        """Parse the frozen evaluation time into a timezone-aware datetime."""
        dt = datetime.fromisoformat(self.frozen_evaluation_time)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=IST)
        return dt

    @property
    def is_test(self) -> bool:
        return self.app_env == "test"


@lru_cache
def get_settings() -> Settings:
    """Cached singleton accessor for application settings."""
    return Settings()
