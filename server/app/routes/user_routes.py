
from fastapi import APIRouter, Response, BackgroundTasks, Request
from app.schemas.user_schema import (
    UserRegister, UserLogin,
    SendOTPRequest, VerifyOTPRequest,
)
from app.controllers.user_controller import UserController

router = APIRouter(prefix="/users", tags=["Auth"])


@router.post("/register")
async def register(request: Request, user: UserRegister, background_tasks: BackgroundTasks):
    return await UserController.register(user, background_tasks)


@router.post("/send-otp")
async def send_otp(request: Request, body: SendOTPRequest, background_tasks: BackgroundTasks):
    return await UserController.send_otp(body.email, background_tasks)


@router.post("/verify-otp")
async def verify_otp(
    request: Request,
    body: VerifyOTPRequest,
    response: Response,
    background_tasks: BackgroundTasks
):
    return await UserController.verify_otp(body.email, body.otp, response, background_tasks)


@router.post("/login")
async def login(request: Request, user: UserLogin, response: Response):
    return await UserController.login(user, request, response)