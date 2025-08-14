from flask import Flask, request, jsonify, url_for, Blueprint  # type: ignore
from api.models.Games import Games
from api.database.db import db
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


api = Blueprint("api/games", __name__)

# FALTA PROBAR SI FUNCIONA CORRECTAMENTE EN POSTMAN
# AÑADIR ELIMINAR JUEGO
# AÑADIR MODIFICAR DATOS DEL JUEGO(PRECIO,STOCK)


# MOSTRAR TODOS LOS JUEGOS
@api.route("/", methods=["GET"])
def get_all_games():
   all_games = Games.query.all()
   if all_games is None:
      return jsonify("Error, no se han encontrado los juegos"), 404
   all_games = list(map(lambda x: x.serialize(), all_games))
   return jsonify({"all_games": all_games}), 200


@api.route("/detailsgames/<id>", methods=["GET"])
def get_game(id):
   game = db.session.get(Games, id)
   if game is None:
      return jsonify("Error, no se ha encontrado el juego"), 400

   return jsonify({"game": game.serialize()}), 200

# CREAR UN NUEVO JUEGO


@api.route('/addgame', methods=["POST"])
def add_game():
    body = request.get_json()

    # Validación correcta de campos obligatorios
    required = [
        "img", "video", "name", "platform", "description",
        "price", "distribuidora", "genero", "online", "offline", "gamemode"
    ]
    missing = [field for field in required if field not in body or body[field] in [None, ""]]
    if missing:
        return jsonify({
            "error": "Faltan campos obligatorios",
            "missing": missing
        }), 400

    # Normalizar la plataforma
    ALIASES = {
        "ps5": "PS5", "playstation5": "PS5", "playstation 5": "PS5",
        "ps4": "PS4", "playstation4": "PS4", "playstation 4": "PS4",
        "nintendo": "Nintendo",
        "xbox one": "Xbox One",
        "xbox series s": "Xbox Series S/X", "xbox series x": "Xbox Series S/X",
        "nintendo switch": "Nintendo Switch",
        "nintendo switch 2": "Nintendo Switch 2",
        "pc": "PC"
    }
    raw_platform = body["platform"].strip().lower()
    normalized_platform = ALIASES.get(raw_platform, body["platform"])

    # Crear nuevo juego
    new_game = Games()
    new_game.img = body["img"]
    new_game.video = body["video"]
    new_game.name = body["name"]
    new_game.platform = normalized_platform
    new_game.description = body["description"]
    new_game.price = body["price"]
    new_game.distribuidora = body["distribuidora"]
    new_game.genero = body["genero"]
    new_game.online = body["online"]
    new_game.offline = body["offline"]
    new_game.gamemode = body["gamemode"]

    db.session.add(new_game)
    db.session.commit()

    return jsonify("Juego añadido correctamente"), 200

    # MODIFICAR JUEGOS

@api.route('/EditGames/<int:game_id>', methods=["PUT"])
def edit_game(game_id):
    game = Games.query.get(game_id)
    body = request.get_json()
    if game is None:
        return jsonify({"error": "Juego no encontrado"}), 404
    
    if "img" and "video" and "name" and "platform" and "description" and "price" and "distribuidora" and "genero" and "online" and "offline" and "gamemode" not in body:
        return jsonify("Error, debes introducir los campos obligatorios"), 404

    game.img = body["img"]
    game.video = body["video"]
    game.name = body["name"]
    game.platform = body["platform"]
    game.description = body["description"]
    game.price = body["price"]
    game.distribuidora = body["distribuidora"]
    game.genero = body["genero"]
    game.online = body["online"]
    game.offline = body["offline"]
    game.gamemode = body["gamemode"]

    db.session.commit()
    return jsonify({"mensaje": "Juego modificado correctamente"}), 200

    # ELIMINAR JUEGOS
@api.route("/<int:game_id>",methods = ["DELETE"])
def delete_game(game_id):
    all_game = db.session.get(Games,game_id)
    if all_game is None:
        return jsonify("Error, no se ha encontrado el juego buscado"),404
    db.session.delete(all_game)
    db.session.commit()

    return jsonify("Juego eliminado correctamente"),200
    # FILTRO DE JUEGOS BETO
@api.route("/platform/<string:platform>", methods=["GET"])
def get_games_by_platform(platform):
    needle = platform.strip().lower().replace(" ", "")  # "Play Station" -> "playstation"

    normalized = db.func.replace(db.func.lower(Games.platform), " ", "")
    q = Games.query.filter(normalized.ilike(f"%{needle}%"))

    games = [g.serialize() for g in q.all()]
    return jsonify({"games": games}), 200

    # FILTRO DE JUEGOS BETO
@api.route("/platforms", methods=["GET"])
def list_platforms():
    rows = db.session.query(Games.platform).distinct().all()
    return jsonify({"platforms": [r[0] for r in rows]}), 200

