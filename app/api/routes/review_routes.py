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

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return jsonify({'error': 'Review not found.'}), 404

    if review.reviewer_id != current_user.id:
        return jsonify({'error': 'Unauthorized to delete this review.'}), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Review deleted successfully.'}), 200
