"""empty message

Revision ID: 13dc1c88cc1a
Revises:
Create Date: 2024-05-05 23:18:54.362043

"""
from alembic import op
import sqlalchemy as sa

# Import environment variables
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.getenv("SCHEMA")

# revision identifiers, used by Alembic.
revision = '13dc1c88cc1a'
down_revision = None
branch_labels = None
depends_on = None

# Helper to prepend schema if needed
def with_schema(table_name):
    return f"{SCHEMA}.{table_name}" if environment == "production" and SCHEMA else table_name

def upgrade():
    # Commands auto-generated by Alembic - please adjust!
    if environment == "production" and SCHEMA:
        op.execute(f"CREATE SCHEMA IF NOT EXISTS {SCHEMA}")

    op.create_table(with_schema('users'),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table(with_schema('clothing'),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('size', sa.String(length=10), nullable=False),
    sa.Column('brand', sa.String(length=50), nullable=False),
    sa.Column('condition', sa.String(length=50), nullable=False),
    sa.Column('images', sa.String(length=255), nullable=True),
    sa.Column('date_listed', sa.DateTime(), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('gender', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], [with_schema('users.id')], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table(with_schema('reviews'),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('reviewer_id', sa.Integer(), nullable=False),
    sa.Column('reviewee_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.Column('date_posted', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['reviewee_id'], [with_schema('users.id')], ),
    sa.ForeignKeyConstraint(['reviewer_id'], [with_schema('users.id')], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table(with_schema('wishlist'),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], [with_schema('users.id')], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table(with_schema('offers'),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('clothing_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('offer_price', sa.Numeric(precision=10, scale=2), nullable=False),
    sa.Column('shipping_details', sa.String(length=255), nullable=True),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['clothing_id'], [with_schema('clothing.id')], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['user_id'], [with_schema('users.id')], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table(with_schema('wishlist_item'),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('wishlist_id', sa.Integer(), nullable=False),
    sa.Column('clothing_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['clothing_id'], [with_schema('clothing.id')], ),
    sa.ForeignKeyConstraint(['wishlist_id'], [with_schema('wishlist.id')], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table(with_schema('wishlist_item'))
    op.drop_table(with_schema('offers'))
    op.drop_table(with_schema('wishlist'))
    op.drop_table(with_schema('reviews'))
    op.drop_table(with_schema('clothing'))
    op.drop_table(with_schema('users'))
    # ### end Alembic commands ###
