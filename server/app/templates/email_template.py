from app.templates.base_template import base_email_layout

def otp_email_template(name: str, otp: str, expire_minutes: int = 5) -> str:
    body = f"""
        <h2 style="margin-top:0; color:#222;">Verify Your Email</h2>

        <p>Hello <strong>{name}</strong>,</p>

        <p>Use the OTP below to verify your SafeGO account:</p>

        <div style="text-align:center; margin:30px 0;">
            <span style="display:inline-block; background:#0d6efd; color:#fff;
                         font-size:28px; font-weight:bold; letter-spacing:6px;
                         padding:14px 28px; border-radius:8px;">
                {otp}
            </span>
        </div>

        <p style="font-size:14px; color:#666;">
            This OTP will expire in <strong>{expire_minutes} minutes</strong>.
        </p>

        <p style="font-size:14px; color:#999;">
            Do not share this code with anyone.
        </p>
    """
    return base_email_layout("SafeGO Email Verification", body)
    
    
def welcome_email_template(name: str) -> str:
    body = f"""
        <h2 style="color:#28a745;">Welcome to SafeGO 🎉</h2>

        <p>Hello <strong>{name}</strong>,</p>

        <p>Your account has been successfully verified.</p>

        <p>You can now login and start booking safe rides.</p>

        <div style="margin:25px 0; padding:15px; background:#e9f7ef; border-radius:8px; text-align:center;">
            <strong style="color:#28a745;">Account Activated ✅</strong>
        </div>

        <p style="font-size:14px; color:#777;">
            If you did not create this account, contact support immediately.
        </p>
    """
    return base_email_layout("Welcome to SafeGO", body)
    
    
def forgot_password_otp_template(name: str, otp: str, expire_minutes: int = 5) -> str:
    body = f"""
        <h2 style="margin-top:0; color:#222;">Reset Your Password</h2>

        <p>Hello <strong>{name}</strong>,</p>

        <p>Use the OTP below to reset your SafeGO password:</p>

        <div style="text-align:center; margin:30px 0;">
            <span style="display:inline-block; background:#dc3545; color:#fff;
                         font-size:28px; font-weight:bold; letter-spacing:6px;
                         padding:14px 28px; border-radius:8px;">
                {otp}
            </span>
        </div>

        <p style="font-size:14px; color:#666;">
            This OTP will expire in <strong>{expire_minutes} minutes</strong>.
        </p>

        <p style="font-size:14px; color:#999;">
            If you did not request this, ignore this email.
        </p>
    """
    return base_email_layout("SafeGO Password Reset", body)