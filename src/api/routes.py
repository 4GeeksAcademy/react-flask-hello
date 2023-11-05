"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
 
from api.models import *
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_bcrypt import Bcrypt 
from flask import Flask
from flask_cors import CORS

api = Blueprint('api', __name__)
#Agregado al boilerplate
app = Flask(__name__)
bcrypt = Bcrypt(app)

# @api.route('/login', methods=["POST"])
# def login_user():
#     data = request.get_json(force=True)
#     user = User.query.filter_by(email=data["email"]).first()
#     if user is None:
#         return jsonify({"msg": "Incorrect user or password"}), 401
#     passwordCheck = bcrypt.check_password_hash(user.password, data["password"])
#     if passwordCheck == False:
#         return jsonify({"msg":"Wrong password"}), 401
#     token = create_access_token(identity = data["dni"], additional_claims={"role":"admin"}) #cambiar por tipo de usuario de los modelos pendientes (Enum)
#     return jsonify({"msg": "Login successful!", "token":token}),200



def signup_by_type(new_user, data):
    new_user.first_name = data["first_name"]
    new_user.last_name =  data["last_name"]
    new_user.email = data["email"]
    new_user.password  = bcrypt.generate_password_hash(str(data["password"])).decode("utf-8")
    new_user.is_active = True
  

@api.route('/signup', methods=['POST'])
def create_owner():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if Owner.query.filter_by(email=email).first() is not None:
        return jsonify({"msg":"Email already registered"}), 400
    new_owner= Owner()
    signup_by_type(new_owner,data)
    db.session.add(new_owner)
    db.session.commit()
    return jsonify({"msg": "Owner created successfully"}), 201 #siempre devolver el nuevo estado del recurso que se ha modificado 

@api.route('/signup/keeper', methods=['POST'])
def create_keeper():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if Keeper.query.filter_by(email=email).first() is not None:
        return jsonify({"msg":"Email already registered"}), 400
    new_keeper= Keeper()
    signup_by_type(new_keeper,data)
    new_keeper.hourly_pay = data["hourly_pay"]
    db.session.add(new_keeper)
    db.session.commit()
    return jsonify({"msg": "Keeper created successfully"}), 201


@api.route('/owner', methods=["GET"])
def owners_list():
    owners = Owner.query.all()
    owners_data = [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email, "pets": [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings}
                   for pet in Pet.query.filter_by(owner_id=owner.id)]}
                   for owner in owners]
    return jsonify(owners_data), 200


@api.route('/owner/<int:owner_id>', methods=['GET'])
def get_owner(owner_id):
    owner = Owner.query.get(owner_id)
    owner_data = {
        "id": owner.id,
        "first_name": owner.first_name,
        "last_name": owner.last_name,
        "email": owner.email,
        "pets": owner.pets
    }
    return jsonify(owner_data), 200


@api.route('/owner/<int:owner_id>', methods=['DELETE'])
def delete_owner(owner_id):
    owner = Owner.query.get(owner_id)
    db.session.delete(owner)
    db.session.commit()
    return jsonify({"msg": "Owner deleted successfully"}), 200



@api.route('/keeper', methods=["GET"])
def keepers_list():
    keepers = Keeper.query.all()
    keepers_data = [{"id": keeper.id, "first_name": keeper.first_name, "last_name": keeper.last_name, "email": keeper.email, "hourly_pay": keeper.hourly_pay}
                   for keeper in keepers]

    return jsonify(keepers_data), 200


@api.route('/keeper/<int:keeper_id>', methods=['GET'])
def get_keeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    keeper_data = {
        "id": keeper.id,
        "first_name": keeper.first_name,
        "last_name": keeper.last_name,
        "email": keeper.email,
    }
    return jsonify(keeper_data), 200


@api.route('/keeper/<int:keeper_id>', methods=['DELETE'])
def delete_keeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    db.session.delete(keeper)
    db.session.commit()
    return jsonify({"msg": "keeper deleted successfully"}), 200


#ENDPOINTS DE PETS
@api.route('/pets', methods=['POST'])
def createPet():
    data = request.get_json(force=True)
    owner_id = int(data["owner_id"])
    name = (data["name"].lower()).title()
    owner = Owner.query.filter_by(id=owner_id).first()
    if owner is None:
        return jsonify({"msg":"Invalid user id"}), 404
    if Pet.query.filter_by(owner_id = owner_id, name=name).first() is not None:
        return jsonify({"msg":"Name already registered for this user"}), 400
    size = (data["size"].lower()).title()
    new_pet=Pet()
    new_pet.name = name
    new_pet.size = size
    new_pet.category = (data["category"].lower()).title()
    new_pet.owner_id = owner_id
    db.session.add(new_pet)
    db.session.commit()
    return jsonify({"msg": "Pet added successfully"}), 201 #retornar el objeto creado 

@api.route('/pets/<int:pet_id>', methods=['GET', 'DELETE', 'PUT'])
def getPet(pet_id):
    if Pet.query.filter_by(id=pet_id).first() is None:
        return jsonify({"msg":"Pet does not exist on record"}), 404
    pet = Pet.query.get(pet_id)
    if request.method == 'GET':
        pet_data = {
            "id": pet.id,
            "name": pet.name,
            "size": pet.size,
            "category":pet.category,
            "owner_id":pet.owner_id,
            "bookings":pet.bookings
        }
        return jsonify(pet_data), 200
    if request.method == 'PUT':
        data = request.get_json(force=True)
        pet.name = (data["name"].lower()).title()
        pet.size = (data["size"].lower()).title()
        pet.category = (data["category"].lower()).title()
        db.session.commit()
        return jsonify({"msg":"Pet data updated"}), 200
    if request.method == 'DELETE':
        db.session.delete(pet)
        db.session.commit()
        return jsonify({"msg":"Pet removed from profile"}), 200
    
@api.route('/pets', methods=['GET'])
def getAllPets():
    pets = Pet.query.all()
    pets_data = [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings, "owner": [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email} for owner in Owner.query.filter_by(id=pet.owner_id)]}
                   for pet in pets]
    return jsonify(pets_data), 200

@api.route('/pets/owner/<int:owner_id>', methods=['GET'])
def getPetsByOwner(owner_id):
    pets = Pet.query.filter_by(owner_id=owner_id)
    pets = [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings }
                   for pet in pets]
    return jsonify(pets), 200