from rest_framework.generics import (RetrieveAPIView, GenericAPIView,
                                     ListAPIView)
from rest_framework.mixins import ListModelMixin
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django.db.models import Q
from django.conf import settings
from ..models import Run
from ..tasks import run_mosca_task



class RunMOSCAView(GenericAPIView):

     def post(self, request, format=None):
        user_id = self.request.user.id
        try:
            url = settings.MOSCA_FLASK_URL+"/mosca/"
            data = dict(request.POST)
            
            # run with celery
            run_mosca_task.delay(url,data)
            
            # register the requested run into the db
            instance = Run()
            instance.save()
            
            return Response({"message": ""}, 200)
        
        except Exception as e:
            return Response({"message": ""}, 500)
        
        

class RunUMAPIView(GenericAPIView):
    
     def post(self, request, format=None):
            return Response({"message": ""}, 500)
        
        
class RunKEGGCharterView(GenericAPIView):
    
     def post(self, request, format=None):
            return Response({"message": ""}, 500)