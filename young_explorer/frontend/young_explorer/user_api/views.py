from . import validation
from . import serializers
from django.shortcuts import render
from django.contrib.auth import login, logout
from rest_framework import permissions as permission, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView


class UserLogin(APIView):
    """
    The UserLogin class is used to handle the login endpoint
    permission_classes is used to specify the permissions required to access the endpoint - in this case, everyone is allowed
    authentication_classes is used to specify the authentication classes to be used - in this case, the session authentication
    """
    permission_classes = (permission.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        """
        This method is used to handle the POST request to the login endpoint
        It checks if the email and password are valid and then logs the user in
        """
        data = request.data
        assert validation.valid_email(data['email'].strip())
        assert validation.valid_password(data['password'].strip())
        serializer = serializers.LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegister(APIView):
    """
    The UserRegister class is used to handle the register endpoint
    permission_classes is used to specify the permissions required to access the endpoint - in this case, everyone is allowed
    """
    permission_classes = [permission.AllowAny]

    def post(self, request):
        """
        This method is used to handle the POST request to the register endpoint
        It checks if the data is valid and then creates a new user
        """
        valid_data = validation.user_validation(request.data)
        serializer = serializers.RegisterSerializer(data=valid_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(valid_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    """
    The UserLogout class is used to handle the logout endpoint
    permission_classes is used to specify the permissions required to access the endpoint - in this case, everyone is allowed
    authentication_classes is used to specify the authentication classes to be used - in this case, no authentication
    """
    permission_classes = (permission.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        """
        This method is used to handle the POST request to the logout endpoint
        """
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    """
    The UserView class is used to handle the user endpoint
    permission_classes is used to specify the permissions required to access the endpoint - in this case, only authenticated users are allowed
    authentication_classes is used to specify the authentication classes to be used - in this case, the session authentication
    """
    permission_classes = (permission.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        """
        This method is used to handle the GET request to the user endpoint
        """
        serializer = serializers.UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
