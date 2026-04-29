# app/schemas/base_schema.py
import re
from pydantic import BaseModel, EmailStr, Field, field_validator

NAME_PATTERN  = re.compile(r"^[A-Za-z][A-Za-z\s\-'\.]{1,49}$")
PHONE_PATTERN = re.compile(r"^[6-9]\d{9}$")


class EmailSchema(BaseModel):
    email: EmailStr

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class UserBaseSchema(BaseModel):
    name: str  = Field(..., min_length=2, max_length=50)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=10)
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not NAME_PATTERN.match(value):
            raise ValueError("Name must start with a letter and contain only letters, spaces, hyphens, apostrophes, or dots.")
        return value

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        value = value.strip()
        if not PHONE_PATTERN.match(value):
            raise ValueError("Invalid phone number. Must be 10 digits starting with 6-9.")
        return value

    @field_validator("password")
    @classmethod
    def validate_password_field(cls, value: str) -> str:
        from app.utils.validators import validate_password
        return validate_password(value)