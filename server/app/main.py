from fastapi import FastAPI
from app.db.connection import ConnectDB
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ConnectDB.connect()
    yield
    await ConnectDB.close()


app = FastAPI(
    title="SafeGo Ride Sharing Platform",
    lifespan=lifespan
)


@app.get("/")
async def root_msg():
    return {"message": "Server Are Running..."}