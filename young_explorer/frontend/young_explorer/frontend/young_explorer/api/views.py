from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'id': 1,
            'name': 'Route 1',
            'distance': 100
        },
        {
            'id': 2,
            'name': 'Route 2',
            'distance': 200
        },
        {
            'id': 3,
            'name': 'Route 3',
            'distance': 300
        },
    ]

    return Response(routes)
