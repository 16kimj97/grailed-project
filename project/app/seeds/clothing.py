from app.models import db, Clothing, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_clothing():
    clothing_items = [
        Clothing(user_id=1, title="Lightweight Jacket", description="Ideal for spring and fall seasons.", price=75.00, size="M", brand="OutdoorLife", condition="New", images="jacket1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=2, title="Vintage Jeans", description="High-quality vintage denim.", price=45.00, size="L", brand="VintageDenim", condition="Used", images="jeans1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=1, title="Graphic T-Shirt", description="Cotton t-shirt with cool graphic print.", price=20.00, size="S", brand="GraphicTee", condition="New", images="tshirt1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=3, title="Office Blazer", description="Professional and sleek blazer for formal occasions.", price=90.00, size="M", brand="OfficeWear", condition="New", images="blazer1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=2, title="Casual Sneakers", description="Comfortable walking shoes in white.", price=50.00, size="8", brand="CasualKicks", condition="New", images="sneakers1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=3, title="Baseball Cap", description="Blue cap suitable for sports or casual wear.", price=15.00, size="One Size", brand="CapIt", condition="New", images="cap1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=3, title="Summer Dress", description="Light and airy dress perfect for summer.", price=60.00, size="M", brand="SummerWaves", condition="New", images="dress1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=2, title="Leather Wallet", description="Compact and stylish leather wallet.", price=35.00, size="One Size", brand="LeatherGoods", condition="New", images="wallet1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=2, title="Silk Scarf", description="Elegant silk scarf in vibrant colors.", price=25.00, size="One Size", brand="SilkRoad", condition="New", images="scarf1.jpg", date_listed=datetime.utcnow(), status="Available"),
        Clothing(user_id=1, title="Workout Leggings", description="High-performance leggings for gym and yoga.", price=40.00, size="S", brand="FitWear", condition="New", images="leggings1.jpg", date_listed=datetime.utcnow(), status="Available")
    ]

    for item in clothing_items:
        db.session.add(item)

    db.session.commit()

def undo_clothing():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clothing"))

    db.session.commit()
