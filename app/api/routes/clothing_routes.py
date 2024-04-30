from flask import Blueprint, jsonify, request
from app.models import Clothing, db
from flask_login import current_user, login_required
from datetime import datetime
from app.forms.add_clothing import AddClothingForm
from app.forms.update_clothing import UpdateClothingForm

clothing_routes = Blueprint('clothing', __name__)

@clothing_routes.route('/')
def clothing_index():
    clothing = Clothing.query.all()

    return [clothes.to_dict() for clothes in clothing]

@clothing_routes.route('/new', methods=['POST'])
@login_required
def post_clothing():
    form = AddClothingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            'user_id': current_user.id,
            'title': form.data['title'],
            'description': form.data['description'],
            'price': form.data['price'],
            'size': form.data['size'],
            'brand': form.data['brand'],
            'condition': form.data['condition'],
            'images': form.data['images'],
            'gender': form.data['gender'],
            'date_listed': datetime.utcnow()
        }

        new_clothing = Clothing(**params)
        db.session.add(new_clothing)
        db.session.commit()
        return new_clothing.to_dict()

    return jsonify(form.errors)

@clothing_routes.route('/<int:clothingId>', methods=['DELETE'])
@login_required
def delete_clothing(clothingId):
    clothing = Clothing.query.get(clothingId)

    if not clothing:
        return {"message": "no clothing"}, 404

    if current_user.id != clothing.user_id:
        return {"message": "you are not the owner of this clothing"}, 403

    db.session.delete(clothing)
    db.session.commit()

    return {"message": "delete successful"}

@clothing_routes.route('/<int:clothingId>', methods=['PUT'])
@login_required
def edit_clothing(clothingId):
    clothing = Clothing.query.get(clothingId)

    if not clothing:
        return {"message": "clothing not found"}, 404

    if current_user.id != clothing.user_id:
        return {"message": "you are not the owner of this clothing"}, 403

    form = UpdateClothingForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        clothing.title = form.data['title']
        clothing.description = form.data['description']
        clothing.price = form.data['price']
        clothing.size = form.data['size']
        clothing.brand = form.data['brand']
        clothing.condition = form.data['condition']
        clothing.images = form.data['images']
        clothing.gender = form.data['gender']
        clothing.status = form.data['status']

        db.session.commit()
        return clothing.to_dict()

    print(form.errors)
    return jsonify({"message": "update failed"}), 400

@clothing_routes.route('/<int:clothingId>')
def get_clothing_details(clothingId):
    clothing = Clothing.query.get(clothingId)

    if not clothing:
        return {"message": "clothing not found"}, 404

    return clothing.to_dict()

@clothing_routes.route('/user/current')
@login_required
def get_all_clothing_current():
    clothing = Clothing.query.filter(Clothing.user_id == current_user.id).all()

    if not clothing:
        return {"message": "clothing not found"}, 404

    return [clothes.to_dict() for clothes in clothing]
