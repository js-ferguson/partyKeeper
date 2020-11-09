from django.urls import path

from .views import create_character, get_characters, get_auth_user

urlpatterns = [
    path('api/character/create/', create_character, name='create_character'),
    path('characters/get', get_characters, name='get_characters'),
    path('api/getAuthUser/', get_auth_user, name='get_auth_user'),
]
