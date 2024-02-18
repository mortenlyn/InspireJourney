from django.test import TestCase

from user_api.validation import user_validation, valid_email, valid_password, valid_username


class TestUserValidation(TestCase):
    def test_user_validation(self):
        self.data = {
            "email": "testuser@example.com", "username": "testuser", "password": "password123"}
        validator = user_validation(self.data)

        self.assertEqual(validator, self.data)

    def test_user_validation_invalid_email(self):
        self.data = {
            "email": "", "username": "testuser", "password": "password123"}
        with self.assertRaisesMessage(Exception, 'Invalid email.'):
            user_validation(self.data)

    def test_user_validation_invalid_password(self):
        self.data = {
            "email": "testuser@example.com", "username": "testuser", "password": "short"}
        with self.assertRaisesMessage(Exception, 'Invalid password. Password must be at least 8 characters long.'):
            user_validation(self.data)

    def test_user_validation_invalid_username(self):
        self.data = {
            "email": "testuser@example.com", "username": "", "password": "password123"}
        with self.assertRaisesMessage(Exception, 'Invalid username.'):
            user_validation(self.data)


class TestEmailValidation(TestCase):
    def test_valid_email(self):
        self.email = "testuser@example.com"
        validator = valid_email(self.email)

        self.assertEqual(validator, self.email)

    def test_invalid_email(self):
        self.email = ""
        with self.assertRaisesMessage(Exception, 'Invalid email.'):
            valid_email(self.email)


class TestPasswordValidation(TestCase):
    def test_valid_password(self):
        self.password = "password123"
        validator = valid_password(self.password)

        self.assertEqual(validator, self.password)

    def test_invalid_password(self):
        self.password = "short"
        with self.assertRaisesMessage(Exception, 'Invalid password. Password must be at least 8 characters long.'):
            valid_password(self.password)


class TestUsernameValidation(TestCase):
    def test_valid_username(self):
        self.username = "testuser"
        validator = valid_username(self.username)

        self.assertEqual(validator, self.username)

    def test_invalid_username(self):
        self.username = ""
        with self.assertRaisesMessage(Exception, 'Invalid username.'):
            valid_username(self.username)
