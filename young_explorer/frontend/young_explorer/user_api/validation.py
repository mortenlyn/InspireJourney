from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model


UserModel = get_user_model()


def user_validation(data):
    """
    Custom validation for user registration
    """

    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email:
        raise ValidationError('Invalid email.')

    if not password or len(password) < 8:
        raise ValidationError(
            'Invalid password. Password must be at least 8 characters long.')

    if not username:
        raise ValidationError('Invalid username.')
    return data


def valid_password(password):
    """
    Custom validation for user password
    """

    if not password or len(password) < 8:
        raise ValidationError(
            'Invalid password. Password must be at least 8 characters long.')
    return password


def valid_email(email):
    """
    Custom validation for user email
    """

    if not email:
        raise ValidationError('Invalid email.')
    return email


def valid_username(username):
    """
    Custom validation for user username
    """

    if not username:
        raise ValidationError('Invalid username.')
    return username
