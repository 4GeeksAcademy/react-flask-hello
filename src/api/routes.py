from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuarios, Admins, Negocios, Servicios, Clientes, Nota, Pagos, Citas, Calendario, Problemas, HistorialDeServicios
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)



# CRUD USUARIO/ADMIN,NEGOCIO, CLIENTES, SERVICIO, CITA,  PAGO, NOTA

# -----------------------RUTAS USUARIOS, ADMIN-------------------


@api.route('/admins', methods=['GET'])
def obtener_admins():

    admins = Admins.query.all()
    serialized_admins = [admin.serialize_admins() for admin in admins]
    return jsonify(serialized_admins)


@api.route('/usuarios', methods=['GET'])
def obtener_usuarios():

    usuarios = Usuarios.query.all()
    serialized_usuarios = [usuario.serialize_usuario() for usuario in usuarios]
    return jsonify(serialized_usuarios), 200


@api.route('/usuarios/<int:usuario_id>', methods=['GET'])
def obtener_usuario(usuario_id):

    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "usuario no encontrado"}), 404

    return jsonify(usuario.serialize_usuario()), 200


@api.route('/usuarios', methods=['POST'])
def agregar_usuario():

    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "username",
        "password_hash",
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

    try:
        nuevo_usuario = Usuarios(
            username=data["username"],
            password=data["password_hash"],
            negocio=data["negocio_cif"],
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


@api.route('/usuarios', methods=['PUT'])
def actualizar_usuario():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    campos_requeridos = ["username", "password_hash", "negocio_cif", "rol"]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"El campo {campo} es obligatorio"}), 400

    usuario_existente = Usuarios.query.filter_by(
        username=data["username"]).first()

    if not usuario_existente:
        return jsonify({"error": "Usuario no encontrado"}), 404

    negocio_existente = Negocio.query.filter_by(
        negocio_cif=data["negocio_cif"]).first()
    if not negocio_existente:
        return jsonify({"error": "Negocio no encontrado"}), 404

    try:
        usuario_existente.username = data["username"]
        usuario_existente.rol = data["rol"]
        usuario_existente.negocio = negocio_existente

        if "password_hash" in data:
            usuario_existente.set_password(data["password_hash"])

        db.session.commit()
        return jsonify({
            "msg": "Usuario actualizado con éxito",
            "Usuario": usuario_existente.serialize_usuario()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/usuarios/<string:username>', methods=['DELETE'])
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


# -----------------------------------------RUTAS PARA CLIENTES ----------------------

@api.route('/clientes', methods=['GET'])
def obtener_clientes():

    clientes = Clientes.query.all()
    serialized_clientes = [cliente.serialize_clientes() for cliente in clientes]
    return jsonify(serialized_clientes), 200


@api.route('/clientes/<int:cliente_id>', methods=['GET'])
def obtener_cliente(cliente_id):

    cliente = Clientes.query.get(cliente_id)
    if not cliente:
        return jsonify({"error": "cliente no encontrado"}), 404

    return jsonify(cliente.serialize_clientes()), 200


@api.route('/clientes', methods=['POST'])
def agregar_cliente():

    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [

        "nombre",
        "dirección",
        "telefono",
        "cliente_dni",
        "email",
        "servicio"
    ]
    
    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    cliente_existente = Clientes.query.filter_by(cliente_dni=data["cliente_dni"]).first()
    
    if cliente_existente:
        return jsonify({"error": "el cliente ya existe"}), 400

    try:
        
        nuevo_cliente = Clientes(
        nombre=data["nombre"],
        dirección=data["dirección"],
        telefono=data["telefono"],
        cliente_dni=data["cliente_dni"],
        email=data["email"],
        servicio=data["servicio"]
    )
        db.session.add(nuevo_cliente)
        db.session.commit()

        return jsonify({
            "msg": "Cliente creado con éxito",
            "Cliente": nuevo_cliente.serialize_cliente()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500


@api.route('/clientes', methods=['PUT'])
def actualizar_cliente():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    cliente_existente = Clientes.query.filter_by(
        cliente_dni=data["cliente_dni"]).first()

    if not cliente_existente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    servicio_existente = Servicio.query.filter_by(
        nombre=data["nombre"]).first()
    
    if not servicio_existente:
        return jsonify({"error": "Servicio no encontrado"}), 404

    try:

        cliente_existente.nombre = data.get("nombre", cliente_existente.nombre)
        cliente_existente.direccion = data.get("direccion", cliente_existente.direccion)
        cliente_existente.telefono = data.get("telefono", cliente_existente.telefono)
        cliente_existente.email = data.get("email", cliente_existente.email)
        cliente_existente.servicio_id = servicio_existente.id

        db.session.commit()
        
        return jsonify({
            "msg": "Cliente actualizado con éxito",
            "Usuario": cliente_existente.serialize_clientes()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/clientes/<int:cliente_id>', methods=['DELETE'])
def borrar_cliente(cliente_id):

    cliente = Clientes.query.filter_by(id = cliente_id).first()

    if not cliente:
        return jsonify({
            "error": "cliente no encontrado"
        }), 404

    try:
        db.session.delete(cliente)
        db.session.commit()

        return jsonify({
            "msg": "Cliente borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
   

@api.route('/negocios', methods=['GET'])
def obtener_negocios():

    negocios = Negocios.query.all()
    serialized_negocio = [negocio.serialize_negocio() for negocio in negocios]
    return jsonify(serialized_negocio), 200


@api.route('/negocios/<string:negocios_cif>', methods=['GET'])
def obtener_negocio(negocios_cif):

    negocio = Clientes.query.get(negocios_cif)
    if not negocio:
        return jsonify({"error": "negocio no encontrado"}), 404

    return jsonify(negocio.serialize_negocio()), 200


@api.route('/negocios', methods=['POST'])
def agregar_negocio():

    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "nombre",
        "CIF",
        "CP",
    ]
    
    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    negocio_existente = Negocios.query.filter_by(
        negocio_cif=data["CIF"]).first()
    
    if negocio_existente:
        return jsonify({"error": "el negocio ya existe"}), 400

    try:
        
        nuevo_negocio = Negocios(
            nombre=data["nombre"],
            CIF=data["CIF"],
            CP=data["CP"], 
        )

        db.session.add(nuevo_negocio)
        db.session.commit()

        return jsonify({
            "msg": "negocio creado con éxito",
            "negocio": nuevo_negocio.serialize_negocio()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500


@api.route('/negocios', methods=['PUT'])
def actualizar_negocio():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    negocio_existente = Negocios.query.filter_by(
        negocio_cif=data["CIF"]).first()

    if not negocio_existente:
        return jsonify({"error": "negocio no encontrado"}), 404
    

    try:

        negocio_existente.nombre_negocio = data.get("nombre", negocio_existente.nombre_negocio)
        negocio_existente.negocio_cp = data.get("CP", negocio_existente.negocio_cp)
        
        db.session.commit()
        
        return jsonify({
            "msg": "Negocio actualizado con éxito",
            "Negocio": negocio_existente.serialize_negocio()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/negocios/<string:negocio_cif>', methods=['DELETE'])
def borrar_negocio(negocio_cif):

    negocio = Negocios.query.filter_by(negocio_cif = negocio_cif).first()

    if not negocio:
        return jsonify({
            "error": "negocio no encontrado"
        }), 404

    try:
        db.session.delete(negocio)
        db.session.commit()

        return jsonify({
            "msg": "Negocio borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    

 # ---------------------NOS QUEDA PAGOS, SERVICIO, HISTORIAL, CITAS, CALENDARIO, PROBLEMAS