# employee model
from django.db import models
from django.contrib.auth.hashers import make_password

class Employee(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=30, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    
    # store either list of profile vectors or averaged vector; we'll store averaged vector
    face_encoding = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.email})"


class EmployeeCred(models.Model):
    employee = models.OneToOneField(Employee, on_delete=models.CASCADE, related_name="credentials")
    password = models.CharField(max_length=255)  # store hashed

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def __str__(self):
        return f"Credentials for {self.employee.email}"
