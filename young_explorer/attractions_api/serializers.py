
from rest_framework import serializers
from .models import Attraction, Label


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
    labels = serializers.CharField(label = "Enter some labels")


    def validate_rating(self, value):
        if((value < 0) or (value > 5)):
            raise serializers.ValidationError("Rating must be between 0 and 5")
        return value
    
    def validate_price(self, value):
        if((value < 0)):
            raise serializers.ValidationError("The price can't be negative")
        return value
    
    def validate_name(self, value):
        if Attraction.objects.filter(name=value).exists():
            raise serializers.ValidationError("There already exists a destination with that name")
        return value
    
    def create(self, validated_data):
        labels_data = validated_data.pop('labels', [])
        attraction = Attraction.objects.create(**validated_data)
        for label_name in labels_data:
            label, _ = Label.objects.get_or_create(name=label_name)
            attraction.labels.add(label)
        return attraction

class LabelSerializer(serializers.Serializer):
    name = serializers.CharField(label="Enter the label name")

    def validate_name(self, value):
        if Label.objects.filter(name=value).exists():
            raise serializers.ValidationError("There already exists a destination with that name")
        return value

    
    
    