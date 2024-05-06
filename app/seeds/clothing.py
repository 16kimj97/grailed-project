from app.models import db, Clothing, environment, SCHEMA
from sqlalchemy import text
from datetime import datetime

def seed_clothing():
    clothing_items = [
        Clothing(user_id=1, title="Supreme Jacket", description="Ideal for spring and fall seasons.", price=130.00, size="M", brand="Supreme", condition="New", images="https://i.postimg.cc/wxXCFXQk/supreme.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=2, title="Chrome Hearts Jeans", description="High-quality vintage denim.", price=420.00, size="L", brand="Chrome Hearts", condition="Used", images="https://i.postimg.cc/2S6gzPRH/Chrome-hearts-jeans.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=1, title="GhostBusters T-Shirt", description="Cotton t-shirt with a cool graphic print.", price=20.00, size="S", brand="Vintage", condition="New", images="https://i.postimg.cc/4dC0QyKM/ghostbusters.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=3, title="Office Blazer", description="Professional and sleek blazer for formal occasions.", price=90.00, size="M", brand="OfficeWear", condition="New", images="https://i.postimg.cc/SRdt4GZF/images-1.jpg", date_listed=datetime.utcnow(), status="Available", gender="Womenswear"),
        Clothing(user_id=2, title="Off-White Dunks", description="Comfortable walking shoes in white.", price=500.00, size="8", brand="CasualKicks", condition="New", images="https://i.postimg.cc/V6RF0kXX/images.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=3, title="Giants Cap", description="Blue cap suitable for sports or casual wear.", price=15.00, size="One Size", brand="CapIt", condition="New", images="https://i.postimg.cc/PJVzKV3x/giants-hat.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=3, title="Summer Dress", description="Light and airy dress perfect for summer.", price=60.00, size="M", brand="SummerWaves", condition="New", images="https://i.postimg.cc/prrK9YWt/summer-dress.jpg", date_listed=datetime.utcnow(), status="Available", gender="Womenswear"),
        Clothing(user_id=2, title="Leather Wallet", description="Compact and stylish leather wallet.", price=35.00, size="One Size", brand="LeatherGoods", condition="New", images="https://i.postimg.cc/kG2tMJsJ/leather-wallet.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=2, title="Silk Scarf", description="Elegant silk scarf in vibrant colors.", price=25.00, size="One Size", brand="SilkRoad", condition="New", images="https://i.postimg.cc/Hs77fLj3/scarf.jpg", date_listed=datetime.utcnow(), status="Available", gender="Womenswear"),
        Clothing(user_id=1, title="Workout Leggings", description="High-performance leggings for gym and yoga.", price=40.00, size="S", brand="FitWear", condition="New", images="https://i.postimg.cc/YStGGfRy/leggings.jpg", date_listed=datetime.utcnow(), status="Available", gender="Womenswear"),
        Clothing(user_id=2, title="Moncler Arnaud Hooded Puffer Coat", description="Moncler Arnaud Hooded Puffer Coat, Gently used, no rips, flaws or holes, all sales are final", price=1000, size="S", brand="Moncler", condition="Gently-used", images="https://i.postimg.cc/tJ92fkV9/moncler.jpg", date_listed=datetime.utcnow(), status="Available", gender="Unisex"),
        Clothing(user_id=3, title="Bape Shark full zip hoodie black", description="no noticeable dirt or damage, 100% authentic, Luminous print is applied to logo on sleeve", price=364, size="L", brand="Bape", condition="used", images="https://i.postimg.cc/DZPt88ry/bape.jpg", date_listed=datetime.utcnow(), status="Available", gender="Menswear"),
        Clothing(user_id=1, title="Louis Vuitton Sac Retro GM hand bag", description="This was bought from what goes around comes around, very good condition, slight signs of wear and slight scratches on the leather", price=4995, size="One Size", brand="Louis Vuitton", condition="used", images="https://i.postimg.cc/yxBn3jVw/lv.jpg", date_listed=datetime.utcnow(), status="Available", gender="Womenswear"),
        Clothing(user_id=2, title="Christian Louboutin So Kate Pump", description="Elevate your style with these stunning Christian Louboutin So Kate pumps", price=4995, size="M", brand="Christian Louboutin", condition="new", images="https://i.postimg.cc/5yY9vBnS/loubitin.jpg", date_listed=datetime.utcnow(), status="Available", gender="Womenswear"),
        Clothing(user_id=3, title="Burberry London Trench Coat", description="Signature style from Burberry, perfect for any wardrobe.", price=900.00, size="L", brand="Burberry", condition="Used", images="https://i.postimg.cc/JhsRScWV/bb.jpg", date_listed=datetime.utcnow(), status="Available", gender="Unisex"),
        Clothing(user_id=2, title="Patagonia Down Sweater Jacket", description="Lightweight and windproof, ideal for cold weather.", price=229.00, size="L", brand="Patagonia", condition="New", images="https://i.postimg.cc/J046dx9j/s-l1600.jpg", date_listed=datetime.utcnow(), status="Available", gender="Unisex"),
        Clothing(user_id=1, title="The North Face Backpack", description="Rugged and ready for the outdoors.", price=99.00, size="One Size", brand="The North Face", condition="New", images="https://i.postimg.cc/m2TFzD9z/s-l1600-1.jpg", date_listed=datetime.utcnow(), status="Available", gender="Unisex"),
    ]

    for item in clothing_items:
        db.session.add(item)

    db.session.commit()

def undo_clothing():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.clothing RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM clothing"))

    db.session.commit()
