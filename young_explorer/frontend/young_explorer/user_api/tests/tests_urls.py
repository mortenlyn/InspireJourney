from django.test import SimpleTestCase
from django.urls import resolve, reverse
from user_api.views import UserLogin, UserRegister, UserLogout, UserView


class TestUrls(SimpleTestCase):
    def test_login_url(self):
        url = reverse('login')
        self.assertEqual(resolve(url).func.view_class, UserLogin)

    def test_register_url(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func.view_class, UserRegister)

    def test_logout_url(self):
        url = reverse('logout')
        self.assertEqual(resolve(url).func.view_class, UserLogout)

    def test_user_url(self):
        url = reverse('user')
        self.assertEqual(resolve(url).func.view_class, UserView)
