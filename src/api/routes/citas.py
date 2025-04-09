from flask import Blueprint, request, jsonify
from ..models import db, Citas, Clientes, Usuarios, Servicios, Calendario
from ..api_calendar import GoogleCalendarManager
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta, timezone
from sqlalchemy import func

citas_routes = Blueprint('citas_routes', __name__)

@citas_routes.route('/citas', methods=['GET'])
# @jwt_required()
def obtener_citas():
    citas = Citas.query.all()
    serialized_citas = [cita.serialize_cita() for cita in citas]
    return jsonify(serialized_citas), 200

@citas_routes.route('/citas/<int:cliente_id>', methods=['GET'])
# @jwt_required()
def obtener_cita_cliente(cliente_id):
    citas = Citas.query.filter_by(cliente_id=cliente_id).all()
    if not citas:
        return jsonify({"error": "citas no encontradas"}), 404
    return jsonify([cita.serialize_cita() for cita in citas]), 200

@citas_routes.route('/citas', methods=['POST'])
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

@citas_routes.route('/citas/<int:cita_id>', methods=['PUT'])
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

@citas_routes.route('/citas/<int:citas_id>', methods=['DELETE'])
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