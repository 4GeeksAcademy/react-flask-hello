from flask import Flask, request, jsonify, url_for, Blueprint # type: ignore
from api.models.Games import Games
from api.database.db import db
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint("api/game", __name__)

# FALTA PROBAR SI FUNCIONA CORRECTAMENTE EN POSTMAN
# AÑADIR ELIMINAR JUEGO
# AÑADIR MODIFICAR DATOS DEL JUEGO(PRECIO,STOCK)
# CREAR UN NUEVO JUEGO
@api.route('/addGame', methods=["POST"])
def add_game():

    body = request.get_json()

    if "img" and "name" and "platform" and "description" and "price" and "stock"not in body:
        return jsonify("Error, debes introducir los campos obligatorios"), 404

    new_game = Games()
    new_game.img = body["img"]
    new_game.name = body["name"]
    new_game.platform = body["platform"]
    new_game.description =body["description"]
    new_game.price = body["price"]
    new_game.is_stock = True

    db.session.add(new_game)
    db.session.commit()

    return jsonify("Juego añadido correctamente"),200
    