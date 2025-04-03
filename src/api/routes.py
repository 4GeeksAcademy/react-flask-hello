from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuarios, Admins, Negocios, Servicios, Clientes, Notas, Pagos, Citas, Calendario, Problemas, HistorialDeServicios
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import func


api = Blueprint('api', __name__)

CORS(api)


# ------------------- POST PARA EL TOKEN AL LOGEARTE-------------

@api.route('/login', methods=['POST'])
def crear_token():

    data = request.get_json()

    campos_requeridos = ['username', 'password']
    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"Error": f"el campo {campo} es obligatorio"}), 400

    usuario_existente = Usuarios.query.filter_by(
        username=data['username']).first()

    if not usuario_existente or not usuario_existente.check_password(data['password']):
        return jsonify({"error": "credencial incorrecta"}), 401

    token_acceso = create_access_token(identity=str(usuario_existente.id))

    return jsonify({
        "token_acceso": token_acceso,
        "usuario": usuario_existente.serialize_usuario()
    }), 200

# CRUD USUARIO/ADMIN,NEGOCIO, CLIENTES, SERVICIO, CITA,  PAGO, NOTA

# -----------------------RUTAS USUARIOS, ADMIN-------------------


@api.route('/admins', methods=['GET'])
@jwt_required()
def obtener_admins():

    admins = Admins.query.all()
    serialized_admins = [admin.serialize_admins() for admin in admins]
    return jsonify(serialized_admins)


@api.route('/usuarios', methods=['GET'])
@jwt_required()
def obtener_usuarios():

    usuarios = Usuarios.query.all()
    serialized_usuarios = [usuario.serialize_usuario() for usuario in usuarios]
    return jsonify(serialized_usuarios), 200


@api.route('/usuarios/<int:usuario_id>', methods=['GET'])
@jwt_required()
def obtener_usuario(usuario_id):

    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "usuario no encontrado"}), 404

    return jsonify(usuario.serialize_usuario()), 200


@api.route('/usuarios', methods=['POST'])
@jwt_required()
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
@jwt_required()
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

    negocio_existente = Negocios.query.filter_by(
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
@jwt_required()
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
@jwt_required()
def obtener_clientes():

    clientes = Clientes.query.all()
    serialized_clientes = [cliente.serialize_clientes()
                           for cliente in clientes]
    return jsonify(serialized_clientes), 200


@api.route('/clientes/<int:cliente_id>', methods=['GET'])
@jwt_required()
def obtener_cliente(cliente_id):

    cliente = Clientes.query.get(cliente_id)
    if not cliente:
        return jsonify({"error": "cliente no encontrado"}), 404

    return jsonify(cliente.serialize_clientes()), 200


@api.route('/clientes', methods=['POST'])
@jwt_required()
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

    cliente_existente = Clientes.query.filter_by(
        cliente_dni=data["cliente_dni"]).first()

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
@jwt_required()
def actualizar_cliente():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    cliente_existente = Clientes.query.filter_by(
        cliente_dni=data["cliente_dni"]).first()

    if not cliente_existente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    servicio_existente = Servicios.query.filter_by(
        nombre=data["nombre"]).first()

    if not servicio_existente:
        return jsonify({"error": "Servicio no encontrado"}), 404

    try:

        cliente_existente.nombre = data.get("nombre", cliente_existente.nombre)
        cliente_existente.direccion = data.get(
            "direccion", cliente_existente.direccion)
        cliente_existente.telefono = data.get(
            "telefono", cliente_existente.telefono)
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
@jwt_required()
def borrar_cliente(cliente_id):

    cliente = Clientes.query.filter_by(id=cliente_id).first()

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
@jwt_required()
def obtener_negocios():

    negocios = Negocios.query.all()
    serialized_negocio = [negocio.serialize_negocio() for negocio in negocios]
    return jsonify(serialized_negocio), 200


@api.route('/negocios/<string:negocios_cif>', methods=['GET'])
@jwt_required()
def obtener_negocio(negocios_cif):

    negocio = Negocios.query.get(negocios_cif)
    if not negocio:
        return jsonify({"error": "negocio no encontrado"}), 404

    return jsonify(negocio.serialize_negocio()), 200


@api.route('/negocios', methods=['POST'])
@jwt_required()
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
@jwt_required()
def actualizar_negocio():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    negocio_existente = Negocios.query.filter_by(
        negocio_cif=data["CIF"]).first()

    if not negocio_existente:
        return jsonify({"error": "negocio no encontrado"}), 404

    try:

        negocio_existente.nombre_negocio = data.get(
            "nombre", negocio_existente.nombre_negocio)
        negocio_existente.negocio_cp = data.get(
            "CP", negocio_existente.negocio_cp)

        db.session.commit()

        return jsonify({
            "msg": "Negocio actualizado con éxito",
            "Negocio": negocio_existente.serialize_negocio()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/negocios/<string:negocio_cif>', methods=['DELETE'])
@jwt_required()
def borrar_negocio(negocio_cif):

    negocio = Negocios.query.filter_by(negocio_cif=negocio_cif).first()

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

 # ---------------------SERVICIO


@api.route('/servicios', methods=['GET'])
@jwt_required()
def obtener_servicios():

    servicios = Servicios.query.all()
    serialized_servicio = [servicio.serialize_servicio()
                           for servicio in servicios]
    return jsonify(serialized_servicio), 200


@api.route('/servicios/<string:nombre>', methods=['GET'])
@jwt_required()
def obtener_servicio(nombre):

    Servicio = Servicios.query.filter_by(nombre=nombre).first()
    if not Servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    return jsonify(Servicio.serialize_servicio()), 200


@api.route('/servicios', methods=['POST'])
@jwt_required()
def agregar_servicio():

    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "nombre",
        "descripcion",
        "precio",
        "negocio_id"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    servicio_existente = Servicios.query.filter_by(
        nombre=data["nombre"]).first()

    if servicio_existente:
        return jsonify({"error": "el servicio ya existe"}), 400

    try:

        nuevo_servicio = Servicios(
            nombre=data["nombre"],
            descripcion=data["descripcion"],
            precio=data["precio"],
            negocio_id=data["negocio_id"]
        )

        db.session.add(nuevo_servicio)
        db.session.commit()

        return jsonify({
            "msg": "servicio creado con éxito",
            "servicio": nuevo_servicio.serialize_servicio()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500


@api.route('/servicios/<string:nombre_servicio>', methods=['PUT'])
@jwt_required()
def actualizar_servicio(nombre_servicio):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Data no encontrada"}), 400

    servicio_existente = Servicios.query.filter_by(
        nombre=nombre_servicio).first()

    if not servicio_existente:
        return jsonify({"error": "Servicio no encontrado"}), 404

    try:
        servicio_existente.descripcion = data.get(
            "descripcion", servicio_existente.descripcion)
        servicio_existente.precio = data.get(
            "precio", servicio_existente.precio)

        db.session.commit()

        return jsonify({
            "msg": "Servicio actualizado con éxito",
            "servicio": servicio_existente.serialize_servicio()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/servicios/<string:nombre_servicio>', methods=['DELETE'])
@jwt_required()
def borrar_servicio(nombre_servicio):

    servicio = Servicios.query.filter_by(nombre=nombre_servicio).first()

    if not servicio:
        return jsonify({
            "error": "servicio no encontrado"
        }), 404

    try:
        db.session.delete(servicio)
        db.session.commit()

        return jsonify({
            "msg": "servicio borrado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# --------------------------PAGOS------------------


@api.route('/pagos', methods=['GET'])
@jwt_required()
def obtener_pagos():

    pagos = Pagos.query.all()
    serialized_pagos = [pago.serialize_servicio() for pago in pagos]
    return jsonify(serialized_pagos), 200


@api.route('/pagos/<int:cliente_id>', methods=['GET'])
@jwt_required()
def obtener_pago(cliente_id):

    pagos = Pagos.query.filter_by(cliente_id=cliente_id)
    if not pagos:
        return jsonify({"error": "pago no encontrado"}), 404

    return jsonify(pagos.serialize_pago()), 200


@api.route('/pagos', methods=['POST'])
@jwt_required()
def agregar_pago():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "nombre_cliente",
        "metodo_pago",
        "total_estimado",
        "pagos_realizados",
        "pagos_pendientes",
        "fecha_pago",
        "estado"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    try:
        cliente = Clientes.query.filter_by(
            nombre=data["nombre_cliente"]).first()
        if not cliente:
            return jsonify({"error": "Cliente no encontrado"}), 404

        nuevo_pago = Pagos(
            cliente_id=cliente.id,
            nombre_cliente=cliente.nombre,
            metodo_pago=data["metodo_pago"],
            total_estimado=data["total_estimado"],
            pagos_realizados=data["pagos_realizados"],
            pagos_pendientes=data["pagos_pendientes"],
            fecha_pago=data["fecha_pago"],
            estado=data["estado"]
        )

        db.session.add(nuevo_pago)
        db.session.commit()

        return jsonify({
            "msg": "Pago registrado con éxito",
            "pago": nuevo_pago.serialize_pago()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    # -----------------------------Cita-----------------


@api.route('/citas', methods=['GET'])
@jwt_required()
def obtener_citas():

    citas = Citas.query.all()
    serialized_citas = [cita.serialize_cita() for cita in citas]
    return jsonify(serialized_citas), 200


@api.route('/citas/<int:cliente_id>', methods=['GET'])
@jwt_required()
def obtener_cita_cliente(cliente_id):

    citas = Citas.query.filter_by(cliente_id=cliente_id).all()

    if not citas:
        return jsonify({"error": "citas no encontradas"}), 404

    return jsonify(citas.serialize_cita()), 200


@api.route('/citas', methods=['POST'])
@jwt_required()
def agregar_cita():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No se proporcionaron datos en la solicitud"}), 400 

    campos_requeridos = [
        "email_cliente",
        "fecha_hora",
        "nombre_usuario",
        "nombre_servicio"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400
    
    try:
        fecha_hora = datetime.fromisoformat(data["fecha_hora"].replace('Z', '+00:00'))

        if fecha_hora < datetime.now():
            return jsonify({"error": "no se pueden agendar citas en fechas pasadas"}), 400
        
    except ValueError:
        return jsonify({"error": "Formato de fecha y hora inválido. Use formato ISO (YYYY-MM-DDTHH:MM:SS)"}), 400

    cliente = Clientes.query.filter_by(email=data["email_cliente"]).first()
    if not cliente:
        return jsonify({"error": "el cliente no ha sido encontrado"}), 404

    servicio = Servicios.query.filter_by(nombre=data["nombre_servicio"]).first()
    if not servicio:
        return jsonify({"error": "el servicio no ha sido encontrado"}), 404

    usuario = Usuarios.query.filter_by(username=data["nombre_usuario"]).first()
    if not usuario:
        return jsonify({"error": "el usuario no ha sido encontrado"}), 404
    
    fecha_solo = fecha_hora.date()

    citas_del_dia = Citas.query.filter(
        Citas.usuario_id == usuario.id,
        func.date(Citas.fecha_hora) == fecha_solo
    ).count()

    MAX_CITAS_DIARIAS = 6  

    if citas_del_dia >= MAX_CITAS_DIARIAS:
        return jsonify({
            "error": f"el usuario ya tiene {MAX_CITAS_DIARIAS} citas programadas para este día, ha alcanzado el límite diario"
        }), 409

    cita_existente_usuario = Citas.query.filter_by(
        usuario_id=usuario.id,
        fecha_hora=fecha_hora
    ).first()
        
    if cita_existente_usuario:
        return jsonify({"error": "el usuario ya tiene una cita agendada para esta fecha y hora"}), 409 

    cita_cliente = Citas.query.filter_by(
        cliente_id=cliente.id,
        fecha_hora=fecha_hora
    ).first()

    if cita_cliente:
        return jsonify({"error": "el cliente ya tiene una cita agendada para esta fecha y hora"}), 409

    try:
        nueva_cita = Citas(
            usuario_id=usuario.id,
            cliente_id=cliente.id,
            servicio_id=servicio.id,
            fecha_hora=fecha_hora,
            estado="pendiente"
        )

        db.session.add(nueva_cita)
        db.session.commit()

        return jsonify({
            "msg": "Cita registrada con éxito",
            "cita": nueva_cita.serialize_cita()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/citas/<int:cita_id>', methods=['PUT'])
@jwt_required()
def actualizar_cita(cita_id):

    data = request.get_json()

    if not data:
         return jsonify({"error": "Data no encontrada"}), 400

    cita_existente = Citas.query.get(cita_id)

    if not cita_existente:
         return jsonify({"error": "cita no encontrado"}), 404

    servicio = Servicios.query.filter_by(
         nombre=data.get("nombre_servicio")).first()
    
    if not servicio:
        return jsonify({"error": "servicio no encontrado"}), 404
        
    usuario = Usuarios.query.filter_by(username = data.get("nombre_usuario")).first()

    if not usuario:
        return jsonify({"error":"Usuario no encotrado"}), 404
    
    try:

        cita_existente.fecha_hora = data.get(
            "fecha_hora", cita_existente.fecha_hora)
        cita_existente.nombre_servicio = data.get(
            "nombre_servicio", cita_existente.nombre_servicio)
        cita_existente.nombre_usuario = data.get(
            "nombre_usuario", cita_existente.nombre_usuario)

        db.session.commit()

        return jsonify({
             "msg": "cita actualizada con éxito",
             "cita": cita_existente.serialize_cita()
         }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/citas/<int:citas_id>', methods=['DELETE'])
@jwt_required()
def borrar_cita(citas_id):

     cita = Citas.query.filter_by(id=citas_id).first()

     if not cita:
         return jsonify({
             "error": "cita no encontrada"
         }), 404

     try:
         db.session.delete(cita)
         db.session.commit()

         return jsonify({
             "msg": "cita borrada correctamente"
         }), 200
     except Exception as e:
         db.session.rollback()
         return jsonify({"error": str(e)}), 500

# -----------------------------Notas-----------------


@api.route('/notas', methods=['GET'])
@jwt_required()
def obtener_notas():

    notas = Notas.query.all()

    if not notas:
        return jsonify({"error": "notas no encontradas"}), 404
    
    serialized_nota = [nota.serialize_servicio() for nota in notas]
    return jsonify(serialized_nota), 200


@api.route('/notas/<int:cliente_id>', methods=['GET'])
@jwt_required()
def obtener_notas_cliente(cliente_id):

    notas = Notas.query.filter_by(cliente_id).all()
    
    if not notas:
        return jsonify({"msg": "notas no encontradas"}), 200

    return jsonify(notas.serialize_nota()), 200


@api.route('/notas', methods=['POST'])
@jwt_required()
def agregar_nota():

    data = request.get_json()
    
    if not data:
        return jsonify({"error": "data no encontrada"}), 404
    
    campos_requeridos = [
        "nombre_cliente",
        "email_cliente",
        "descripcion",
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    try:
        cliente = Clientes.query.filter_by(
            email=data["email_cliente"]).first()
            
        if not cliente:
            return jsonify({"error": "cliente no encontrado"}), 404

        nueva_nota = Notas(
            cliente_id=cliente.id,
            nombre_cliente=cliente.nombre,
            descripcion = data["descripcion"]
        )

        db.session.add(nueva_nota)
        db.session.commit()

        return jsonify({
            "msg": "nota registrada con éxito",
            "pago": nueva_nota.serialize_nota()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/notas/<int:cliente_id>', methods=['DELETE'])
@jwt_required()
def borrar_nota(cliente_id):

    nota = Notas.query.filter_by(cliente_id=cliente_id).first()

    if not nota:
        return jsonify({
            "error": "nota no encontrada"
        }), 404

    try:
        db.session.delete(nota)
        db.session.commit()

        return jsonify({
            "msg": "nota borrada correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# NOS QUEDA HISTORIAL, CALENDARIO, PROBLEMAS
