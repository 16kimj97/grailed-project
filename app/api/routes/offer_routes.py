from flask import Blueprint, jsonify, request
from app.models import Offer, Clothing, db
from flask_login import current_user, login_required
from app.forms.offer_form import OfferForm
from app.forms.create_offer import CreateOfferForm
from app.forms.update_status  import UpdateOfferStatusForm

offer_routes = Blueprint('offers', __name__)

@offer_routes.route('/current')
def get_user_offers():
    user_id = current_user.id
    user_offers = Offer.query.filter_by(user_id=user_id).all()
    return jsonify([offer.to_dict() for offer in user_offers])

@offer_routes.route('/new', methods=['POST'])
@login_required
def add_offer():
    form = CreateOfferForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # clothing_id = request.json.get('clothing_id')

        new_offer = Offer(
            clothing_id=form.data['clothing_id'],
            user_id=current_user.id,
            offer_price=form.data['offer_price'],
            shipping_details=form.data['shipping_details'],
        )

        db.session.add(new_offer)
        db.session.commit()
        return jsonify(new_offer.to_dict())
    return jsonify(form.errors), 400

@offer_routes.route('/<int:itemId>', methods=['DELETE'])
@login_required
def delete_offer(itemId):
    offer = Offer.query.get(itemId)

    if not offer:
        return jsonify({"message": "Offer not found"}), 404

    if offer.user_id != current_user.id:
        return jsonify({"message": "You are not the owner of this offer"}), 403

    db.session.delete(offer)
    db.session.commit()
    return jsonify({"message": "Offer deleted successfully"})

@offer_routes.route('/<int:itemId>', methods=['PUT'])
@login_required
def update_offer(itemId):
    offer = Offer.query.get(itemId)

    if not offer:
        return jsonify({"message": "Offer not found"}), 404

    if offer.user_id != current_user.id:
        return jsonify({"message": "You are not the owner of this offer"}), 403

    form = OfferForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        offer.offer_price = form.data['offer_price']
        offer.shipping_details = form.data['shipping_details']

        db.session.commit()
        return jsonify(offer.to_dict())
    else:
        return jsonify({"errors": form.errors}), 400


@offer_routes.route('/clothing/<int:clothingId>')
@login_required
def get_offers_by_clothing_id(clothingId):
    print(f"Received request for clothing ID: {clothingId}")

    offers = Offer.query.filter_by(clothing_id=clothingId).all()

    if not offers:
        return jsonify({"message": "No offers found for this clothing item"}), 404

    return jsonify([offer.to_dict() for offer in offers])


@offer_routes.route('/<int:itemId>/status', methods=['PUT'])
@login_required
def update_offer_status(itemId):
    offer = Offer.query.get(itemId)

    if not offer:
        return jsonify({"message": "Offer not found"}), 400

    if offer.clothing.user_id != current_user.id:
        return jsonify({"message": "You are not the owner of this clothing item"}), 403

    form = UpdateOfferStatusForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        offer.status = form.status.data
        db.session.commit()
        return jsonify(offer.to_dict())
    else:
        return jsonify({"message": "Invalid input", "errors": form.errors}), 400
