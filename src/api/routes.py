"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Show
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/show', methods=['POST'])
def post_show():

    showTitle = request.json.get('showTitle')
    favorites_id = request.json.get('favorites_id')

    new_show = Show(

        showTitle=showTitle,
        favorites_id=favorites_id

    )

    db.session.add(new_show)
    db.session.commit()

    return jsonify("SHOW CREATED"), 200


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    age = request.json.get("age")

    new_signup = User(
        email=email,
        password=password,
        name=name,
        age=age
    )
    db.session.add(new_signup)
    db.session.commit()

    return jsonify("user signedup"), 200


# POST method for Favorites// still working on this... very similar to routes
@api.route('/favorites', methods=['POST'])
def post_favorites():
    data = request.json
    new_favorite = Favorites(
        user=data["user_id"]
    )
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite.serialize()), 200



@api.route("/favorites", methods=["GET"])
def get_favorites():

    favorites = Favorites.query.all()
    favoriteList = [fav.serialize() for fav in favorites]
    return jsonify(favoriteList)
