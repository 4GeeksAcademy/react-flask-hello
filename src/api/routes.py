from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Products
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta
from flask_mail import Message
from extensions import mail
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/products', methods=['GET'])
def get_products():
    products = Products.query.all()

    if not products:
        return jsonify({"msg":"add a product"}), 404

    return jsonify({"success":"This is our products list","products": [product.serialize() for product in products]}), 200

@api.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Products.query.get(id)

    if not product:
        return jsonify({"msg":"the product was not found"}), 404
    
    return jsonify({"success":"the product was found","product": product.serialize()}), 200

@api.route('/products', methods=['POST'])
def created_product():
    
    data = request.get_json()

    if not data.get('product_name'):
        return jsonify({"error":"The product_name field is required"})
    if not data.get('price'):
        return jsonify({"error":"The price field is required"})
    if not data.get('description'):
        return jsonify({"error":"The description field is required"})
    if not data.get('color'):
        return jsonify({"error":"The color field is required"})
    if not data.get('product_type'):
        return jsonify({"error":"The product_type field is required"})
    if not data.get('gender'):
        return jsonify({"error":"The gender field is required"})
    if not data.get('size'):
        return jsonify({"error":"The size field is required"})
    if data.get('stock') is None:
        return jsonify({"error":"The stock field is required"})
    

    new_product = Products(
        product_name=data.get('product_name'),
        price=int(data.get('price')),
        description=data.get('description'),
        color=data.get('color'),
        product_type=data.get('product_type'),
        gender=data.get('gender'),
        size=data.get('size'),
        stock=int(data.get('stock')),
        product_photo=data.get('product_photo', None)
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"success":"A new product has been created", "product": new_product.serialize()}), 201

@api.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Products.query.get(id)

    if not product:
        return jsonify({"msg":"the product was not found"}), 404
    
    data = request.get_json()

    if 'product_name' in data:
        product.product_name  =data['product_name']
    if 'price' in data:
        product.price  =data['price']
    if 'description' in data:
        product.description  =data['description']
    if 'color' in data:
        product.color  =data['color']
    if 'product_type' in data:
        product.product_type  =data['product_type']
    if 'gender' in data:
        product.gender  =data['gender']
    if 'size' in data:
        product.size  =data['size']
    if 'stock' in data:
        product.stock = int(data['stock'])
    if 'product_photo' in data:
        product.product_photo  =data['product_photo']    
    
    db.session.commit()

    return jsonify({"success":"The product was updated"}, product.serialize()), 200

@api.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Products.query.get(id)

    if not product:
        return jsonify({"msg":"the product was not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"success":"the product was removed"})

@api.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()
    recaptcha_token = request_body.get('recaptcha_token')
    secret_key = "6LeKr1orAAAAAGvQosLnXkFTxNOi8qVZjR6cUl9T"

    try:
        response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={"secret": secret_key, "response": recaptcha_token}
        )
        result = response.json()
    except Exception as e:
        return jsonify({"error": "No se pudo verificar el captcha"}), 400

    if not result.get("success"):
        return jsonify({"error": "Captcha inválido"}), 400

    required_fields = ['email', 'password', 'first_name', 'last_name', 'address']
    for field  in required_fields:
        if not request_body.get(field):
            return jsonify({"msg":"a required field is missing"}), 400

    existing_user = User.query.filter_by(email=request_body['email']).first()
    if existing_user:
        return jsonify({"msg":"Email already exists"}), 400
    
    hashed_password = generate_password_hash(request_body['password'])

    new_user = User(
        email=request_body['email'], 
        password=hashed_password,
        first_name = request_body.get('first_name'),
        last_name = request_body.get('last_name'),
        address = request_body.get('address')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success":"A new user has been created"}), 201

@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    email = request_body.get('email')
    password = request_body.get('password')
    user = User.query.filter_by(email = email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error":"Incorrect email or password, please try again"}), 400
    
    token = create_access_token(identity=user.email)

    return jsonify({"token" : token}), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if user is None:
        return ({"error":"User not found"}), 404
    
    return jsonify({"user": user.serialize()}), 200

@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.generate_reset_token()
    db.session.commit()


    front_url_local = "https://friendly-lamp-x5v79p56j7xxf4gw-3000.app.github.dev/restablecer-contrasena/"
    front_url_render = "https://sample-service-name-nr6p.onrender.com/restablecer-contrasena/"

    reset_url = url_for('api.reset_password', token=user.reset_token, _external=True)

    reset_url_frontend = f"{front_url_render}{user.reset_token}"
    

    msg = Message("Restablece tu contraseña",
              recipients=[email])
    msg.html = f'Hola,\n\nHas solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n<a href={reset_url_frontend}>Restablece tu contraseña</a> \n\n Si no hiciste esta solicitud, ignora este correo.'
    mail.send(msg)

    return jsonify({
        "success": "Reset link generated",
        "reset_url": reset_url
    }), 200

@api.route('/reset-password/<string:token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    new_password = data.get("new_password")

    if not new_password:
        return jsonify({"error": "New password is required"}), 400

    user = User.query.filter_by(reset_token=token).first()

    if not user or user.reset_token_expires < datetime.utcnow():
        return jsonify({"error": "Invalid or expired token"}), 400

    user.password = generate_password_hash(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    db.session.commit()

    return jsonify({"success": "Password updated successfully"}), 200