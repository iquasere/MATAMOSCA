from django.urls import path, include

from .views import RunMOSCAView,RunUPIMAPIView,RunKEGGCharterView,UserRunView

urlpatterns = [
    path("mosca/", RunMOSCAView.as_view()),
    path("upimapi/", RunUPIMAPIView.as_view()),
    path("keggcharter/", RunKEGGCharterView.as_view()),
    path("urun/",UserRunView.as_view()),
]