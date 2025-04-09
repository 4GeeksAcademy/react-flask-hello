from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, Usuarios, Admins, Negocios, Servicios, Clientes, Notas, Pagos, Citas, Calendario, HistorialDeServicios, ClienteServicio
from .utils import generate_sitemap, APIException
from .api_calendar import GoogleCalendarManager
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
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
# @jwt_required()
def obtener_admins():

    admins = Admins.query.all()
    serialized_admins = [admin.serialize_admins() for admin in admins]
    return jsonify(serialized_admins)


@api.route('/usuarios', methods=['GET'])
# @jwt_required()
def obtener_usuarios():

    usuarios = Usuarios.query.all()
    serialized_usuarios = [usuario.serialize_usuario() for usuario in usuarios]
    return jsonify(serialized_usuarios), 200


@api.route('/usuarios/<int:usuario_id>', methods=['GET'])
# @jwt_required()
def obtener_usuario(usuario_id):

    usuario = Usuarios.query.get(usuario_id)
    if not usuario:
        return jsonify({"error": "usuario no encontrado"}), 404

    return jsonify(usuario.serialize_usuario()), 200


@api.route('/usuarios', methods=['POST'])
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


@api.route('/usuarios', methods=['PUT'])
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


@api.route('/usuarios/<string:username>', methods=['DELETE'])
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


# -----------------------------------------RUTAS PARA CLIENTES ----------------------

@api.route('/clientes', methods=['GET'])
# @jwt_required()
def obtener_clientes():

    clientes = Clientes.query.all()

    serialized_clientes = [cliente.serialize_cliente() for cliente in clientes]

    return jsonify(serialized_clientes), 200


@api.route('/clientes/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_cliente(cliente_id):

    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "cliente no encontrado"}), 404

    return jsonify(cliente.serialize_cliente()), 200


@api.route('/clientes', methods=['POST'])
# @jwt_required()
def agregar_cliente():

    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [

        "nombre",
        "dirección",
        "telefono",
        "cliente_dni",
        "email"
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
        )
        db.session.add(nuevo_cliente)

        if "servicios_ids" in data and isinstance(data["servicios_ids"], list):
            for servicio_id in data["servicios_ids"]:
                servicio = Servicios.query.get(servicio_id)
                if servicio:
                    nuevo_cliente.servicios.append(servicio)

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


@api.route('/clientes/<int:cliente_id>', methods=['PUT'])
# @jwt_required()
def actualizar_cliente(cliente_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    try:

        cliente.nombre = data.get("nombre", cliente.nombre)
        cliente.dirección = data.get("dirección", cliente.dirección)
        cliente.telefono = data.get("telefono", cliente.telefono)
        cliente.email = data.get("email", cliente.email)

        db.session.commit()

        return jsonify({
            "msg": "Cliente actualizado con éxito",
            "Usuario": cliente.serialize_cliente()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/clientes/<int:cliente_id>', methods=['DELETE'])
# @jwt_required()
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


# -------------------------Negocios ------------

@api.route('/negocios', methods=['GET'])
# @jwt_required()
def obtener_negocios():

    negocios = Negocios.query.all()
    serialized_negocio = [negocio.serialize_negocio() for negocio in negocios]
    return jsonify(serialized_negocio), 200


@api.route('/negocios/<string:negocios_cif>', methods=['GET'])
# @jwt_required()
def obtener_negocio(negocios_cif):

    negocio = Negocios.query.filter_by(negocio_cif=negocios_cif).first()
    if not negocio:
        return jsonify({"error": "negocio no encontrado"}), 404

    return jsonify(negocio.serialize_negocio()), 200


@api.route('/negocios', methods=['POST'])
# @jwt_required()
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
            nombre_negocio=data["nombre"],
            negocio_cif=data["CIF"],
            negocio_cp=data["CP"],
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


@api.route('/negocios/<int:negocio_id>', methods=['PUT'])
# @jwt_required()
def actualizar_negocio(negocio_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 400

    negocio_existente = Negocios.query.get(negocio_id)

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


@api.route('/negocios/<string:negocio_id>', methods=['DELETE'])
# @jwt_required()
def borrar_negocio(negocio_id):

    negocio = Negocios.query.get(negocio_id)

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

 # ---------------------SERVICIO ----------------------


@api.route('/servicios', methods=['GET'])
# @jwt_required()
def obtener_servicios():

    servicios = Servicios.query.all()
    serialized_servicio = [servicio.serialize_servicio()
                           for servicio in servicios]
    return jsonify(serialized_servicio), 200


@api.route('/servicios/<string:nombre>', methods=['GET'])
# @jwt_required()
def obtener_servicio(nombre):

    Servicio = Servicios.query.filter_by(nombre=nombre).first()
    if not Servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    return jsonify(Servicio.serialize_servicio()), 200


@api.route('/servicios', methods=['POST'])
# @jwt_required()
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


@api.route('/servicios/varios', methods=['POST'])
# @jwt_required()
def agregar_servicios_varios():

    data = request.get_json()
    if not data or not isinstance(data, list):
        return jsonify({"error": "Se esperaba un arreglo de servicios"}), 400

    campos_requeridos = ["nombre", "descripcion", "precio", "negocio_id"]
    servicios_creados = []
    servicios_existentes = []

    try:
        for servicio_data in data:
            for campo in campos_requeridos:
                if campo not in servicio_data:
                    return jsonify({"error": f"el campo {campo} es obligatorio en uno de los servicios"}), 400

            servicio_existente = Servicios.query.filter_by(
                nombre=servicio_data["nombre"]).first()
            if servicio_existente:
                servicios_existentes.append(servicio_data["nombre"])
                continue

            nuevo_servicio = Servicios(
                nombre=servicio_data["nombre"],
                descripcion=servicio_data["descripcion"],
                precio=servicio_data["precio"],
                negocio_id=servicio_data["negocio_id"]
            )

            db.session.add(nuevo_servicio)
            servicios_creados.append(nuevo_servicio)

        db.session.commit()

        return jsonify({
            "msg": f"{len(servicios_creados)} servicios creados con éxito",
            "servicios_creados": [s.serialize_servicio() for s in servicios_creados],
            "servicios_existentes": servicios_existentes
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500


@api.route('/servicios/<string:nombre_servicio>', methods=['PUT'])
# @jwt_required()
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
# @jwt_required()
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


# ---------------------------RUTAS PARA SERVICIOS DE UN CLIENTE ----------------

@api.route('/clientes/<int:cliente_id>/servicios', methods=['GET'])
# @jwt_required()
def obtener_servicios_cliente(cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "cliente no encontrado"}), 404

    servicios = [servicio.serialize_servicio()
                 for servicio in cliente.servicios]

    return jsonify(servicios), 200

# Asignar un servicio a un cliente


@api.route('/clientes/<int:cliente_id>/servicios', methods=['POST'])
# @jwt_required()
def agregar_servicio_cliente(cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    data = request.get_json()

    if not data or "servicio_id" not in data:
        return jsonify({"error": "Se requiere el ID del servicio"}), 400

    servicio = Servicios.query.get(data["servicio_id"])

    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    # Verificar si el cliente ya tiene este servicio
    if servicio in cliente.servicios:
        return jsonify({"error": "El cliente ya tiene este servicio contratado"}), 400

    # Agregar el servicio al cliente
    cliente.servicios.append(servicio)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Servicio agregado con éxito",
            "servicios": [s.serialize_servicio() for s in cliente.servicios]
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Quitar un servicio de un cliente


@api.route('/clientes/<int:cliente_id>/servicios/<int:servicio_id>', methods=['DELETE'])
# @jwt_required()
def quitar_servicio_cliente(cliente_id, servicio_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    servicio = Servicios.query.get(servicio_id)

    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    # Verificar si el cliente tiene este servicio
    if servicio not in cliente.servicios:
        return jsonify({"error": "El cliente no tiene este servicio contratado"}), 404

    # Quitar el servicio del cliente
    cliente.servicios.remove(servicio)

    try:
        db.session.commit()
        return jsonify({
            "msg": "Servicio eliminado con éxito",
            "servicios": [s.serialize_servicio() for s in cliente.servicios]
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# --------------------------PAGOS------------------


@api.route('/pagos', methods=['GET'])
# @jwt_required()
def obtener_pagos():

    pagos = Pagos.query.all()
    if not pagos:
        return jsonify({"msg": "no se han encontrado pagos"}), 404

    serialized_pagos = [pago.serialize_pago() for pago in pagos]

    return jsonify(serialized_pagos), 200


@api.route('/pagos/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_pago(cliente_id):

    pagos = Pagos.query.filter_by(cliente_id)
    if not pagos:
        return jsonify({"error": "pago no encontrado"}), 404

    pagos_realizados = [pago.serialize_pago() for pago in pagos]

    return jsonify(pagos_realizados), 200


@api.route('/pagos', methods=['POST'])
# @jwt_required()
def agregar_pago():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
        "email_cliente",
        "metodo_pago",
        "total_estimado",
        "pagos_realizados",
        "fecha_pago",
        "estado"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"el campo {campo} es obligatorio"}), 400

    try:
        cliente = Clientes.query.filter_by(
            email=data["email_cliente"]).first()
        if not cliente:
            return jsonify({"error": "Cliente no encontrado"}), 404

        nuevo_pago = Pagos(
            cliente_id=cliente.id,
            metodo_pago=data["metodo_pago"],
            total_estimado=data["total_estimado"],
            pagos_realizados=data["pagos_realizados"],
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

    # -----------------------------Citas-----------------


@api.route('/citas', methods=['GET'])
# @jwt_required()
def obtener_citas():

    citas = Citas.query.all()
    serialized_citas = [cita.serialize_cita() for cita in citas]
    return jsonify(serialized_citas), 200


@api.route('/citas/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_cita_cliente(cliente_id):

    citas = Citas.query.filter_by(cliente_id=cliente_id).all()

    if not citas:
        return jsonify({"error": "citas no encontradas"}), 404

    return jsonify([cita.serialize_cita() for cita in citas]), 200


@api.route('/citas', methods=['POST'])
# @jwt_required()
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
        # Formato ISO 8601 completo (2025-04-08T13:00:00Z o 2025-04-08T13:00:00+02:00)
        if 'T' in data["fecha_hora"]:
            fecha_hora = datetime.fromisoformat(
                data["fecha_hora"].replace('Z', '+00:00'))
        # Formato simple (2025-04-08 13:00:00)
        else:
            fecha_str = data["fecha_hora"]
            # Primero crear un datetime sin zona horaria
            fecha_base = datetime.strptime(fecha_str, "%Y-%m-%d %H:%M:%S")
            # Luego añadir la zona horaria UTC
            fecha_hora = fecha_base.replace(tzinfo=timezone.utc)

        # Comparar con now() que incluye zona horaria
        if fecha_hora < datetime.now(timezone.utc):
            return jsonify({"error": "no se pueden agendar citas en fechas pasadas"}), 400

    except ValueError as e:
        return jsonify({
            "error": f"Formato de fecha y hora inválido: {str(e)}. Use formato ISO (YYYY-MM-DDTHH:MM:SS) o simple (YYYY-MM-DD HH:MM:SS)"
        }), 400

    cliente = Clientes.query.filter_by(email=data["email_cliente"]).first()
    if not cliente:
        return jsonify({"error": "el cliente no ha sido encontrado"}), 404

    servicio = Servicios.query.filter_by(
        nombre=data["nombre_servicio"]).first()
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

        if servicio not in cliente.servicios:
            cliente.servicios.append(servicio)

        db.session.add(nueva_cita)
        db.session.commit()

        # Sincronizar con Google Calendar
        try:
            # Obtener detalles
            cliente = Clientes.query.get(nueva_cita.cliente_id)
            usuario = Usuarios.query.get(nueva_cita.usuario_id)
            servicio = Servicios.query.get(nueva_cita.servicio_id)

            titulo = f"Cita: {cliente.nombre} - {servicio.nombre}"
            descripcion = f"""
                Cliente: {cliente.nombre}
                Email: {cliente.email}
                Servicio: {servicio.nombre}
                Atendido por: {usuario.username}
                Estado: {nueva_cita.estado}
            """

            # Asegurarse de que las fechas estén en formato ISO con zona horaria
            inicio = nueva_cita.fecha_hora.isoformat()
            fin = (nueva_cita.fecha_hora + timedelta(hours=1)).isoformat()

            calendar_manager = GoogleCalendarManager()
            evento = calendar_manager.crear_evento(
                titulo=titulo,
                descripcion=descripcion,
                inicio=inicio,
                fin=fin
            )

            if evento:
                # No olvidar asignar fecha_hora_inicio y fecha_hora_fin
                nuevo_calendario = Calendario(
                    cita_id=nueva_cita.id,
                    fecha_hora_inicio=nueva_cita.fecha_hora,
                    fecha_hora_fin=nueva_cita.fecha_hora + timedelta(hours=1),
                    google_event_id=evento['id'],
                    ultimo_sync=datetime.now(timezone.utc)
                )
                db.session.add(nuevo_calendario)
                db.session.commit()

        except Exception as e:
            print(f"Error al sincronizar con Google Calendar: {e}")

        return jsonify({
            "msg": "Cita registrada con éxito",
            "cita": nueva_cita.serialize_cita()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/citas/<int:cita_id>', methods=['PUT'])
# @jwt_required()
def actualizar_cita(cita_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Data no encontrada"}), 400

    cita = Citas.query.get(cita_id)
    if not cita:
        return jsonify({"error": "cita no encontrada"}), 404

    # Solo procesar el servicio si se proporciona
    if "nombre_servicio" in data:
        servicio = Servicios.query.filter_by(
            nombre=data["nombre_servicio"]).first()
        if not servicio:
            return jsonify({"error": "servicio no encontrado"}), 404
        cita.servicio_id = servicio.id

    # Solo procesar el usuario si se proporciona
    if "nombre_usuario" in data:
        usuario = Usuarios.query.filter_by(
            username=data["nombre_usuario"]).first()
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404
        cita.usuario_id = usuario.id

    # Solo procesar la fecha si se proporciona
    if "fecha_hora" in data:
        try:
            if 'T' in data["fecha_hora"]:
                nueva_fecha = datetime.fromisoformat(
                    data["fecha_hora"].replace('Z', '+00:00'))
            else:
                return jsonify({"error": "formato de fecha incorrecto"}), 400

            # Validar si la fecha está en el pasado
            if nueva_fecha < datetime.now(timezone.utc):
                return jsonify({"error": "no se pueden agendar citas en fechas pasadas"}), 400

            cita.fecha_hora = nueva_fecha
        except ValueError as e:
            return jsonify({
                "error": f"Formato de fecha y hora inválido: {str(e)}"
            }), 400

    try:
        db.session.commit()

        # Actualizar evento en Google Calendar
        calendario = Calendario.query.filter_by(cita_id=cita.id).first()
        if calendario and ("fecha_hora" in data or "nombre_servicio" in data or "nombre_usuario" in data):
            cliente = Clientes.query.get(cita.cliente_id)
            # Obtener servicio actualizado
            servicio = Servicios.query.get(cita.servicio_id)
            # Obtener usuario actualizado
            usuario = Usuarios.query.get(cita.usuario_id)

            # Actualizar fechas en el objeto calendario si cambió la fecha
            if "fecha_hora" in data:
                calendario.fecha_hora_inicio = cita.fecha_hora
                calendario.fecha_hora_fin = cita.fecha_hora + \
                    timedelta(hours=1)

            titulo = f"Cita: {cliente.nombre} - {servicio.nombre}"
            descripcion = f"""
                Cliente: {cliente.nombre}
                Email: {cliente.email}
                Servicio: {servicio.nombre}
                Atendido por: {usuario.username}
                Estado: {cita.estado}
            """

            inicio = calendario.fecha_hora_inicio.isoformat()
            fin = calendario.fecha_hora_fin.isoformat()

            calendar_manager = GoogleCalendarManager()

            # Verificar parámetros correctos según tu implementación
            datos_actualizados = {
                'summary': titulo,
                'description': descripcion,
                'start': {
                    'dateTime': inicio,
                    'timeZone': 'Europe/Madrid',
                },
                'end': {
                    'dateTime': fin,
                    'timeZone': 'Europe/Madrid',
                }
            }

            calendar_manager.actualizar_evento(
                event_id=calendario.google_event_id,
                datos_actualizados=datos_actualizados
            )

            # Guardar cambios en el calendario
            calendario.ultimo_sync = datetime.now(timezone.utc)
            db.session.commit()

        return jsonify({
            "msg": "cita actualizada con éxito",
            "cita": cita.serialize_cita()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/citas/<int:citas_id>', methods=['DELETE'])
# @jwt_required()
def borrar_cita(citas_id):
    cita = Citas.query.filter_by(id=citas_id).first()
    if not cita:
        return jsonify({"error": "cita no encontrada"}), 404

    try:
        # Eliminar el evento de Google Calendar
        calendario = Calendario.query.filter_by(cita_id=cita.id).first()
        if calendario:
            calendar_manager = GoogleCalendarManager()
            calendar_manager.eliminar_evento(calendario.google_event_id)
            db.session.delete(calendario)

        db.session.delete(cita)
        db.session.commit()

        return jsonify({"msg": "cita borrada correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# -----------------------------Notas-----------------


@api.route('/notas', methods=['GET'])
# @jwt_required()
def obtener_notas():

    notas = Notas.query.all()

    if not notas:
        return jsonify({"error": "notas no encontradas"}), 404

    serialized_notas = [nota.serialize_nota() for nota in notas]

    return jsonify(serialized_notas), 200


@api.route('/notas/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_notas_cliente(cliente_id):

    notas = Notas.query.filter_by(cliente_id=cliente_id).all()

    if not notas:
        return jsonify({"msg": "notas no encontradas"}), 404

    serialized_notas = [nota.serialize_nota() for nota in notas]

    return jsonify(serialized_notas), 200


@api.route('/notas', methods=['POST'])
# @jwt_required()
def agregar_nota():

    data = request.get_json()

    if not data:
        return jsonify({"error": "data no encontrada"}), 404

    campos_requeridos = [
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
            descripcion=data["descripcion"]
        )

        db.session.add(nueva_nota)
        db.session.commit()

        return jsonify({
            "msg": "nota registrada con éxito",
            "nota": nueva_nota.serialize_nota()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/notas/<int:nota_id>', methods=['DELETE'])
# @jwt_required()
def borrar_nota(nota_id):
    # Buscar la nota por su ID (clave primaria)
    nota = Notas.query.get(nota_id)

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

# -----------------------HISTORIAL DE SERVICIOS------------------


@api.route('/historial/cliente/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_historial_cliente(cliente_id):

    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    historiales = HistorialDeServicios.query.filter_by(
        cliente_id=cliente_id).all()

    if not historiales:
        return jsonify({"msg": f"No se han encontrado registros de historial para el cliente {cliente.nombre}"}), 404

    serialized_historiales = [historial.serialize_historial()
                              for historial in historiales]
    return jsonify(serialized_historiales), 200


@api.route('/historial', methods=['POST'])
# @jwt_required()
def agregar_historial():

    data = request.get_json()

    if not data:
        return jsonify({"error": "Datos no encontrados"}), 400

    campos_requeridos = [
        "cliente_id",
        "cita_id"
    ]

    for campo in campos_requeridos:
        if campo not in data:
            return jsonify({"error": f"El campo {campo} es obligatorio"}), 400

    cliente = Clientes.query.get(data["cliente_id"])
    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404

    cita = Citas.query.get(data["cita_id"])
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404

    if cita.cliente_id != cliente.id:
        return jsonify({"error": "La cita no pertenece a este cliente"}), 400

    historial_existente = HistorialDeServicios.query.filter_by(
        cita_id=data["cita_id"]).first()
    if historial_existente:
        return jsonify({"error": "Ya existe un registro de historial para esta cita"}), 400

    try:
        nuevo_historial = HistorialDeServicios(
            cliente_id=data["cliente_id"],
            cita_id=data["cita_id"],
            nota_id=data.get("nota_id")
        )

        if "nota_id" in data and data["nota_id"]:
            nota = Notas.query.get(data["nota_id"])
            if not nota:
                return jsonify({"error": "Nota no encontrada"}), 404

            if nota.cliente_id != cliente.id:
                return jsonify({"error": "La nota no pertenece a este cliente"}), 400

        db.session.add(nuevo_historial)
        db.session.commit()

       


        return jsonify({
            "msg": "Registro de historial creado con éxito",
            "historial": nuevo_historial.serialize_historial()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/historial/<int:historial_id>', methods=['DELETE'])
# @jwt_required()
def borrar_historial(historial_id):
    """Elimina un registro del historial de servicios"""
    historial = HistorialDeServicios.query.get(historial_id)

    if not historial:
        return jsonify({"error": "Registro de historial no encontrado"}), 404

    try:
        db.session.delete(historial)
        db.session.commit()

        return jsonify({"msg": "Registro de historial eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
