from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity

api = Blueprint('api', __name__)

CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend!"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    user = User.query.filter_by(email=email).first()
    if user:
        raise APIException("Este email ya está registrado", status_code=409)

    new_user = User(email=email, is_active=True)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify({
        "message": "Usuario registrado exitosamente!",
        "access_token": access_token,
        "user_id": new_user.id
    }), 201

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    user = User.query.filter_by(email=email).first()
    if user is None:
        raise APIException("Email o contraseña incorrectos", status_code=401)

    if not user.check_password(password):
        raise APIException("Email o contraseña incorrectos", status_code=401)

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.email), 200