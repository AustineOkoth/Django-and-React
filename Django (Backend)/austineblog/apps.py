from django.apps import AppConfig

class AustineblogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'austineblog'

    def ready(self):
     import austineblog.sendmail