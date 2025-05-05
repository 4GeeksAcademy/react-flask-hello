"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites, Show
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# test the "try block" to ensure it works well then add to the favorites post method as well.
try:
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

except:
    print("Error has occured. Please try to favorite show again.")


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    find_user = User.query.filter_by(email=email).first()

    user = {"name": find_user.name, "email": find_user.email}
    print(find_user.password, "where is my user?!!??!?")

    # <--this will return a true or false about password that was entered-->
    if not check_password_hash(find_user.password, password):
        return jsonify({"message":"Wrong Password!!"}), 500
    return jsonify({"user": user})


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    age = request.json.get("age")
    find_user = User.query.filter_by(email=email).first()
    if find_user:
        return jsonify("email already in use"), 500

    new_signup = User(
        email=email,
        password=generate_password_hash(password),
        name=name,
        age=age
    )
    db.session.add(new_signup)
    db.session.commit()

    return jsonify("user signedup"), 200


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


@api.route("/showlist", methods=["GET"])
def get_showlist():

    showList = Show.query.all()
                        #^--- this is going to shuffle through all the shows in 'Show Model'
    showChoices = [list.serialize() for list in showList]
                         # must have loop in order to serialize 
    return jsonify(showChoices) 
@api.route('/reset_password', methods=['PUT'])
def reset_password():
    email = request.json.get("email")
    user = User.query.filter_by(email=email).first()
    new_password = request.json.get("password")
    user.password = generate_password_hash(new_password),


    db.session.commit()
    return jsonify({"password":"Password Reset"}), 200
