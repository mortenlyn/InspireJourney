from django.shortcuts import render
from .models import WebsiteAttraction
from rest_framework import generics
from .serializers import AttractionSerializer

class AttractionsView(generics.CreateAPIView):
    queryset = WebsiteAttraction.objects.all()
