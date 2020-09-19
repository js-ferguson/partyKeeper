from django.db import models
from itemManager.models import Inventory, Item


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
    int = models.IntegerField()
    dex = models.IntegerField()
    str = models.IntegerField()
    ac = models.IntegerField()
    hp = models.IntegerField()
    inventory = models.OneToOneField(Inventory, on_delete=models.CASCADE)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
