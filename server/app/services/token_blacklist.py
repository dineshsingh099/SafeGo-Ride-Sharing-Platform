from app.db.connection import ConnectDB
from datetime import datetime, timezone


class TokenBlacklistService:

    @staticmethod
    async def add(jti: str):
        db = ConnectDB.get_db()
        await db.token_blacklist.insert_one({
            "jti": jti,
            "created_at": datetime.now(timezone.utc)
        })

    @staticmethod
    async def exists(jti: str) -> bool:
        db = ConnectDB.get_db()
        token = await db.token_blacklist.find_one({"jti": jti})
        return token is not None

    @staticmethod
    async def ensure_indexes():
        db = ConnectDB.get_db()
        await db.token_blacklist.create_index("jti", unique=True)