from django.db import models
from django.conf import settings

# Create your models here.


class MoscaRun(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    submition_date = models.DateField(auto_now_add=True)
    configuration = models.TextField()
    conclusion_date = models.DateField(auto_now=False,null=True)
    location = models.TextField(null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    name = models.CharField(max_length=255)
    task_id = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.name}"