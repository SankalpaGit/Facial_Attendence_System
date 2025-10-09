# authentication/views.py
import random
from datetime import timedelta
from django.utils import timezone

from rest_framework.response import Response
from rest_framework import status, views
from rest_framework_simplejwt.tokens import RefreshToken

from .models import AdminUser
from .utils.email_service import send_otp_email
from .serializers import AdminLoginSerializer, AdminOTPVerifySerializer


class AdminLoginView(views.APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        # Check if admin exists in DB
        try:
            admin = AdminUser.objects.get(email=email)
        except AdminUser.DoesNotExist:
            return Response(
                {"detail": "Email not registered as admin."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate 6-digit OTP
        otp = f"{random.randint(100000, 999999)}"
        admin.otp = otp
        admin.otp_created_at = timezone.now()
        admin.save()

        # Send OTP email
        try:
            send_otp_email(email, otp)
        except Exception as e:
            return Response(
                {"detail": f"Failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {"message": "OTP sent to admin email"},
            status=status.HTTP_200_OK
        )

class AdminOTPVerifyView(views.APIView):
    def post(self, request):
        serializer = AdminOTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']

        try:
            admin = AdminUser.objects.get(email=email)
        except AdminUser.DoesNotExist:
            return Response({"detail": "Admin not found."}, status=status.HTTP_404_NOT_FOUND)

        # check OTP validity
        if admin.otp != otp:
            return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        # check expiration (10 minutes)
        if timezone.now() - admin.otp_created_at > timedelta(minutes=10):
            return Response({"detail": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)

        # success — clear OTP
        admin.otp = None
        admin.save()

        # generate JWT token
        refresh = RefreshToken.for_user(admin)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "message": "OTP verified successfully."
        })