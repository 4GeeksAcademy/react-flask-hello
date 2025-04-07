from flask import Blueprint

from .blood_pressure import blood_pressure_blueprint
from .glucose import glucose_blueprint
from .height import height_blueprint
from .weight import weight_blueprint


records_blueprint = Blueprint('records', __name__)

records_blueprint.register_blueprint(
    blood_pressure_blueprint, url_prefix='/bloodpressure')

records_blueprint.register_blueprint(glucose_blueprint, url_prefix='/glucose')

records_blueprint.register_blueprint(height_blueprint, url_prefix='/height')

records_blueprint.register_blueprint(weight_blueprint, url_prefix='/weight')
