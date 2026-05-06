from pydantic import BaseModel, Field, field_validator, model_validator, ConfigDict
from datetime import datetime

from app.schemas.base_schema import UserBaseSchema, EmailSchema
from app.utils.validators import validate_password, validate_otp


class UserRegister(UserBaseSchema):
    @model_validator(mode="after")
    def validate_context(self) -> "UserRegister":
        self.password = validate_password(self.password, self.email, self.name)
        return self


class UserLogin(EmailSchema):
    password: str = Field(..., min_length=1, max_length=128)


class SendOTPRequest(EmailSchema):
    pass


class VerifyOTPRequest(EmailSchema):
    otp: str = Field(..., min_length=6, max_length=6)

    @field_validator("otp")
    @classmethod
    def check_otp(cls, value: str) -> str:
        return validate_otp(value)


class ForgotPasswordRequest(EmailSchema):
    pass


class VerifyResetOTPRequest(EmailSchema):
    """Sirf OTP verify karne ke liye — password change nahi hoga yahan."""
    otp: str = Field(..., min_length=6, max_length=6)

    @field_validator("otp")
    @classmethod
    def check_otp(cls, value: str) -> str:
        return validate_otp(value)


class ResetPasswordRequest(EmailSchema):
    """OTP pehle verify hona chahiye — yahan sirf naya password chahiye."""
    new_password: str = Field(..., min_length=8, max_length=128)
    confirm_password: str

    @model_validator(mode="after")
    def validate_all(self) -> "ResetPasswordRequest":
        self.new_password = validate_password(self.new_password, self.email)
        if self.new_password != self.confirm_password:
            raise ValueError("Passwords do not match.")
        return self


class RefreshTokenRequest(BaseModel):
    refresh_token: str = Field(..., min_length=10, max_length=1024)


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: str
    phone: str
    role: str
    is_verified: bool
    created_at: datetime