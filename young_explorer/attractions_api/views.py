from django.shortcuts import render
from user_api.models import WebsiteUser
from .models import Attraction, Label, Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions as permission, status
from .serializers import AttractionSerializer, LabelSerializer, ReviewSerializer, UpdateAttractionSerializer
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
    This view is used in the frontend to get all of the different attractions
    """
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allAttractions = Attraction.objects.all().values()
        return Response({"Message": "List of Attractions", "AttractionList": allAttractions})


class AttractionView(APIView):

    """
    1) This view is used for adding, getting and editing attractions
    2) The serializer's function is described below
    3) The get method hands you a list of the attractions.
    4) The post method allows you to create new destinations with some preadded labels, and uses the AttractionSerializer
    5) The put method lets you update a specified attraction, and it uses the UpdateAttractionSerializer
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

    def put(self, request):
        """
        This view allows for updating
        """
        attraction_name = request.data.get('name')
        if not attraction_name:
            return Response({"error": "Attraction name is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            attraction = Attraction.objects.get(name=attraction_name)
        except Attraction.DoesNotExist:
            return Response({"error": "Attraction not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateAttractionSerializer(
            attraction, data=request.data, partial=True)
        if (serializer.is_valid()):
            attraction = serializer.save()
            attraction_data = serializer.data
            label_names = [label.name for label in attraction.labels.all()]
            attraction_data['labels'] = label_names
            return Response({"Message": "Attraction changed successfully", "Attraction": attraction_data}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getSpecificAttraction(APIView):
    permission_classes = [permission.AllowAny]

    def get(self, request):
        attraction_name = request.query_params.get('attraction_name')
        specificAttraction = Attraction.objects.get(
            name__iexact=attraction_name)
        attraction_data = AttractionSerializer(
            specificAttraction, many=False).data
        return Response({"Message": "Attraction found", "Attraction": attraction_data})


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
        username = request.query_params.get('username')
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

        # Searching filter on attraction names
        if search_name:
            attractions = attractions.filter(
                name__icontains=search_name).distinct()

        # Filters out the attractions that the user has visited
        if username:
            attractions = attractions.exclude(visited_by__username=username)

        serializer = AttractionSerializer(attractions, many=True)
        return Response(serializer.data)


class addReview(APIView):
    """
    This api view allows you to add a review to a destination.
    """
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = [permission.AllowAny]

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            user = WebsiteUser.objects.get(
                email=request.data.get("user")["email"])
            attraction = Attraction.objects.get(
                name=request.data.get("attraction"))

            if (not serializer.validate_user(user, attraction)):
                return Response({"Message": "You have already reviewed this attraction"}, status=status.HTTP_409_CONFLICT)

            new_review = Review.objects.create(
                user=user,
                attraction=attraction,
                review=serializer.data.get("review"),
                rating=serializer.data.get("rating")
            )
            return Response({"Message": "Review added successfully", "Review": new_review.review}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class editReview(APIView):
    """
    This view allows you to edit a review
    """
    permission_classes = [permission.AllowAny]

    def put(self, request, pk):
        # This gets the review with the specified pk
        review = get_object_or_404(Review, pk=pk)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class deleteReview(APIView):
    """
    This view allows you to delete a review
    """

    permission_classes = [permission.AllowAny]

    def delete(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        review.delete()
        return Response({"Message": "Review deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class review_view(APIView):
    """
    This view allows you to see all of the reviews
    """
    permission_classes = [permission.AllowAny]

    def get(self, request):
        allReviews = Review.objects.all().values()
        return Response({"Message": "List of Reviews", "ReviewList": allReviews})


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
            # UserReviews manually looks up the attraction_name by querying (F) on the destination name and creates a new list containing all the fields in a review and the destination name
            userReviews = Review.objects.filter(user__username=username).annotate(
                attraction_name=F('attraction__name')
            ).values('review_id', 'user_id', 'attraction_id', 'attraction_name', 'review', 'rating', 'date_created')
            return Response({"Message": "List of Reviews", "ReviewList": list(userReviews)})
        else:
            return Response({"Message": "username not provided."}, status=400)


class getDestinationReviews(APIView):
    """
    This view allows you to get all the reviews of a specified destination. Intended to be used to get all the reviews
    of a destination on the destination page. It returns a standard review response, but also the name of a destination and not
    just the destination_id (which isn't used in frontend)
    """

    permission_classes = [permission.AllowAny]

    def get(self, request):
        destination = request.query_params.get('destination')

        if destination is not None:
            attractionReviews = Review.objects.filter(attraction__name=destination).annotate(
                user_name=F('user__username')
            ).values('review_id', 'user_id', 'attraction_id', 'user_name', 'review', 'rating', 'date_created')
            return Response({"Message": "List of Reviews", "ReviewList": list(attractionReviews)})
        else:
            return Response({"Message": "destination not provided."}, status=400)


class modifyVisitor(APIView):

    """
    This view allows you to add or remove visitors to specified Attractions by using the
    username of the user and the attraction name
    An example is: http://127.0.0.1:8000/attractions_api/modifyVisitor/?username=test1234&attraction_name=Tokyo
    and then press post button (if done in backend endpoint)
    """
    permission_classes = [permission.AllowAny]

    def post(self, request):
        attraction_name = request.query_params.get('attraction_name')
        username = request.query_params.get('username')
        if not attraction_name or not username:
            return Response({"error": "Attraction name and username are required."}, status=status.HTTP_400_BAD_REQUEST)

        attraction = Attraction.objects.get(name=attraction_name)
        user = WebsiteUser.objects.get(username=username)

        if attraction.visited_by.filter(username=user.username).exists():
            attraction.visited_by.remove(user)
            return Response({"message": "User is no longer a visitor of this destination"}, status=status.HTTP_200_OK)
        else:
            attraction.visited_by.add(user)
            serializer = AttractionSerializer(attraction)
            return Response(serializer.data, status=status.HTTP_200_OK)


class getAttractionsVisitedByUser(APIView):

    """
    This view gets all the attractions a user has visited.
    An example of a call is: http://127.0.0.1:8000/attractions_api/getAttractionsVisitedByUser/?username=test12345
    """
    permission_classes = [permission.AllowAny]

    def get(self, request):
        username = request.query_params.get('username')
        if not username:
            return Response({"error": "Username are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = WebsiteUser.objects.get(username=username)
        visited_attractions = Attraction.objects.filter(visited_by=user)
        serializer = AttractionSerializer(visited_attractions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
