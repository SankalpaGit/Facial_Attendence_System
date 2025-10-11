from rest_framework import serializers
from .models import Employee, EmployeeCred

class EmployeeCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = Employee
        fields = ['id', 'full_name', 'email', 'contact', 'department', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee.objects.create(**validated_data)
        cred = EmployeeCred.objects.create(employee=employee)
        cred.set_password(password)
        return employee
