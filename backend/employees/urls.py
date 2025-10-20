from django.urls import path
from .views import EmployeeRegisterView, EmployeeCredentialsView, EmployeeLoginView

urlpatterns = [
    path('register/', EmployeeRegisterView.as_view(), name='employee-register'),
    path ('login/', EmployeeLoginView.as_view(), name='employee_login'),
    path('create-account/', EmployeeCredentialsView.as_view(), name='employee_credentials')
]
