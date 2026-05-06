from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    HOST: str
    PORT: int
    DEBUG: bool = False

    DATABASE_URL: str
    DB_NAME: str

    SECRET_KEY: str
    REFRESH_SECRET_KEY: str
    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=15)
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=7)

    OTP_EXPIRE_MINUTES: int = Field(default=10)
    RESET_TOKEN_EXPIRE_MINUTES: int = Field(default=10)
    PENDING_USER_EXPIRE_MINUTES: int = Field(default=10)

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