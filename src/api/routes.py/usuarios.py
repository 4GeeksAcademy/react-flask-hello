from flask import Blueprint, request, jsonify
from ..models import db, Usuarios, Admins, Negocios
from flask_jwt_extended import jwt_required

usuarios_routes = Blueprint('usuarios_routes', __name__, url_prefix='/api')

@usuarios_routes.route('/admins', methods=['GET'])
# @jwt_required()
def obtener_admins():
    admins = Admins.query.all()
    serialized_admins = [admin.serialize_admins() for admin in admins]
    return jsonify(serialized_admins)

@usuarios_routes.route('/usuarios', methods=['GET'])
# @jwt_required()
def obtener_usuarios():
    usuarios = Usuarios.query.all()
    serialized_usuarios = [usuario.serialize_usuario() for usuario in usuarios]
    return jsonify(serialized_usuarios), 200

@usuarios_routes.route('/usuarios/<int:usuario_id>', methods=['GET'])
# @jwt_required()
def obtener_usuario(usuario_id):
    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "usuario no encontrado"}), 404
    return jsonify(usuario.serialize_usuario()), 200

@usuarios_routes.route('/usuarios', methods=['POST'])
# @jwt_required()
def agregar_usuario():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "username",
        "password",
        "negocio_cif",
        "rol",
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    usuario_existente = Usuarios.query.filter_by(
        username=data["username"]).first()
    if usuario_existente:
        return jsonify({"error": "el usuario ya existe"}), 400

    negocio = Negocios.query.filter_by(negocio_cif=data["negocio_cif"]).first()
    if not negocio:
        return jsonify({"error": "el negocio con ese CIF no existe"}), 400

    roles_permitidos = {"master", "jefe", "empleado"}
    if data["rol"] not in roles_permitidos:
        return jsonify({"error": "Rol inválido. Los valores permitidos son: master, jefe, empleado"}), 400

    data["rol"] = data["rol"].lower()

    try:
        nuevo_usuario = Usuarios(
            username=data["username"],
            password=data["password"],
            negocio_cif=data["negocio_cif"],
            rol=data["rol"]
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({
            "msg": "Usuario creado con éxito",
            "Usuario": nuevo_usuario.serialize_usuario()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@usuarios_routes.route('/usuarios', methods=['PUT'])
# @jwt_required()
def actualizar_usuario():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    campos_requeridos = ["username", "password", "negocio_cif", "rol"]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"El campo {campo} es obligatorio"}), 400

    usuario_existente = Usuarios.query.filter_by(
        username=data["username"]).first()

    if not usuario_existente:
        return jsonify({"error": "Usuario no encontrado"}), 404

    negocio_existente = Negocios.query.filter_by(
        negocio_cif=data["negocio_cif"]).first()
    if not negocio_existente:
        return jsonify({"error": "Negocio no encontrado"}), 404

    try:
        usuario_existente.username = data["username"]
        usuario_existente.rol = data["rol"]
        usuario_existente.negocio_cif = data["negocio_cif"]
        usuario_existente.password = data["password"]

        if "password" in data:
            usuario_existente.set_password(data["password"])

        db.session.commit()
        return jsonify({
            "msg": "Usuario actualizado con éxito",
            "Usuario": usuario_existente.serialize_usuario()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@usuarios_routes.route('/usuarios/<string:username>', methods=['DELETE'])
# @jwt_required()
def borrar_usuario(username):
    usuario = Usuarios.query.filter_by(username=username).first()

    if not usuario:
        return jsonify({
            "error": "usuario no encontrado"
        }), 404

    try:
        db.session.delete(usuario)
        db.session.commit()

        return jsonify({
            "msg": "Usuario borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500