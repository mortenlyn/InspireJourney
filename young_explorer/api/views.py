from . import validation
from . import serializers
from django.shortcuts import render
from django.contrib.auth import login, logout
from rest_framework import permissions as permission, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView


class UserLogin(APIView):
    permission_classes = (permission.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validation.valid_email(data['email'].strip())
        assert validation.valid_password(data['password'].strip())
        serializer = serializers.LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegister(APIView):
    permission_classes = [permission.AllowAny]

    def post(self, request):
        valid_data = validation.user_validation(request.data)
        serializer = serializers.RegisterSerializer(data=valid_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(valid_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permission.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permission.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = serializers.UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
