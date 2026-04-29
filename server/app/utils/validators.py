import re

WEAK_PASSWORDS = {
    "password", "123456", "12345678", "qwerty",
    "abc123", "password1", "111111", "iloveyou",
    "password123", "admin", "letmein", "welcome",
    "monkey", "dragon", "master", "sunshine"
}

HAS_UPPER   = re.compile(r"[A-Z]")
HAS_LOWER   = re.compile(r"[a-z]")
HAS_DIGIT   = re.compile(r"\d")
HAS_SPECIAL = re.compile(r"[!@#$%^&*(),.?\":{}|<>]")


def validate_password(value: str, email: str = "", name: str = "") -> str:
    value = value.strip()

    if len(value) < 8:
        raise ValueError("Password must be at least 8 characters.")
    if len(value) > 128:
        raise ValueError("Password is too long.")
    if value.lower() in WEAK_PASSWORDS:
        raise ValueError("Password is too common. Choose a stronger one.")

    if email:
        local_part = email.split("@")[0].lower()
        if local_part and local_part in value.lower():
            raise ValueError("Password should not contain your email.")
    if name and len(name) >= 4:
        if name.lower() in value.lower():
            raise ValueError("Password should not contain your name.")

    if not HAS_UPPER.search(value):
        raise ValueError("Password must contain at least one uppercase letter.")
    if not HAS_LOWER.search(value):
        raise ValueError("Password must contain at least one lowercase letter.")
    if not HAS_DIGIT.search(value):
        raise ValueError("Password must contain at least one number.")
    if not HAS_SPECIAL.search(value):
        raise ValueError("Password must contain at least one special character.")

    return value


def validate_otp(value: str) -> str:
    value = value.strip()
    if not value.isdigit() or len(value) != 6:
        raise ValueError("OTP must be exactly 6 digits.")
    return value