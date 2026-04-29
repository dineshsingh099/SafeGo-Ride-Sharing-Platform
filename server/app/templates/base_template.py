def base_email_layout(title: str, body: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
    </head>
    <body style="margin:0; padding:0; background:#f2f4f6; font-family: 'Segoe UI', Arial, sans-serif;">
        
        <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

            <!-- BANNER -->
            <img src="cid:banner_image" style="width:100%; max-height:250px; object-fit:cover;">

            <!-- BODY -->
            <div style="padding:30px; color:#333;">
                {body}
            </div>

            <!-- FOOTER -->
            <div style="background:#f8f9fa; padding:15px; text-align:center; font-size:12px; color:#888;">
                © 2026 SafeGO · All rights reserved<br>
                This is an automated email, please do not reply.
            </div>

        </div>
    </body>
    </html>
    """