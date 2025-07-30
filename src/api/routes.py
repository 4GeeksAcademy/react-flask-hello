"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from api.models import User, Order, Status, db, OrderItem
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt()

CORS(api)


@api.route('/private-hello', methods=['GET'])
@jwt_required()
def handle_private_hello():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        response_body = {
            "message": "Hola, soy una ruta privada",
            "user": user.serialize()
        }
        return jsonify(response_body), 200
    else:
        return jsonify({"message": "Usuario no encontrado"}), 404

# Login y Registro
@api.route('/login', methods=['POST'])
def login():
    data_request = request.get_json()
    print("Login request data:", data_request)

    email = data_request.get('email')
    password = data_request.get('password')
    print(f"Email: {email}, Password received: {'Yes' if password else 'No'}")

    if not email or not password:
        print("Error: email or password missing")
        return jsonify({"message": "Los campos email,password son obligatorios"}), 400

    user = User.query.filter_by(email=email).first()
    print("User found:", user)

    if not user:
        print("Error: user not found")
        return jsonify({"message": "Verifique sus credenciales"}), 401

    if bcrypt.check_password_hash(user.password, password):
        print("Password match, creating access token")
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"message": "Login exitoso", "token": access_token, "user": user.serialize()}), 200

    print("Error: password incorrect")
    return jsonify({"message": "Verifique sus credenciales"}), 401


@api.route('/register', methods=["POST"])
def register():
    data_request = request.get_json()
    email = data_request.get('email')
    password = data_request.get('password')
    name = data_request.get('username')

    if not email or not password:
        return jsonify({"message": "Los campos email,password son obligatorios"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        email=email,
        password=hashed_password,
        name=name,
        is_active=True
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "usuario creado con exito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error en el servidor"}), 500

# Productos

# Carrito
@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():

    user_id = get_jwt_identity()
    order = Order.query.filter_by(user_id=user_id, status=Status.CART).first()

    if not order:
        return jsonify({"message": "Carrito vacío"}), 400

    return jsonify({
        "order_id": order.id,
        "items": [item.serialize() for item in order.order_item]
    }), 200

@api.route('/cart/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.get_json()
    cant = data["cant"]
    product_id = data["product_id"]
    order = Order.query.filter_by(user_id=user_id, status=Status.CART).first()
    if not order:
        new_order = Order(user_id= user_id, status= Status.CART)
        db.session.add(new_order)
        db.session.commit()
        new_item = OrderItem(order_id = new_order.id, product_id = product_id, cant = cant)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({
            "order_id": new_order.id,
            "item": new_item.serialize()
        }), 200
    else : 
        new_item = OrderItem(order_id = order.id, product_id = product_id, cant = cant)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({
            "order_id": order.id,
            "item": new_item.serialize()
        }), 200
    
@api.route('/cart/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_to_cart(id):
    user_id = get_jwt_identity()
    order = Order.query.filter_by(user_id=user_id, status=Status.CART).first()
    if not order:
        return jsonify({"message": "Carrito no existe"}), 400
    
    item = OrderItem.get(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Producto eliminado"}), 200


@api.route('/cart/checkout', methods=['POST'])
@jwt_required()
def checkout():
    user_id = get_jwt_identity()
    order = Order.query.filter_by(user_id=user_id, status=Status.CART).first()

    if not order:
        return jsonify({"message": "No hay carrito para finalizar"}), 400

    order.status = Status.PAID
    db.session.commit()

    return jsonify({"message": "Compra finalizada", "order_id": order.id}), 200

