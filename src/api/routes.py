"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from flask import current_app
from api.models import db, User, Pyme, TiposUsuario, Provincias, Cantones, TiposServicio
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash       ## Nos permite manejar tokens por authentication (usuarios)    
import datetime

#for creating password from backend
from urllib.request import urlopen
import json

#for sending email from flask mail
from flask_mail import Mail, Message
app = Flask(__name__)
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'dirpro4g@gmail.com'
app.config['MAIL_PASSWORD'] = 'a1b2c3D$'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)
#mail.init_app(api)
#end of flask email setup



api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/pymeprovincia', methods=['POST'])
def pyme_provincia():
    provinciaID = request.json.get("provinciaID", None)
    
    provinciasQuery = Pyme.query.filter_by(id_provincia=provinciaID)

    provincias = list(map(lambda x: x.serialize(), provinciasQuery))

    return jsonify(provincias), 200

@api.route('/pyme', methods=['POST'])
def pyme():

    pymeID = request.json.get("pymeID", None)
    
    pymesQuery = Pyme.query.filter_by(id=pymeID)

    pyme = list(map(lambda x: x.serialize(), pymesQuery))

    return jsonify(pyme), 200

@api.route('/provincia', methods=['POST'])
def provincia():

    provinciaID = request.json.get("provinciaID", None)
    
    provinciaQuery = Provincias.query.filter_by(id=provinciaID)

    provincia = list(map(lambda x: x.serialize(), provinciaQuery))

    return jsonify(provincia), 200

@api.route('/canton', methods=['POST'])
def canton():

    cantonID = request.json.get("cantonID", None)
    
    cantonQuery = Cantones.query.filter_by(id=cantonID)

    canton = list(map(lambda x: x.serialize(), cantonQuery))

    return jsonify(canton), 200

@api.route('/tiposservicio', methods=['POST'])
def tiposservicio():

    tiposservicioID = request.json.get("tiposservicioID", None)
    
    tiposservicioQuery = TiposServicio.query.filter_by(id=tiposservicioID)

    tiposservicio = list(map(lambda x: x.serialize(), tiposservicioQuery))

    return jsonify(tiposservicio), 200

@api.route('/provincias', methods=['GET'])
def provincias():

    provinciasQuery = Provincias.query.all()
    
    provincias = list(map(lambda x: x.serialize(), provinciasQuery))

    return jsonify(provincias), 200

@api.route('/cantones', methods=['GET'])
def cantones():

    cantonesQuery = Cantones.query.all()
    
    cantones = list(map(lambda x: x.serialize(), cantonesQuery))

    return jsonify(cantones), 200

@api.route('/servicios', methods=['GET'])
def servicios():

    serviciosQuery = TiposServicio.query.all()
    
    servicios = list(map(lambda x: x.serialize(), serviciosQuery))

    return jsonify(servicios), 200

@api.route('/login', methods=['POST'])
def login():
    usuario = request.json.get("usuario", None)
    contrasena = request.json.get("contrasena", None)

    user = User.query.filter_by(email=usuario).first()

    if not check_password_hash(user.contrasena,contrasena) or user is None:
        return jsonify({"msg": "Nombre de usuario o contraseña invalidos"}), 401

    access_token = create_access_token(identity=user.id)

    data = {
            "user": user.email,
            "token": access_token,
            #"expires": expiracion.total_seconds()*1000,
            "userId": user.id,
            "idTipo":user.id_tipo
            #"username": user.username
        }


    return jsonify(data), 200

    return jsonify(access_token=access_token)

@api.route('/UsuarioNuevo', methods=['POST'])
@jwt_required()
def UsuarioNuevo():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    with urlopen('https://makemeapassword.ligos.net/api/v1/alphanumeric/json?c=1&l=12') as r:
        text = r.read().decode('UTF-8')
        contrasena = json.loads(text)["pws"][0]

        #return contrasena["pws"][0]

        #return "Sent"

    if user is not None:

        email = request.json.get("email", None)
        #contrasena = request.json.get("contrasena", None)
        #token = request.json.get("token", None)

        if not email:
            return jsonify({"msg":"Email required"}), 400

        hashed_password = generate_password_hash(contrasena)

        user = User()
        user.email = email
        user.contrasena = hashed_password
        user.activo = True
        user.id_tipo = 2

        #usuarioNuevo = User(email=email, contrasena=contrasena, activo=True, id_tipo=2)
        db.session.add(user)
        db.session.commit()

        msg = Message('Busc@PYME aviso', sender = 'dirpro4g@gmail.com', recipients = ['dirpro4g@gmail.com',email])
        msg.body = "Hola. Esta es la contrasena para su nueva cuenta con Busc@PYME: " + contrasena#["pws"][0]
        mail.send(msg)

        return jsonify("Registro correcto"), 200
    else:
        return jsonify("Token invalido o expiró"), 401

@api.route('/actualizapyme', methods=['POST'])
@jwt_required()
def ActualizaPyme():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    pyme = Pyme.query.filter_by(id_user=current_user_id).first()
    print(pyme)
    #current_user_id = get_jwt_identity()
    #user = User.query.filter_by(id=current_user_id).first()
    
    if pyme is not None:
        #pyme = Pyme()
        pyme.nombre = request.json.get("nombrePyme", None)
        pyme.id_provincia = request.json.get("provincia", None)
        pyme.id_canton = request.json.get("canton", None)
        pyme.id_tiposServicio = request.json.get("tipoServicio", None)
        #pyme.id_user = current_user_id
        pyme.otrassenas = request.json.get("otrasSenas", None)
        pyme.telefono = request.json.get("telefono", None)
        pyme.facebook = request.json.get("facebook", None)
        pyme.instagram = request.json.get("instagram", None)
        pyme.Imagen = "Test String"
        db.session.commit()

        return jsonify({"msg": "Datos actualizados con exito"}), 200

    if pyme is None:
        pyme = Pyme()
        provincia = request.json.get("provincia", None)
        canton = request.json.get("canton", None)
        nombrePyme = request.json.get("nombrePyme", None)
        tipoServicio = request.json.get("tipoServicio", None)
        telefono = request.json.get("telefono", None)
        otrasSenas = request.json.get("otrasSenas", None)
        instagram = request.json.get("instagram", None)
        facebook = request.json.get("facebook", None)

        pyme = Pyme()
        pyme.nombre = nombrePyme
        pyme.id_provincia = provincia
        pyme.id_canton = canton
        pyme.id_tiposServicio = tipoServicio
        pyme.id_user = current_user_id
        pyme.otrassenas = otrasSenas
        pyme.telefono = telefono
        pyme.facebook = facebook
        pyme.instagram = instagram
        pyme.Imagen = "Test String"

        db.session.add(pyme)
        db.session.commit()

        return jsonify({"msg": "Pyme creada"}), 200
    else:
        return jsonify({"msg": "Token invalido o expiró"}), 401
    
@api.route('/CambioContrasena', methods=['POST'])
@jwt_required()
def CambioContrasena():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    contrasenaAnterior = request.json.get("contrasenaanterior", None)
    contrasenaNueva = request.json.get("contrasenanueva", None)
    contrasenaNueva2 = request.json.get("confirmacontrasenanueva", None)

    if not contrasenaNueva == contrasenaNueva2:
        return jsonify({"msg": "Las contrasena nueva y la confirmacion no concuerdan"}), 401

    #user = User.query.filter_by(email=usuario).first()

    if not check_password_hash(user.contrasena,contrasenaAnterior):
        return jsonify({"msg": "La contrasena actual no concuerda"}), 401
    
    hashed_password = generate_password_hash(contrasenaNueva)
    contrasenaNueva = hashed_password
    user.contrasena = contrasenaNueva
    db.session.commit()

    msg = Message('Busc@PYME aviso', sender = 'dirpro4g@gmail.com', recipients = ['juanca86@gmail.com'])
    msg.body = "Su contrasena ha sido cambiada"
    mail.send(msg)

    return jsonify({"msg": "Contraseña cambió correctamente"}), 200

@api.route('/actualizadatos', methods=['GET'])
@jwt_required()
def ActualizaDatos():

    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()
    pyme = Pyme.query.filter_by(id_user=current_user_id).first()
    
    #if user_has_pyme:
    #    return jsonify({"msg": "User has an existing PYME registered"}), 401

    if pyme is not None:

        data = [{
            "exists": "Si",
            "nombrePyme": pyme.nombre,
            "provincia": pyme.id_provincia,
            "canton": pyme.id_canton,
            "tipoServicio": pyme.id_tiposServicio,
            "otrasSenas": pyme.otrassenas,
            "telefono": pyme.telefono,
            "facebook": pyme.facebook,
            "instagram": pyme.instagram,
            "imagen": pyme.Imagen
        }]
    else:
        data = [{
            "exists": "No",
            "nombrePyme": "",
            "provincia": "",
            "canton": "",
            "tipoServicio": "",
            "otrasSenas": "",
            "telefono": "",
            "facebook": "",
            "instagram": "",
            "imagen": ""
        }]

    return jsonify(data), 200

#ESTE USUARIO ES PARA TEST Y PERMITE CREAR USUARIOS ADMIN
#CREAR USUARIOS ADMIN DA UN PROBLEMA YA QUE EL PASS NO QUEDA HASHEADO
#ES ALGO QUE DEBEMOS ANALIZAR CON RESPECTO A LA CREACION DE USUARIOS ADMIN

@api.route('/AdminNuevo', methods=['POST'])
#@jwt_required()
def AdminNuevo():

    #current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=1).first()

    with urlopen('https://makemeapassword.ligos.net/api/v1/alphanumeric/json?c=1&l=12') as r:
        text = r.read().decode('UTF-8')
        contrasena = json.loads(text)["pws"][0]

        msg = Message('Busc@PYME aviso', sender = 'dirpro4g@gmail.com', recipients = ['juanca86@gmail.com'])
        msg.body = "Hola. Esta es la contrasena para su nueva cuenta con Busc@PYME: " + contrasena
        mail.send(msg)

    if user is not None:

        email = request.json.get("email", None)

        if not email:
            return jsonify({"msg":"Email required"}), 400

        hashed_password = generate_password_hash(contrasena)
        contrasena = hashed_password

        user = User()
        user.email = email
        user.contrasena = contrasena
        user.activo = True
        user.id_tipo = 1

        db.session.add(user)
        db.session.commit()

        return jsonify("Registro correcto"), 200
    else:
        return jsonify("Token invalid or expired"), 401

#FIN DE PRUEBA