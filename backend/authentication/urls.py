from django.urls import path
from .views import AdminLoginView, AdminOTPVerifyView

urlpatterns = [
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('verify-otp/', AdminOTPVerifyView.as_view(), name='admin-verify-otp'),
]
