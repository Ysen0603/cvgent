from django.db import models
from django.contrib.auth.models import User

class GeminiAPIKey(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    api_key = models.CharField(max_length=255) # Consider encryption for production
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"API Key for {self.user.username}"

class CVAnalysisResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cv_file = models.FileField(upload_to='')
    job_description = models.TextField()
    score = models.IntegerField()
    why = models.TextField()
    improvements = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis for {self.user.username} on {self.created_at.strftime('%Y-%m-%d %H:%M')}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cv_file = models.FileField(upload_to='', null=True, blank=True)
    cv_url = models.URLField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile for {self.user.username}"
