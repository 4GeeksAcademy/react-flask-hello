from flask import Blueprint


weather_bp = Blueprint('weather_bp', __name__)


# Ruta para obtener el clima
@weather_bp.route('/weather', methods=['GET'])
def weather():
    return get_weather_info()
