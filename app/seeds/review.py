from app.models import db, Review, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_reviews():
    reviews = [
        Review(
            reviewer_id=1,
            reviewee_id=3,
            rating=5,
            comment="Great seller, very responsive and items shipped quickly.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=2,
            reviewee_id=1,
            rating=4,
            comment="Items mostly as described, but shipping was slower than expected.",
            date_posted=datetime.utcnow()
        ),
        Review(
            reviewer_id=3,
            reviewee_id=2,
            rating=2,
            comment="Unresponsive at times and item quality was below expectations.",
            date_posted=datetime.utcnow()
        ),
    ]

    for review in reviews:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
