from flask.cli import AppGroup
from .users import seed_users, undo_users
from .clothing import seed_clothing, undo_clothing
from .offer import seed_offers, undo_offers
from .review import seed_reviews, undo_reviews

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_offers()
        undo_reviews()
        undo_clothing()
        undo_users()

    seed_users()
    seed_clothing()
    seed_reviews()
    seed_offers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_offers()
    undo_clothing()
    undo_users()
    undo_reviews
    # Add other undo functions here
