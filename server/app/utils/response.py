from fastapi import Response

def success(response: Response, data=None, message: str = "Request successful.", status_code: int = 200):
    response.status_code = status_code
    return {
        "status": "success",
        "message": message,
        "data": data
    }


def error(response: Response, message: str = "Something went wrong.", status_code: int = 400):
    response.status_code = status_code
    return {
        "status": "error",
        "message": message,
        "data": None
    }