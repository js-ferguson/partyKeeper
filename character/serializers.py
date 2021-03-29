from rest_framework import serializers

from .models import Character


class CharacterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Character
        fields = ['id', 'name', 'party', 'famous_last_words', 'int', 'dex', 'str', 'ac', 'hp', 'level', 'hit_dice']