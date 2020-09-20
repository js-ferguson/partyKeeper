# Party Keeper

Party keeper is a character / inventory manager for tabletop RPGs like DnD, Pathfinder or Cyberpunk.

It combines party elements such as Item creation and sharing allowing a DM to create items as cards in the application which can be given to players through the course of play and which players themselves can swap with each other as the need arises. 

Item cards are also integrated with the inventory and character sheets in such a way that dropping an item card that represents a piece of armor, clothing, jewelery or weaponry into a slot on your character sheet will augment your characters statistics in the same way you would expect in an ARPG like Diablo or Grim Dawn. 

The application has scope to add session planning features including a calendar feature for a party to coordinte availability to play.

There should be a way to have several characters kept in the application that may potentially belong to different gaming parties. 

## Application design and architecture

The application will be built on either PostgreSLQ or MariaDB. The application front end will be written in Vue.js and will consume an API that is driven by the Django REST Framework and use JWT authentication 

The frontend will also utilise the DND5E API for things like character creation, spells, classes, levels etc

## Character architecture

data from the database will be provived by 

## Setup

Clone the repo

cretate a virtual environment to install deps into and activate it. Then install your deps

```bash
python -m venv venv && source venv/bin/activate

pip install -r requirements.txt

```

You will need MySQL or MariaDB

```bash
sudo apt update
sudo apt install mariadb-server
sudo mysql_secure_installation

```

Connnect to the DB as the root user and create a new database, admin user and a user for partyKeeper

```bash
sudo mysql

> CREATE DATABASE partyKeeper

> GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;

> CREATE USER 'pkUser'@'localhost' IDENTIFIED BY 'somePassword';

> GRANT ALL ON 'partyKeeper'.* TO 'pkUser'@'localhost';

> FLUSH PRIVILEGES;

```

create an env file and move your secret key and database details there

```python
import os

os.environ.setdefault("DB_USER", 'pkUser')

os.environ.setdefault("DB_PASS", 'somePassword')

os.environ.setdefault("DB_ADDRESS", "localhost")

os.environ.setdefault("DB_NAME", "partyKeeper")
```

run your migrations create a superuser

```bash
python manage.py makemigrations && python manage.py migrate
python manage.py createsuperuser
```

create a branch and get to work

```bash
git checkout -b new_branch
```


## Build

There may be several dependencies that need to be installed. For instance you may
need the mysql driver installed and other python packages for to build those drivers.
I will add all that later

For now just have two terminal windows open and in one, from inside the project run

```bash
cd pkFrontend
npm run dev
```

in the other terminal 
```bash
python3 manage.py runserver 5000
```

probably a good idea to create an alias for that:w
