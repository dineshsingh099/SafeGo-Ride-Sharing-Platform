import asyncio
from fastapi import Response, BackgroundTasks, Request

from app.services.user_service import UserService
from app.services.otp_service import OTPService
from app.utils.response import success, error
from app.utils.email_send import EmailService
from app.core.security import (
    hash_password, verify_password,
    create_access_token, create_refresh_token,decode_access_token,decode_refresh_token
)
from app.services.token_blacklist import TokenBlacklistService
from app.core.settings import settings


class UserController:

    @staticmethod
    async def register(user, background_tasks, response: Response):
        email = user.email

        existing_email, existing_phone = await asyncio.gather(
            UserService.get_by_email(email),
            UserService.get_by_phone(user.phone)
        )
        if existing_email or existing_phone:
            return error(response,"An account with this email or phone already exists. Please log in.")

        if await OTPService.get_pending_user(email):
            return error(response,"Verification is already pending. Please check your email for the code.")

        user_data = user.model_dump()
        user_data["password"] = hash_password(user.password)
        user_data["role"] = "user"

        await OTPService.save_pending_user(email, user_data)

        otp = await OTPService.generate_and_save_otp(email)
        background_tasks.add_task(EmailService.send_otp_email, email, user.name, otp)

        return success(
            response,
            {"email": email},
            f"We’ve sent a verification code to {email}. It will expire in {settings.OTP_EXPIRE_MINUTES} minutes."
        )


    @staticmethod
    async def send_otp(email: str, background_tasks: BackgroundTasks, response: Response):
        pending_user = await OTPService.get_pending_user(email)

        if not pending_user:
            if await UserService.get_by_email(email):
                return error(response,"Your account is already verified. Please log in.")
            return error(response,"No pending registration found. Please sign up first.")

        otp = await OTPService.generate_and_save_otp(email)
        background_tasks.add_task(EmailService.send_otp_email, email, pending_user["name"], otp)

        return success(
            response,
            {"email": email},
            f"A new verification code has been sent to {email}."
        )


    @staticmethod
    async def verify_otp(email: str, otp: str, response: Response, background_tasks: BackgroundTasks):
        is_valid, vmsg = await OTPService.verify_otp(email, otp)

        if not is_valid:
            if "expired" in vmsg.lower():
                return error(response,"This verification code has expired. Please request a new one.")
            return error(response,"The code you entered is incorrect. Please try again.")

        pending_user = await OTPService.get_pending_user(email)
        if not pending_user:
            return error(response,"Your session has expired. Please register again.")

        if await UserService.get_by_email(email):
            await OTPService.delete_pending_user(email)
            return error(response,"An account already exists with this email. Please log in.")

        pending_user["is_verified"] = True
        pending_user.pop("created_at", None)

        result = await UserService.create_user(pending_user)

        await OTPService.delete_pending_user(email)
        background_tasks.add_task(EmailService.send_welcome_email, email, pending_user["name"])

        access_token = create_access_token({"sub": email, "role": pending_user["role"]})
        refresh_token = create_refresh_token({"sub": email, "role": pending_user["role"]})

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            path="/"
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
            path="/"
        )

        response.headers["Authorization"] = f"Bearer {access_token}"

        return success(
            response,
            {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "Bearer",
                "user": {
                    "id": str(result.inserted_id),
                    "name": pending_user["name"],
                    "email": email,
                    "phone": pending_user["phone"],
                    "role": pending_user["role"]
                }
            },
            "Your email has been verified and your account has been created successfully."
        )


    @staticmethod
    async def login(user, request: Request, response: Response):
        email = user.email

        db_user = await UserService.get_by_email(email)

        if not db_user:
            await asyncio.sleep(0.3)
            return error(response,"Invalid email or password.")

        if not verify_password(user.password, db_user["password"]):
            return error(response,"Invalid email or password.")

        if not db_user.get("is_verified", False):
            return error(response,"Please verify your email before logging in.")

        access_token = create_access_token({"sub": email, "role": db_user["role"]})
        refresh_token = create_refresh_token({"sub": email, "role": db_user["role"]})

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            path="/"
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
            path="/"
        )

        response.headers["Authorization"] = f"Bearer {access_token}"

        return success(
            response,
            {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "Bearer",
                "user": {
                    "name": db_user["name"],
                    "email": db_user["email"],
                    "phone": db_user["phone"],
                    "role": db_user["role"],
                    "created_at": db_user["created_at"].isoformat()
                }
            },
            f"Welcome back, {db_user['name']}!"
        )
    
    @staticmethod
    async def refresh_token(request: Request, response: Response):
        token = request.cookies.get("refresh_token")

        if not token:
            return error(response, "Refresh token missing")

        payload = decode_refresh_token(token)

        if not payload:
            return error(response, "Invalid refresh token")

        access_token = create_access_token({
            "sub": payload["sub"],
            "role": payload["role"]
        })

        new_refresh = create_refresh_token({
            "sub": payload["sub"],
            "role": payload["role"]
        })

        response.set_cookie("access_token", access_token, httponly=True, secure=False, samesite="lax", path="/")
        response.set_cookie("refresh_token", new_refresh, httponly=True, secure=False, samesite="lax", path="/")

        return success(response, {"access_token": access_token}, "Token refreshed")
        
        
    @staticmethod
    async def logout(request: Request, response: Response):
    
        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")
    
        if not access_token and not refresh_token:
            return error(response, "Already logged out")
    
        if access_token:
            payload = decode_access_token(access_token)
            if payload:
                if await TokenBlacklistService.exists(payload["jti"]):
                    return error(response, "Already logged out")
                await TokenBlacklistService.add(payload["jti"])
    
        if refresh_token:
            payload = decode_refresh_token(refresh_token)
            if payload:
                await TokenBlacklistService.add(payload["jti"])
    
        response.delete_cookie("access_token", path="/")
        response.delete_cookie("refresh_token", path="/")
    
        return success(response, {}, "Logged out")