from django.test import TestCase
from user_api.models import WebsiteUser
from attractions_api.models import Attraction, Label, Review


class AttractionModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Attraction.objects.create(
            name='Test Attraction',
            description='Test description',
            price=10,
            rating=4,
        )

    def test_name(self):
        attraction = Attraction.objects.get(attraction_id=1)
        self.assertEqual(attraction.name, 'Test Attraction')

    def test_description(self):
        attraction = Attraction.objects.get(attraction_id=1)
        self.assertEqual(attraction.description, 'Test description')

    def test_price(self):
        attraction = Attraction.objects.get(attraction_id=1)
        self.assertEqual(attraction.price, 10)

    def test_rating(self):
        attraction = Attraction.objects.get(attraction_id=1)
        self.assertEqual(attraction.rating, 4)

    def test_labels(self):
        attraction = Attraction.objects.get(attraction_id=1)
        self.assertEqual(attraction.labels.count(), 0)
        label1 = Label.objects.create(name='Label 1')
        label2 = Label.objects.create(name='Label 2')
        attraction.labels.add(label1, label2)
        self.assertEqual(attraction.labels.count(), 2)


class LabelModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Label.objects.create(name='Test Label')

    def test_label_name(self):
        label = Label.objects.get(id=3)
        self.assertEqual(label.name, 'Test Label')


class ReviewModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = WebsiteUser.objects.create(username='test_user')
        attraction = Attraction.objects.create(
            name='Test Attraction',
            description='Test description',
            price=10,
            rating=4,
        )
        Review.objects.create(
            user=user,
            attraction=attraction,
            review='Test review',
            rating=4,
        )

    def test_user_review_count(self):
        user = WebsiteUser.objects.get(username='test_user')
        self.assertEqual(user.user_reviews.count(), 1)

    def test_attraction_review_count(self):
        attraction = Attraction.objects.get(name='Test Attraction')
        self.assertEqual(attraction.attraction_reviews.count(), 1)
