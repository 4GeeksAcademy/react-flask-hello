from flask import Flask, request, jsonify, url_for, Blueprint # type: ignore
from api.models.Games import Games
from api.database.db import db
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint("api/games", __name__)

# FALTA PROBAR SI FUNCIONA CORRECTAMENTE EN POSTMAN
# AÑADIR ELIMINAR JUEGO
# AÑADIR MODIFICAR DATOS DEL JUEGO(PRECIO,STOCK)


# MOSTRAR TODOS LOS JUEGOS
@api.route("/", methods = ["GET"])
def get_all_games():
   all_games = Games.query.all()
   if all_games is None:
      return jsonify("Error, no se han encontrado los juegos"),404
   all_games = list(map(lambda x: x.serialize(),all_games))
   return jsonify({"games" : all_games}),200


# CREAR UN NUEVO JUEGO
@api.route('/addgame', methods=["POST"])
def add_game():

    body = request.get_json()

    if "img" and "name" and "platform" and "description" and "price" not in body:
        return jsonify("Error, debes introducir los campos obligatorios"), 404

    new_game = Games()
    new_game.img = body["img"]
    new_game.name = body["name"]
    new_game.platform = body["platform"]
    new_game.description =body["description"]
    new_game.price = body["price"]
    print(new_game)

    db.session.add(new_game)
    db.session.commit()

    return jsonify("Juego añadido correctamente"),200
    

    # ELIMINAR JUEGOS
@api.route("games/<int:game_id>",methods = ["DELETE"])
def delete_game(game_id):
    game = db.session.get(Games,game_id)
    if game is None:
        return jsonify("Error, no se ha encontrado el juego buscado"),404
    db.session.delete(game)
    db.session.commit()

    return jsonify("Juego eliminado correctamente"),200