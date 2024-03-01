"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Subscription, Testimony, Session, Instructor, Types_of_session, Vinyasa_yoga, Rocket_yoga, Ashtanga_yoga, Hatha_yoga, Meditation, Harmonium, Jivamukti_yoga
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import datetime, timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# 
# Aquí haremos la rutas de backend
# IMPORTANTE siempre poner api.route en los endpoints 
# 

#endpoint para traer a los usuarios
@api.route('/user', methods=['GET'])
def get_users():    
    user_query = User.query.all()
    user_query = list(map(lambda item: item.serialize(), user_query))
    # print(user_query)    
    if user_query == []:
        return jsonify({
             "Msg": "No hay usuarios registrados"
             }), 404
        
    response_body = {
        "msg": "ok",
        "user": user_query    }    
        
    return jsonify(response_body), 200
    # Create a route to authenticate your users and return JWTs. The
    # create_access_token() function is used to actually generate the JWT.

#api para traer un usuario en concreto
@api.route('/user/<int:user_id>', methods=['GET'])
# Si devuelve ok aparecerá en la consola de vscode el numero de id.
def get_one_user(user_id):
    user_query = User.query.filter_by(id = user_id).first() #El filter sera con el id, no se podrá repetir
    # Te lo devuelve en crudo.
    
    if user_query is None:
        return jsonify({
            "msg": "User not found"
        }), 404
    
    response_body = {
        "msg": "ok",
        "user": user_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
    }
    return jsonify(response_body), 200


#endpoint para iniciar sesion con usuario existente
@api.route("/login", methods=["POST"])
def login():
    print("HOLA")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_query = User.query.filter_by(email=email).first()
    if email != user_query.email or password != user_query.password:
        print("CHAO")
        return jsonify({"msg": "Bad email or password"}), 401    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
# verificar el tiempo que ha pasado para cobrar a la persona


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

#endpoint para guardar el token del usuario
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    info_profile = User.query.filter_by(email=current_user).first()
    return jsonify({"user": info_profile.serialize()}), 200


#endpoint para que aparezcan las clases
@api.route('/sessions', methods=['GET'])
def get_sessions():    
    session_query = Session.query.all()
    session_query = list(map(lambda item: item.serialize(), session_query))
    print(session_query)    
    if session_query == []:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
        
    response_body = {
        "msg": "ok",
        "session": session_query    }    
        
    return jsonify(response_body), 200
    # Create a route to authenticate your users and return JWTs. The
    # create_access_token() function is used to actually generate the JWT.

#endpoint para que aparezcan las clases de yoga por tipo

@api.route('/yogatype', methods=['GET'])
def get_yogatype():
    yogatype_1_query = Jivamukti_yoga.query.all()
    yogatype_2_query = Vinyasa_yoga.query.all()
    yogatype_3_query = Rocket_yoga.query.all()
    yogatype_4_query = Ashtanga_yoga.query.all()
    yogatype_5_query = Hatha_yoga.query.all()
    yogatype_6_query = Meditation.query.all()
    yogatype_7_query = Harmonium.query.all()
    yogatype_1_query = list(map(lambda item: item.serialize(),  yogatype_1_query))
    yogatype_2_query = list(map(lambda item: item.serialize(),  yogatype_2_query))
    yogatype_3_query = list(map(lambda item: item.serialize(),  yogatype_3_query))
    yogatype_4_query = list(map(lambda item: item.serialize(),  yogatype_4_query))
    yogatype_5_query = list(map(lambda item: item.serialize(),  yogatype_5_query))
    yogatype_6_query = list(map(lambda item: item.serialize(),  yogatype_6_query))
    yogatype_7_query = list(map(lambda item: item.serialize(),  yogatype_7_query))
    # print(jivamukti_query)
    if yogatype_1_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    if yogatype_2_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    if yogatype_3_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    if yogatype_4_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    if yogatype_5_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    if yogatype_6_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    if yogatype_7_query == [] or None:
        return jsonify({
             "Msg": "No hay sesiones disponibles"
             }), 404
    response_body = {
        "msg": "ok",
        "jivamukti_sessions": yogatype_1_query,
        "vinyasa_sessions": yogatype_2_query,
        "rocket_sessions": yogatype_3_query,
        "ashtanga_sessions": yogatype_4_query,
        "hatha_sessions": yogatype_5_query,
        "meditation_sessions": yogatype_6_query,
        "harmonium_sessions": yogatype_7_query
    }
    return jsonify(response_body), 200


#Endpoint para que aparezca un typo de yoga con su id yoga especifico
@api.route('/<string:yogatype>/<int:yogatype_id>', methods=['GET'])
# Si devuelve ok aparecerá en la consola de vscode el numero de id.
def get_one_yoga_session(yogatype, yogatype_id):
    if (yogatype == 'jivamuktiyoga'):
        jivamukti_query = Jivamukti_yoga.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        # Te lo devuelve en crudo.
    
        if jivamukti_query is None:
            return jsonify({
                "msg": "Jivamukti session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "jivamukti_session": jivamukti_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200
    
    elif (yogatype == 'vinyasayoga'):
        vinyasa_query = Vinyasa_yoga.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        if vinyasa_query is None:
            return jsonify({
                "msg": "vinyasa session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "vinyasa_session": vinyasa_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200
    
    elif (yogatype == 'rocketyoga'):
        rocket_query = Rocket_yoga.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        # Te lo devuelve en crudo.
        if rocket_query is None:
            return jsonify({
                "msg": "rocket session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "rocket_session": rocket_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200 

    elif (yogatype == 'ashtangayoga'):
        ashtanga_query = Ashtanga_yoga.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        # Te lo devuelve en crudo.
        if ashtanga_query is None:
            return jsonify({
                "msg": "ashtanga session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "ashtanga_session": ashtanga_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200 

    elif (yogatype == 'hathagayoga'):
        hatha_query = Hatha_yoga.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        # Te lo devuelve en crudo.
        if hatha_query is None:
            return jsonify({
                "msg": "hatha session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "hatha_session": hatha_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200
    
    elif (yogatype == 'meditation'):
        meditation_query = Meditation.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        # Te lo devuelve en crudo.
        if meditation_query is None:
            return jsonify({
                "msg": "meditation session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "meditation_session": meditation_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200
    
    elif (yogatype == 'harmonium'):
        harmonium_query = Harmonium.query.filter_by(id = yogatype_id).first() #El filter sera con el id, no se podrá repetir
        # Te lo devuelve en crudo.
        if harmonium_query is None:
            return jsonify({
                "msg": "harmonium session not found"
            }), 404
        
        response_body = {
            "msg": "ok",
            "harmonium_session": harmonium_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
        }
        return jsonify(response_body), 200 

#endpoint the teachers
@api.route('/theteachers', methods=['GET'])
def get_theteachers():
    
    theteachers_query = Instructor.query.all()
    theteachers_query = list(map(lambda item: item.serialize(),  theteachers_query))
    print(theteachers_query)
    if theteachers_query == [] or None:
        return jsonify({
             "Msg": "There aren't teachers available."
             }), 404
    
    response_body = {
        "msg": "ok",
        "theteachers": theteachers_query
    }
    return jsonify(response_body), 200


# @api.route('/jivamuktiyoga', methods=['GET'])
# def get_jivamukti():    
#     jivamukti_query = Jivamukti_yoga.query.all()
#     jivamukti_query = list(map(lambda item: item.serialize(), jivamukti_query))
#     # print(jivamukti_query)    
#     if jivamukti_query == [] or None:
#         return jsonify({
#              "Msg": "No hay sesiones disponibles"
#              }), 404
        
#     response_body = {
#         "msg": "ok",
#         "jivamukti_sessions": jivamukti_query    }    
        
#     return jsonify(response_body), 200

#Endpoint para que aparezca un jivamukti yoga especifico
# @api.route('/jivamuktiyoga/<int:jivamukti_id>', methods=['GET'])
# # Si devuelve ok aparecerá en la consola de vscode el numero de id.
# def get_one_jivamukti(jivamukti_id):
#     jivamukti_query = Jivamukti_yoga.query.filter_by(id = jivamukti_id).first() #El filter sera con el id, no se podrá repetir
#     # Te lo devuelve en crudo.
    
#     if jivamukti_query is None:
#         return jsonify({
#             "msg": "Jivamukti session not found"
#         }), 404
    
#     response_body = {
#         "msg": "ok",
#         "jivamukti_session": jivamukti_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
#     }
#     return jsonify(response_body), 200

#endpoint para que aparezcan las clases de vinyasa
# @api.route('/vinyasayoga', methods=['GET'])
# def get_vinyasa():    
#     vinyasa_query = Vinyasa_yoga.query.all()
#     vinyasa_query = list(map(lambda item: item.serialize(), vinyasa_query))
#     # print(jivamukti_query)    
#     if vinyasa_query == [] or None:
#         return jsonify({
#              "Msg": "No hay sesiones Vinyasa disponibles"
#              }), 404
        
#     response_body = {
#         "msg": "ok",
#         "vinyasa_sessions": vinyasa_query    }    
        
#     return jsonify(response_body), 200


# #Endpoint para que aparezca un vinyasa yoga especifico
# @api.route('/vinyasayoga/<int:vinyasa_id>', methods=['GET'])
# # Si devuelve ok aparecerá en la consola de vscode el numero de id.
# def get_one_vinyasa(vinyasa_id):
#     vinyasa_query = Vinyasa_yoga.query.filter_by(id = vinyasa_id).first() #El filter sera con el id, no se podrá repetir
#     # Te lo devuelve en crudo.
#     if vinyasa_query is None:
#         return jsonify({
#             "msg": "vinyasa session not found"
#         }), 404
    
#     response_body = {
#         "msg": "ok",
#         "vinyasa_session": vinyasa_query.serialize() #Hacemos el serialize para mostrar la informacion tratada.
#     }
#     return jsonify(response_body), 200 



#endpoint para registrarse
@api.route("/signup", methods=["POST"])
def signup():
    # El request_body o cuerpo de la solicitud ya está decodificado en formato JSON y se encuentra en la variable request.json
    request_body = request.json
    # Creamos variable y se la metemos dentro de user(Como otra instancia, cada user es una)
    # le damos como valores a name y password los request que pondremos en el Postman
    
    data = request.json
    name = data.get('name')
    password = data.get('password')
    last_name = data.get('last_name')
    email = data.get('email')
    date_of_birth = data.get('date_of_birth')
    role = data.get('role')
    subscription_start_date = datetime.today() #para que aparezca la fecha de registro en la fecha actual de rellenar el formulario
    plan = data.get('plan')
    last_payment_date = ''
    next_payment_date = ''
    is_subscription_active = True


    # Example validation
    if not email or not password or not name or not last_name or not date_of_birth or not role:
        return jsonify({'Error': 'All the fields are required'}), 400    # Example database interaction (using SQLAlchemy)
    
    if plan == "Free Trial":
        next_payment_date = subscription_start_date + timedelta(days=4) #que el proximo pago sea 3 dias después de registrarse
    else:
        last_payment_date = subscription_start_date
        next_payment_date = subscription_start_date + timedelta(days=30)

    new_user = User(
        name=name, 
        last_name=last_name, 
        password=password, 
        email=email, 
        date_of_birth=date_of_birth, 
        role=role,
        subscription_start_date=subscription_start_date,
        next_payment_date=next_payment_date,
        last_payment_date=last_payment_date,
        is_subscription_active=is_subscription_active
        )
    

    print(new_user)
    # Le decimos que lo agregue y que lo comitee 
    db.session.add(new_user)
    db.session.commit()

    # generamos el token de este usuario
    access_token = create_access_token(identity=new_user.name)

    response_body = {
        "msg": "the user has been created",
        "access_token": access_token
        }
    
    return jsonify(response_body), 200


#endpoint para registrarse
@api.route("/signup/freetrial", methods=["POST"])
def signup_free_trial():
    # El request_body o cuerpo de la solicitud ya está decodificado en formato JSON y se encuentra en la variable request.json
    request_body = request.json
    
    data = request.json
    name = data.get('name')
    password = data.get('password')
    last_name = data.get('last_name')
    email = data.get('email')
    date_of_birth = data.get('date_of_birth')
    role = data.get('role')
    subscription_start_date = datetime.today() #para que aparezca la fecha de registro en la fecha actual de rellenar el formulario
    subscription = Subscription.query.filter_by(plan='Free Trial').first() #seleccionamos la opcion del plan Free Trial
    last_payment_date = ''
    next_payment_date = ''
    is_subscription_active = True

    # Example validation
    if not email or not password or not name or not last_name or not date_of_birth or not role:
        return jsonify({'Error': 'All the fields are required'}), 400    # Example database interaction (using SQLAlchemy)
    
    # if subscription == 'Free Trial':
    next_payment_date = subscription_start_date + timedelta(days=4) #que el proximo pago sea 3 dias después de registrarse
    

    new_user = User(
        name=name, 
        last_name=last_name, 
        password=password, 
        email=email, 
        date_of_birth=date_of_birth, 
        role=role,
        subscription_start_date=subscription_start_date,
        subscription=subscription,
        next_payment_date=next_payment_date,
        last_payment_date=last_payment_date,
        is_subscription_active=is_subscription_active
        )
    
    # print(new_user)
    # Le decimos que lo agregue y que lo comitee 
    db.session.add(new_user)
    db.session.commit()

    # generamos el token de este usuario
    access_token = create_access_token(identity=new_user.name)

    response_body = {
        "msg": "the user has been created with the Free Trial plan",
        "access_token": access_token
        }
    return jsonify(response_body), 200


#endpoint para desuscribirse
@api.route("/unsubscribe", methods=["POST"])
@jwt_required()
def unsubscribe():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user:
        if user.subscription_end_date is None: #si no hay fecha de subscripción, añade la actual
            user.subscription_end_date = datetime.utcnow()
            user.is_subscription_active = False
            db.session.commit()
            return jsonify({
                "msg": "User unsubscribed succesfully"
            }), 200
        else:
            return jsonify({
                "msg": "User alredy unsubscribed"
            }), 200
    
    else:
        return jsonify({
            "msg": "User not found"
        }), 404
