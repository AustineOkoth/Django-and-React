# django_celery/celery.py
#from __future__ import absolute_import
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery import shared_task

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "austinesite.settings")
app = Celery("austinesite")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

@shared_task
def add(x, y):
    return x + y