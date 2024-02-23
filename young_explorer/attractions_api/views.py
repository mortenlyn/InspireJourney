from django.shortcuts import render
from .models import Attraction, Label
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission, status
from .serializers import AttractionSerializer, LabelSerializer
from django.shortcuts import get_object_or_404

class label_view(APIView):
    """This view allows you see all of the labels"""
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allLabels = Label.objects.all().values()
        return Response({"Message": "List of Labels", "LabelList":allLabels})

class create_label(APIView):
    """This view allows you to ccreate new labels"""
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
    2) The serializer's function is described below
    3) The get method hands you a list of the attractions.
    4) The post method allows you to create new destinations with some preadded labels
    """
    
    permission_classes = [permission.AllowAny]
    serializer_class = AttractionSerializer

    def get(self, request):
        attractions = Attraction.objects.all()  # Retrieve all attractions
        serializer = AttractionSerializer(attractions, many=True)  # Serialize attractions
        return Response({"Message": "List of Attractions", "Attraction List": serializer.data})
    
    
    def post(self, request):
        serializer = AttractionSerializer(data=request.data)
        if serializer.is_valid():
            attraction = serializer.save()
            attraction_data = serializer.data
            # Retrieve the names of labels associated with the attraction
            label_names = [label.name for label in attraction.labels.all()]
            attraction_data['labels'] = label_names

            return Response({"Message": "Attraction added successfully", "Attraction": attraction_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """OLD, but don't remove it in case the new posted form doesn't work
    def post(self, request):
        serializer_obj=AttractionSerializer(data=request.data)
        if(serializer_obj.is_valid()):
            label_names = serializer_obj.data.get('labels', [])
            newAttraction = Attraction.objects.create(
            name=serializer_obj.data.get("name"),
            description=serializer_obj.data.get("description"),
            price=serializer_obj.data.get("price"),
            rating=serializer_obj.data.get("rating"),
            )
            for label_name in label_names:
                label, created = Label.objects.get_or_create(name=label_name)
                newAttraction.labels.add(label)
            return Response({"Message": "New Attraction", "New Attraction Added":newAttraction})
        else:
            errors = serializer_obj.errors
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
    """

class SortByLabels(APIView):
    """
    This apiView allows you to get all attractions described with the label europe. In the start
    it's meant for testing. We won't have a filtering function that only sorts by Europe. 
    """

    permission_classes = [permission.AllowAny]

    def get(self, request, label_name):
        try:
            print(label_name)
            label = get_object_or_404(Label, name=label_name)
        except Label.DoesNotExist:
            return Response({"error": f"Label '{label_name}' not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Filter attractions by the specified label
        attractions = Attraction.objects.filter(labels=label)
        serializer = AttractionSerializer(attractions, many=True)
        return Response(serializer.data)
