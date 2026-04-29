# app/services/otp_service.py
import secrets
from datetime import datetime, timezone
from app.db.connection import ConnectDB
from app.core.security import safe_str_compare
from app.core.settings import settings


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


def _get_db():
    return ConnectDB.get_db()


class OTPService:

    @staticmethod
    def _generate_otp(length: int = 6) -> str:
        return "".join([str(secrets.randbelow(10)) for _ in range(length)])

    @classmethod
    async def create_indexes(cls):
        db = _get_db()
        await db.otp.create_index("created_at", expireAfterSeconds=settings.OTP_EXPIRE_MINUTES * 60)
        await db.otp.create_index("email")
        await db.pending_users.create_index("created_at", expireAfterSeconds=settings.PENDING_USER_EXPIRE_MINUTES * 60)
        await db.pending_users.create_index("email")
        await db.reset_otp.create_index("created_at", expireAfterSeconds=settings.RESET_TOKEN_EXPIRE_MINUTES * 60)
        await db.reset_otp.create_index("email")

    # ── Pending User ─────────────────────────────────────

    @classmethod
    async def save_pending_user(cls, email: str, user_data: dict):
        db = _get_db()
        await db.pending_users.delete_many({"email": email})
        await db.pending_users.insert_one({
            **user_data,
            "created_at": _utc_now()
        })

    @classmethod
    async def get_pending_user(cls, email: str) -> dict | None:
        db = _get_db()
        record = await db.pending_users.find_one({"email": email})
        if not record:
            return None
        record.pop("_id", None)
        return record

    @classmethod
    async def delete_pending_user(cls, email: str):
        db = _get_db()
        await db.pending_users.delete_many({"email": email})

    # ── Registration OTP ─────────────────────────────────

    @classmethod
    async def generate_and_save_otp(cls, email: str) -> str:
        db = _get_db()
        otp = cls._generate_otp()
        await db.otp.delete_many({"email": email})
        await db.otp.insert_one({
            "email": email,
            "otp": otp,
            "created_at": _utc_now()
        })
        return otp

    @classmethod
    async def verify_otp(cls, email: str, user_otp: str) -> tuple[bool, str]:
        db = _get_db()
        record = await db.otp.find_one({"email": email})
        if not record:
            return False, "OTP has expired or was never sent. Please request a new OTP."
        if not safe_str_compare(record["otp"], user_otp):
            return False, "Invalid OTP. Please check and try again."
        await db.otp.delete_one({"email": email})
        return True, "OTP verified."

    # ── Reset OTP ────────────────────────────────────────

    @classmethod
    async def generate_and_save_reset_otp(cls, email: str) -> str:
        db = _get_db()
        otp = cls._generate_otp()
        await db.reset_otp.delete_many({"email": email})
        await db.reset_otp.insert_one({
            "email": email,
            "otp": otp,
            "created_at": _utc_now()
        })
        return otp

    @classmethod
    async def verify_reset_otp(cls, email: str, user_otp: str) -> tuple[bool, str]:
        db = _get_db()
        record = await db.reset_otp.find_one({"email": email})
        if not record:
            return False, "Reset OTP has expired. Please request a new one."
        if not safe_str_compare(record["otp"], user_otp):
            return False, "Invalid OTP. Please check and try again."
        await db.reset_otp.delete_one({"email": email})
        return True, "OTP verified."