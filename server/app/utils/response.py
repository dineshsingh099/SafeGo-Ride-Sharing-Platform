from fastapi.responses import JSONResponse

def success(data=None, message: str = "Request successful.", status_code: int = 200):
    return JSONResponse(
        status_code=status_code,
        content={"status": "success", "message": message, "data": data}
    )

def error(message: str = "Something went wrong.", status_code: int = 400):
    return JSONResponse(
        status_code=status_code,
        content={"status": "error", "message": message, "data": None}
    )
