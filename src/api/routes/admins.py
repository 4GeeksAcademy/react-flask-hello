from flask import Blueprint, request, jsonify
from api.models import db, Businesses, Users, Admins
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from functools import wraps

admin_routes = Blueprint('admin_routes', __name__)


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

    access_token = create_access_token(
        identity=f"{admin.id}:admin"
    )

    return jsonify({
        "message": "Login exitoso",
        "access_token": access_token,
        "admin": admin.serialize_admins()
    }), 200


def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        try:
            current_user = get_jwt_identity()
            print(f"Current user identity: {current_user}")

            if isinstance(current_user, str) and ":admin" in current_user:
                user_id = current_user.split(":")[0]
                admin = Admins.query.get(int(user_id))
                if admin:
                    return fn(*args, **kwargs)

            return jsonify({"error": "Access denied: administrator privileges required"}), 403
        except Exception as e:
            print(f"Error in admin_required: {e}")
            return jsonify({"error": f"Authentication error: {str(e)}"}), 401
    return wrapper


@admin_routes.route('/setup/admin', methods=['POST'])
def create_first_admin():

    if Admins.query.count() > 0:
        return jsonify({"error": "An administrator is already configured"}), 400

    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "username and password required"}), 400

    try:
        new_admin = Admins(
            username=username,
            password=password,
            role="Admin"
        )

        db.session.add(new_admin)
        db.session.commit()

        return jsonify({
            "message": "Administrator created successfully",
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
        return jsonify({"error": "data not found"}), 400

    required_fields = [
        "business_name",
        "business_tax_id",
        "business_postal_code"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the {field} field is required"}), 400

    existing_business = Businesses.query.filter_by(
        business_tax_id=data["business_tax_id"]).first()

    if existing_business:
        return jsonify({"error": "A business with this tax ID already exists"}), 400

    try:
        new_business = Businesses(
            business_name=data["business_name"],
            business_tax_id=data["business_tax_id"],
            business_postal_code=data["business_postal_code"]
        )

        db.session.add(new_business)
        db.session.commit()

        return jsonify({
            "message": "Successfully created business",
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
        return jsonify({"error": "data not found"}), 400

    required_fields = [
        "username",
        "password",
        "security_question",
        "security_answer"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the {field} field is required"}), 400

    business = Businesses.query.get(business_id)

    if not business:
        return jsonify({"error": "business not found"}), 404

    existing_master = Users.query.filter_by(
        business_tax_id=business.business_tax_id,
        role="master"
    ).first()

    if existing_master:
        return jsonify({"error": "This business already has a master user assigned"}), 400

    existing_user = Users.query.filter_by(username=data["username"]).first()

    if existing_user:
        return jsonify({"error": "This username is already in use"}), 400

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
