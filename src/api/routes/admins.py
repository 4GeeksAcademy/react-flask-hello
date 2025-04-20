from flask import Blueprint, request, jsonify
from api.models import db, Businesses, Users, Admins
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from functools import wraps

admin_routes = Blueprint('admin_routes', __name__)

# Ruta de login para administradores


@admin_routes.route('/admin/login', methods=['POST'])
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

    # Crear un token con formato simple (string)
    access_token = create_access_token(
        identity=f"{admin.id}:admin"  # String con formato "id:admin"
    )

    return jsonify({
        "message": "Login exitoso",
        "access_token": access_token,
        "admin": admin.serialize_admins()
    }), 200

# Middleware para verificar si es admin


def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        try:
            current_user = get_jwt_identity()
            print(f"Current user identity: {current_user}")
            
            # Verificar formato "id:admin"
            if isinstance(current_user, str) and ":admin" in current_user:
                user_id = current_user.split(":")[0]
                admin = Admins.query.get(int(user_id))
                if admin:
                    return fn(*args, **kwargs)
            
            return jsonify({"error": "Acceso denegado: se requieren privilegios de administrador"}), 403
        except Exception as e:
            print(f"Error in admin_required: {e}")
            return jsonify({"error": f"Error de autenticación: {str(e)}"}), 401
    return wrapper

# Ruta para crear el primer administrador

@admin_routes.route('/setup/admin', methods=['POST'])
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


@admin_routes.route('/businesses', methods=['POST'])
@admin_required
def create_business():
    data = request.get_json()

    if not data:
        return jsonify({"error": "datos no encontrados"}), 400

    required_fields = [
        "business_name",
        "business_tax_id",
        "business_postal_code"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"el campo {field} es requerido"}), 400

    # Verificar si ya existe un negocio con el mismo tax_id
    existing_business = Businesses.query.filter_by(
        business_tax_id=data["business_tax_id"]).first()

    if existing_business:
        return jsonify({"error": "ya existe un negocio con este ID fiscal"}), 400

    try:
        new_business = Businesses(
            business_name=data["business_name"],
            business_tax_id=data["business_tax_id"],
            business_postal_code=data["business_postal_code"]
        )

        db.session.add(new_business)
        db.session.commit()

        return jsonify({
            "message": "Negocio creado exitosamente",
            "business": new_business.serialize_business()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@admin_routes.route('/businesses/<int:business_id>/master-user', methods=['POST'])
@admin_required
def create_master_user(business_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "datos no encontrados"}), 400

    required_fields = [
        "username",
        "password",
        "security_question",
        "security_answer"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"el campo {field} es requerido"}), 400

    business = Businesses.query.get(business_id)

    if not business:
        return jsonify({"error": "negocio no encontrado"}), 404

    # Verificar si ya existe un usuario master para este negocio
    existing_master = Users.query.filter_by(
        business_tax_id=business.business_tax_id,
        role="master"
    ).first()

    if existing_master:
        return jsonify({"error": "este negocio ya tiene un usuario master asignado"}), 400

    # Verificar si el nombre de usuario ya existe
    existing_user = Users.query.filter_by(username=data["username"]).first()

    if existing_user:
        return jsonify({"error": "este nombre de usuario ya está en uso"}), 400

    try:
        new_master = Users(
            username=data["username"],
            password=data["password"],
            business_tax_id=business.business_tax_id,
            role="master",
            security_question=data["security_question"],
            security_answer=data["security_answer"]
        )

        db.session.add(new_master)
        db.session.commit()

        return jsonify({
            "message": "Usuario master creado exitosamente",
            "user": new_master.serialize_user(),
            "business": business.serialize_business()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
