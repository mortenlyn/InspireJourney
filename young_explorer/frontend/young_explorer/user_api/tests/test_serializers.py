from django.test import TestCase
from user_api.serializers import LoginSerializer, RegisterSerializer, UserSerializer
from user_api.models import WebsiteUser


class TestLoginSerializer(TestCase):
    def setUp(self):
        self.credentials = {"email": "testuser@example.com",
                            "password": "password123"}
        WebsiteUser.objects.create_user(**self.credentials)

    def test_login_serializer(self):
        data = self.credentials

        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, data)
        self.assertEqual(serializer.check(data), WebsiteUser.objects.get())
        self.assertEqual(serializer.errors, {})

    def test_login_serializer_invalid_email(self):
        data = {"email": "invalid_email", "password": "password123"}

        serializer = LoginSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors, {
                         "email": ["Enter a valid email address."]})
        with self.assertRaisesMessage(Exception, 'Invalid email or password'):
            serializer.check(data)


class TestRegisterSerializer(TestCase):
    def setUp(self):
        self.credentials = {"email": "testuser@example.com", "username": "testuser",
                            "password": "password123"}

    def test_register_serializer(self):
        serializer = RegisterSerializer(data=self.credentials)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, self.credentials)
        self.assertEqual(serializer.create(self.credentials),
                         WebsiteUser.objects.get())
        self.assertEqual(serializer.errors, {})

    def test_register_serializer_invalid_username(self):
        data = {"email": "invalid_email", "username": None,
                "password": "password123"}

        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())

    def test_register_serializer_invalid_email(self):
        data = {"email": "invalid_email", "username": "testuser",
                "password": "short"}

        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
