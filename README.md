# Party Keeper

Party keeper is a character / inventory manager for tabletop RPGs like DnD, Pathfinder or Cyberpunk.

It combines party elements such as Item creation and sharing allowing a DM to create items as cards in the application which can be given to players through the course of play and which players themselves can swap with each other as the need arises. 

Item cards are also integrated with the inventory and character sheets in such a way that dropping an item card that represents a piece of armor, clothing, jewelery or weaponry into a slot on your character sheet will augment your characters statistics in the same way you would expect in an ARPG like Diablo or Grim Dawn. 

The application has scope to add session planning features including a calendar feature for a party to coordinte availability to play.

There should be a way to have several characters kept in the application that may potentially belong to different gaming parties. 

## Application design and architecture

The application will be built on either PostgreSLQ or MariaDB. The application front end will be written in Vue.js and will consume an API that is driven by the Django REST Framework and use JWT authentication 

The frontend will also utilise the DND5E API for things like character creation, spells, classes, levels etc
