from fastapi import APIRouter, Response, BackgroundTasks, Request, Depends
from app.schemas.user_schema import (
    UserRegister, UserLogin,
    SendOTPRequest, VerifyOTPRequest,
)
from app.controllers.user_controller import UserController
from app.middlewares.auth_middleware import get_current_user
from app.services.user_service import UserService


router = APIRouter(prefix="/users", tags=["Auth"])


@router.post("/register")
async def register(request: Request, user: UserRegister, background_tasks: BackgroundTasks, response: Response):
    return await UserController.register(user, background_tasks, response)


@router.post("/send-otp")
async def send_otp(request: Request, body: SendOTPRequest, background_tasks: BackgroundTasks, response: Response):
    return await UserController.send_otp(body.email, background_tasks, response)


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


@router.post("/refresh-token")
async def refresh_token(request: Request, response: Response):
    return await UserController.refresh_token(request, response)


@router.post("/logout")
async def logout(request: Request, response: Response):
    return await UserController.logout(request, response)


@router.get("/profile")
async def profile(user=Depends(get_current_user)):

    db_user = await UserService.get_by_email(user["sub"])

    return {
        "name": db_user["name"],
        "email": db_user["email"],
        "phone": db_user["phone"],
        "role": db_user["role"],
        "created_at": db_user["created_at"].isoformat()
    }