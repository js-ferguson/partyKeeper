'''
Character class aim to provide basics stats and functionality to
player characters. It should offer an easy method of attaching item
objects that update local variable that represent various stats of 
the character.

This class is intended to be subclassed to provide stats and abilities
that define player characters and NPCs
'''


class Character:
    def __init__(self, value1, value2):
        self.value1 = value1
        self.value2 = value2
        self.