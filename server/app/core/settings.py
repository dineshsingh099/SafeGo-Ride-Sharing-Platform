from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    HOST: str 
    PORT: int 
    DEBUG: bool = False
    DATABASE_URL: str
    DB_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()