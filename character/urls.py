from django.urls import path

from .views import create_character, get_characters

urlpatterns = [
    path('character/create', create_character, name='create_character'),
    path('characters/get', get_characters, name='get_characters'),
]
