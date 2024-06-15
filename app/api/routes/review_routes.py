from flask import Blueprint, jsonify, request
from app.models import Review, db
from flask_login import current_user, login_required
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:reviewee_id>')
def get_reviews_by_reviewee(reviewee_id):
    reviews = Review.query.filter_by(reviewee_id=reviewee_id).all()
    return jsonify([review.to_dict() for review in reviews])

from flask import Blueprint, jsonify, request
from app.models import Review, db
from flask_login import current_user, login_required
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:reviewee_id>')
def get_reviews_by_reviewee(reviewee_id):
    reviews = Review.query.filter_by(reviewee_id=reviewee_id).all()
    return jsonify([review.to_dict() for review in reviews])

@review_routes.route('/<int:reviewee_id>/new', methods=['POST'])
@login_required
def create_review(reviewee_id):
    data = request.get_json()
    rating = data.get('rating')
    comment = data.get('comment')

    if rating is None or not (1 <= rating <= 5):
        return jsonify({'error': 'Rating must be an integer between 1 and 5.'}), 400

    new_review = Review(
        reviewer_id=current_user.id,
        reviewee_id=reviewee_id,
        rating=rating,
        comment=comment,
        date_posted=datetime.utcnow()
    )

    db.session.add(new_review)
    db.session.commit()

    return jsonify(new_review.to_dict()), 201
