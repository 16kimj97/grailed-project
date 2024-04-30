from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, SelectField, DateField
from wtforms.validators import DataRequired, NumberRange

class UpdateClothingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=0)])
    size = SelectField('Size', choices=['XS', 'S', 'M', 'L', 'XL', 'XXL'], validators=[DataRequired()])
    brand = StringField('Brand', validators=[DataRequired()])
    condition = SelectField('Condition', choices=['New', 'Like New', 'Used', 'Worn'], validators=[DataRequired()])
    images = StringField('Image URL', validators=[DataRequired()])
    date_listed = DateField('Date Listed', validators=[DataRequired()])
    status = SelectField('Status', choices=['Available', 'Sold'], validators=[DataRequired()])
    gender = SelectField('Gender', choices=['Menswear', 'Unisex', 'Womenswear'], validators=[DataRequired()])  # New select field for gender options
