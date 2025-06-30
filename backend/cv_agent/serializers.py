from rest_framework import serializers
from .models import GeminiAPIKey, CVAnalysisResult

class GeminiAPIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = GeminiAPIKey
        fields = ['api_key'] # Only expose api_key for setting/retrieving

class CVUploadSerializer(serializers.Serializer):
    cv_file = serializers.FileField()
    job_description = serializers.CharField(max_length=10000)

class CVAnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CVAnalysisResult
        fields = ['score', 'why', 'improvements', 'created_at']