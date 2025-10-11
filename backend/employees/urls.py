from django.urls import path
from .views import EmployeeRegisterView

urlpatterns = [
    path('register/', EmployeeRegisterView.as_view(), name='employee-register'),
]
