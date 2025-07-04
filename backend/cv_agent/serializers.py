from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GeminiAPIKey, CVAnalysisResult, UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['cv_file', 'cv_url']

class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'userprofile'] # Add other fields as needed

class GeminiAPIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = GeminiAPIKey
        fields = ['api_key'] # Only expose api_key for setting/retrieving

class CVUploadSerializer(serializers.Serializer):
    job_description = serializers.CharField(max_length=10000)

class CVAnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CVAnalysisResult
        fields = ['score', 'why', 'improvements', 'created_at']