from django.shortcuts import render
from .models import Attraction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission


#from django.http import JsonResponse

class attraction_view(APIView):
    permission_classes = [permission.AllowAny]
    
    def get(self, request):
        allAttractions = Attraction.objects.all().values()
        return Response({"Message": "List of Attractions", "Attraction List":allAttractions})

class addAttraction(APIView):
    permission_classes = [permission.AllowAny]
    def get(self, request):
        allAttractions = Attraction.objects.all().values()
        return Response({"Message": "List of Attractions", "Attraction List":allAttractions})
    
    def post(self, request):
        newAttraction = Attraction.objects.create(
            name=request.data["name"],
            description=request.data["description"],
            price=request.data["price"],
            rating=request.data["rating"]
            )
        
        newAttraction = Attraction.objects.all().filter(attraction_id=newAttraction.attraction_id).values()
        return Response({"Message": "New Attraction", "New Attraction Added":newAttraction})
