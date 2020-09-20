from django.shortcuts import render
from universe.character import Character

from .models import Character as Cha_model


def create_character(request):
    '''
    just playing around with character class and json serialization
    '''
    if request.method == 'POST':
        #char = Cha_model(name=request.POST.name, )
        print(request)
        #char.save()
        #return char

    return render(request, 'template.html')


def get_characters(request):
    characters = Character

    return render(request)
