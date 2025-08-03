from flask import Blueprint, request, jsonify
from api.utils import geocode_address

maps_bp = Blueprint('maps', __name__, url_prefix='/maps')

@maps_bp.route('/geocode', methods=['POST'])
def geocode():
    data = request.get_json()
    location = data.get('location')
    if not location:
        return jsonify({"msg": "Falta la dirección"}), 400
    
    lat, lng = geocode_address(location)
    if not lat or not lng:
        return jsonify({"msg": "No se pudo geocodificar la dirección"}), 400

    return jsonify({"lat": lat, "lng": lng}), 200