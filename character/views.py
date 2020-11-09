from django.shortcuts import render
from universe.character import Character
from rest_framework.response import Response
from .models import Character as Cha_model


def create_character(request):
    '''
    just playing around with character class and json serialization
    '''
    if request.method == 'POST':
        name = request.POST.get('name')
        char_class = request.POST.get('class')
        #char = Cha_model(name=request.POST.name, )
        print(request)
        #char.save()
        #return char
        content = {'name': name, 'class': char_class}
    return Response(content)


def get_characters(request):
    characters = Character

    return render(request)


def get_auth_user(request):
    '''
    returns the current authenticated user.
    This needs to be moved after user reg and auth is set up
    '''
    if request.method == 'GET':
        content = {'name': 'jimi'}
    return Response(content)