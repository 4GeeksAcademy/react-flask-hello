"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import PlanetFavorite, SpecieFavorite, VehicleFavorite, StarshipFavorite, PersonFavorite
from .models import db, User, Planet, Specie, Vehicle, Starship, Person


api = Blueprint('api', __name__)



def get_all_user_favorites(user_id):

    planet_favorites = PlanetFavorite.query.filter_by(user_id=user_id).all()
    specie_favorites = SpecieFavorite.query.filter_by(user_id=user_id).all()
    vehicle_favorites = VehicleFavorite.query.filter_by(user_id=user_id).all()
    starship_favorites = StarshipFavorite.query.filter_by(
        user_id=user_id).all()
    person_favorites = PersonFavorite.query.filter_by(user_id=user_id).all()

    serialized_planet_favorites = [
        fav.serialize_favorite() for fav in planet_favorites]
    serialized_specie_favorites = [
        fav.serialize_favorite() for fav in specie_favorites]
    serialized_vehicle_favorites = [
        fav.serialize_favorite() for fav in vehicle_favorites]
    serialized_starship_favorites = [
        fav.serialize_favorite() for fav in starship_favorites]
    serialized_person_favorites = [
        fav.serialize_favorite() for fav in person_favorites]

    favorites_by_type = {
        "planets": serialized_planet_favorites,
        "species": serialized_specie_favorites,
        "vehicles": serialized_vehicle_favorites,
        "starships": serialized_starship_favorites,
        "people": serialized_person_favorites
    }

    return {
        "All my favorites": favorites_by_type
    }

@api.route('/')
def sitemap():
    return generate_sitemap(api)

# -------------------------------- ENDPOINTS DEL LOGIN ----------------------------- #
    

@api.route('/login', methods=['POST'])
def create_token():

    body = request.get_json()

    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in body:
            return jsonify({"Error": f"the field is required"}), 400
        
    user = User.query.filter_by(username=body['username']).first()
    
    if not user or not user.check_password(body['password']):
        return jsonify({"error": "incorrect credential"}), 401
    
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user": user.serialize_user()
    }), 200


# -----------------------------------ENDPOINTS FOR USERS----------------------------------- #

@api.route('/users', methods=['GET'])
def get_users():

    users = User.query.all()
    serialized_users = [user.serialize_user() for user in users]

    return jsonify(serialized_users), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "user not found"}), 404

    return jsonify(user.serialize_user()), 200


@api.route('/users', methods=['POST'])
def create_user():

    data = request.get_json()

    if not data:
        return jsonify({"Error": "data not found"}), 400

    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({"Error": f"the field '{field}' is required"}), 400

    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({"Error": "the username is already in use"}), 400

    existing_email = User.query.filter_by(email=data['email']).first()
    if existing_email:
        return jsonify({"Error": "the email is already in use"}), 400

    
    try:
        
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            firstname=data.get('firstname', ''),
            lastname=data.get('lastname', ''),
            is_active=data.get('is_active')
        )

    
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize_user()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# -----------------------------------ENDPOINTS FOR STARWARS OBJECTS----------------------------------- #

@api.route('/clases', methods=['GET'])
def get_classes():
    categories = [
        "users",
        "planets",
        "species",
        "vehicles",
        "starships",
        "people"
    ]
    return jsonify(categories)

# planets
@api.route('/planets', methods=['GET'])
def get_planets():

    planets = Planet.query.all()
    serialized_planets = [planet.serialize_planet() for planet in planets]
    return jsonify(serialized_planets), 200


@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):

    planet = Planet.query.get(planet_id)
    if not planet:
        return jsonify({"Error": "planet not found"}), 404

    return jsonify(planet.serialize_planet())


@api.route('/planets', methods=['POST'])
def create_planet():

    data = request.get_json()
    if not data:
        return jsonify({"Error": "data not found"}), 400

    required_fields = ['name']
    for field in required_fields:
        if field not in data:
            return jsonify({"Error": f"the field '{field}' is required"}), 400

    existing_name = Planet.query.filter_by(name=data['name']).first()
    if existing_name:
        return jsonify({"Error": "the planet is already in planets"}), 400

    new_planet = Planet(
        name=data['name'],
        diameter=data['diameter'],
        gravity=data['gravity'],
        population=data['population'],
        terrain=data['terrain'],
        climate=data['climate']
    )

    try:
        db.session.add(new_planet)
        db.session.commit()
        return jsonify(new_planet.serialize_planet()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# species
@api.route('/species', methods=['GET'])
def get_species():

    species = Specie.query.all()
    serialized_species = [specie.serialize_specie() for specie in species]
    return jsonify(serialized_species), 200


@api.route('/species/<int:specie_id>', methods=['GET'])
def get_specie(specie_id):

    specie = Specie.query.get(specie_id)
    if not specie:
        return jsonify({"Error": "specie not found"}), 404

    return jsonify(specie.serialize_specie()), 200


@api.route('/species', methods=['POST'])
def create_specie():

    data = request.get_json()
    if not data:
        return jsonify({"Error": "data not found"}), 400

    request_field = ['name']
    for field in request_field:
        if not field in data:
            return jsonify({"Error": f"the field {field} is required"}), 400

    existing_name = Specie.query.filter_by(name=data['name']).first()
    if existing_name:
        return jsonify({"Error": "the specie is already in species"})

    new_specie = Specie(
        name=data['name'],
        hair_color=data['hair_color'],
        height=data['height'],
        skin_color=data['skin_color'],
        language=data['language'],
        average_life=data['average_life']
    )

    try:
        db.session.add(new_specie)
        db.session.commit()
        return jsonify(new_specie.serialize_specie()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
        

# vehicles
@api.route('/vehicles', methods=['GET'])
def get_vehicles():

    vehicles = Vehicle.query.all()
    serialized_vehicles = [vehicle.serialize_vehicle() for vehicle in vehicles]
    return jsonify(serialized_vehicles), 200


@api.route('/vehicles/<int:vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):

    vehicle = Vehicle.query.get(vehicle_id)
    if not vehicle:
        return jsonify({"Error": "vehicle not found"}), 404

    return jsonify(vehicle.serialize_vehicle()), 200

@api.route('/vehicles', methods=['POST'])
def create_vehicle():

    data = request.get_json()
    if not data:
        return jsonify({"Error": "data not found"}), 400

    request_field = ['name']
    for field in request_field:
        if not field in data:
            return jsonify({"Error": f"the field {field} is required"}), 400

    existing_name = Vehicle.query.filter_by(name=data['name']).first()
    if existing_name:
        return jsonify({"Error": "the vehicle is already in vehicles"})

    new_vehicle = Vehicle(
        name=data['name'],
        crew=data['crew'],
        passengers=data['passengers'],
        class_name=data['class_name'],
        cargo_cap=data['cargo_cap'],
        terrain=data['terrain']
    )

    try:
        db.session.add(new_vehicle)
        db.session.commit()
        return jsonify(new_vehicle.serialize_vehicle()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    

# starships
@api.route('/starships', methods=['GET'])
def get_starships():

    starships = Starship.query.all()
    serialized_starships = [starship.serialize_starship()
                            for starship in starships]
    return jsonify(serialized_starships), 200


@api.route('/starships/<int:starship_id>', methods=['GET'])
def get_starship(starship_id):

    starship = Starship.query.get(starship_id)
    if not starship:
        return jsonify({"Error": "starship nor found"}), 404

    return jsonify(starship.serialize_starship()), 200

@api.route('/starships', methods=['POST'])
def create_starship():

    data = request.get_json()
    if not data:
        return jsonify({"Error": "data not found"}), 400

    request_field = ['name']
    for field in request_field:
        if not field in data:
            return jsonify({"Error": f"the field {field} is required"}), 400

    existing_name = Starship.query.filter_by(name=data['name']).first()
    if existing_name:
        return jsonify({"Error": "the starship is already in starships"})

    new_starship = Starship(
        name=data['name'],
        consumable=data['consumable'],
        crew=data['crew'],
        passengers=data['passengers'],
        class_name=data['class_name'],
        cargo_cap=data['cargo_cap'],
        hyperdrive_rating=data['hyperdrive_rating']
    )

    try:
        db.session.add(new_starship)
        db.session.commit()
        return jsonify(new_starship.serialize_starship()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# people
@api.route('/people', methods=['GET'])
def get_people():

    people = Person.query.all()
    serialized_people = [person.serialize_person() for person in people]
    return jsonify(serialized_people), 200


@api.route('/people/<int:person_id>', methods=['GET'])
def get_person(person_id):

    person = Person.query.get(person_id)
    if not person:
        return jsonify({"Error": "person not found"}), 404

    return jsonify(person.serialize_person()), 200

@api.route('/people', methods=['POST'])
def create_person():

    data = request.get_json()
    if not data:
        return jsonify({"Error": "data not found"}), 400

    request_field = ['name']
    for field in request_field:
        if not field in data:
            return jsonify({"Error": f"the field {field} is required"}), 400

    existing_name = Person.query.filter_by(name=data['name']).first()
    if existing_name:
        return jsonify({"Error": "the person is already in people"})

    new_person = Person(
        name=data['name'],
        hair_color=data['hair_color'],
        height=data['height'],
        eye_color=data['eye_color'],
        gender=data['gender']
    )

    try: 
        db.session.add(new_person)
        db.session.commit()
        return jsonify(new_person.serialize_person()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# -----------------------------------ENDPOINTS FOR FAVS----------------------------------- #

@api.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_user_favorites(user_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "user not found"}), 404

    favorites = get_all_user_favorites(user_id)
    return jsonify(favorites), 200


# planets favs
@api.route('/users/<int:user_id>/favorites/planets/<int:planet_id>', methods=['POST'])
def add_planet_favorite(user_id, planet_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "user not found"}), 404

    planet = Planet.query.get(planet_id)
    if not planet:
        return jsonify({"Error": "planet not found"}), 404

    existing_favorite = PlanetFavorite.query.filter_by(
        user_id=user_id, planet_id=planet_id).first()
    if existing_favorite:
        return jsonify({'msg': 'this planet is already in favorites'}), 200

    new_fav = PlanetFavorite(user_id=user_id, planet_id=planet_id)
    

    try:
        db.session.add(new_fav)
        db.session.commit()
        return jsonify(new_fav.serialize_favorite()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


@api.route('/users/<int:user_id>/favorites/planets/<int:planet_id>', methods=['DELETE'])
def delete_planet_favorite(user_id, planet_id):

    favorite = PlanetFavorite.query.filter_by(
        user_id=user_id, planet_id=planet_id).first()
    if not favorite:
        return jsonify({"Error": "favorite not found"}), 404

    

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# species favs
@api.route('/users/<int:user_id>/favorites/species/<int:specie_id>', methods=['POST'])
def add_specie_favorite(user_id, specie_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    specie = Specie.query.get(specie_id)
    if not specie:
        return jsonify({"error": "Especie no encontrada"}), 404

    existing_favorite = SpecieFavorite.query.filter_by(
        user_id=user_id, specie_id=specie_id).first()
    if existing_favorite:
        return jsonify({"msg": "this specie is already in favorites"})

    new_fav = SpecieFavorite(user_id=user_id, specie_id=specie_id)
    

    try:
        db.session.add(new_fav)
        db.session.commit()
        return jsonify(new_fav.serialize_favorite()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


@api.route('/users/<int:user_id>/favorites/species/<int:specie_id>', methods=['DELETE'])
def delete_specie_favorite(user_id, specie_id):

    favorite = SpecieFavorite.query.filter_by(
        user_id=user_id, specie_id=specie_id).first()
    if not favorite:
        return jsonify({"Error": "favorite not found"}), 404

    

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "successfully deleted"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# vehicle favs
@api.route('/users/<int:user_id>/favorites/vehicles/<int:vehicle_id>', methods=['POST'])
def add_vehicle_favorite(user_id, vehicle_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "user not found"}), 404

    vehicle = Vehicle.query.get(vehicle_id)
    if not vehicle:
        return jsonify({"Error": "vehicle not found"}), 404

    existing_favorite = VehicleFavorite.query.filter_by(
        user_id=user_id, vehicle_id=vehicle_id).first()
    if existing_favorite:
        return jsonify({"msg": "this vehicle is already in favorites"}), 200

    new_fav = VehicleFavorite(user_id=user_id, vehicle_id=vehicle_id)
    

    try:
        db.session.add(new_fav)
        db.session.commit()
        return jsonify(new_fav.serialize_favorite()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/users/<int:user_id>/favorites/vehicles/<int:vehicle_id>', methods=['DELETE'])
def delete_vehicle_favorite(user_id, vehicle_id):

    favorite = VehicleFavorite.query.filter_by(
        user_id=user_id, vehicle_id=vehicle_id).first()
    if not favorite:
        return jsonify({"Error": "favorite not found"}), 404

    

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# starships favs
@api.route('/users/<int:user_id>/favorites/starships/<int:starship_id>', methods=['POST'])
def add_starship_favorite(user_id, starship_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "user not found"}), 404

    starship = Starship.query.get(starship_id)
    if not starship:
        return jsonify({"Error": "starship not found"}), 404

    existing_favorite = StarshipFavorite.query.filter_by(
        user_id=user_id, starship_id=starship_id).first()
    if existing_favorite:
        return jsonify({"msg": "this starship is already in favorites"}), 200

    new_fav = StarshipFavorite(user_id=user_id, starship_id=starship_id)
    

    try:
        db.session.add(new_fav)
        db.session.commit()
        return jsonify(new_fav.serialize_favorite()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


@api.route('/users/<int:user_id>/favorites/starships/<int:starship_id>', methods=['DELETE'])
def delete_starship_favorite(user_id, starship_id):

    favorite = StarshipFavorite.query.filter_by(
        user_id=user_id, starship_id=starship_id).first()
    if not favorite:
        return jsonify({"Error": "favorite not found"}), 404

    

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# people favs
@api.route('/users/<int:user_id>/favorites/people/<int:person_id>', methods=['POST'])
def add_person_favorite(user_id, person_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "user not found"}), 404

    person = Person.query.get(person_id)
    if not person:
        return jsonify({"Error": "person not found"}), 404

    existing_favorite = PersonFavorite.query.filter_by(
        user_id=user_id, person_id=person_id).first()
    if existing_favorite:
        return jsonify({"msg": "this person is already in favorites"}), 200

    new_fav = PersonFavorite(user_id=user_id, person_id=person_id)
    

    try:
        db.session.add(new_fav)
        db.session.commit()
        return jsonify(new_fav.serialize_favorite()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/users/<int:user_id>/favorites/people/<int:person_id>', methods=['DELETE'])
def delete_person_favorite(user_id, person_id):

    favorite = PersonFavorite.query.filter_by(
        user_id=user_id, person_id=person_id).first()
    if not favorite:
        return jsonify({"Error": "favorite not found"}), 404

    
    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "successfully deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500


# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    api.run(host='0.0.0.0', port=PORT, debug=False)
