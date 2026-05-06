from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.db.connection import ConnectDB
from app.services.user_service import UserService
from app.services.otp_service import OTPService
from app.routes.user_routes import router as user_router
from app.core.settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ConnectDB.connect()
    await UserService.ensure_indexes()
    await OTPService.create_indexes()
    yield
    await ConnectDB.close()


app = FastAPI(title="SafeGo Ride Sharing Platform", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.VITE_FRONTEND_URL],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)


@app.get("/")
async def root_msg():
    return {"message": "Server Is Running..."}