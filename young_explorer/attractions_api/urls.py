from django.urls import path
from django.contrib import admin
from . import views

# URL patterns for the API
urlpatterns = [
    path('attractions', views.attraction_view.as_view()),
    path('addAttraction', views.AttractionView.as_view()),
    path('attraction/', views.getSpecificAttraction.as_view()),
    path('labels', views.label_view.as_view()),
    path('addLabel', views.create_label.as_view()),
    path('filter/', views.FilterDestinations.as_view()),
    path('addReview', views.addReview.as_view()),
    path('editReview/<int:pk>/', views.editReview.as_view(), name='editReview'),
    path('reviews', views.review_view.as_view()),
    path('getUserReviews/', views.getUserReviews.as_view()),
    path('getDestinationReviews/', views.getDestinationReviews.as_view()),
    path('modifyVisitor/', views.modifyVisitor.as_view()),
    path('getAttractionsVisitedByUser/',
         views.getAttractionsVisitedByUser.as_view()),
    path('deleteReview/<int:pk>/',
         views.deleteReview.as_view(), name='deleteReview'),
]
