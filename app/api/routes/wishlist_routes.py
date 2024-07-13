from flask import Blueprint, jsonify, request
from app.models import WishList, db
from flask_login import current_user, login_required
from datetime import datetime

wishlist_routes = Blueprint('wishlist', __name__)

@wishlist_routes.routes('/', methods=['GET'])
@login_required
def get_all_wishlists():
    wishlists = WishList.query.all()
    return jsonify([wishlist.to_dict() for wishlist in wishlists])
