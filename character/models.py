from django.core import serializers
from django.db import models
from itemManager.models import Inventory, Item
from party.models import Party
from django.contrib.auth import get_user_model

User = get_user_model()

class Slot(models.Model):
    '''
    Slots are attached to characters to allow for items
    to be attached to those characters
    '''
    name = models.CharField(max_length=30)
    item = models.OneToOneField(Item, on_delete=models.CASCADE)
    spell = models.BooleanField(default=False)


class Character(models.Model):
    name = models.CharField(max_length=50)
    party = models.ForeignKey(Party, on_delete=models.DO_NOTHING, null=True)
    famous_last_words = models.CharField(max_length=125, blank=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    int = models.IntegerField()
    dex = models.IntegerField()
    str = models.IntegerField()
    ac = models.IntegerField()
    hp = models.IntegerField()
    level = models.IntegerField(default=1)
    hit_dice = models.IntegerField(default=0)
    inventory = models.OneToOneField(Inventory, on_delete=models.CASCADE)
    slots = models.ForeignKey(Slot, on_delete=models.CASCADE)

    def __string__(self):
        return self.name

    @property
    def get_json_ability_scores(self):
        character = {
            'name': self.name,
            'dex': self.dex,
            'str': self.str,
            'ac': self.ac,
            'hp': self.hp,
        }

        return serializers.serialize('json', character)
