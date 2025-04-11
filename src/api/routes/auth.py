from flask import Blueprint, request, jsonify
from ..models import Users
from flask_jwt_extended import create_access_token

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/login', methods=['POST'])
def create_token():
   data = request.get_json()

   required_fields = ['username', 'password']
   for field in required_fields:
       if field not in data:
           return jsonify({"Error": f"The field {field} is required"}), 400

   existing_user = Users.query.filter_by(
       username=data['username']).first()

   if not existing_user or not existing_user.check_password(data['password']):
       return jsonify({"error": "Invalid credentials"}), 401

   access_token = create_access_token(identity=str(existing_user.id))

   return jsonify({
       "access_token": access_token,
       "user": existing_user.serialize_user()
   }), 200