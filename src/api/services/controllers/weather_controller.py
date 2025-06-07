from flask import request, jsonify
from src.api.services.controllers.weather_controller import get_weather_info


def get_weather_info():
    try:
        lat = request.args.get("lat")
        lng = request.args.get("lng")
        date = request.args.get("date")  # Formato: "2024-05-27"

        if not lat or not lng or not date:
            return jsonify({"error": "Parámetros 'lat', 'lng' y 'date' son requeridos"}), 400

        result = get_weather(lat, lng, date)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
