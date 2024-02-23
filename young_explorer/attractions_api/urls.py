from django.urls import path
from django.contrib import admin


from . import views

# URL patterns for the API
urlpatterns = [
    path('attractions', views.attraction_view.as_view()),
    path('addAttraction', views.addAttraction.as_view()),
    path('labels', views.label_view.as_view()),
    path('addLabel', views.create_label.as_view()),
    path('<str:label_name>/', views.SortByLabels.as_view())
]
