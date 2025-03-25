from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Planet, Specie, Vehicle, Starship, Person, Category, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

CORS(api)

# -------------------------------- ENDPOINTS DEL LOGIN y SIGNUP----------------------------- #

@api.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()

    if not data:
        return jsonify({"Error": "data not found"}), 400

    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"Error": f"The field '{field}' is required"}), 400

    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"Error": "The username is already in use"}), 400

    existing_email = User.query.filter_by(email=data['email']).first()
    if existing_email:
        return jsonify({"Error": "The email is already in use"}), 400

    
    try:
        
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            firstname=data.get('firstname', ''),
            lastname=data.get('lastname', ''),
        )

    
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            "msg": "user created successfully",
            "user": new_user.serialize_user()}
            ), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    

@api.route('/login', methods=['POST'])
def create_token():

    data = request.get_json()

    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"Error": f"The field {field} is required"}), 400
        
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Incorrect credential"}), 401
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize_user()
    }), 200


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if not users:
        return jsonify({"Error": "No users found"}), 404
    
    return jsonify([user.serialize_user() for user in users]), 200

# -----------------------------------ENDPOINTS FOR STARWARS OBJECTS----------------------------------- #

@api.route('/clases', methods=['GET'])

def get_classes():
    categories = Category.query.all()
    serialized_planets = [category.serialize_category() for category in categories]
    return jsonify(serialized_planets), 200

# planets
@api.route('/planets', methods=['GET'])
@jwt_required()
def get_planets():

    planets = Planet.query.all()
    serialized_planets = [planet.serialize_planet() for planet in planets]
    return jsonify(serialized_planets), 200


@api.route('/planets/<int:planet_id>', methods=['GET'])
@jwt_required()
def get_planet(planet_id):

    planet = Planet.query.get(planet_id)
    if not planet:
        return jsonify({"Error": "planet not found"}), 404

    return jsonify(planet.serialize_planet())


# species
@api.route('/species', methods=['GET'])
@jwt_required()
def get_species():

    species = Specie.query.all()
    serialized_species = [specie.serialize_specie() for specie in species]
    return jsonify(serialized_species), 200


@api.route('/species/<int:specie_id>', methods=['GET'])
@jwt_required()
def get_specie(specie_id):

    specie = Specie.query.get(specie_id)
    if not specie:
        return jsonify({"Error": "specie not found"}), 404

    return jsonify(specie.serialize_specie()), 200
        

# vehicles
@api.route('/vehicles', methods=['GET'])
@jwt_required()
def get_vehicles():

    vehicles = Vehicle.query.all()
    serialized_vehicles = [vehicle.serialize_vehicle() for vehicle in vehicles]
    return jsonify(serialized_vehicles), 200


@api.route('/vehicles/<int:vehicle_id>', methods=['GET'])
@jwt_required()
def get_vehicle(vehicle_id):

    vehicle = Vehicle.query.get(vehicle_id)
    if not vehicle:
        return jsonify({"Error": "vehicle not found"}), 404

    return jsonify(vehicle.serialize_vehicle()), 200
    

# starships
@api.route('/starships', methods=['GET'])
@jwt_required()
def get_starships():

    starships = Starship.query.all()
    serialized_starships = [starship.serialize_starship()
                            for starship in starships]
    return jsonify(serialized_starships), 200


@api.route('/starships/<int:starship_id>', methods=['GET'])
@jwt_required()
def get_starship(starship_id):

    starship = Starship.query.get(starship_id)
    if not starship:
        return jsonify({"Error": "starship not found"}), 404

    return jsonify(starship.serialize_starship()), 200


# people
@api.route('/people', methods=['GET'])
@jwt_required()
def get_people():

    people = Person.query.all()
    serialized_people = [person.serialize_person() for person in people]
    return jsonify(serialized_people), 200


@api.route('/people/<int:person_id>', methods=['GET'])
@jwt_required()
def get_person(person_id):

    person = Person.query.get(person_id)
    if not person:
        return jsonify({"Error": "person not found"}), 404

    return jsonify(person.serialize_person()), 200


# -----------------------------------ENDPOINTS FOR FAVS----------------------------------- #

@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():

    user_id = get_jwt_identity()
    
    favorites = Favorite.query.filter_by(user_id=user_id).all()

    if not favorites:
        return jsonify({"msg": "Favs not found"}), 404
    
    return jsonify([fav.serialize_favorite() for fav in favorites]), 200


@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():

    user_id = get_jwt_identity()
    data = request.get_json()

    if not data:
        return jsonify({"msg": "Data not found"}), 404

    required_fields = ['item_name', 'item_id']
    for field in required_fields:
        if field not in data:
            return jsonify ({"msg": f"The field {field} is required"}), 400
        
    item_name = data['item_name']
    item_id = data['item_id']

    existing_favorite = Favorite.query.filter_by(user_id=user_id, item_name=item_name, item_id=item_id).first()
    if existing_favorite:
        return jsonify({"Error": "This item is already in favorites"}), 400
    
    try:
        new_favorite = Favorite(
            user_id = user_id,
            item_name = item_name,
            item_id = item_id
        )

        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({
            "msg": "Item added to favorites successfully",
            "favorite": new_favorite.serialize_favorite()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    