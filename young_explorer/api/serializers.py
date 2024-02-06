from django.forms import ValidationError
from rest_framework.serializers import ModelSerializer, EmailField, CharField
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


class LoginSerializer(ModelSerializer):
    """
    
    """
    class Meta:
        model = User
        fields = ["email", "password"]

    email = EmailField()
    password = CharField()

    def check(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if user is None:
            raise ValidationError('Invalid email or password')
        return user


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        user = User.objects.create_user(
            email=email, password=password)
        user.username = data["username"]
        user.save()
        return user


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')
