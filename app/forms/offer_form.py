from flask_wtf import FlaskForm
from wtforms import DecimalField, StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, NumberRange

class OfferForm(FlaskForm):
    clothing_id = IntegerField('Clothing ID', validators=[DataRequired()])
    offer_price = DecimalField('Offer Price', validators=[DataRequired(), NumberRange(min=0)])
    shipping_details = StringField('Shipping Details', validators=[DataRequired()])
