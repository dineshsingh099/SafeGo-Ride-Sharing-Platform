from motor.motor_asyncio import AsyncIOMotorClient
from app.core.settings import settings


class ConnectDB:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect(cls):
        try:
            cls.client = AsyncIOMotorClient(settings.DATABASE_URL)
            cls.db = cls.client[settings.DB_NAME]
            await cls.client.admin.command("ping")
            print("MongoDB Connected Successfully!")
        except Exception as e:
            raise RuntimeError(f"MongoDB Connection Failed: {e}")

    @classmethod
    async def close(cls):
        if cls.client:
            cls.client.close()

    @classmethod
    def get_db(cls):
        return cls.db