'''
Dice class
The dice should be instantiated with a number of sides and have
a roll funciton that returns a random int from 1 to sides
'''

import random


class Dice:
    def __init__(self, sides):
        self.sides = sides

    def roll(sides):
        return random.randint(1, sides)
