
from rest_framework import serializers
from .models import Attraction, Label, Review


"""
Serializer for creating a new Attraction, ensures that the validation for creating a attraction.

Validation rules
1) A attraction rating must be between 1 and 5
2) The price can't be negative
3) There can't be any attractions with the same name (ensures no name duplicates)
"""


class AttractionSerializer(serializers.ModelSerializer):

    """
    This serializer validates the different fields for an attraction, but also creates a new attraction
    and then updates it with the selected labels.
    """

    labels = serializers.ListSerializer(
        child=serializers.CharField(), required=False)
    attraction_reviews = serializers.StringRelatedField(
        many=True, read_only=True)
    visited_by = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Attraction
        fields = ['name', 'description', 'price', 'rating', 'labels',
                  'food_description', 'housing_description', 'activity_description', 'attraction_reviews', 'visited_by']

    def validate_rating(self, value):
        if ((value < 0) or (value > 5)):
            raise serializers.ValidationError("Rating must be between 0 and 5")
        return value

    def validate_price(self, value):
        if ((value < 0)):
            raise serializers.ValidationError("The price can't be negative")
        return value

    def validate_name(self, value):
        if Attraction.objects.filter(name=value).exists():
            raise serializers.ValidationError(
                "There already exists a destination with that name")
        return value

    def create(self, validated_data):  # This allows for creation of attractions
        label_names = validated_data.pop('labels', [])
        attraction = Attraction.objects.create(**validated_data)
        for name in label_names:
            label, created = Label.objects.get_or_create(name=name)
            attraction.labels.add(label)
        return attraction

    # This makes it possible to view the labels in the addAttractions-view
    def to_representation(self, instance):

        # This creates a base instance of the attraction
        representation = super().to_representation(instance)
        # This iterates through labels add adds them to the view
        representation['labels'] = [
            label.name for label in instance.labels.all()]
        return representation


class LabelSerializer(serializers.Serializer):
    """
    This labelserializer makes sure you can't add any labels with the same name
    """
    name = serializers.CharField(label="Enter the label name")

    def validate_name(self, value):
        if Label.objects.filter(name=value).exists():
            raise serializers.ValidationError(
                "There already exists a destination with that name")
        return value


class ReviewSerializer(serializers.Serializer):
    """
    This serializer makes sure that the review and rating is valid and that the rating is between 0 and 5
    """
    class Meta:
        model = Review
        fields = ['attraction', 'user',
                  'review', 'rating', 'date_created']
    review = serializers.CharField()
    rating = serializers.IntegerField()

    def validate_rating(self, value):
        if ((value < 0) or (value > 5)):
            raise serializers.ValidationError("Rating must be between 0 and 5")
        return value

    def validate_user(self, current_user, current_attraction):
        if Review.objects.filter(user=current_user, attraction=current_attraction).exists():
            raise serializers.ValidationError(
                "You have already reviewed this destination")
        return current_user
