from django.shortcuts import render
from .models import Attraction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission, status
from .serializers import AttractionSerializer


#from django.http import JsonResponse



class attraction_view(APIView):
    """
    1) Gives you an overview of all the attractions in the database

    2) Permission classes regulates who can view the view. In this case anyone can. 
    """
    permission_classes = [permission.AllowAny]
    
    def get(self, request):
        allAttractions = Attraction.objects.all().values()
        return Response({"Message": "List of Attractions", "AttractionList":allAttractions})

class addAttraction(APIView):

    """
    1) This add attraction class let you add a new attraction. 
    2) The serializer included also ensures validation and that you can write directly into fields and not json in the post method
    3) The get method hands you a list of the attractions.
    """
    
    permission_classes = [permission.AllowAny]
    serializer_class = AttractionSerializer
    def get(self, request):
        allAttractions = Attraction.objects.all().values()
        return Response({"Message": "List of Attractions", "Attraction List":allAttractions})
    
    def post(self, request):
        serializer_obj=AttractionSerializer(data=request.data)
        if(serializer_obj.is_valid()):
            newAttraction = Attraction.objects.create(
            name=serializer_obj.data.get("name"),
            description=serializer_obj.data.get("description"),
            price=serializer_obj.data.get("price"),
            rating=serializer_obj.data.get("rating")
            )
            newAttraction = Attraction.objects.all().filter(attraction_id=newAttraction.attraction_id).values()
            return Response({"Message": "New Attraction", "New Attraction Added":newAttraction})
        else:
            errors = serializer_obj.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
