from django.db import models

# Create your models here.


"""
This is the model for a attraction. The validation of the model is done in the serializers.py - AttractionSerializer
"""

class Attraction(models.Model):
    attraction_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField()
    rating = models.IntegerField()
    date_created = models.DateField(auto_now_add=True)

    REQUIRED_FIELDS = [name, description]

