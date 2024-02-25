from rest_framework import serializers
from ..models import MoscaRun

class MoscaRunSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = MoscaRun
        fields = ['id', 'submition_date', 'configuration','conclusion_date',
                  'location','description','name']