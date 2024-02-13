from django.shortcuts import render
from .models import WebsiteAttraction
#from rest_framework import generics

#class AttractionsView(generics.CreateAPIView):
    #queryset = WebsiteAttraction.objects.all()

from django.http import JsonResponse

def attraction_view(request):
    attractions = WebsiteAttraction.objects.all()
    attraction_data = []
    # Create dummy data if no attractions exist
    if WebsiteAttraction.objects.count() == 0:
        WebsiteAttraction.objects.create(
            name='Example Attraction 1',
            description='This is a description for attraction 1.',
            price=50,
            rating=4,
        )
        
        WebsiteAttraction.objects.create(
            name='Example Attraction 2',
            description='This is a description for attraction 2.',
            price=70,
            rating=5,
        )

    # Fetch all attractions
    attractions = WebsiteAttraction.objects.all()
    for attraction in attractions:
        attraction_data.append({
            'name': attraction.name,
            'description': attraction.description,
            'price': attraction.price,
            'rating': attraction.rating,
            'date_created': attraction.date_created.strftime('%Y-%m-%d')
        })
    return JsonResponse(attraction_data, safe=False)