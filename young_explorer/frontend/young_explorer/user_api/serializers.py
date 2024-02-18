from django.forms import ValidationError
from rest_framework.serializers import ModelSerializer, EmailField, CharField
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


class LoginSerializer(ModelSerializer):
    """
    Serializer for the login endpoint
    """
    class Meta:
        """
        This meta class is used to specify the model and fields to be used
        """
        model = User
        fields = ["email", "password"]

    email = EmailField()
    password = CharField()

    def check(self, data):
        """
        The check method is used to authenticate the user
        It uses the authenticate method from the django.contrib.auth module which returns the user if the credentials are valid
        """
        user = authenticate(email=data["email"], password=data["password"])
        if user is None:
            raise ValidationError('Invalid email or password')
        return user


class RegisterSerializer(ModelSerializer):
    """
    Serializer for the register endpoint
    """
    class Meta:
        """
        This meta class is used to specify the model and fields to be used
        """
        model = User
        fields = '__all__'

    def create(self, data):
        """
        The create class method is used to create a new user
        """
        email = data.get('email', None)
        password = data.get('password', None)
        user = User.objects.create_user(
            email=email, password=password)
        user.username = data["username"]
        user.save()
        return user


class UserSerializer(ModelSerializer):
    """
    Serializer for the user endpoint
    """
    class Meta:
        """
        This meta class is used to specify the model and fields to be used
        """
        model = User
        fields = ('username', 'email')
