
from rest_framework import serializers
from .models import Attraction


"""
Serializer for creating a new Attraction, ensures that the validation for creating a attraction.

Validation rules
1) A attraction rating must be between 1 and 5
2) The price can't be negative
3) There can't be any attractions with the same name (ensures no name duplicates)
"""

class AttractionSerializer(serializers.Serializer):
    name = serializers.CharField(label="Enter a name")
    description = serializers.CharField(label="Enter a attraction description: ")
    price = serializers.IntegerField(label="Enter a price: ")
    rating = serializers.IntegerField(label="Enter a rating between 1 and 5: ")


    def validate_rating(self, value):
        if((value < 1) or (value > 5)):
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
    
    def validate_price(self, value):
        if((value < 0)):
            raise serializers.ValidationError("The price can't be negative")
        return value
    
    def validate_name(self, value):
        if Attraction.objects.filter(name=value).exists():
            raise serializers.ValidationError("There already exists a destination with that name")
        return value
    
    
    
    