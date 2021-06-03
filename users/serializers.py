from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

from .models import CustomUser
User = get_user_model()

# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email', 'first_name',
#             'last_name', 'screen_name', 'party']


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'screen_name',)
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'],     
            password = validated_data['password'],
            screen_name = validated_data['screen_name'],
        )
        return user

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
