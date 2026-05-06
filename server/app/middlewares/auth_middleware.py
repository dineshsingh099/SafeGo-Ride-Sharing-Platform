from fastapi import Request, HTTPException
from app.core.security import decode_access_token_checked
from app.services.user_service import UserService


async def get_current_user(request: Request):

    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    payload = await decode_access_token_checked(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or logged out token")

    db_user = await UserService.get_by_email(payload["sub"])

    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    if payload.get("tv") != db_user.get("token_version", 0):
        raise HTTPException(status_code=401, detail="Session expired")

    return payload