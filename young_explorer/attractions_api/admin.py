from django.contrib import admin

# Register your models here.

from .models import Attraction, Label, Review

admin.site.register(Attraction)
admin.site.register(Label)
admin.site.register(Review)
