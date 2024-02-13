from django.urls import path
from . import views

# URL patterns for the API
urlpatterns = [
    path('attraction/', views.attraction_view, name='attractions')
]
