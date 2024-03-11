from django.db import models
from user_api.models import WebsiteUser

# Create your models here.


class Label(models.Model):
    """
    This defines the label used in the attraction model
    """
    name = models.CharField(max_length=50)
    id = models.AutoField(primary_key=True)

    def __str__(self) -> str:
        return self.name


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
    food_description = models.TextField(default="")
    housing_description = models.TextField(default="")
    activity_description = models.TextField(default="")
    visited_by = models.ManyToManyField(WebsiteUser, related_name='visited_attractions') #Here the username of users are added

    REQUIRED_FIELDS = [name, description]


class Review(models.Model):
    """
    This is the model for a review. The validation of the model is done in the serializers.py - ReviewSerializer
    """
    review_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        WebsiteUser, on_delete=models.CASCADE, related_name='user_reviews')
    attraction = models.ForeignKey(
        Attraction, on_delete=models.CASCADE, related_name='attraction_reviews')
    review = models.TextField()
    rating = models.IntegerField()
    date_created = models.DateField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.user}: {self.rating} - {self.review}'
