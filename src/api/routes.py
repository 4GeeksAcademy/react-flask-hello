
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Planets,  Movies, Profiles, Characters, FavoriteCharacters, FavoritePlanets
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_login import LoginManager, current_user

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['GET', 'POST'])  
def handle_users():
    response_body = {}
    results = {}
    if request.method == 'GET':
        users = db.session.execute(db.select(Users)).scalars() #
        # Ejemplo 1 ¿qué pasaría si no hay ningún usuario?
        if not users:
            results['users'] = []
            response_body['message'] = 'No Existe ningún Usuario'
            response_body['results'] = results
            return response_body, 400  # Revisar qué error es, debería ser un 20(X)??
        list_usuarios = []
        for row in users: 
            list_usuarios.append(row.serialize())
        results['users'] = list_usuarios
        response_body['message'] = 'Listado de Usuarios'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # La lógica ahora
        user = Users(email = data.get('email').lower(),
                     password = data.get('password'),
                     is_active = True,
                     subscription_date = datetime.now())
        try:              
            db.session.add(user)  # Lo agrega en la tabla
            db.session.commit()  # Lo confirma
            # Generar el Token
            results['user'] = user.serialize()
            response_body['message'] = 'Usuario Creado'
            response_body['results'] = results
            return response_body, 200
        except:  # Puedes tratar varios errores (if)
            response_body['message'] = 'Ha ocurrido un error, probablemente el email ya existe'
            return response_body, 400

# Ruta ID Usuario

@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])  
def handle_user(user_id):
    response_body = {}
    results = {}
    if request.method == 'GET':
        users = db.session.get(Users, user_id)
        if not user:
            response_body['message'] = 'No Existe el Usuario'
            return response_body, 400
        results['user'] = user.serialize()
        response_body['message'] = 'Usuario Encontrado'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = 'No Existe el Usuario'
            return response_body, 400
        user.email = data.get('email')
        db.session.commit()
        results['user'] = user.serialize()
        response_body['message'] = 'Usuario Actualizado'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = 'No Existe el Usuario'
            return response_body, 400
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = 'Usuario eliminado'
        return response_body, 200

# Planets:
@api.route('/planets', methods=['GET', 'POST'])  
def handle_planets():
    response_body = results = {}
    if request.method == 'GET':
        planets = db.session.execute(db.select(Planets)).scalars() #
        if not planets:
            results['planets'] = []
            response_body['message'] = 'No Existe ningún Planeta'
            response_body['results'] = results
            return response_body, 400  
        list_planets = []
        for row in planets: 
            list_planets.append(row.serialize())
        results['planets'] = list_planets
        response_body['message'] = 'Listado de Planetas'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # La lógica ahora
        planet = Planets(id = data.get('id'),
                       name = data.get('name'),
                       diameter = data.get('diameter'),
                       rotation_period = data.get('rotation_period'),
                       gravity = data.get('gravity'),
                       population = data.get('population'),
                       climate = data.get('climate'),
                       terrain = data.get('terrain'),
                       surface_water = data.get('surface_water'))
        try:              
            db.session.add(planet)  
            db.session.commit()  
            results['planet'] = planet.serialize()
            response_body['message'] = 'Planeta Creado'
            response_body['results'] = results
            return response_body, 200
        except: 
            response_body['message'] = 'Ha ocurrido un error'
            return response_body, 400

@api.route('/planets/<int:planet_id>', methods=['GET', 'PUT', 'DELETE'])  
def handle_planet(planet_id):
    response_body = {}
    results = {}
    if request.method == 'GET':
        planets = db.session.get(Planets, planet_id)
        if not planet:
            response_body['message'] = 'No Existe el Planeta'
            return response_body, 400
        results['planet'] = planet.serialize()
        response_body['message'] = 'Planeta Encontrado'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        planet = db.session.execute(db.select(Planets).where(Planets.id == planet_id)).scalar()
        if not planet:
            response_body['message'] = 'No Existe el Planeta'
            return response_body, 400
        planet.name = data.get('name')
        planet.diameter = data.get('diameter'),
        planet.rotation_period = data.get('rotation_period'),
        planet.gravity = data.get('gravity'),
        planet.population = data.get('population'),
        planet.climate = data.get('climate'),
        planet.terrain = data.get('terrain'),
        planet.surface_water = data.get('surface_water')
        db.session.commit()
        results['planet'] = planet.serialize()
        response_body['message'] = 'Planeta Actualizado'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'DELETE':
        planet = db.session.get(Planets, planet_id)
        if not planet:
            response_body['message'] = 'No Existe el planeta'
            return response_body, 400
        db.session.delete(planet)
        db.session.commit()
        response_body['message'] = 'Planeta eliminado'
        return response_body, 200

# Movies
@api.route('/movies', methods=['GET', 'POST'])  
def handle_movies():
    response_body = results = {}
    if request.method == 'GET':
        movies = db.session.execute(db.select(Movies)).scalars() #
        if not movies:
            results['movies'] = []
            response_body['message'] = 'No Existe ninguna Movie'
            response_body['results'] = results
            return response_body, 400  
        list_movies = []
        for row in movies: 
            list_movies.append(row.serialize())
        results['movies'] = list_movies
        response_body['message'] = 'Listado de Películas'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # La lógica ahora
        movie = Movies(id = data.get('id'),
                      title = data.get('title'),
                      year = data.get('year'))
          
        try:              
            db.session.add(movies)  
            db.session.commit()  
            results['movies'] = movies.serialize()
            response_body['message'] = 'Película Creada'
            response_body['results'] = results
            return response_body, 200
        except: 
            response_body['message'] = 'Ha ocurrido un error'
            return response_body, 400

@api.route('/movies/<int:movie_id>', methods=['GET', 'PUT', 'DELETE'])  
def handle_movie(movie_id):
    response_body = {}
    results = {}
    if request.method == 'GET':
        movies = db.session.get(Movies, movie_id)
        if not movies:
            response_body['message'] = 'No Existe la película'
            return response_body, 400
        results['movies'] = movie.serialize()
        response_body['message'] = 'Película Encontrada'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        movie = db.session.execute(db.select(Movies).where(Movies.id == movie_id)).scalar()
        if not movie:
            response_body['message'] = 'No Existe la Película'
            return response_body, 400
            movie.name = data.get('name')
            movie.title = data.get('title')
            movie.year = data.get('year')
        db.session.commit()
        results['movie'] = movie.serialize()
        response_body['message'] = 'Película Actualizada'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'DELETE':
        planet = db.session.get(Movies, planet_id)
        if not movies:
            response_body['message'] = 'No Existe la película'
            return response_body, 400
        db.session.delete(movie)
        db.session.commit()
        response_body['message'] = 'Película eliminada'
        return response_body, 200

#Characters
@api.route('/characters', methods=['GET', 'POST'])  
def handle_characters():
    response_body = results = {}
    if request.method == 'GET':
        characters = db.session.execute(db.select(Characters)).scalars() #
        if not characters:
            results['characters'] = []
            response_body['message'] = 'No Existe ningun Personaje'
            response_body['results'] = results
            return response_body, 400  
        list_characters = []
        for row in characters: 
            list_characters.append(row.serialize())
        results['characters'] = list_characters
        response_body['message'] = 'Listado de Personajes'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # La lógica ahora
        character = Characters(id = data.get('id'),
                               name = data.get('name'),
                               gender = data.get('gender'),
                               height = data.get('height'),
                               hair_color = data.get('hair_color'),
                               skin_color = data.get('skin_color'),
                               users_id = data.get('users_id'))
        try:              
            db.session.add(characters)  
            db.session.commit()  
            results['characters'] = characters.serialize()
            response_body['message'] = 'Personaje Creado'
            response_body['results'] = results
            return response_body, 200
        except: 
            response_body['message'] = 'Ha ocurrido un error'
            return response_body, 400

@api.route('/characters/<int:character_id>', methods=['GET', 'PUT', 'DELETE'])  
def handle_character(character_id):
    response_body = {}
    results = {}
    if request.method == 'GET':
        characters = db.session.get(Character, character_id)
        if not characters:
            response_body['message'] = 'No Existe el Personaje'
            return response_body, 400
        results['characters'] = movie.serialize()
        response_body['message'] = 'Personaje Encontrado'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        character = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
        if not character:
            response_body['message'] = 'No Existe el Personaje'
            return response_body, 400
            character.name = data.get('name')
            character.gender = data.get('gender')
            character.height = data.get('height')
            character.hair_color = data.get('hair_color')
            character.skin_color = data.get('skin_color')
        db.session.commit()
        results['character'] = character.serialize()
        response_body['message'] = 'Personaje Actualizado'
        response_body['results'] = results
        return response_body, 200
    if request.method == 'DELETE':
        planet = db.session.get(Characters, planet_id)
        if not characters:
            response_body['message'] = 'No Existe el Personaje'
            return response_body, 400
        db.session.delete(character)
        db.session.commit()
        response_body['message'] = 'Personaje eliminado'
        return response_body, 200

#Favoritos


