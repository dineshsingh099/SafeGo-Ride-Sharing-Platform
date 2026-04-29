from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HOST: str 
    PORT: int 
    DEBUG: bool = False
    
    DATABASE_URL: str
    DB_NAME: str
    
    SECRET_KEY: str
    REFRESH_SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int 
    REFRESH_TOKEN_EXPIRE_DAYS: int 
    
    OTP_EXPIRE_MINUTES: int
    RESET_TOKEN_EXPIRE_MINUTES: int
    PENDING_USER_EXPIRE_MINUTES: int
    
    EMAIL_HOST: str
    EMAIL_PORT: int 
    EMAIL_USERNAME: str
    EMAIL_PASSWORD: str
    EMAIL_FROM: str
    EMAIL_FROM_NAME: str 
    
    VITE_FRONTEND_URL: str
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()