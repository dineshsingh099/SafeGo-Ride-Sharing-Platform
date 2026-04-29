from fastapi import FastAPI

app = FastAPI(title="SafeGo Ride Sharing Platform")

@app.get("/")
def root_msg():
    return {"message": "Server Are Running..."}