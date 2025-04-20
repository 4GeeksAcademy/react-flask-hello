from flask import Blueprint, request, jsonify
from ..models import Users, db
from werkzeug.security import generate_password_hash

password_reset = Blueprint('password_reset', __name__)

@password_reset.route('/user/security-question', methods=['POST'])
def get_security_question():
    data = request.get_json()
    
    if not data or 'username' not in data:
        return jsonify({"error": "Se requiere nombre de usuario"}), 400
    
    username = data['username']
    user = Users.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    return jsonify({
        "username": user.username,
        "security_question": user.security_question
    }), 200

@password_reset.route('/user/verify-security-answer', methods=['POST'])
def verify_security_answer():
    data = request.get_json()
    
    if not data or 'username' not in data or 'security_answer' not in data:
        return jsonify({"error": "Se requieren nombre de usuario y respuesta de seguridad"}), 400
    
    username = data['username']
    security_answer = data['security_answer']
    
    user = Users.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Comparar la respuesta de seguridad
    if user.security_answer != security_answer:
        return jsonify({"error": "Respuesta de seguridad incorrecta"}), 401
    
    return jsonify({"message": "Respuesta verificada con éxito"}), 200

@password_reset.route('/user/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if not data or 'username' not in data or 'security_answer' not in data or 'new_password' not in data:
        return jsonify({"error": "Faltan datos requeridos"}), 400
    
    username = data['username']
    security_answer = data['security_answer']
    new_password = data['new_password']
    
    user = Users.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    # Verificar respuesta de seguridad nuevamente
    if user.security_answer != security_answer:
        return jsonify({"error": "No autorizado para cambiar la contraseña"}), 401
    
    # Actualizar contraseña
    user.password_hash = generate_password_hash(new_password)
    
    try:
        db.session.commit()
        return jsonify({"message": "Contraseña actualizada con éxito"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar contraseña: {str(e)}"}), 500