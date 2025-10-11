from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import EmployeeCreateSerializer
from .models import Employee
from face_recognition.services import process_three_profile_videos

class EmployeeRegisterView(APIView):
    """
    POST endpoint for admin to create employee + upload 3 profile videos:
      - front_video
      - left_video
      - right_video

    Expects multipart/form-data with fields:
      full_name, email, contact, department, password
      and files front_video, left_video, right_video
    """
    permission_classes = [permissions.IsAuthenticated]  # require admin JWT/session

    def post(self, request, *args, **kwargs):
        # First validate and create employee + credentials
        serializer = EmployeeCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee = serializer.save()

        # Get uploaded videos
        front = request.FILES.get('front_video')
        left = request.FILES.get('left_video')
        right = request.FILES.get('right_video')

        # Basic validation
        if not any([front, left, right]):
            # rollback created employee & creds if videos required
            employee.delete()
            return Response({"detail": "At least one profile video (front/left/right) is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            mean_encoding = process_three_profile_videos(front, left, right)
        except ValueError as ve:
            # delete created employee on failure to keep DB clean
            employee.delete()
            return Response({"detail": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            employee.delete()
            return Response({"detail": f"Failed processing videos: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Save encoding into employee record
        employee.face_encoding = mean_encoding
        employee.save()

        return Response({"message": "Employee created and face data saved successfully.",
                         "employee_id": employee.id}, status=status.HTTP_201_CREATED)
