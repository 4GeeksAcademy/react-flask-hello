from flask import Blueprint
from src.api.services.weather_services import get_weather
from flask import Blueprint, request, jsonify


weather_bp = Blueprint('weather_bp', __name__)

# Ruta para obtener el clima: /api/weather?lat=...&lng=...&date=...


@weather_bp.route('/weather', methods=['GET'])
def weather():
    # Obtener parámetros de la URL
    lat = request.args.get("lat")
    lng = request.args.get("lng")
    date = request.args.get("date")

    # Validación básica
    if not lat or not lng or not date:
        return jsonify({"error": "Faltan parámetros: lat, lng o date"}), 400

    # Llamada a la función que consulta Stormglass
    weather_data = get_weather(lat, lng, date)

    # Respuesta en formato JSON
    return jsonify({"weather": weather_data})
