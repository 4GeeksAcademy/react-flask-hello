"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint #url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from api.models import db, User, Gasto#, Objetivo, Articulo
from api.utils import generate_sitemap, APIException
import requests

api = Blueprint('api', __name__)
CORS(api)
""" @api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "msg": "¡Hola! Soy un mensaje que vino del backend, consulte la pestaña de red en el Inspector de Google y verá la solicitud GET"
    }

    return jsonify(response_body), 200 """

#Endpoint de registrar al usuario
@api.route("/user/register", methods=['POST'])
def register():
    body = request.get_json()

    new_user = User()
    new_user.username = body["username"]
    new_user.email = body["email"]
    new_user.set_password(body["password"])  # Usar el método para hashear la contraseña
    """ new_user.firstname = body["firstname"]
    new_user.lastname = body["lastname"]
    new_user.country = body["country"]
    new_user.phone = body["phone"] """
    new_user.is_active = True
    
    db.session.add(new_user)
    db.session.commit()
    
    try:
        # Preparar los datos para la solicitud a la API de gastos
        gasto_data = {
            "user_id": new_user.id,
            "sueldo": body["sueldo"],
            "is_student": body["is_student"],
        }
        # Enviar solicitud POST a la API de gastos
        response = requests.post("http://localhost:3001/api/gasto/register", json=gasto_data)
        response_data = response.json()
        access_token = create_access_token(identity=str(new_user.id))
        return jsonify({"msg": "Usuario registrado con éxito", """ "gasto": response_data, """ "token": access_token}), 201
    except requests.exceptions.RequestException as e:
        return jsonify({"msg": "Error al registrar el usuario", "error": str(e)}), 500
#Endpoint de iniciar sesion ya sea con username o email
@api.route("/user/login", methods=['POST'])
def login():
    body = request.get_json()
    try:
        if 'username' in body:
            login_user = body['username']
        if 'email' in body:
            login_user = body['email']
        password = body.get("password")
        user = User.query.filter((User.username == login_user) | (User.email == login_user)).first()

        if user and user.check_password(password):
            access_token = create_access_token(identity=str(user.id))
            return jsonify({"token":access_token}), 200
    except:
        print("Something went wrong")
    return jsonify({"msg": "username/email o contraseña equivocados"}), 401

#Con el Token devolver el usuario
@api.route('/user/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"msg":"Usuario no encontrado"}), 404
    return jsonify({"user":user.serialize()}), 200

#Modificar el username o el email
@api.route("/user/update", methods=['PUT'])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    body = request.get_json()
    if 'username' in body:
        user.username = body['username']
    if 'email' in body:
        user.email = body['email']
    if 'firstname' in body:
        user.firstname = body['firstname']
    if 'lastname' in body:
        user.lastname = body['lastname']
    if 'country' in body:
        user.country = body['country']
    if 'phone' in body:
        user.phone = body['phone']

    db.session.commit()
    try:
        gasto_data={
            "user_id": user.id,
            "sueldo": body.get("sueldo", user.gasto.sueldo if user.gasto else None),
            "is_student": body.get("is_student", user.gasto.is_student if user.gasto else None),
        }
        response = requests.put("http://localhost:3001/api/gasto/update", json=gasto_data)
        response_data = response.json()
        return jsonify({"msg": "Detalles del usuario actualizados correctamente", "gasto": response_data}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"msg": "Error al actualizar el gasto", "error": str(e)}), 500
    #return jsonify({"msg": "Detalles del usuario actualizados correctamente"}), 200

# Endpoint para modificar la contraseña
@api.route("/user/change-password", methods=['PUT'])
@jwt_required()
def change_password():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    body = request.get_json()
    if 'old_password' not in body or 'new_password' not in body:
        return jsonify({"msg": "Se requieren tanto Old_Password como New_Password"}), 400

    if user.check_password(body['old_password']):
        user.set_password(body['new_password'])
        db.session.commit()
        return jsonify({"msg": "Contraseña actualizada correctamente"}), 200

    return jsonify({"msg": "La contraseña actual es incorrecta"}), 401

#Endpoind de iniciar sesion solo con email
@api.route("/user/forgotten", methods=['POST'])
def forgotten():
    body = request.get_json()
    login_user = body['email']
    user = User.query.filter(User.email == login_user).first()
    if user is not None:
            access_token = create_access_token(identity=str(user.id))
            return jsonify({"token":access_token}), 200
    return jsonify({"msg":"Usuario no encontrado"}), 404

# Endpoint para modificar la contraseña a la nueva contraseña
@api.route("/user/new-password", methods=['PUT'])
@jwt_required()
def new_password():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    body = request.get_json()
    user.set_password(body['password'])
    db.session.commit()
    return jsonify({"msg": "Contraseña actualizada correctamente"}), 401
    #return jsonify({"msg": "La contraseña actual es incorrecta"}), 401
    
# Endpoint para eliminar el usuario
@api.route("/user/delete", methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    try:
        gasto_data={
            "user_id": user.id
        }
        response = requests.post("http://localhost:3001/api/gasto/delete", json=gasto_data)
        response_data = response.json()
        return jsonify({"msg": "Usuario eliminado", "gasto": response_data}), 200
        db.session.delete(user)
        db.session.commit()
    except requests.exceptions.RequestException as e:
        return jsonify({"msg": "Error al actualizar el gasto", "error": str(e)}), 500

@api.route("/user/token", methods=['POST'])
@jwt_required()
def token():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    try:
        access_token = create_access_token(identity=str(user.id))  
        return jsonify({"token": access_token}), 200  
    except Exception as e:
        return jsonify({"msg": "Error al procesar el token", "error": str(e)}), 401
    
""" @api.route("/user/logout", methods=['POST'])
@jwt_required()
def logout():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    user.is_active = False
    db.session.commit()
    return jsonify({"msg": "Usuario desconectado exitosamente"}), 200 """



@api.route("/gasto/register", methods=['POST'])
def g_register():
    body = request.get_json()

    new_gasto = Gasto()
    new_gasto.user_id = body["user_id"]
    new_gasto.sueldo = body["sueldo"]
    new_gasto.is_student = body["is_student"]

    db.session.add(new_gasto)
    db.session.commit()

    return jsonify({"msg": "Gasto registrado con éxito"}), 201

@api.route('/gasto/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    gasto = Gasto.query.get(current_user_id)
    if gasto is None:
        return jsonify({"msg":"Gasto no encontrado"}), 404
    return jsonify({"gasto":gasto.serialize()}), 200

#Modificar el sueldo o el is_student
@api.route("/gasto/update", methods=['PUT'])
@jwt_required()
def update_gasto():
    body = request.get_json()
    gasto = Gasto.query.get(body['user_id'])
    if 'sueldo' in body:
        gasto.sueldo = body['sueldo']
    if 'is_student' in body:
        gasto.is_student = body['is_student']
    if gasto is None:
        return jsonify({"msg": "Gasto no cambiado"}), 200
    db.session.commit()
    return jsonify({"msg": "Detalles del gasto actualizados correctamente"}), 200

# Endpoint para eliminar el gasto
@api.route("/gasto/delete", methods=['DELETE'])
@jwt_required()
def delete_gasto():
    body = request.get_json()
    gasto = Gasto.query.get(body['user_id'])
    if gasto is None:
        return jsonify({"msg": "Gasto no encontrado"}), 404
    db.session.delete(gasto)
    db.session.commit()
    return jsonify({"msg": "Gasto eliminado"}), 200 