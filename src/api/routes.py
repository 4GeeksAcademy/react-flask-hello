from flask import Flask, request, jsonify, url_for, Blueprint, json, render_template
from api.models import db, ma
from api.models import User, Supermarket, Product, Cart, Coupons
from api.utils import generate_sitemap, APIException
from api.models import UserSchema, ProductSchema, MarketSchema, CouponsSchema, CartSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
import smtplib
import random as rd
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')
    location = request.json.get('location')
    is_active = False

    user_email = User.query.filter_by(email = email).first()
    if user_email is None:
        hashed_password = generate_password_hash(password)

        register_info = User(name, email, hashed_password, location, is_active)
        db.session.add(register_info)
        db.session.commit()

        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Bienvenido"

        html = render_template('register.html', name = name)
        part2 = MIMEText(html, 'html')
        msg.attach(part2) 

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(os.getenv("FLASK_EMAIL_APP"), os.getenv("FLASK_EMAIL_PASS"))
        server.sendmail(os.getenv("FLASK_EMAIL_APP"), email, msg.as_string())

        return jsonify({
            "message": "User register succesfully"
        }), 200

    return jsonify({"message": "this email is already exist"}), 400

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email = email).first() 
    if user is None:
        return jsonify({
            "Message": "Email or Password Wrong"
        }), 400

    if check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(token=access_token), 200
    else:
        return jsonify({"msg": "Email or Password Wrong"}), 400

@api.route('/forgot-password', methods=['PUT'])
def forgot_password():
    if request.method == 'PUT':
        email = request.json.get('email', None)

        user = User.query.filter_by(email = email).first()
        if user is None:
            return jsonify({"message": "this email it doesn't exist"})

        base = os.getenv('USER_GENERIC_PASS')
        temporal_password = base + str(rd.randint(100, 999))

        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Cambio de contraseña"
        html = render_template('temporal_password.html', password = temporal_password, name = user.name)
        part2 = MIMEText(html, 'html')
        msg.attach(part2) 

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(os.getenv("FLASK_EMAIL_APP"), os.getenv("FLASK_EMAIL_PASS"))
        server.sendmail(os.getenv("FLASK_EMAIL_APP"), email, msg.as_string())

        hashed_password = generate_password_hash(temporal_password)
        user.password = hashed_password
        db.session.commit()
        return jsonify({"message": "Password sended to your email"})

@api.route('/verifed-email/<int:id>', methods=['GET', 'POST'])
def verifed_email(id):
    pass

@api.route('/user/<int:id>', methods=['GET'])
def get_users(id):
    users = User.query.get(id)
    users_schema = UserSchema()
    output = users_schema.dump(users)
    return jsonify(
        {"Result": output}
    )

@api.route('/market', methods=['GET'])
def get_a_markets():
    markets = Supermarket.query.all()
    markets_schema = MarketSchema(many=True)
    output = markets_schema.dump(markets)
    return jsonify(
        {"Results": output}
    )

@api.route('/market/<int:id>', methods=['GET'])
def get_a_market(id):
    market = Supermarket.query.get(id)
    output = MarketSchema().dump(market)
    return jsonify(
        {"Result": output}
    )

@api.route('/product', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_schema = ProductSchema(many=True)
    output = products_schema.dump(products)
    return jsonify(
        {"Results": output}
    )

@api.route('/product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    output = ProductSchema().dump(product)
    return(
        {"Result": output}
    )

@api.route('/product', methods=['POST'])
def search_products():
    product = request.json.get('product')
    location = request.json.get('location')

    products = Product.query.filter_by(product_name = product).all()
    result = [items for items in products if items.supermarket.location == location]
    products_schema = ProductSchema(many=True)
    output = products_schema.dump(result)
    return jsonify(
        {"Result": output}
    )

@api.route('/cart', methods=['POST', 'DELETE', 'GET'])
@jwt_required()
def cart_add():
    if request.method == 'POST':
        username = request.json.get('username')
        product = request.json.get('product')

        register = Cart(username, product)
        db.session.add(register)
        db.session.commit()
        return jsonify({
            "Message": "new register added susessfully"
        })

    if request.method == 'DELETE':
        cart_id = request.json.get('id', None)

        cart = Cart.query.filter_by(id = cart_id).first()
        if cart is None:
            return jsonify({"message": "Error, not item found"}), 400

        db.session.delete(cart)
        db.session.commit()
        return jsonify({"message": "item deleted successfully"}), 200
    #Handling the GET request
    current_user = get_jwt_identity()
    """
    query = db.session.query(Cart, User, Product).join(User, User.id == Cart.user_id).join(Product, Product.id == Cart.product_id).all() 
    output = [(cart.id, product.product_name) for cart, user, product in query if cart.user_id == current_user]
    """
    test = Cart.query.filter_by(user_id = current_user)
    test_schema = CartSchema(many=True)
    output = test_schema.dump(test)
    return jsonify({
        "Result": output    
    })

@api.route('/coupon', methods=['GET'])
def get_coupons():
    coupons = Coupons.query.all()
    coupons_schema = CouponsSchema(many=True)
    output = coupons_schema.dump(coupons)
    return jsonify({
        "Results": output
    })