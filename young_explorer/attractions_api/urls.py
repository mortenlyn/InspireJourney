from django.urls import path
from django.contrib import admin


from . import views

# URL patterns for the API
urlpatterns = [
    path('admin', admin.site.urls),
    path('attractions', views.attraction_view.as_view()),
    path('addAttraction', views.addAttraction.as_view()),
]
