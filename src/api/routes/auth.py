from flask import Blueprint, request, jsonify
from api.models import db, Admins, Users, Businesses
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400

    admin = Admins.query.filter_by(username=username).first()

    if not admin or not admin.check_password(password):
        return jsonify({"error": "invalid credentials"}), 401

    access_token = create_access_token(
        identity={"id": admin.id, "username": admin.username, "role": "admin"},
        expires_delta=timedelta(days=1)
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "admin": admin.serialize_admins()
    }), 200


@auth_routes.route('/login', methods=['POST'])
def create_token():
    data = request.get_json()

    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"The field {field} is required"}), 400

    user = Users.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    business = Businesses.query.filter_by(
        business_tax_id=user.business_tax_id).first()
    business_id = business.id if business else None

    access_token = create_access_token(
        identity=f"{user.id}:{user.role}:{business.id if business else 0}"
    )

    return jsonify({
        "access_token": access_token,
        "user": user.serialize_user(),
        "business": business.serialize_business() if business else None
    }), 200


@auth_routes.route('/setup/admin', methods=['POST'])
def create_first_admin():
    if Admins.query.count() > 0:
        return jsonify({"error": "An administrator is already configured"}), 400

    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400

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


@auth_routes.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()

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
        return jsonify({"error": "User not found"}), 404

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

    return jsonify({"error": "User not found"}), 404

@auth_routes.route('/recovery', methods=['POST'])
def recover_password():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    username = data.get('username')
    security_answer = data.get('security_answer')
    new_password = data.get('new_password')

    if not all([username, security_answer, new_password]):
        return jsonify({"error": "all fields are required"}), 400

    user = Users.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "user not found"}), 404

    if user.security_answer.lower() != security_answer.lower():
        return jsonify({"error": "incorrect security answer"}), 401

    try:
        user.set_password(new_password)
        db.session.commit()

        return jsonify({
            "message": "Password updated successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500