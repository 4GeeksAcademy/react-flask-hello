"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Event, Artist, Purchase , CartItem
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from api.utils import geocode_address
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt()
api = Blueprint('api', __name__)

CORS(api)

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({"message": "Hola desde el backend Flask :)"}), 200

@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    try:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            email=data['email'],
            password=hashed_password,
            is_active=True,
            role=data.get('role', 'usuario')  # usuario pro defecto
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg": "El email ya existe"}), 400
    except Exception as e:
        return jsonify({"msg": "Error al registrar usuario", "error": str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity={
        "id": user.id,
        "email": user.email,
        "role": user.role
    })

    return jsonify(access_token=token), 200

@api.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([e.serialize() for e in events]), 200

@api.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify(event.serialize()), 200

@api.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404

    db.session.delete(event)
    db.session.commit()
    return jsonify({"msg": "Evento eliminado correctamente"}), 200

@api.route('/purchase', methods=['POST'])
def purchase_ticket():
    data = request.get_json()
    try:
        new_purchase = Purchase(
            user_id=data["user_id"],
            event_id=data["event_id"],
            quantity=data["quantity"]
        )
        db.session.add(new_purchase)
        db.session.commit()
        return jsonify({"msg": "Compra realizada con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al procesar la compra", "error": str(e)}), 500

@api.route('/cart', methods=['POST'])  # AGREGAR al CARRITO 
def add_to_cart():
    data = request.get_json()
    try:
        item = CartItem(
            user_id=data['user_id'],
            event_id=data['event_id'],
            quantity=data.get('quantity', 1)
        )
        db.session.add(item)
        db.session.commit()
        return jsonify(item.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al agregar al carrito", "error": str(e)}), 500

@api.route('/cart/<int:user_id>', methods=['GET'])  # VER EL CARRITO
def get_cart(user_id):
    items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.serialize() for item in items]), 200    

@api.route('/cart/<int:item_id>', methods=['DELETE'])  # ELIMINAR ITEM DEL CARRITO 
def delete_cart_item(item_id):
    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"msg": "Evento no encontrado"}), 404
    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg": "Evento eliminado correctamente"}), 200

@api.route('/cart/checkout/<int:user_id>', methods=['POST'])  # CONFIRMAR LA COMPRA 
def checkout(user_id):
    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"msg": "El carrito está vacío"}), 400

    try: 
        for item in cart_items:
            purchase = Purchase(
                user_id=user_id,
                event_id=item.event_id,
                quantity=item.quantity
            )
            db.session.add(purchase)
            db.session.delete(item)  # PARA ELIMINAR DEL CARRITO

        db.session.commit()
        return jsonify({"msg": "Compra realizada con éxito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error durante el checkout", "error": str(e)}), 500

@api.route('/events', methods=['POST']) #endpoin google maps
@jwt_required()
def create_event():
    current_user = get_jwt_identity()
    if current_user['role'] not in ['admin', 'artista']:
        return jsonify({"msg": "No autorizado para crear eventos"}), 403

    data = request.get_json()
    try:
        lat = data.get("lat")
        lng = data.get("lng")

        if not lat or not lng:
            lat, lng = geocode_address(data["location"])
            if not lat or not lng:
                return jsonify({"msg": "No se pudo geocodificar la dirección"}), 400

        new_event = Event(
            title=data["title"],
            date=data["date"],
            description=data.get("description"),
            location=data.get("location"),
            lat=lat,
            lng=lng,
            artist_id=data.get("artist_id")
        )

        db.session.add(new_event)
        db.session.commit()
        return jsonify(new_event.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al crear evento", "error": str(e)}), 500



        






