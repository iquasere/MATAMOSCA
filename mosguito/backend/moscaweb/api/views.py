from rest_framework.generics import (RetrieveAPIView, GenericAPIView,
                                     ListAPIView)
from rest_framework.mixins import ListModelMixin
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django.db.models import Q
from django.conf import settings
from .tasks import postURL
from ..models import Run



class RunMOSCAView(GenericAPIView):

     def post(self, request, format=None):
        user_id = self.request.user.id
        try:
            url = settings.MOSCA_FLASK_URL+"/mosca/"
            data = dict(request.POST)
            res = postURL(url,data=data)
            instance = Run()
            instance.save()
            return Response(res.json(), 200)
        
        except Exception as e:
            return Response({"message": ""}, 500)
        
        

class RunUMAPIView(GenericAPIView):
    
     def post(self, request, format=None):
            return Response({"message": ""}, 500)
        
        
class RunKEGGCharterView(GenericAPIView):
    
     def post(self, request, format=None):
            return Response({"message": ""}, 500)