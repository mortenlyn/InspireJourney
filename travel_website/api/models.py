from django.db import models

# Create your models here.


class Route(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    distance = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name
