import django_filters
from ..models import MoscaRun


class MoscaRunFilter(django_filters.FilterSet):
    class Meta:
        model = MoscaRun
        fields = ['user__id',]