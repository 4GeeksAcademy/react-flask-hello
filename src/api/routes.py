"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint #url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from api.models import db, User, Objetivo, Articulo
from api.utils import generate_sitemap, APIException

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
    new_user.is_active = True

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado con éxito"}), 201
#Endpoind de iniciar sesion ya sea con username o email
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

    db.session.commit()
    return jsonify({"msg": "Detalles del usuario actualizados correctamente"}), 200
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

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "Usuario eliminado"}), 200
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
    

@api.route('/objetivos', methods=['POST'])
@jwt_required()
def crear_objetivo():
    data = request.get_json()
    user_id = get_jwt_identity()
    objetivo = Objetivo(
        titulo=data['titulo'],
        descripcion=data.get('descripcion'),
        cantidad_meta=data['cantidad_meta'],
        fecha_limite=datetime.strptime(data['fecha_limite'], '%Y-%m-%d'),
        user_id=user_id
    )
    db.session.add(objetivo)
    db.session.commit()
    return jsonify({"msg": "Objetivo creado"}), 201

@api.route('/objetivos', methods=['GET'])
@jwt_required()
def listar_objetivos():
    user_id = get_jwt_identity()
    objetivos = Objetivo.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": o.id, "titulo": o.titulo, "cantidad_meta": o.cantidad_meta,
        "fecha_limite": o.fecha_limite.isoformat(), "completado": o.completado
    } for o in objetivos]), 200

@api.route('/objetivos/<int:id>', methods=['PUT'])
@jwt_required()
def editar_objetivo(id):
    data = request.get_json()
    objetivo = Objetivo.query.get(id)
    if objetivo:
        objetivo.titulo = data.get('titulo', objetivo.titulo)
        objetivo.descripcion = data.get('descripcion', objetivo.descripcion)
        objetivo.cantidad_meta = data.get('cantidad_meta', objetivo.cantidad_meta)
        objetivo.fecha_limite = datetime.strptime(data['fecha_limite'], '%Y-%m-%d')
        db.session.commit()
        return jsonify({"msg": "Objetivo actualizado"}), 200
    return jsonify({"msg": "No encontrado"}), 404

@api.route('/objetivos/<int:id>/cerrar', methods=['PUT'])
@jwt_required()
def cerrar_objetivo(id):
    objetivo = Objetivo.query.get(id)
    if objetivo:
        objetivo.completado = True
        db.session.commit()
        return jsonify({"msg": "Objetivo cerrado"}), 200
    return jsonify({"msg": "No encontrado"}), 404


@api.route('/inversiones', methods=['GET'])
def listar_articulos():
    articulos = Articulo.query.all()
    return jsonify([{
        "id": a.id, "titulo": a.titulo, "texto": a.texto[:120] + "...",
        "url_imagen": a.url_imagen, "enlace": a.enlace
    } for a in articulos]), 200

@api.route('/inversiones/<int:id>', methods=['GET'])
def detalle_articulo(id):
    a = Articulo.query.get(id)
    if not a:
        return jsonify({"msg": "Artículo no encontrado"}), 404
    return jsonify({
        "id": a.id, "titulo": a.titulo, "texto": a.texto,
        "url_imagen": a.url_imagen, "enlace": a.enlace
    }), 200