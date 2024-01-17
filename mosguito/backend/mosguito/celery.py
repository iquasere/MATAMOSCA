import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mosguito.settings")
app = Celery("mosguito")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
print("Celery app mosguito configured")