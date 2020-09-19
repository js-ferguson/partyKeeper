from django.db import models


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


class Item(models.Model):
    name = models.CharField(max_length=50)
    descr = models.CharField(max_length=1000)
    image_icon = models.CharField(max_length=255)
    inventory = models.OneToOneField(Inventory, on_delete=models.CASCADE)
