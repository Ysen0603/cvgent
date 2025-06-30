from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import GeminiAPIKey
from .serializers import GeminiAPIKeySerializer, CVUploadSerializer, CVAnalysisResultSerializer, UserSerializer
from .services.analysis_service import analyze_cv_and_job_description

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        password=make_password(password) # Hash the password
    )
    return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def manage_gemini_api_key(request):
    user = request.user
    if request.method == 'GET':
        try:
            api_key_obj = GeminiAPIKey.objects.get(user=user)
            serializer = GeminiAPIKeySerializer(api_key_obj)
            return Response(serializer.data)
        except GeminiAPIKey.DoesNotExist:
            return Response({"api_key": None}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = GeminiAPIKeySerializer(data=request.data)
        if serializer.is_valid():
            api_key = serializer.validated_data['api_key']
            GeminiAPIKey.objects.update_or_create(user=user, defaults={'api_key': api_key})
            return Response({"message": "Gemini API key updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cv_analysis(request):
    serializer = CVUploadSerializer(data=request.data)
    if serializer.is_valid():
        cv_file = serializer.validated_data['cv_file']
        job_description = serializer.validated_data['job_description']

        result, status_code = analyze_cv_and_job_description(request.user, cv_file, job_description)
        
        if status_code == 200:
            # Assuming result is already in the desired format for CVAnalysisResultSerializer
            # If not, you might need to create an instance of CVAnalysisResult and then serialize it
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status_code)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
