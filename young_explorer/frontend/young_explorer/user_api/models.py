from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class WebsiteUserManager(BaseUserManager):
    """
    User manager for the custom user model
    """

    def create_user(self, email, password=None):
        """
        Create and save a user with the given email and password
        """
        if email is None:
            raise TypeError('Users need an email')
        if password is None:
            raise TypeError('Users need a password')

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        """
        Create and save a superuser with the given email and password
        """
        if email is None:
            raise TypeError('Users need an email')
        if password is None:
            raise TypeError('Users need a password')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user


class WebsiteUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model for the website

    Fields:
    user_id -- the unique identifier for the user which auto-increments with each new user
    username -- the user's username with max length of 50 characters
    email -- the user's email with max length of 50 characters and must be unique

    Constants:
    USERNAME_FIELD -- the field name on the user model that is used as the username.
                      Hereit is the email field
    REQUIRED_FIELDS -- a list of the field names that are required when creating a user.
                       Here it is the username field
    """

    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = WebsiteUserManager()

    def __str__(self):
        """
        Return a string representation of the user, their username
        """
        return self.username
