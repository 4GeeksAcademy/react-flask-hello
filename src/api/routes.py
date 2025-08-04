"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import User, db, Product, Status, Order, OrderItem, Category, ProductCategory
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
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
        print("Error saving user:", e)
        return jsonify({"error": "Error en el servidor"}), 500


# logica para que el administrador haga CRUD de los productos
@api.route('/hello')
def home():
    return make_response(jsonify({"msg": "¡Funcionando Correctamente!"}), 200)

# Producto


@api.route('/product', methods=['GET'])
def get_product():
    list_products = Product.query.all()
    products = [Product.serialize() for Product in list_products]
    # print(list_products[0].name)
    return make_response(jsonify({"msg": "¡Producto cargado exitosamente!", "products": products}), 200)


@api.route('/product/<int:id>', methods=['GET'])
def get_product_id(id):
    product = Product.query.filter_by(id=id).first()
    print(product)

    if not product:
        return make_response(jsonify({"messaje": f"producto con el id #{id} no encontrado"}), 404)
    return jsonify(product.serialize())


@api.route('/new', methods=['POST'])
def new_product():
    data_request = request.get_json()

    # inicio de la validacion

    required_Add = ['name', 'description', 'photo',
                    'coste', 'price', 'pet_type_id', 'stock', 'category_ids']
    error = {}

    for Add in required_Add:

        if Add not in data_request or data_request[Add] is None:
            error[Add] = f"El campo {Add} es obligatorio"
        if error:
            return make_response(jsonify({"error": "¡Revisa los Detalles!"}), 422)
    try:
        name = data_request.get('name')
        description = data_request.get('description')
        photo = data_request.get('photo')
        coste = data_request.get('coste')
        price = data_request.get('price')
        pet_type_id = data_request.get('pet_type_id')
        category_ids = data_request.get('category_ids')
        stock = data_request.get('stock')

        product_new = Product(
            name=name,
            description=description,
            photo=photo,
            coste=coste,
            price=price,
            pet_type_id=pet_type_id,
            stock=stock
        )

        db.session.add(product_new)
        db.session.flush()  
        # Asociar categorías
        category_ids = data_request['category_ids']
        for cat_id in category_ids:
            # Validar existencia de la categoría
            category = Category.query.get(cat_id)
            if not category:
                return make_response(jsonify({"error": f"Categoría con ID {cat_id} no existe"}), 404)
            
            product_category = ProductCategory(
                product_id=product_new.id,
                category_id=cat_id
            )
            db.session.add(product_category)

        db.session.commit()
        return make_response(jsonify({"msg": "¡Producto creado exitosamente!"}), 201)

    except Exception as e:
        db.session.rollback()
        print("Error al crear producto:", e)
        return make_response(jsonify({"error": "Error interno del servidor"}), 500)


@api.route('/update/<int:id>', methods=['PUT'])
def update_product(id):
    try:
        product = Product.query.get(id)

        if not product:
            return make_response(jsonify({"messaje": f"producto con el id #{id} no encontrado"}), 404)

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

        return make_response(jsonify({"msg": "¡Producto actualizado exitosamente!"}), 200)

    except Exception as e:
        print(e)
        return make_response(jsonify({"msg": "Error interno del servidor"}), 500)


@api.route('/delete/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = db.get_or_404(Product, id)

    db.session.delete(product)
    db.session.commit()


# enpoind para la barra de busqueda

@api.route('/search/<termino>', methods= ['GET']) 
def search_product(termino):
    products = Product.query.filter(db.or_(
        Product.name.ilike(f"%{termino}%"),
        Product.description.ilike(f"%{termino}%")
    )).all()

    return make_response(jsonify({"products": [Product.serialize() for Product in products]}))
    

    return make_response(jsonify({"msg": "Se ha eliminado exitosamente"}), 200)

# Cart
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
        new_order = Order(user_id=user_id, status=Status.CART)
        db.session.add(new_order)
        db.session.commit()
        new_item = OrderItem(order_id=new_order.id,
                             product_id=product_id, cant=cant)
        db.session.add(new_item)
        db.session.commit()
        return jsonify({
            "order_id": new_order.id,
            "item": new_item.serialize()
        }), 200
    else:
        new_item = OrderItem(
            order_id=order.id, product_id=product_id, cant=cant)
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
