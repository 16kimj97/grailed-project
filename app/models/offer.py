from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm import relationship


class Offer(db.Model):
    __tablename__ = "offers"

    if environment == "production":
       __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    clothing_id = db.Column(db.Integer, db.ForeignKey('clothing.id', ondelete='SET NULL'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    offer_price = db.Column(db.Numeric(10, 2), nullable=False)
    shipping_details = db.Column(db.String(255))
    status = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'clothing_id': self.clothing_id,
            'user_id': self.user_id,
            'offer_price': str(self.offer_price),
            'shipping_details': self.shipping_details,
            'status': self.status,
        }
