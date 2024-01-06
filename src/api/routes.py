"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Movie, Movie_2
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/movies', methods=['GET'])
def get_movies():

       # Consulta todos los productos en la base de datos
    movies = Movie.query.all()

    # Serializa los productos en un formato JSON
    serialized_movies = [movie.serialize() for movie in movies]

    # Devuelve la lista de productos como respuesta
    return jsonify(serialized_movies)

@api.route('/movies_2', methods=['GET'])
def get_movies_2():

       # Consulta todos los productos en la base de datos
    movies = Movie_2.query.all()

    # Serializa los productos en un formato JSON
    serialized_movies = [movie.serialize() for movie in movies]

    # Devuelve la lista de productos como respuesta
    return jsonify(serialized_movies)