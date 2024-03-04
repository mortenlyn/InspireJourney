from django.shortcuts import render
from .models import Attraction, Label, Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission, status
from .serializers import AttractionSerializer, LabelSerializer, ReviewSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.db.models import F


class label_view(APIView):
    """
    This view allows you see all of the labels
    """
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allLabels = Label.objects.all().values()
        return Response({"Message": "List of Labels", "LabelList": allLabels})


class create_label(APIView):
    """
    This view allows you to create new labels
    """

    permission_classes = [permission.AllowAny]
    serializer_class = LabelSerializer

    def post(self, request):
        serializer_obj = LabelSerializer(data=request.data)
        if (serializer_obj.is_valid()):
            newLabel = Label.objects.create(
                name=serializer_obj.data.get("name")
            )
            newLabel = Label.objects.all().filter(id=newLabel.id).values()
            return Response({"Message": "New Label", "New Label Added": newLabel})
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
        return Response({"Message": "List of Attractions", "AttractionList": allAttractions})


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
        serializer = AttractionSerializer(
            attractions, many=True)  # Serialize attractions
        return Response({"Message": "List of Attractions", "Attraction List": serializer.data})

    def post(self, request):
        serializer = AttractionSerializer(data=request.data)
        if serializer.is_valid():
            attraction = serializer.save()
            attraction_data = serializer.data
            # Retrieve the names of labels associated with the attraction
            # This finds the matching labels passed in
            label_names = [label.name for label in attraction.labels.all()]
            # This updates the matching labels
            attraction_data['labels'] = label_names

            return Response({"Message": "Attraction added successfully", "Attraction": attraction_data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FilterDestinations(APIView):
    """
    This apiView allows you to filter destinations on price and labels. Here you can write 
    /attractions_api/filter?search_name=Chennai&label_names=Europe,Asia&min_price=min&max_price=max. 
    Then you will get all of the destinations with either the Asia or Europe label. 
    You can also choose to sort on max and min price. This is done by specifying the max_price and min_price in
    the url like in the example above. However both labels and min/max_price are optional in the filtering. You can
    choose to not filter on anything and then get all destinations by using: /attractions_api/filter
    """

    permission_classes = [permission.AllowAny]

    def get(self, request):
        filter_query = Q()
        label_names = request.query_params.get('label_names')
        search_name = request.query_params.get('search_name')
        if (label_names):
            label_name_list = label_names.split(',')
            for label_name in label_name_list:
                # This queries the labels and adds all the destination that match |= (meaning all that has either specified label)
                filter_query |= Q(labels__name=label_name)
                if not Label.objects.filter(name=label_name).exists():
                    return Response({"error": f"Label '{label_name}' not found"}, status=status.HTTP_404_NOT_FOUND)

        # Filter attractions by the specified label

        attractions = Attraction.objects.all()
        if (filter_query):
            attractions = attractions.filter(filter_query).distinct()

        # Filter on price if min_price and max_price is provided
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        if (min_price or max_price):
            price_filter = Q()
            if min_price:
                price_filter &= Q(price__gte=min_price)
            if max_price:
                price_filter &= Q(price__lte=max_price)
            attractions = attractions.filter(price_filter)

        #Searching filter on attraction names
        if search_name:
            attractions = attractions.filter(name__icontains=search_name).distinct()


        serializer = AttractionSerializer(attractions, many=True)
        return Response(serializer.data)


class addReview(APIView):
    """
    This api view allows you to add a review to a destination. 
    """
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = [permission.AllowAny]

    def post(self, request, attraction_id):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            new_review = Review.objects.create(
                user=request.user,
                attraction_id=attraction_id,
                review=serializer.data.get("review"),
                rating=serializer.data.get("rating")
            )
            return Response({"Message": "Review added successfully", "Review": new_review.review}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class review_view(APIView):
    """
    This view allows you to see all of the reviews
    """
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allReviews = Review.objects.all().values()
        return Response({"Message": "List of Reviews", "ReviewList": allReviews})

class add_visitor(APIView):
    permission_classes = [permission.AllowAny]

    def post(self, request):
        attraction_name = request.query_params.get('attraction_name')
        if(attraction_name):
            attraction = get_object_or_404(Attraction, name=attraction_name)
            attraction.visited_by.add(request.user)
            return Response({"message": "You have successfully visited this attraction"})

class getUserReviews(APIView):
    """
    This view allows you to get all the reviews of a specified user. Intended to be used to get all the reviews
    of a user on their profile page. It returns a standard review response, but also the name of a attraction and not 
    just the attraction_id (which isn't used in frontend)
    """

    permission_classes = [permission.AllowAny]

    def get(self, request):
        username = request.query_params.get('username')

        if username is not None:
            #UserReviews manually looks up the attraction_name by querying (F) on the destination name and creates a new list containing all the fields in a review and the destination name
            userReviews = user_reviews = Review.objects.filter(user__username=username).annotate(
                attraction_name=F('attraction__name')
            ).values('review_id', 'user_id', 'attraction_id', 'attraction_name', 'review', 'rating', 'date_created')
            return Response({"Message": "List of Reviews", "ReviewList": list(userReviews)})
        else:
            return Response({"Message": "username not provided."}, status=400)