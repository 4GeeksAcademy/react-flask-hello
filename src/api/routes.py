"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Hosts, Players, Tournaments, Matches, Participants, Match_participants, Teams
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# /////////////////////////////////////////USER/////////////////////////////////////////

@api.route('/signup', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    player = request.json.get ('player', None)
   

    if not email or not password:
        return jsonify({'msg': 'Todos los campos son necesarios'}), 400


    exist = Users.query.filter_by(email=email).first()
    if exist: 
        return jsonify({'success': False, 'msg': 'El correo electronico ya existe'}), 400
    
    hashed_password = generate_password_hash(password)
    print(hashed_password)
    new_user = Users(email=email, password=hashed_password, player=player)

    if player: 
        new_player = Players()
        db.session.add(new_player)
        db.session.flush()
        new_user.player_id = new_player.id
        db.session.add(new_user)
        db.session.commit()
        token = create_access_token(identity=str(new_user.id))
        return jsonify({'user_info': new_user.serialize(), 'player_info': new_player.serialize(), 'token': token}), 200

    if not player: 
        new_host = Hosts()
        db.session.add(new_host)
        db.session.flush()
        new_user.host_id = new_host.id
        db.session.add(new_user)
        db.session.commit()
        token = create_access_token(identity=str(new_user.id))
        return jsonify({'user_info': new_user.serialize(), 'host_info': new_host.serialize(), 'token': token}), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    player_info = ""
    host_info = ""
    if not email or not password:
        return jsonify({'msg': 'Email y contraseña son obligatorios'}), 400
    
    user = Users.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({'msg': 'Usuario no encontrado'}), 404
    
    if not check_password_hash (user.password, password):
        return jsonify ({'msg': 'email/contraseña incorrectos'}), 404

    if user.player_id:
        player_info = Players.query.get(user.player_id)
    
    if user.host_id:
        host_info = Hosts.query.get(user.host_id)
    


    token = create_access_token(identity=str(user.id))
    return jsonify({'user_info': user.serialize(), 'player_info': player_info.serialize() if  player_info else None, 'host_info': host_info.serialize() if  host_info else None, 'token': token}), 200


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    identity = get_jwt_identity()
    users = Users.query.get(identity)   
    if users: 
        print(users.serialize()) 
        return jsonify({'success': True, 'msg': 'OK', 'user': users.serialize()})
    return jsonify({'success': False, 'msg': 'Token erroneo'})


# /////////////////////////////////////////PLAYER/////////////////////////////////////////

@api.route('/getPlayers', methods=['PUT'])
@jwt_required()
def editPlayer():
    id = get_jwt_identity()
    name = request.json.get('name', None)
    gender = request.json.get('gender', None)
    age = request.json.get('age', None)
    rating = request.json.get('rating', None)
    side = request.json.get('side', None)
    hand = request.json.get('hand', None)


    if not name or not gender or not age or not rating or not side or not hand:
        return jsonify({'msg': 'Todos los campos son necesarios'}), 400

    # Conecta player con user y Buscar al jugador por ID
    player = Players.query.join(Users, Users.player_id == Players.id).filter(Users.id == id).first()
    if not player:
        return jsonify({'msg': 'El jugador no existe'}), 404
    
    if name:
        player.name = name
    if gender:
        player.gender = gender
    if age:
        player.age = age
    if rating:
        player.rating = rating
    if side:
        player.side = side
    if hand:
        player.hand = hand
    

    db.session.commit()
    return jsonify({'msg': 'Jugador actualizado con éxito', 'player': player.serialize()}), 200

@api.route('/getPlayers', methods=['GET'])
def get_players():
    try:
        # Consultar todos los jugadores de la base de datos
        players = Players.query.all()
        
        # Verificar si hay jugadores en la base de datos
        if not players:
            return jsonify({'msg': 'No hay jugadores registrados'}), 404
        
        # Serializar y retornar la lista de jugadores
        return jsonify({'players': [player.serialize() for player in players]}), 200
    except Exception as e:
        # Manejo de errores
        return jsonify({'msg': 'Error al obtener los jugadores', 'error': str(e)}), 500

@api.route('/getPlayers/<int:id>', methods=['GET'])
def get_player(id):

    player = Players.query.get(id)
    if not player:    
        return jsonify({'msg': 'Player no encontrado'}), 404
    return jsonify({'player': player.serialize()}), 200     # Devuelve la información serializada del host



# /////////////////////////////////////////HOST/////////////////////////////////////////

@api.route('/host/profile', methods=['GET'])    # Mostrar lista de perfiles de todos los hosts
def all_host_profile():
    try:
        all_hosts = Hosts.query.all()

        if not all_hosts:
            return jsonify({'msg': 'Hosts no encontrados'}), 404
        
        serialized_hosts = [host.serialize() for host in all_hosts]

        return jsonify({'hosts': serialized_hosts}), 200
    
    except Exception as e:
        return jsonify({'msg': 'Ocurrió un error al obtener los hosts', 'error': str(e)}), 500


@api.route('/host/profile/', methods=['GET'])   # Mostrar el perfil del host seleccionado
def one_host_profile(id):
    try:
        host = Hosts.query.get(id)   
        if not host:
            return jsonify({'msg': 'Host no encontrado'}), 404 
        
        return jsonify({'host': host.serialize()}), 200
    
    except Exception as e:
        return jsonify({'msg': 'Ocurrió un error al obtener los hosts', 'error': str(e)}), 500


@api.route('/host/profile/', methods=['PUT'])    #Editar el perfil del host seleccionado
def edit_host_profile(id):
    try:
        data = request.json

        host = Hosts.query.get(id)
        
        if not host:
            return jsonify({'msg': 'Host no encontrado'}), 404
 
        host.name = data.get('name', host.name)
        host.address = data.get('address', host.address)
        host.court_type = data.get('court_type', host.court_type)
        host.tournament_id = data.get('tournament_id', host.tournament_id)

        db.session.commit()

        return jsonify({'msg': 'Host actualizado con éxito', 'host': host.serialize()}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500