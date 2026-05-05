from app.db.connection import ConnectDB

class TokenBlacklistService:

    @staticmethod
    async def add(jti: str):
        db = ConnectDB.get_db()
        await db.token_blacklist.insert_one({"jti": jti})

    @staticmethod
    async def exists(jti: str) -> bool:
        db = ConnectDB.get_db()
        token = await db.token_blacklist.find_one({"jti": jti})
        return token is not None