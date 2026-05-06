import asyncio
from fastapi import Response, BackgroundTasks, Request

from app.services.user_service import UserService
from app.services.otp_service import OTPService
from app.utils.response import success, error
from app.utils.email_send import EmailService
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_access_token,
    decode_refresh_token
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
            return error(response, "Account already exists")

        if await OTPService.get_pending_user(email):
            return error(response, "Verification already pending")

        user_data = user.model_dump()
        user_data["password"] = hash_password(user.password)
        user_data["role"] = "user"
        user_data["token_version"] = 0

        await OTPService.save_pending_user(email, user_data)

        otp = await OTPService.generate_and_save_otp(email)
        background_tasks.add_task(
            EmailService.send_otp_email,
            email,
            user.name,
            otp
        )

        return success(response, {"email": email}, "OTP sent")

    @staticmethod
    async def send_otp(
        email: str,
        background_tasks: BackgroundTasks,
        response: Response
    ):
        pending_user = await OTPService.get_pending_user(email)

        if not pending_user:
            if await UserService.get_by_email(email):
                return error(response, "Already verified")

            return error(response, "No pending registration")

        otp = await OTPService.generate_and_save_otp(email)

        background_tasks.add_task(
            EmailService.send_otp_email,
            email,
            pending_user["name"],
            otp
        )

        return success(response, {"email": email}, "OTP sent")

    @staticmethod
    async def verify_otp(
        email: str,
        otp: str,
        response: Response,
        background_tasks: BackgroundTasks
    ):
        is_valid, _ = await OTPService.verify_otp(email, otp)

        if not is_valid:
            return error(response, "Invalid OTP")

        pending_user = await OTPService.get_pending_user(email)

        if not pending_user:
            return error(response, "Session expired")

        if await UserService.get_by_email(email):
            await OTPService.delete_pending_user(email)
            return error(response, "User already exists")

        pending_user["is_verified"] = True
        pending_user["token_version"] = 0

        await UserService.create_user(pending_user)

        await OTPService.delete_pending_user(email)

        background_tasks.add_task(
            EmailService.send_welcome_email,
            email,
            pending_user["name"]
        )

        access_token = create_access_token({
            "sub": email,
            "role": pending_user["role"],
            "token_version": 0
        })

        refresh_token = create_refresh_token({
            "sub": email,
            "role": pending_user["role"],
            "token_version": 0
        })

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
        )

        return success(response, {
            "user": {
                "name": pending_user["name"],
                "email": email,
                "phone": pending_user.get("phone", ""),
                "role": pending_user["role"]
            }
        }, "Account created")

    @staticmethod
    async def login(user, request: Request, response: Response):
        email = user.email

        db_user = await UserService.get_by_email(email)

        if not db_user:
            return error(response, "Invalid credentials")

        if not verify_password(user.password, db_user["password"]):
            return error(response, "Invalid credentials")

        if not db_user.get("is_verified"):
            return error(response, "Not verified")

        access_token = create_access_token({
            "sub": email,
            "role": db_user["role"],
            "token_version": db_user.get("token_version", 0)
        })

        refresh_token = create_refresh_token({
            "sub": email,
            "role": db_user["role"],
            "token_version": db_user.get("token_version", 0)
        })

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
        )

        return success(response, {
            "user": {
                "name": db_user["name"],
                "email": email,
                "phone": db_user.get("phone", ""),
                "role": db_user["role"]
            }
        }, "Login successful")

    @staticmethod
    async def refresh_token(request: Request, response: Response):
        token = request.cookies.get("refresh_token")

        if not token:
            return error(response, "Missing token")

        payload = decode_refresh_token(token)

        if not payload:
            return error(response, "Invalid token")

        if await TokenBlacklistService.exists(payload["jti"]):
            return error(response, "Token expired")

        db_user = await UserService.get_by_email(payload["sub"])

        if not db_user:
            return error(response, "User not found")

        access_token = create_access_token({
            "sub": payload["sub"],
            "role": payload["role"],
            "token_version": db_user.get("token_version", 0)
        })

        refresh_token = create_refresh_token({
            "sub": payload["sub"],
            "role": payload["role"],
            "token_version": db_user.get("token_version", 0)
        })

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        )

        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
        )

        return success(response, {
            "access_token": access_token
        }, "Refreshed")

    @staticmethod
    async def me(request: Request, response: Response):
        token = request.cookies.get("access_token")

        if not token:
            return error(response, "Not authenticated")

        payload = decode_access_token(token)

        if not payload:
            return error(response, "Invalid token")

        if await TokenBlacklistService.exists(payload["jti"]):
            return error(response, "Token expired")

        user = await UserService.get_by_email(payload["sub"])

        if not user:
            return error(response, "User not found")

        return success(response, {
            "user": {
                "name": user["name"],
                "email": user["email"],
                "phone": user.get("phone", ""),
                "role": user["role"]
            }
        }, "User fetched")

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
                if await TokenBlacklistService.exists(payload["jti"]):
                    return error(response, "Already logged out")

                await TokenBlacklistService.add(payload["jti"])

        response.delete_cookie(
            key="access_token",
            path="/"
        )

        response.delete_cookie(
            key="refresh_token",
            path="/"
        )

        return success(response, {}, "Logged out")

    @staticmethod
    async def forgot_password(
        email: str,
        background_tasks: BackgroundTasks,
        response: Response
    ):
        user = await UserService.get_by_email(email)

        if not user:
            return error(response, "User not found")

        otp = await OTPService.generate_and_save_reset_otp(email)

        background_tasks.add_task(
            EmailService.send_forgot_password_email,
            email,
            user["name"],
            otp
        )

        return success(response, {"email": email}, "Reset OTP sent")

    @staticmethod
    async def verify_reset_otp(
        email: str,
        otp: str,
        response: Response
    ):
        user = await UserService.get_by_email(email)

        if not user:
            return error(response, "User not found")

        is_valid, msg = await OTPService.verify_reset_otp(email, otp)

        if not is_valid:
            return error(response, msg)

        return success(
            response,
            {"email": email},
            "OTP verified. Proceed to reset password."
        )

    @staticmethod
    async def reset_password(
        email: str,
        new_password: str,
        request: Request,
        response: Response
    ):
        user = await UserService.get_by_email(email)

        if not user:
            return error(response, "User not found")

        if not await OTPService.is_reset_verified(email):
            return error(
                response,
                "OTP verification required before resetting password"
            )

        hashed = hash_password(new_password)

        await UserService.update_password(email, hashed)
        await UserService.increment_token_version(email)

        await OTPService.delete_reset_otp(email)

        access_token = request.cookies.get("access_token")
        refresh_token = request.cookies.get("refresh_token")

        if access_token:
            payload = decode_access_token(access_token)

            if payload:
                try:
                    await TokenBlacklistService.add(payload["jti"])
                except Exception:
                    pass

        if refresh_token:
            payload = decode_refresh_token(refresh_token)

            if payload:
                try:
                    await TokenBlacklistService.add(payload["jti"])
                except Exception:
                    pass

        response.delete_cookie(
            key="access_token",
            path="/"
        )

        response.delete_cookie(
            key="refresh_token",
            path="/"
        )

        return success(
            response,
            {},
            "Password reset successful. Please login again."
        )