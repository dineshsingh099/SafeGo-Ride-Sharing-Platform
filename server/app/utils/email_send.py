import asyncio
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from app.core.settings import settings
from app.templates.email_template import (
    otp_email_template,
    welcome_email_template,
    forgot_password_otp_template
)

BANNER_PATH = "static/images/banner.png"

def _load_banner() -> bytes:
    with open(BANNER_PATH, "rb") as f:
        return f.read()

_BANNER_BYTES: bytes = _load_banner()


class EmailService:

    @staticmethod
    def _send_sync(to_email: str, subject: str, html_body: str):
        msg = MIMEMultipart("related")
        msg["From"] = f"{settings.EMAIL_FROM_NAME} <{settings.EMAIL_FROM}>"
        msg["To"] = to_email
        msg["Subject"] = subject

        msg.attach(MIMEText(html_body, "html", "utf-8"))

        banner = MIMEImage(_BANNER_BYTES)
        banner.add_header("Content-ID", "<banner_image>")
        banner.add_header("Content-Disposition", "inline", filename="banner.png")
        msg.attach(banner)

        with smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(settings.EMAIL_USERNAME, settings.EMAIL_PASSWORD)
            server.send_message(msg)

    @staticmethod
    async def _send_async(to_email: str, subject: str, html_body: str):
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(
            None,
            EmailService._send_sync,
            to_email,
            subject,
            html_body
        )

    @staticmethod
    async def send_otp_email(to_email: str, name: str, otp: str):
        body = otp_email_template(name, otp, settings.OTP_EXPIRE_MINUTES)
        await EmailService._send_async(to_email, "Your OTP Verification Code", body)

    @staticmethod
    async def send_welcome_email(to_email: str, name: str):
        body = welcome_email_template(name)
        await EmailService._send_async(to_email, "Welcome to SafeGo 🎉", body)

    @staticmethod
    async def send_forgot_password_email(to_email: str, name: str, otp: str):
        body = forgot_password_otp_template(name, otp, settings.RESET_TOKEN_EXPIRE_MINUTES)
        await EmailService._send_async(to_email, "Password Reset OTP", body)