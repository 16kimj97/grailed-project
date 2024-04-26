from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Clothing(db.Model):

    __tablename__ = "clothing"

    if environment == "production":
       __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    size = db.Column(db.String(10), nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    images = db.Column(db.String(255), nullable=True)
    date_listed = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False)
    offers = db.relationship('Offer', backref='clothing', lazy=True)
    reviews = db.relationship('Review', backref='clothing', lazy=True)
    wishlist_items = db.relationship('WishlistItem', backref='clothing', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'price': str(self.price),
            'size': self.size,
            'brand': self.brand,
            'condition': self.condition,
            'images': self.images,
            'date_listed': self.date_listed.isoformat(),
            'status': self.status
        }
