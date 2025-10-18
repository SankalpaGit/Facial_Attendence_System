from django.urls import path
from .views import EmployeeRegisterView, EmployeeCredentialsView

urlpatterns = [
    path('register/', EmployeeRegisterView.as_view(), name='employee-register'),
    path('create-account', EmployeeCredentialsView.as_view(), name='employee_credentials')
]
