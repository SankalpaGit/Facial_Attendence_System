from rest_framework import serializers
from .models import Employee, EmployeeCred
from django.contrib.auth.hashers import make_password

class EmployeeCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = Employee
        fields = ['id', 'full_name', 'email', 'contact', 'department', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee.objects.create(**validated_data)
        hashed_pw = make_password(password)
        EmployeeCred.objects.create(employee=employee, password=hashed_pw)
        return employee
