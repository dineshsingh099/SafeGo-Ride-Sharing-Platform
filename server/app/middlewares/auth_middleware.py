from fastapi import Request, HTTPException
from app.core.security import decode_access_token_checked


async def get_current_user(request: Request):

    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Unauthorized")

    payload = await decode_access_token_checked(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or logged out token")

    return payload