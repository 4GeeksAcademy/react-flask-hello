import datetime
import os.path
from flask import jsonify, request, Blueprint
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from api.models import db, Citas, Calendario, Usuarios, Clientes, Servicios
from flask_jwt_extended import jwt_required, get_jwt_identity

# Crear un Blueprint separado para las operaciones de Google Calendar
calendar_api = Blueprint('calendar_api', __name__)

# Definimos los scopes necesarios para el API de Google Calendar
SCOPES = ["https://www.googleapis.com/auth/calendar"]


class GoogleCalendarManager:
    def __init__(self):
        """Inicializa la clase y obtiene las credenciales."""
        self.creds = self._obtener_credenciales()
        self.service = self._crear_servicio() if self.creds else None

    def _obtener_credenciales(self):
        """Obtiene y refresca las credenciales si es necesario."""
        creds = None

        
        # Rutas a los archivos de credenciales
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        token_path = os.path.join(base_dir, "credentials", "token.json")
        credentials_path = os.path.join(base_dir, "credentials", "credentials.json")
        
        # Verificar si hay un token existente
        if os.path.exists(token_path):
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)

        # Si no hay credenciales válidas, obtenerlas
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(

                    credentials_path, SCOPES
                )
                creds = flow.run_local_server(port=0)
            
            # Asegurarse de que el directorio existe
            os.makedirs(os.path.dirname(token_path), exist_ok=True)
            
            # Guardar las credenciales para la próxima ejecución
            with open(token_path, "w") as token:
                token.write(creds.to_json())

        return creds

    def _crear_servicio(self):
        """Crea el servicio de Google Calendar."""
        return build("calendar", "v3", credentials=self.creds)

    def obtener_proximos_eventos(self, max_resultados=100, calendar_id="primary"):
        """Obtiene los próximos eventos del calendario de Google."""
        if not self.service:
            return None

        try:
            ahora = datetime.datetime.now(
                tz=datetime.timezone.utc).isoformat() + "Z"

            events_result = (
                self.service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=ahora,
                    maxResults=max_resultados,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )

            eventos = events_result.get("items", [])
            if not eventos:
                return {"msg": "No hay citas pendientes"}
            
            return eventos

        except HttpError as error:
            print(f"Ocurrió un error: {error}")
            return None

    def crear_evento(self, titulo, descripcion, inicio, fin, ubicacion=None, calendar_id="primary"):
       
        if not self.service:
            return None
            
        evento = {
          
            'titulo': titulo,
            'descripcion': descripcion,
            'inicio': {
                'dateTime': inicio,
                'timeZone': 'Europe/Madrid',  # Ajusta según tu zona horaria
            },
            'fin': {

                'dateTime': fin,
                'timeZone': 'Europe/Madrid',  # Ajusta según tu zona horaria
            },
        }
        
        if ubicacion:
            evento['location'] = ubicacion
            
        try:
            resultado = self.service.events().insert(calendarId=calendar_id, body=evento).execute()
            return resultado
        except HttpError as error:
            print(f'Ocurrió un error al crear el evento: {error}')
            return None
            
    def actualizar_evento(self, event_id, datos_actualizados, calendar_id="primary"):
        
        if not self.service:
            return None
            
        try:
            # Primero obtenemos el evento actual
            evento = self.service.events().get(calendarId=calendar_id, eventId=event_id).execute()
            
            # Actualizamos los campos
            for key, value in datos_actualizados.items():
                if key in ['start', 'end']:
                    if 'dateTime' in value:
                        evento[key]['dateTime'] = value['dateTime']
                    if 'timeZone' in value:
                        evento[key]['timeZone'] = value['timeZone']
                else:
                    evento[key] = value
            
            # Guardamos los cambios
            evento_actualizado = self.service.events().update(
                calendarId=calendar_id, eventId=event_id, body=evento
            ).execute()
            
            return evento_actualizado
            
        except HttpError as error:
            print(f'Ocurrió un error al actualizar el evento: {error}')
            return None
            
    def eliminar_evento(self, event_id, calendar_id="primary"):
        
        if not self.service:
            return False
            
        try:
            self.service.events().delete(calendarId=calendar_id, eventId=event_id).execute()
            return True
        except HttpError as error:
            print(f'Ocurrió un error al eliminar el evento: {error}')
            return False

#----------------------------- Rutas para la API de Calendario

@calendar_api.route('/calendario/eventos', methods=['GET'])
@jwt_required()
def obtener_eventos_calendario():
    """Obtiene los próximos eventos del calendario de Google."""
    calendar_manager = GoogleCalendarManager()
    eventos = calendar_manager.obtener_proximos_eventos(max_resultados=10)
    
    if eventos is None:
        return jsonify({"error": "No se pudo acceder al calendario de Google"}), 500
    
    return jsonify(eventos), 200

@calendar_api.route('/calendario/sincronizar', methods=['GET'])
@jwt_required()
def sincronizar_citas_con_google():
    """Sincroniza las citas de la base de datos con Google Calendar."""
    calendar_manager = GoogleCalendarManager()
    
    # Obtener todas las citas pendientes que no tienen un evento de Google Calendar asociado
    citas_pendientes = Citas.query.filter_by(estado="pendiente").all()
    citas_sincronizadas = []
    
    for cita in citas_pendientes:
        # Verificar si ya está registrada en la tabla de Calendario
        calendario_existente = Calendario.query.filter_by(cita_id=cita.id).first()
        
        if not calendario_existente:
            # Obtener información adicional sobre la cita
            cliente = Clientes.query.get(cita.cliente_id)
            usuario = Usuarios.query.get(cita.usuario_id)
            servicio = Servicios.query.get(cita.servicio_id)
            
            if not cliente or not usuario or not servicio:
                continue
            
            # Crear título y descripción para el evento
            titulo = f"Cita: {cliente.nombre} - {servicio.nombre}"
            descripcion = f"""
                Cliente: {cliente.nombre}
                Email: {cliente.email}
                Servicio: {servicio.nombre}
                Atendido por: {usuario.username}
                Estado: {cita.estado}
            """
            
            # La fecha de la cita ya debe estar en formato adecuado, pero asegurémonos
            inicio = cita.fecha_hora.isoformat()
            
            # Asumimos que cada cita dura 1 hora, puedes ajustar esto según tus necesidades
            fin = (cita.fecha_hora + datetime.timedelta(hours=1)).isoformat()
            
            # Crear el evento en Google Calendar
            evento = calendar_manager.crear_evento(
                titulo=titulo,
                descripcion=descripcion,
                inicio=inicio,
                fin=fin
            )
            
            if evento:
                # Guardar la referencia en la tabla Calendario
                nuevo_calendario = Calendario(
                    cita_id=cita.id,
                    google_event_id=evento['id'],
                    ultimo_sync=datetime.datetime.now()
                )
                
                try:
                    db.session.add(nuevo_calendario)
                    db.session.commit()
                    citas_sincronizadas.append({
                        "cita_id": cita.id,
                        "evento_id": evento['id'],
                        "titulo": titulo
                    })
                except Exception as e:
                    db.session.rollback()
                    print(f"Error al guardar en la tabla Calendario: {e}")
    
    return jsonify({
        "msg": f"Se sincronizaron {len(citas_sincronizadas)} citas con Google Calendar",
        "citas_sincronizadas": citas_sincronizadas
    }), 200

@calendar_api.route('/calendario/citas/<int:cita_id>', methods=['POST'])
@jwt_required()
def crear_evento_para_cita(cita_id):
    """Crea un evento en Google Calendar para una cita específica."""
    cita = Citas.query.get(cita_id)
    
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404
    
    # Verificar si ya existe un evento para esta cita
    calendario_existente = Calendario.query.filter_by(cita_id=cita.id).first()
    if calendario_existente:
        return jsonify({"error": "Esta cita ya tiene un evento asociado en Google Calendar"}), 400
    
    # Obtener información adicional sobre la cita
    cliente = Clientes.query.get(cita.cliente_id)
    usuario = Usuarios.query.get(cita.usuario_id)
    servicio = Servicios.query.get(cita.servicio_id)
    
    if not cliente or not usuario or not servicio:
        return jsonify({"error": "No se pudo obtener toda la información asociada a la cita"}), 404
    
    # Crear título y descripción para el evento
    titulo = f"Cita: {cliente.nombre} - {servicio.nombre}"
    descripcion = f"""
        Cliente: {cliente.nombre}
        Email: {cliente.email}
        Servicio: {servicio.nombre}
        Atendido por: {usuario.username}
        Estado: {cita.estado}
    """
    
    # La fecha de la cita ya debe estar en formato adecuado
    inicio = cita.fecha_hora.isoformat()
    # Asumimos que cada cita dura 1 hora
    fin = (cita.fecha_hora + datetime.timedelta(hours=1)).isoformat()
    
    # Crear el evento en Google Calendar
    calendar_manager = GoogleCalendarManager()
    evento = calendar_manager.crear_evento(
        titulo=titulo,
        descripcion=descripcion,
        inicio=inicio,
        fin=fin
    )
    
    if not evento:
        return jsonify({"error": "No se pudo crear el evento en Google Calendar"}), 500
    
    # Guardar la referencia en la tabla Calendario
    nuevo_calendario = Calendario(
        cita_id=cita.id,
        fecha_hora_inicio=cita.fecha_hora,
        fecha_hora_fin=cita.fecha_hora + datetime.timedelta(hours=1),  # O la duración que corresponda
        google_event_id=evento['id'],
        ultimo_sync=datetime.datetime.now()
    )
    
    try:
        db.session.add(nuevo_calendario)
        db.session.commit()
        
        return jsonify({
            "msg": "Evento creado exitosamente en Google Calendar",
            "evento": {
                "id": evento['id'],

                "titulo": evento.get('titulo', ''),

                "link": evento.get('htmlLink', '')
            }
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al guardar en la base de datos: {str(e)}"}), 500

@calendar_api.route('/calendario/eventos/<int:cita_id>', methods=['PUT'])
@jwt_required()
def actualizar_evento_cita(cita_id):
    """Actualiza un evento en Google Calendar cuando se actualiza una cita."""
    cita = Citas.query.get(cita_id)
    
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404
    
    # Buscar el registro en la tabla Calendario
    calendario = Calendario.query.filter_by(cita_id=cita.id).first()
    if not calendario:
        return jsonify({"error": "Esta cita no tiene un evento asociado en Google Calendar"}), 404
    
    # Obtener información actualizada sobre la cita
    cliente = Clientes.query.get(cita.cliente_id)
    usuario = Usuarios.query.get(cita.usuario_id)
    servicio = Servicios.query.get(cita.servicio_id)
    
    if not cliente or not usuario or not servicio:
        return jsonify({"error": "No se pudo obtener toda la información asociada a la cita"}), 404
    
    # Crear datos actualizados para el evento
    datos_actualizados = {
        'summary': f"Cita: {cliente.nombre} - {servicio.nombre}",
        'description': f"""
            Cliente: {cliente.nombre}
            Email: {cliente.email}
            Servicio: {servicio.nombre}
            Atendido por: {usuario.username}
            Estado: {cita.estado}
        """,
        'start': {
            'dateTime': cita.fecha_hora.isoformat(),
            'timeZone': 'Europe/Madrid',  # Ajusta según tu zona horaria
        },
        'end': {
            'dateTime': (cita.fecha_hora + datetime.timedelta(hours=1)).isoformat(),
            'timeZone': 'Europe/Madrid',  # Ajusta según tu zona horaria
        }
    }
    
    # Actualizar el evento en Google Calendar
    calendar_manager = GoogleCalendarManager()
    evento_actualizado = calendar_manager.actualizar_evento(
        event_id=calendario.google_event_id,
        datos_actualizados=datos_actualizados
    )
    
    if not evento_actualizado:
        return jsonify({"error": "No se pudo actualizar el evento en Google Calendar"}), 500
    
    # Actualizar el último sincronizado
    try:
        calendario.ultimo_sync = datetime.datetime.now()
        db.session.commit()
        
        return jsonify({
            "msg": "Evento actualizado exitosamente en Google Calendar",
            "evento": {
                "id": evento_actualizado['id'],
                "titulo": evento_actualizado['summary'],
                "link": evento_actualizado.get('htmlLink', '')
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar en la base de datos: {str(e)}"}), 500

@calendar_api.route('/calendario/eventos/<int:cita_id>', methods=['DELETE'])
@jwt_required()
def eliminar_evento_cita(cita_id):
    """Elimina un evento de Google Calendar cuando se elimina una cita."""
    # Buscar el registro en la tabla Calendario
    calendario = Calendario.query.filter_by(cita_id=cita_id).first()
    if not calendario:
        return jsonify({"error": "Esta cita no tiene un evento asociado en Google Calendar"}), 404
    
    # Eliminar el evento de Google Calendar
    calendar_manager = GoogleCalendarManager()
    exito = calendar_manager.eliminar_evento(event_id=calendario.google_event_id)
    
    if not exito:
        return jsonify({"error": "No se pudo eliminar el evento de Google Calendar"}), 500
    
    # Eliminar el registro de la tabla Calendario
    try:
        db.session.delete(calendario)
        db.session.commit()
        
        return jsonify({
            "msg": "Evento eliminado exitosamente de Google Calendar"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al eliminar de la base de datos: {str(e)}"}), 500