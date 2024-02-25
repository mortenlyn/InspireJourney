from django.shortcuts import render
from .models import Attraction, Label
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission, status
from .serializers import AttractionSerializer, LabelSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q

class label_view(APIView):
    """
    This view allows you see all of the labels
    """
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allLabels = Label.objects.all().values()
        return Response({"Message": "List of Labels", "LabelList":allLabels})

class create_label(APIView):
    """
    This view allows you to create new labels
    """


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

    3) This is the view called on the homepage, but it doesn't include labels yet
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
            label_names = [label.name for label in attraction.labels.all()] #This finds the matching labels passed in
            attraction_data['labels'] = label_names #This updates the matching labels

            return Response({"Message": "Attraction added successfully", "Attraction": attraction_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SortByLabels(APIView):
    """
    This apiView allows you to get all attractions described with the endpoint /attractions_api/{labelname_1, labelname_2, ...,
    labelname_n}. Here you can write /attractions_api/Europe, Asia. Then you will get all of the destinations with either the
    Asia or Europe label.
    """

    permission_classes = [permission.AllowAny]

    def get(self, request, label_names):
        filter_query = Q()
        label_name_list = label_names.split(',')
        for label_name in label_name_list:
                filter_query |= Q(labels__name=label_name) #This queries the labels and adds all the destination that match |= (meaning all that has either specified label)
                if not Label.objects.filter(name=label_name).exists():
                    return Response({"error": f"Label '{label_name}' not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Filter attractions by the specified label
        attractions = Attraction.objects.filter(filter_query).distinct()
        serializer = AttractionSerializer(attractions, many=True)
        return Response(serializer.data)