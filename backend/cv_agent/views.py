from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import FileResponse, Http404
import os
from django.conf import settings
import time

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import GeminiAPIKey, UserProfile
from .serializers import GeminiAPIKeySerializer, CVUploadSerializer, CVAnalysisResultSerializer, UserSerializer, UserProfileSerializer
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

@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def current_user(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        job_description = serializer.validated_data['job_description']
        
        user_profile = request.user.userprofile
        if not user_profile or not user_profile.cv_file:
            return Response({"error": "No CV found for the current user. Please upload your CV in the settings."}, status=status.HTTP_400_BAD_REQUEST)
        
        cv_file = user_profile.cv_file

        result, status_code = analyze_cv_and_job_description(request.user, cv_file, job_description)
        
        if status_code == 200:
            # Assuming result is already in the desired format for CVAnalysisResultSerializer
            # If not, you might need to create an instance of CVAnalysisResult and then serialize it
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status_code)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_user_cv(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

    elif request.method == 'POST':
        cv_file = request.FILES.get('cv_file')
        if not cv_file:
            return Response({"error": "No CV file provided."}, status=status.HTTP_400_BAD_REQUEST)

        user_profile.cv_file = cv_file
        user_profile.save() # Save the file first so cv_file.url is updated with the actual saved path
        user_profile.cv_url = request.build_absolute_uri(user_profile.cv_file.url)
        user_profile.save() # Save again to update cv_url
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        if user_profile.cv_file:
            try:
                user_profile.cv_file.delete() # Deletes the file from storage
            except PermissionError:
                time.sleep(0.5)
                try:
                    user_profile.cv_file.delete()
                except PermissionError:
                    return Response({"message": "File is currently in use. Please close any preview and try again."}, status=423)
            user_profile.cv_file = None
            user_profile.cv_url = None
            user_profile.save()
            return Response({"message": "CV deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        return Response({"message": "No CV to delete."}, status=status.HTTP_404_NOT_FOUND)

# Serve PDF inline (for CV preview)
@api_view(['GET'])
@permission_classes([AllowAny])
def serve_pdf_inline(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    if not os.path.exists(file_path):
        raise Http404
    response = FileResponse(open(file_path, 'rb'), content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{filename}"'
    response['X-Frame-Options'] = 'SAMEORIGIN'  # Allow iframe embedding from same origin
    return response
