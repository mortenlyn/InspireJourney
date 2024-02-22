from django.test import TestCase, Client
from django.urls import reverse
from user_api.models import WebsiteUser
from user_api.models import WebsiteUser


class TestRegister(TestCase):
    def setUp(self):
        self.client = Client()
        self.credentials = {
            "email": "testuser@example.com", "username": "testuser", "password": "password123"}
        self.invalid_credentials = {
            "email": "invalid_email", "username": "testuser", "password": "password123"}

    def test_register_post(self):
        response = self.client.post(reverse("register"), data=self.credentials)
        self.assertEqual(response.status_code, 201)

    # def test_register_failed(self):
    #     response = self.client.post(
    #         reverse("register"), data=self.invalid_credentials)
    #     self.assertEqual(response.status_code, 400)


class TestLogin(TestCase):
    def setUp(self):
        self.client = Client()
        self.credentials = {"email": "testuser@example.com",
                            "password": "password123"}
        WebsiteUser.objects.create_user(**self.credentials)

    def test_login_post(self):
        response = self.client.post(
            reverse("login"), data=self.credentials)
        self.assertEqual(response.status_code, 200)


class TestUser(TestCase):
    def setUp(self):
        self.client = Client()
        self.credentials = {"email": "testuser@example.com",
                            "password": "password123"}
        WebsiteUser.objects.create_user(**self.credentials)
        self.client.login(**self.credentials)

    def test_user_get(self):
        response = self.client.get(
            reverse("user"), {"email": "testuser@example.com", "username": "testuser"})
        self.assertEqual(response.status_code, 200)


class TestLogout(TestCase):
    def setUp(self):
        self.client = Client()
        self.credentials = {"email": "testuser@example.com",
                            "password": "password123"}
        WebsiteUser.objects.create_user(**self.credentials)
        self.client.login(**self.credentials)

    def test_logout_post(self):
        response = self.client.post(reverse("logout"))
        self.assertEqual(response.status_code, 200)
