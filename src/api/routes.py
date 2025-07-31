"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, create_access_token
from api.models import User, db, Product
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






# logica para que el administrador haga CRUD de los productos
@api.route('/hello')
def home():
    return make_response(jsonify({"msg":"¡Funcionando Correctamente!"}), 200)

#Producto
@api.route('/product', methods=['GET'])
def get_product():
    list_products= Product.query.all()
    products=[Product.serialize() for Product in list_products]
    print(list_products[0].name)
    return make_response(jsonify({"msg":"¡Producto cargado exitosamente!", "products":products }), 200)

@api.route('/product/<int:id>', methods=['GET'])
def get_product_id(id):
    product = Product.query.filter_by(id=id).first()
    print(product)

    
    if not product:
        return make_response(jsonify({"messaje":f"producto con el id #{id} no encontrado"}), 404)
    return jsonify(product.serialize())        
    
    
@api.route('/new', methods=['POST']) 
def new_product():
    data_request= request.get_json()
    
         #inicio de la validacion

    required_Add=['name','description','photo','coste','price','pet_type_id','stock']
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
    
        return make_response(jsonify({"msg":"¡Producto agregado exitosamente!"}), 201)

    except Exception as e:
        print(e)
        return make_response(jsonify({"error": "Error en el servidor"}), 500)
   



@api.route('/update/<int:id>', methods=['PUT'])   
def update_product(id):
    try:
        product = Product.query.get(id)

        if not product:
            return make_response(jsonify({"messaje":f"producto con el id #{id} no encontrado"}), 404)

        data_request = request.get_json()

        if 'name' in data_request:
            product.name = data_request['name']
        if 'description' in data_request:
            product.description = data_request['description']
        if 'photo' in data_request:
            product.photo = data_request['photo']
        if 'coste' in data_request:
            product.coste = data_request['coste']
        if 'price' in data_request:
            product.price = data_request['price']
        if 'pet_type_id' in data_request:
            product.pet_type_id = data_request['pet_type_id']
        if 'stock' in data_request:
            product.stock = data_request['stock']

        db.session.commit()

        return make_response(jsonify({"msg":"¡Producto actualizado exitosamente!"}), 200)
    
    except Exception as e:
        print(e)
        return make_response(jsonify({"msg":"Error interno del servidor"}), 500)



@api.route('/delete/<int:id>', methods=['DELETE'])   
def delete_product(id): 
    product= db.get_or_404(Product,id)

    db.session.delete(product)
    db.session.commit()
   
    return make_response(jsonify({"msg": "Se ha eliminado exitosamente"}), 200) 