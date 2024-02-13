from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Attraction(models.Model):
    attraction_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField()
    rating = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    date_created = models.DateField(auto_now_add=True)

    REQUIRED_FIELDS = [name, description]

