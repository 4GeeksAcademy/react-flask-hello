"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, House, Image, Booking, Favorites
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# endpoint login

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_query = User.query.filter_by(email=email).first()
    print (email, password)

    if user_query is None:
        return {"msg": "Este email no existe"}, 404

    if email != user_query.email or password != user_query.password:
        return {"msg": "Email o contraseña incorrectos"}, 404

    access_token = create_access_token(identity=email)

    response_body = {
        "access_token": access_token,
        "user": user_query.serialize()
    }   

    return jsonify(response_body), 200

# validar ruta del token es una ruta protegida

@api.route("/valid_token", methods=["GET"])
@jwt_required()
def validartoken():
    # Accede a la identidad del usuario con get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify({ "is_logged": True }), 200


# endpoint registrarse signup

@api.route('/signup', methods=['POST'])
def crear_registro():
    request_body = request.get_json(force=True)
    

    users = User.query.filter_by(email=request_body["email"]).first()
    if users is not None:
        return jsonify({"msg":"ya existe"}), 404
    
    nuevo_usuario = User(
        name = request.json.get("name", None),
        lastname = request.json.get("lastname", None),
        phone_number = request.json.get("phone_number", None),
        email = request.json.get("email", None),
        password = request.json.get("password", None),
        is_admin = request.json.get("is_admin", None),
        account_creation_date = datetime.now()
    )

    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify(nuevo_usuario.serialize()),200
    


# Ruta protegida de favoritos

@api.route("/usuario/favorito", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario con get_jwt_identity
    current_user_email = get_jwt_identity()

    user= User.query.filter_by(email=current_user_email).first()
    favoritos=Favorites.query.filter_by(user_id = user.id).all()
    response = list(map(lambda favoritos: favoritos.serialize(), favoritos))
    if response == []:
        return jsonify({"msg": "El usuario no tiene favoritos ingresados"})


    return jsonify({"results": response}), 200

#  Agregar casas a favorito

@api.route('/favoritos/house', methods=['POST'])
def crear_casa_favorita():

    request_body = request.get_json(force=True) #obtiene el cuerpo que se envíe por el body desde el postman

# validar que exista el usuario
    user_query = User.query.filter_by(id=request_body["user_id"]).first()
    if user_query is None:
        return jsonify({"msg": "el usuario no está registrado"}), 404

 #validamos que exista una casa
    casa_query = House.query.filter_by(id = request_body["house_id"]).first() #id es la propiedad de la tabla House y house_id es el valor que se pasa por URL
    if casa_query is None:
        return jsonify({"msg": "Esta casa no existe"}), 404

#validamos que la casa ya existía como fav
    fav_query = Favorites.query.filter_by(user_id = request_body["user_id"]).filter_by(house_id =request_body["house_id"]).first() #devuelve los valores que coinciden (del user_id la tabla Favoritos) con el body del postman
    if fav_query:    #la casa existe para ese usuario no se va a volver a agregar
            return jsonify({"msg": "Esta casa ya existe en favoritos, no se volverá a agregar"}), 400
        

 #Si no se cumplen las condiciones anteriores, se agrega la casa a favoritos

    nueva_casa_favorita=Favorites(user_id= request_body["user_id"], house_id =request_body["house_id"])

    request_body = {
        "msg": "Propiedad agregada a favoritos"
    }


    db.session.add(nueva_casa_favorita)
    db.session.commit()

    return request_body, 200

# //editar posteos ruta protegida

@api.route('/post', methods=['PUT'])
@jwt_required()
def editar_posteos():
    
    request_body = request.get_json(force=True) #obtiene el cuerpo que se envíe por el body desde el postman


    # Accede a la identidad del usuario con get_jwt_identity
    current_user_email = get_jwt_identity()
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user_query = User.query.filter_by(email=email).first()
    
    # if user_query is None:
    #     return {"msg": "Este email no existe"}, 404

    # if email != user_query.email or password != user_query.password:
    #     return {"msg": "Email o contraseña incorrectos"}, 404

    # access_token = create_access_token(identity=email)

    #validamos que exista una casa
    casa_query = House.query.filter_by(id = request_body["house_id"]).first() #id es la propiedad de la tabla House y house_id es el valor que se pasa por URL
    if casa_query is None:
        return jsonify({"msg": "Esta casa no existe"}), 404
    
    #validamos que la casa ya existía para ese usuario
    usuario_query = User.query.filter_by(user_id = request_body["user_id"]).filter_by(house_id =request_body["house_id"]).first() #devuelve los valores que coinciden (del user_id la tabla House)
    if usuario_query:    #la casa existe para ese usuario 
            return jsonify({"msg": "Tienes esta casa, puedes editarla"}), 400

    # response_body = {
    #     "access_token": access_token,
    #     "user": user_query.serialize()
    # }   

    return jsonify("ok"), 200

# documentacion para PUT
# user1 = Person.query.get(person_id)
# if user1 is None:
#     raise APIException('User not found', status_code=404)

# if "username" in body:
#     user1.username = body["username"]
# if "email" in body:
#     user1.email = body["email"]
# db.session.commit()


# perfil de usuario
@api.route("/perfil", methods=["GET"])
@jwt_required()
def perfil():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


#   Eliminar casa de favorito

@api.route('/favoritos/house/<int:casa_id>', methods=['DELETE'])
def eliminar_casa_favorita(casa_id):

    request_body = request.get_json(force=True) #obtiene el cuerpo que se envíe por el body desde el postman

# validar que exista el usuario
    user_query = User.query.filter_by(id=request_body["user_id"]).first()
    if user_query is None:
        return jsonify({"msg": "el usuario no está registrado"}), 404

 #validamos que exista la casa
    casa_query = House.query.filter_by(id = casa_id).first() #id es la propiedad de la tabla House y house_id es el valor que se pasa por URL
    if casa_query is None:
        return jsonify({"msg": "La casa no existe"}), 404

#validamos que la casa ya existía como favorita
    fav_query = Favorites.query.filter_by(user_id = request_body["user_id"]).filter_by(house_id =casa_id).first() #devuelve los valores que coinciden (del user_id la tabla Favoritos) con el body del postman
    if fav_query is None:
        return jsonify({"msg": "El favorito no existe"}), 404


    db.session.delete(fav_query)
    db.session.commit()

    request_body = {
        "msg": "Casa eliminada de favoritos"
    }
    
    return jsonify(request_body), 200



@api.route("/post", methods=['POST'])
def save_post():

    house = House(
        id = request.json.get("id", None),
        title = request.json.get("title", None),
        category = request.json.get("category", None),
        image_id = request.json.get("image_id", None),
        user_id = request.json.get("user_id", None),
        location = request.json.get("location", None),
        number_of_rooms = request.json.get("number_of_rooms", None),
        number_of_bathrooms = request.json.get("number_of_bathrooms", None),
        parking = request.json.get("parking", None),
        wifi = request.json.get("wifi", None),
        virified_account = request.json.get("virified_account", None),
        price = request.json.get("price", None)
    )

    db.session.add(house)
    db.session.commit()

    return jsonify(house.serialize()), 200

@api.route("/post/<int:id>", methods=['DELETE'])
def deleteHouse(id):
    house = House.query.filter_by(id = id).first()
    is_removed = False
    print(house)

    if house == None:
        return jsonify({ "msg": "The house dosen´t exist" }), 404

    if house != []:
        db.session.delete(house)
        db.session.commit()
        is_removed = True

    return jsonify({ "is_removed": is_removed }), 200

@api.route("/gethouses/rent", methods=['GET'])
def getHousesToRent():
    alquiler = House.query.filter_by(category="Alquiler")
    response = list(map(lambda user: user.serialize(), alquiler))
    
    return jsonify({ "results": response }), 200

@api.route("/gethouses/sell", methods=['GET'])
def getHousesToBuy():
    alquiler = House.query.filter_by(category="Venta")
    response = list(map(lambda user: user.serialize(), alquiler))
    
    return jsonify({ "results": response }), 200

@api.route("/gethouse/<int:id>", methods=['GET'])
def getOneSingleHouse(id):
    house = House.query.filter_by(id = id).first()
    return jsonify({ "results": house.serialize() }), 200