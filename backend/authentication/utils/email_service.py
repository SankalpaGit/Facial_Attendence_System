import os
from django.core.mail import send_mail
from django.conf import settings

def send_otp_email(to_email, otp_code):
    subject = "Your Admin Login OTP"
    message = f"Your 6-digit OTP is: {otp_code}\n\nThis OTP will expire in 10 minutes."
    from_email = settings.EMAIL_HOST_USER

    send_mail(subject, message, from_email, [to_email])
