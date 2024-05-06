from flask import Blueprint, jsonify, request
from app.models import Review, db
from flask_login import current_user, login_required
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:reviewee_id>')
def get_reviews_by_reviewee(reviewee_id):
    reviews = Review.query.filter_by(reviewee_id=reviewee_id).all()
    return jsonify([review.to_dict() for review in reviews])
