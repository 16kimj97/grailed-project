from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, SelectField, DateField
from wtforms.validators import DataRequired, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws_helpers import ALLOWED_EXTENSIONS


class AddClothingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=0)])
    size = SelectField('Size', choices=['XS', 'S', 'M', 'L', 'XL', 'XXL'], validators=[DataRequired()])
    brand = StringField('Brand', validators=[DataRequired()])
    condition = SelectField('Condition', choices=['New', 'Like New', 'Used', 'Worn'], validators=[DataRequired()])
    images = FileField('Image URL', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    date_listed = DateField('Date Listed', validators=[DataRequired()])
    gender = SelectField('Gender', choices=['Menswear', 'Unisex', 'Womenswear'], validators=[DataRequired()])
