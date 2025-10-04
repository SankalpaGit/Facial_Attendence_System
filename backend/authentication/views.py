
# Create your views here.
import random, datetime
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status, views
from .models import AdminUser
from .serializers import AdminLoginSerializer

class AdminLoginView(views.APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        # check if admin exists in DB
        try:
            admin = AdminUser.objects.get(email=email)
        except AdminUser.DoesNotExist:
            return Response({"detail": "Email not registered as admin."}, status=status.HTTP_400_BAD_REQUEST)

        # generate 6-digit OTP
        otp = f"{random.randint(100000, 999999)}"
        admin.otp = otp
        admin.otp_created_at = timezone.now()
        admin.save()

        # In production: send via email (for now just return for testing)
        return Response({"message": "OTP sent to admin email", "otp_debug": otp})
