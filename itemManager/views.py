from django.shortcuts import render
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions.IsAuthenticated
from rest_framework.generics import ListAPIView


# Create your views here.
class ItemsView(ListAPIView):
    authentication_class = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated, )