from rest_framework import serializers
from .models import AdminUser

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
