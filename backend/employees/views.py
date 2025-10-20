# employees/views.py
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.hashers import check_password
from .serializers import EmployeeCreateSerializer
from .models import Employee, EmployeeCred
from face_recognition.services import process_three_profile_videos
  
class EmployeeRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # admin only

    def post(self, request, *args, **kwargs):
        serializer = EmployeeCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()

        # Get uploaded videos
        front = request.FILES.get('front_video')
        left = request.FILES.get('left_video')
        right = request.FILES.get('right_video')

        if not any([front, left, right]):
            employee.delete()
            return Response({"detail": "At least one profile video (front/left/right) is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            mean_encoding = process_three_profile_videos(front, left, right)
        except ValueError as ve:
            employee.delete()
            return Response({"detail": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            employee.delete()
            return Response({"detail": f"Failed processing videos: {str(e)}"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        employee.face_encoding = mean_encoding
        employee.save()

        return Response({
            "message": "Employee created successfully with face data and credentials.",
            "employee_id": employee.id
        }, status=status.HTTP_201_CREATED)


class EmployeeCredentialsView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            employee = Employee.objects.get(email=email)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

        # Prevent duplicate account creation
        if hasattr(employee, 'credentials'):
            return Response({'error': 'Account already exists'}, status=status.HTTP_400_BAD_REQUEST)

        cred = EmployeeCred(employee=employee)
        cred.set_password(password)
        cred.save()

        return Response({'message': f'Account created successfully for {email}'}, status=status.HTTP_201_CREATED)

class EmployeeLoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            employee = Employee.objects.get(email=email)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee not found.'},
                            status=status.HTTP_404_NOT_FOUND)

        try:
            cred = employee.credentials
        except EmployeeCred.DoesNotExist:
            return Response({'error': 'No account found for this employee.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, cred.password):
            return Response({'error': 'Invalid password.'},
                            status=status.HTTP_401_UNAUTHORIZED)

        # Generate JWT token
        refresh = RefreshToken.for_user(employee)

        return Response({
            'message': 'Login successful',
            'token': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)