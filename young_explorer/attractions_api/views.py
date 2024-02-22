from django.shortcuts import render
from .models import Attraction, Label
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission, status
from .serializers import AttractionSerializer, LabelSerializer


#from django.http import JsonResponse


class label_view(APIView):
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allLabels = Label.objects.all().values()
        return Response({"Message": "List of Labels", "LabelList":allLabels})

class create_label(APIView):
    permission_classes = [permission.AllowAny]
    serializer_class = LabelSerializer

    def post(self, request):
        serializer_obj=LabelSerializer(data=request.data)
        if(serializer_obj.is_valid()):
            newLabel = Label.objects.create(
                name=serializer_obj.data.get("name")
                )
            newLabel = Label.objects.all().filter(id=newLabel.id).values()
            return Response({"Message": "New Label", "New Label Added":newLabel})
        else:
            errors = serializer_obj.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

        

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
        attractions = Attraction.objects.all()  # Retrieve all attractions
        serializer = AttractionSerializer(attractions, many=True)  # Serialize attractions
        return Response({"Message": "List of Attractions", "Attraction List": serializer.data})
    
    def post(self, request):
        serializer_obj=AttractionSerializer(data=request.data)
        label_names = request.data.get('labels', [])
        labels = Label.objects.filter(name__in=label_names)
        if(serializer_obj.is_valid()):
            newAttraction = Attraction.objects.create(
            name=serializer_obj.data.get("name"),
            description=serializer_obj.data.get("description"),
            price=serializer_obj.data.get("price"),
            rating=serializer_obj.data.get("rating"),
            )
            newAttraction.labels.add(*labels)
            newAttraction = Attraction.objects.all().filter(attraction_id=newAttraction.attraction_id).values()
            return Response({"Message": "New Attraction", "New Attraction Added":newAttraction})
        else:
            errors = serializer_obj.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
