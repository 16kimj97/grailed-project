from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UpdateOfferStatusForm(FlaskForm):
    status = StringField('Status', validators=[DataRequired(), Length(max=50)])
