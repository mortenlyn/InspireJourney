from django.urls import path
from . import views

# URL patterns for the API
urlpatterns = [
    path('', test_view())
]
