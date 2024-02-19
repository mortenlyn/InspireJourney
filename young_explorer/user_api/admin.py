from django.contrib import admin

# Register your models here.

from .models import WebsiteUser

admin.site.register(WebsiteUser)