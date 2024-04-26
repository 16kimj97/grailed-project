from .db import db
from app.models import db, Offer, environment, SCHEMA
from sqlalchemy import text

def seed_offers():
    offers = [
        Offer(
            clothing_id=1,
            user_id=2,
            offer_price=55.00,
            shipping_details="Standard shipping",
            status="Pending",
        ),
        Offer(
            clothing_id=2,
            user_id=1,
            offer_price=25.00,
            shipping_details="Express shipping",
            status="Pending",
        ),
        Offer(
            clothing_id=3,
            user_id=1,
            offer_price=15.00,
            shipping_details="Free shipping",
            status="Rejected",
        ),
        Offer(
            clothing_id=4,
            user_id=3,
            offer_price=35.00,
            shipping_details="Standard shipping",
            status="Pending",
        ),
        Offer(
            clothing_id=5,
            user_id=2,
            offer_price=40.00,
            shipping_details="No shipping, pickup only",
            status="Accepted",
        ),
        Offer(
            clothing_id=6,
            user_id=5,
            offer_price=30.00,
            shipping_details="Standard shipping",
            status="Pending",
        ),
        Offer(
            clothing_id=7,
            user_id=2,
            offer_price=45.00,
            shipping_details="Express shipping",
            status="Accepted",
        ),
        Offer(
            clothing_id=8,
            user_id=6,
            offer_price=50.00,
            shipping_details="Free shipping",
            status="Rejected",
        ),
        Offer(
            clothing_id=9,
            user_id=3,
            offer_price=20.00,
            shipping_details="Standard shipping",
            status="Pending",
        ),
        Offer(
            clothing_id=10,
            user_id=1,
            offer_price=60.00,
            shipping_details="No shipping, pickup only",
            status="Accepted",
        )
    ]

    for offer in offers:
        db.session.add(offer)

    db.session.commit()

def undo_offers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM offers"))

    db.session.commit()
