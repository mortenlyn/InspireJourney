from django.urls import path
from django.contrib import admin


from . import views

# URL patterns for the API
urlpatterns = [
    path('attractions', views.attraction_view.as_view()),
    path('addAttraction', views.addAttraction.as_view()),
]
