from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_token
from flask_cors import CORS
from ..supabase_client import supabase
import re

api = Blueprint('event', __name__)

# Allow CORS requests to this API
CORS(api)

# Validacion de UUID valido

def is_valid_uuid(uuid_to_test):
    regex = re.compile(
        r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-'
        r'[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
    )
    return bool(regex.match(uuid_to_test))

# Crear evento

@api.route('/<current_user_id>', methods=['POST'])
def crear_evento(current_user_id):
    data = request.get_json()
    # Validaciones básicas de los campos obligatorios
    required_fields = ['titulo', 'fecha', 'categoria', 'precio']
    missing_fields = [
        field for field in required_fields if field not in data or data[field] is None 
    ]
    if missing_fields:
        return jsonify({
            "error": f"Faltan campos obligatorios: {', '.join(missing_fields)}"
        }), 400
    # Validar máximo de asistentes (opcional)
    max_asist = data.get('max_asist')
    # Preparar datos del evento
    evento_data = {
        'titulo': data['titulo'].strip(),
        'fecha': data['fecha'],
        'categoria': data['categoria'].strip(),
        'precio': data['precio'],
        'id_creador_evento': current_user_id,
        'definicion': data.get('definicion', '').strip(),
        'portada': data.get('portada', '').strip(),
    }
    # Agregar max_asist solo si se proporciona
    if max_asist is not None:
        evento_data['max_asist'] = max_asist
    # Insertar evento en la base de datos
    response = supabase.table('Evento').insert(evento_data).execute()
    if response.data:
        return jsonify({"message": "Evento creado exitosamente"}), 201
    else:
        return jsonify({"error": "Error al crear el evento"}), 500
    
# Obtener todos los eventos

@api.route('/', methods=['GET'])
def get_events():

    response = supabase.table('Evento').select('*').execute()

    if response.data:
        return jsonify({
            "message": "Eventos obtenidos exitosamente",
            "response": response.data
        }), 201
    else:
        return jsonify({"error": "Error al obtener el evento"}), 500
    

# Obtener evento por ID del creador

@api.route('/mis-eventos/<user_id>', methods=['GET'])
def get_user_events(user_id):
    try:
        response = supabase.table('Evento') \
            .select('*') \
            .eq('id_creador_evento', user_id) \
            .execute()

        if response.data:
            return jsonify({
                "message": "Eventos del usuario obtenidos exitosamente",
                "response": response.data
            }), 200
        else:
            return jsonify({
                "message": "No se encontraron eventos para este usuario",
                "response": []
            }), 200

    except Exception as e:
        print("Error obteniendo eventos:", e)
        return jsonify({"error": "Error al obtener eventos"}), 500

    
  # Borrar evento

@api.route('/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        # Eliminar evento por ID
        response = (
            supabase.table('Evento')
            .delete()
            .eq('id', event_id)
            # .eq('creador_evento', current_user_id)  # Verifica que el usuario sea el creador (borrar # para implementar)
            .execute()
        )

        # Si no existe ese evento
        
        if not response.data:
            return jsonify({"error": "Evento no encontrado"}), 404 
        
        return jsonify({"message": "Evento eliminado correctamente"}), 200

    except Exception as e:
        print(f"Error al eliminar evento: {e}")
        return jsonify({"error": "Error al eliminar el evento"}), 500
    
#Actualizar evento

@api.route('/<event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        data = request.get_json()

        #  Validar que data no esté vacío (borrar # para implementar)
#        if not data:
#            return jsonify({"error": "No se enviaron datos para actualizar"}), 400

        # Actualizar el evento
        response = (
            supabase.table('Evento')
            .update(data)
            .eq('id', event_id)
            # .eq('creador_evento', current_user_id)  # Verificar que el usuario sea el creador (borrar # para implementar)
            .execute()
        )

        if not response.data:
            return jsonify({"error": "Evento no encontrado"}), 404

        return jsonify({
            "message": "Evento actualizado correctamente",
            "data": response.data
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


    # ver el evento por su id
