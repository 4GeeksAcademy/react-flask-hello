from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_token
from flask_cors import CORS
from ..supabase_client import supabase

api = Blueprint('event', __name__)

# Allow CORS requests to this API
CORS(api)

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
        'creador_evento': current_user_id,
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
    
# Obtener eventos

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