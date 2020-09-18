from django.db import models


class Item(model.models):
    name = models.CharField(max_length=50)


class Slot(models.Model):
    name = models.CharField(max_length=30)
    item = models.OneToOneField(Item, on_delete=models.)


class Inventory(models.Model):
    '''
    Inventory models are attached in a one-to-one relationship
    to an item. A bag of holding for example has a one-to-one
    relationship with an inventory.

    When an item with inventory space is instantiated we
    will subclass the item class with an inventory class to
    add space to it. the inventory subclass will provide
    methods that create this inventory model and attatch it
    to an item in the database.
    '''
    name = models.CharField(max_length=50)
    max_capacity = models.IntegerField(default=2000)
    current_capacity = models.IntegerField(default=0)
    image_icon = models.CharField(max_length=255)


class Character(models.Model):
    name = models.CharField(max_length=50)
    Int
    dex
    str
    ac
    hp
    etc
    inventory = models.OneToOneField(Inventory, on_delete=CASCADE)
    slot = models.OneToOneField(Slot, on_delete=models.CASCADE)  # I dont think I want to cascade

