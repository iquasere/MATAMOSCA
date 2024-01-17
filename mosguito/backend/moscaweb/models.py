from django.db import models
from django.conf import settings

# Create your models here.


class Run(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    submition_date = models.DateField(auto_now_add=True)
    configuration = models.TextField()
    conclusion_date = models.DateField(auto_now=False)
    location = models.TextField()
    description = models.TextField()
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.name}"