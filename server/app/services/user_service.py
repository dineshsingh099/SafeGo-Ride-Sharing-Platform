from app.db.connection import ConnectDB
from bson import ObjectId
from datetime import datetime, timezone


def _utc_now() -> datetime:
    return datetime.now(timezone.utc)


class UserService:

    @staticmethod
    async def create_user(data: dict):
        db = ConnectDB.get_db()
        now = _utc_now()
        data["created_at"] = now
        data["updated_at"] = now
        data.pop("_id", None)
        return await db.users.insert_one(data)

    @staticmethod
    async def get_by_email(email: str) -> dict | None:
        db = ConnectDB.get_db()
        return await db.users.find_one({"email": email.lower()})

    @staticmethod
    async def get_by_phone(phone: str) -> dict | None:
        db = ConnectDB.get_db()
        return await db.users.find_one({"phone": phone})

    @staticmethod
    async def get_by_id(user_id: str) -> dict | None:
        db = ConnectDB.get_db()
        try:
            return await db.users.find_one({"_id": ObjectId(user_id)})
        except Exception:
            return None

    @staticmethod
    async def update_password(email: str, hashed_password: str):
        db = ConnectDB.get_db()
        return await db.users.update_one(
            {"email": email.lower()},
            {"$set": {"password": hashed_password, "updated_at": _utc_now()}}
        )

    @staticmethod
    async def get_all_users() -> list:
        db = ConnectDB.get_db()
        cursor = db.users.find({}, {"password": 0}).sort("created_at", -1)
        users = []
        async for u in cursor:
            u["_id"] = str(u["_id"])
            if u.get("created_at"):
                u["created_at"] = u["created_at"].isoformat()
            if u.get("updated_at"):
                u["updated_at"] = u["updated_at"].isoformat()
            users.append(u)
        return users

    @staticmethod
    async def ensure_indexes():
        db = ConnectDB.get_db()
        await db.users.create_index("email", unique=True)
        await db.users.create_index("phone", unique=True)