"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from api.utils import generate_sitemap, APIException, Product
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token
from api.models import User, db
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)

bcrypt = Bcrypt()
    
@api.route('/private-hello', methods=['POST', 'GET'])
@jwt_required()
def handle_private_hello():

    response_body = {
        "message": "Hola, soy una ruta privada"
    }

    return jsonify(response_body), 200


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
    print("Register request data:", data_request)

    email = data_request.get('email')
    password = data_request.get('password')
    print(f"Email: {email}, Password received: {'Yes' if password else 'No'}")

    if not email or not password:
        print("Error: email or password missing")
        return jsonify({"message": "Los campos email,password son obligatorios"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    print("Password hashed")

    new_user = User(
        email=email,
        password=hashed_password,
        is_active=True
    )
    print("New user created:", new_user)

    try:
        db.session.add(new_user)
        db.session.commit()
        print("User saved to database")
        return jsonify({"message": "usuario creado con exito"}), 201
    except Exception as e:
        db.session.rollback()
        print("Error saving user:", e)
        return jsonify({"error": "Error en el servidor"}),500






#el carrito
@api.route('/hello')
def home():
    return "¡Funcionando Correctamente!"

#Productos
@api.route('/product', methods=['GET'])
def get_product():
    list_products= Product.query.all()
    products=[Product.serialize for Product in list_products]
    print(list_products[0].name)
    return jsonify({"messaje": "Lista de productos"}),200

@api.route('/product<int:id>', methods=['GET'])
def get_product_id():
    product_id= Product.query.get()
    print(product_id)
    
    if not product_id:
        return jsonify({"messaje":"producto con el id #{id} no encontrado"}),404

    
    
    
@api.route('/new', methods=['POST']) 
def new_product():
    data_request= request.get_json()
    
    #inicio de la validacion

    required_Add=['name','descrption','photo','coste','price','pet_ype_id','stock']
    error={}

    for Add in required_Add:

        if Add not in data_request or data_request[Add] is None:
            error[Add]= f"El campo {Add} es obligatorio"    
        if error:
            return  make_response(jsonify({"error":"¡Revisa los Detalles!"}), 422)
    try:
        name=data_request.get('name')
        description=data_request.get('description')
        photo=data_request.get('photo')
        coste=data_request.get('coste')
        price=data_request.get('price')
        pet_type_id=data_request.get('pet_type_id')
        stock=data_request.get('stock')

        product_new= Product(
            name=name,
            description=description,
            photo=photo,
            coste=coste,
            price=price,
            pet_type_id=pet_type_id,
            stock=stock
        )

        db.session.add(product_new)
        db.session.commit()
    
        return make_response(jsonify({"msg":"endponid creado exitosamente"}), 201)

    except Exception as e:
        print(e)
        return make_response(jsonify({"error": "Error en el servidor"}), 500)




@api.route('/update/<int:id>', methods=['PUT'])   
def update_product(id):
    pass





@api.route('/delete', methods=['DELETE'])   
def delete_product(): 
    pass