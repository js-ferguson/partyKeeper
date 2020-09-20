'''
Character class aim to provide basics stats and functionality to
player characters. It should offer an easy method of attaching item
objects that update local variables which represent various stats of
the character.

This class is intended to be subclassed to provide stats and abilities
that define player characters and NPCs
'''

# from universe.dice import dice as d


class Character:
    '''
    tar0826344 pt a json object describing the basic character attributes

    '''
    def __init__(self, character_attr):
        self.str = character_attr.str
        self.dex = character_attr.dex
        self.int = character_attr.int
        self.char = character_attr.char
        self.wiz = character_attr.wis
        self.health = character_attr.health
        self.armor = character_attr.armor
        self.hit_dice = character_attr.hit_dice
        self.name = character_attr.name
        self.level = character_attr.level
        self.int_mod = self.dex

    def calc_initiative(self, dex):
        return d(20)

    def load_item(self, item):
        '''
        takes a jason object with a key that specifies the type of item

        should make a call either to the db or api to write that item to the
        database item should be created in the DB and attatched to a player
        character. Incidentally an item can also be attached to another item
        if it contains an inventory key
        '''

    def create_slot(self, number_to_add):
        '''
        methods that create slots in the db and attach them
        to character

        should this be a class or a method
        '''

    def attach_to_slot(self, item):
        '''
        this should be a call to the api to attach an item
        to a slot
        '''

    def save():
        pass
