from flask import Blueprint, request, jsonify
from api.models import db, Admins, Users, Businesses
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

auth_routes = Blueprint('auth_routes', __name__)

# Ruta de login para administradores


@auth_routes.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "datos no encontrados"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "se requiere nombre de usuario y contraseña"}), 400

    admin = Admins.query.filter_by(username=username).first()

    if not admin or not admin.check_password(password):
        return jsonify({"error": "credenciales inválidas"}), 401

    # Crear un token que identifique el rol como admin
    access_token = create_access_token(
        identity={"id": admin.id, "username": admin.username, "role": "admin"},
        expires_delta=timedelta(days=1)
    )

    return jsonify({
        "message": "Login exitoso",
        "access_token": access_token,
        "admin": admin.serialize_admins()
    }), 200

# Ruta de login para usuarios (actualización de tu ruta existente)


@auth_routes.route('/login', methods=['POST'])
def create_token():
    data = request.get_json()

    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"El campo {field} es requerido"}), 400

    user = Users.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Credenciales inválidas"}), 401

    # Obtener información del negocio asociado
    business = Businesses.query.filter_by(
        business_tax_id=user.business_tax_id).first()
    business_id = business.id if business else None

    # Crear un token que identifique el rol y negocio del usuario
    access_token = create_access_token(
        identity=f"{user.id}:{user.role}:{business.id if business else 0}"
    )

    return jsonify({
        "access_token": access_token,
        "user": user.serialize_user(),
        "business": business.serialize_business() if business else None
    }), 200

# Ruta para crear el primer administrador (solo debe usarse una vez en configuración inicial)


@auth_routes.route('/setup/admin', methods=['POST'])
def create_first_admin():
    # Verificar si ya existe algún administrador
    if Admins.query.count() > 0:
        return jsonify({"error": "Ya existe un administrador configurado"}), 400

    data = request.get_json()

    if not data:
        return jsonify({"error": "datos no encontrados"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "se requiere nombre de usuario y contraseña"}), 400

    try:
        new_admin = Admins(
            username=username,
            password=password,
            role="Admin"
        )

        db.session.add(new_admin)
        db.session.commit()

        return jsonify({
            "message": "Administrador creado exitosamente",
            "admin": new_admin.serialize_admins()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Verificar identidad del usuario actual


@auth_routes.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()

    # Si el current_user es un string (formato antiguo), convertirlo a objeto
    if isinstance(current_user, str):
        user_id = int(current_user)
        user = Users.query.get(user_id)
        if user:
            business = Businesses.query.filter_by(
                business_tax_id=user.business_tax_id).first()
            return jsonify({
                "user": user.serialize_user(),
                "business": business.serialize_business() if business else None,
                "role": user.role
            }), 200
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Si el current_user es un objeto (nuevo formato)
    elif isinstance(current_user, dict) and "role" in current_user:
        if current_user["role"] == "admin":
            admin = Admins.query.get(current_user["id"])
            if admin:
                return jsonify({
                    "user": admin.serialize_admins(),
                    "role": "admin"
                }), 200
        else:
            user = Users.query.get(current_user["id"])
            if user:
                business = Businesses.query.filter_by(
                    business_tax_id=user.business_tax_id).first()
                return jsonify({
                    "user": user.serialize_user(),
                    "business": business.serialize_business() if business else None,
                    "role": current_user["role"]
                }), 200

    return jsonify({"error": "Usuario no encontrado"}), 404

# Recuperar contraseña mediante pregunta de seguridad (solo para usuarios, no admin)


@auth_routes.route('/recovery', methods=['POST'])
def recover_password():
    data = request.get_json()

    if not data:
        return jsonify({"error": "datos no encontrados"}), 400

    username = data.get('username')
    security_answer = data.get('security_answer')
    new_password = data.get('new_password')

    if not all([username, security_answer, new_password]):
        return jsonify({"error": "se requieren todos los campos"}), 400

    user = Users.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "usuario no encontrado"}), 404

    if user.security_answer.lower() != security_answer.lower():
        return jsonify({"error": "respuesta de seguridad incorrecta"}), 401

    try:
        user.set_password(new_password)
        db.session.commit()

        return jsonify({
            "message": "Contraseña actualizada exitosamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
