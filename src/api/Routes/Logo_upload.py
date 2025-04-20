from flask import Blueprint, request, jsonify, current_app
import os
import uuid
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.tigris_service import upload_file_to_tigris
from ..models.user import User
from ..database import db

upload_bp = Blueprint('upload', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/logo', methods=['POST'])
@jwt_required()
def upload_logo():
    user_id = get_jwt_identity()
    
    if 'logo' not in request.files:
        return jsonify({"error": "No se envió ningún archivo"}), 400
    
    file = request.files['logo']
    
    if file.filename == '':
        return jsonify({"error": "No se seleccionó ningún archivo"}), 400
    
    if file and allowed_file(file.filename):
        # Crear nombre único para el archivo
        filename = secure_filename(file.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        unique_filename = f"logo_{user_id}_{uuid.uuid4().hex}.{ext}"
        
        # Subir a TigrisData
        try:
            url = upload_file_to_tigris(file, unique_filename, 'logos')
            
            # Guardar URL en la base de datos
            user = User.query.get(user_id)
            user.logo_url = url
            db.session.commit()
            
            return jsonify({"url": url}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "Tipo de archivo no permitido"}), 400