from flask import Blueprint, request, jsonify
from ..models import db, Users, Admins, Businesses
from flask_jwt_extended import jwt_required

users_routes = Blueprint('users_routes', __name__)

@users_routes.route('/admins', methods=['GET'])
# @jwt_required()
def get_admins():
    admins = Admins.query.all()
    serialized_admins = [admin.serialize_admins() for admin in admins]
    return jsonify(serialized_admins)

@users_routes.route('/users', methods=['GET'])
# @jwt_required()
def get_users():
    users = Users.query.all()
    serialized_users = [user.serialize_user() for user in users]
    return jsonify(serialized_users), 200

@users_routes.route('/users/<int:user_id>', methods=['GET'])
# @jwt_required()
def get_user(user_id):
    user = Users.query.get(user_id)
    if not user:
        return jsonify({"error": "user not found"}), 404
    return jsonify(user.serialize_user()), 200

@users_routes.route('/users', methods=['POST'])
# @jwt_required()
def add_user():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data not found"}), 404

    required_fields = [
        "username",
        "password",
        "business_tax_id",
        "role"
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"the field {field} is required"}), 400

    existing_user = Users.query.filter_by(
        username=data["username"]).first()
    if existing_user:
        return jsonify({"error": "the user already exists"}), 400

    business = Businesses.query.filter_by(business_tax_id=data["business_tax_id"]).first()
    if not business:
        return jsonify({"error": "the business with that tax ID does not exist"}), 400

    allowed_roles = {"master", "manager", "employee"}
    if data["role"] not in allowed_roles:
        return jsonify({"error": "Invalid role. Allowed values are: master, manager, employee"}), 400

    data["role"] = data["role"].lower()

    try:
        new_user = Users(
            username=data["username"],
            password=data["password"],
            business_tax_id=data["business_tax_id"],
            role=data["role"]
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "msg": "User created successfully",
            "user": new_user.serialize_user()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "error": str(e)
        }), 500

@users_routes.route('/users', methods=['PUT'])
# @jwt_required()
def update_user():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data not found"}), 400

    required_fields = ["username", "password", "business_tax_id", "role"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"The field {field} is required"}), 400

    existing_user = Users.query.filter_by(
        username=data["username"]).first()

    if not existing_user:
        return jsonify({"error": "User not found"}), 404

    existing_business = Businesses.query.filter_by(
        business_tax_id=data["business_tax_id"]).first()
    if not existing_business:
        return jsonify({"error": "Business not found"}), 404

    try:
        existing_user.username = data["username"]
        existing_user.role = data["role"]
        existing_user.business_tax_id = data["business_tax_id"]
        existing_user.password = data["password"]

        if "password" in data:
            existing_user.set_password(data["password"])

        db.session.commit()
        return jsonify({
            "msg": "User updated successfully",
            "user": existing_user.serialize_user()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@users_routes.route('/users/<string:username>', methods=['DELETE'])
# @jwt_required()
def delete_user(username):
    user = Users.query.filter_by(username=username).first()

    if not user:
        return jsonify({
            "error": "user not found"
        }), 404

    try:
        db.session.delete(user)
        db.session.commit()

        return jsonify({
            "msg": "User deleted successfully"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500