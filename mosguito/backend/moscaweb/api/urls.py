from django.urls import path, include

from .views import RunMOSCAView,RunUMAPIView,RunKEGGCharterView

urlpatterns = [
    path("mosca/", RunMOSCAView.as_view()),
    path("umapi/", RunUMAPIView.as_view()),
    path("keggcharter/", RunKEGGCharterView.as_view()),
]