from django.test import TestCase
from user_api.models import WebsiteUser


class TestWebsiteModel(TestCase):
    def setUp(self):
        self.user = WebsiteUser.objects.create_user(
            email="testuser@example.com", password="password123")

    def test_user_creation(self):
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertTrue(self.user.check_password("password123"))


class TestWebsiteModelSuperuser(TestCase):
    def setUp(self):
        self.superuser = WebsiteUser.objects.create_superuser(
            email="supertestuser@example.com", password="password123")

    def test_superuser_creation(self):
        self.assertEqual(self.superuser.email, "supertestuser@example.com")
        self.assertTrue(self.superuser.check_password("password123"))
        self.assertTrue(self.superuser.is_superuser)


class TestWebsiteModelUserFailures(TestCase):
    def test_user_creation_no_email(self):
        with self.assertRaises(TypeError) as context:
            WebsiteUser.objects.create_user(None, password="password123")

        self.assertTrue('Users need an email' in str(context.exception))

    def test_user_creation_no_password(self):
        with self.assertRaises(TypeError) as context:
            WebsiteUser.objects.create_user(email="testuser@example.com")

        self.assertTrue('Users need a password' in str(context.exception))


class TestWebsiteModelSuperuserFailures(TestCase):
    def test_superuser_creation_no_email(self):
        with self.assertRaises(TypeError) as context:
            WebsiteUser.objects.create_superuser(None, password="password123")

        self.assertTrue('Users need an email' in str(context.exception))

    def test_superuser_creation_no_password(self):
        with self.assertRaises(TypeError) as context:
            WebsiteUser.objects.create_superuser(
                email="supertestuser@example.com")

        self.assertTrue('Users need a password' in str(context.exception))


class TestWebsiteModelStr(TestCase):
    def setUp(self):
        self.user = WebsiteUser.objects.create_user(
            email="testuser@example.com", password="password123")
        self.user.username = "testuser"

    def test_str(self):
        self.assertEqual(str(self.user), "testuser")
