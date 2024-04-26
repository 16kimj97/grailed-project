from app.models import db, Review, environment, SCHEMA
from datetime import datetime
from sqlalchemy import text


def seed_reviews():
    reviews = [
        Review(
            reviewer_id=1,
            reviewee_id=2,
            clothing_id=1,
            rating=5,
            comment="Excellent quality and fast shipping!",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=2,
            reviewee_id=3,
            clothing_id=2,
            rating=4,
            comment="Really good, but size was slightly off.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=3,
            reviewee_id=1,
            clothing_id=3,
            rating=3,
            comment="Average quality for the price paid.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=1,
            reviewee_id=3,
            clothing_id=4,
            rating=5,
            comment="Perfect! Just as described and love it.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=2,
            reviewee_id=1,
            clothing_id=5,
            rating=2,
            comment="Not happy with the product, it looked used.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=3,
            reviewee_id=2,
            clothing_id=6,
            rating=1,
            comment="Poor service and the item was damaged.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=1,
            reviewee_id=2,
            clothing_id=7,
            rating=4,
            comment="Great item but delayed shipping.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=2,
            reviewee_id=3,
            clothing_id=8,
            rating=5,
            comment="Fantastic! Highly recommend this seller!",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=3,
            reviewee_id=1,
            clothing_id=9,
            rating=3,
            comment="It's okay, not what I expected but usable.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=1,
            reviewee_id=3,
            clothing_id=10,
            rating=5,
            comment="I love this product, would buy again!",
            date_posted=datetime.utcnow()
        )
    ]

    for review in reviews:
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
