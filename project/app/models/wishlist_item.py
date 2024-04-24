from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class WishlistItem(db.Model):

    __tablename__ = 'wishlist_item'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    wishlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wishlist.id')), nullable=False)
    clothing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('clothing.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'wishlist_id': self.wishlist_id,
            'clothing_id': self.clothing_id,
            'date_added': self.date_added.isoformat()
        }
