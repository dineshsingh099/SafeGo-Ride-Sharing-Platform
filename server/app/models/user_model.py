from datetime import datetime, timezone
import uuid

class UserModel:
    def __init__(
        self,
        name: str,
        email: str,
        phone: str,
        password: str,
        role: str = "user"
    ):
        self.id          = str(uuid.uuid4())
        self.name        = name.strip()
        self.email       = email.lower().strip()
        self.phone       = phone.strip()
        self.password    = password
        self.role        = role
        self.is_verified = False
        self.is_active   = True

        now = datetime.now(timezone.utc)
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> dict:
        return {
            "id":          self.id,
            "name":        self.name,
            "email":       self.email,
            "phone":       self.phone,
            "password":    self.password,
            "role":        self.role,
            "is_verified": self.is_verified,
            "is_active":   self.is_active,
            "created_at":  self.created_at,
            "updated_at":  self.updated_at,
        }

    def to_public_dict(self) -> dict:
        return {
            "id":          self.id,
            "name":        self.name,
            "email":       self.email,
            "phone":       self.phone,
            "role":        self.role,
            "is_verified": self.is_verified,
        }