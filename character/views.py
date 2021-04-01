from django.shortcuts import render
from rest_framework.views import APIView
# from universe.character import Character
from rest_framework.response import Response
from .models import Character


class CreateCharacter(APIView):
    """
    View to create a new character in the system.

    * Requires user id.
    
    just playing around with character class and json serialization
    """

    def post(self, request, id, format=None):
        """
        receive data and creates a new character
        """
        print(id)
        print(request.data)
        # new_character = Character(name='request.name')
        # usernames = [user.username for user in User.objects.all()]
        # return Response(usernames)

    # if request.method == 'POST':
    #     name = request.POST.get('name')
    #     char_class = request.POST.get('class')
    #     #char = Cha_model(name=request.POST.name, )
    #     print(request)
    #     #char.save()
    #     #return char
    #     content = {'name': name, 'class': char_class}
    # return Response(content)


# def get_characters(request):
#     characters = Character

#     return render(request)