import os
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

def send_otp_email(to_email, otp_code):
    subject = "Your Admin Login OTP"
    from_email = settings.EMAIL_HOST_USER
    text_content = f"Your 6-digit OTP is: {otp_code}\n\nThis OTP will expire in 10 minutes."

    # ✨ Beautiful HTML email body
    html_content = f"""
    <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #4CAF50;">Uddan Innovation pvt ltd</h2>
                <p>Dear Admin,</p>
                <p>Your One-Time Password (OTP) for login is:</p>
                <div style="text-align: center; font-size: 28px; font-weight: bold; color: #333; margin: 20px 0;">
                    {otp_code}
                </div>
                <p style="font-size: 14px; color: #666;">
                    This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone.
                </p>
                <br>
                <p style="text-align: center; font-size: 12px; color: #999;">
                    © Uddan Innovation Attendance System
                </p>
            </div>
        </body>
    </html>
    """

    # Create the email
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
