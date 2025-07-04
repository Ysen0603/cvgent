from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
from .views import serve_pdf_inline

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', views.current_user, name='current_user'),
    path('gemini-key/', views.manage_gemini_api_key, name='manage_gemini_api_key'),
    path('analyze-cv/', views.cv_analysis, name='cv_analysis'),
    path('user-cv/', views.manage_user_cv, name='manage_user_cv'),
    path('media/<str:filename>', serve_pdf_inline, name='serve_pdf_inline'),
]