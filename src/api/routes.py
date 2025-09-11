"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/reset-password', methods=['POST'])
def reset_password():
    # Expect JSON: { "email": "user@email.com", "new_password": "NewStrongPass123!" }
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    new_password = (data.get("new_password") or "").strip()

    if not email or not new_password:
        return jsonify({"error": "email_and_new_password_required"}), 400
    if len(new_password) < 8:
        return jsonify({"error": "password_too_short"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "user_not_found"}), 404

    
    user.password = generate_password_hash(new_password)     
    
    db.session.commit()
    return jsonify({"ok": True}), 200

