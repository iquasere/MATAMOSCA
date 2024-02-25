from rest_framework.generics import (GenericAPIView)
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin
from django_filters import rest_framework as filters
from django.db.models import Q
from django.conf import settings
from django.contrib.auth.models import User
from ..models import MoscaRun
from .serializers import MoscaRunSerializer
from .filters import MoscaRunFilter
from ..tasks import run_mosca_task
import json


class RunMOSCAView(GenericAPIView):

    def post(self, request, format=None):
        user_id = self.request.user.id
        try:
            url = settings.MOSCA_FLASK_URL+"/mosca/"
            json_data = request.data
            name = json_data['name']
            description = json_data['description']
            configuration = json_data['configuration']
            
            # run with celery
            async_result = run_mosca_task.delay(url,configuration)
            pool_id = async_result.id
            
            
            # TODO: save the pool_id into the DB
            # register the requested run into the db
            user = User.objects.get(id=user_id)
            instance = MoscaRun(user=user,
                                name=name,
                                description=description,
                                configuration=json.dumps(configuration),
                                task_id = pool_id,
                                )
            instance.save()
        
            return Response({"message": ""}, 200)
        
        except Exception as e:
            return Response({"message": str(e)}, 500)
        

class RunUPIMAPIView(GenericAPIView):
    
    def post(self, request, format=None):
        return Response({"message": ""}, 500)
        
        
class RunKEGGCharterView(GenericAPIView):
    
    def post(self, request, format=None):
        return Response({"message": ""}, 500)
    
    
class UserRunView(ListModelMixin, GenericAPIView):
    serializer_class = MoscaRunSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MoscaRunFilter

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, *kwargs)

    def get_queryset(self):
        queryset = MoscaRun.objects.all()
        try:
            queryset = MoscaRun.objects.filter(Q(user__id=self.request.user.id))
        except:
            queryset = MoscaRun.objects.none()
            
        return queryset
