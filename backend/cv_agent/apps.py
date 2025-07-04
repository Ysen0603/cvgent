from django.apps import AppConfig


class CvAgentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cv_agent'

    def ready(self):
        import cv_agent.signals  # noqa
