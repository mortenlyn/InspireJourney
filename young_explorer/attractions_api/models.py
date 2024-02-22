from django.db import models

# Create your models here.


class Label(models.Model):
    """
    This defines the label used in the attraction model
    """
    name = models.CharField(max_length=50)
    id = models.AutoField(primary_key=True)


class Attraction(models.Model):
    """
    This is the model for a attraction. The validation of the model is done in the serializers.py - AttractionSerializer
    """
    attraction_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField()
    rating = models.IntegerField()
    date_created = models.DateField(auto_now_add=True)
    labels = models.ManyToManyField(Label)

    REQUIRED_FIELDS = [name, description]