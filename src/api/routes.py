"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Book, Gallery, Book, Role, Comentario, Mensaje, roles_users
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from cloudinary.uploader import upload
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_


api = Blueprint('api', __name__)

# -----<listar todos los usuiarios >------------------------------------------------------>
@api.route('/users', methods=[ 'GET', 'POST'])
def home():
    
    users = User.query.all()
    users = list(map(lambda user: user.serialize_user(), users))

    return jsonify({
        "data": users
    }), 200
    
# -----< traer solo un usuario >----------------------->
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "data": user.serialize_user()
        }), 200
    else:
        return jsonify({
            "message": "User not found"
        }), 404

# ------< registrar usuario >------------------------------------------------------------>

# @api.route('/register', methods=['POST'])
# def user_register():
    
#     print(request.get_json())

#     name= request.json.get("name")
#     lastname= request.json.get("lastname")
#     email= request.json.get("email")
#     password= request.json.get("password")
#     #region= request.json.get("region")
#     # photo = request.files['photo']

# # -------< validacion de usuario >------------------------------------------------------------
#     if not name:
#         return jsonify({"error": "name is requare"}), 422
    
#     if not lastname:
#         return jsonify({"error": "username is requare"}), 422
    
#     if not email:
#         return jsonify({"error": "email is requare"}), 422
    
#     if not password:
#         return jsonify({"error": "password is requare"}), 422
    
#     if not region:
#         return jsonify({"error": "region is requare"}), 422


# # -----< creacion de usuario --------------------------------------------------------------->

#     user_found = User.query.filter_by(email=email).first()

#     if user_found:
#         return jsonify({"message": "email is not available"}), 400

#     user = User()
#     user.name = name
#     user.lastname = lastname
#     user.email = email
#     user.password = generate_password_hash(password)
#     user.region = region
#     roles = request.json.get('roles', )
    
    
#     if len(roles) > 1:
#         for roles_id in roles:
#             roles = Role.query.get(roles_id)
#             user.roles.append(roles)

#     user.save()

#     return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200
#     # return redirect('/')
@api.route('/register', methods=['POST'])
def user_register():
    
    name= None
    lastname= None
    email= None
    password= None
    region= None    
    userImage= None

    #-------< validacion de usuario >-------#

    if 'name' in request.form:
        name =request.form["name"]
    else:
        return jsonify({"error": "Name is required"}), 400 

    if 'lastname' in request.form:
        lastname =request.form["lastname"]
    else:
        return jsonify({"error": "Last name is required"}), 400
    
    if 'email' in request.form:
        email =request.form["email"]
    else:
        return jsonify({"error": "E-mail is required"}), 400
    
    if 'password' in request.form:
        password =request.form["password"]
    else:
        return jsonify({"error": "Password is required"}), 400
    
    if 'region' in request.form:
        region =request.form["region"]
    else:
        return jsonify({"error": "Region is required"}), 400
        
    if 'userImage' in request.files:
        userImage =request.files["userImage"]
    else:
        return jsonify({"error": "User image is required"}), 400
    
    response = upload(userImage, folder="user_image")

    #-----< creacion de usuario ------------------------------------------->
    
    email_Found = User.query.filter_by(email=email).first()
    
    if email_Found:
        return jsonify({"message": "E-mail is not available"}), 400  

    if response:
        user = User()
        user.name = name
        user.lastname = lastname
        user.email = email
        user.password = generate_password_hash(password)
        user.region = region        
        user.userImage = response['secure_url'] 
        user.save()            
          
        return jsonify(user.serialize()), 200
        
    return jsonify({"succes": "Registro exitoso, por favor inicie sesión"}), 200


#------< validacion de usuario, de datos ingresados >------#
@api.route('/login', methods=['POST'])
def login():
    
    email= request.json.get("email")
    password= request.json.get("password") 
 
    if not email:
        return jsonify({"error": "email is requare"}), 422
    
    if not password:
        return jsonify({"error": "password is requare"}), 422

 #------< BUSCAMOS AL USUARIO
    user = User.query.filter_by(email=email).first()
   
    
 #------< SI NO EXISTE EL USUARIO
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
 #------< VALIDAMOS LA CONTRASEÑA
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
        
                
    expires=datetime.timedelta(days=30)
    
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    print(access_token)

    data = {
        "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }
        
    return jsonify(data), 200

#-----< actualizar user >-----------------------------
@api.route('/update_user/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    data = request.get_json()
    
    user = User.query.get(id)
    user.name = data["name"] if data['name'] else user.name
    user.lastname = data["lastname"] if data['lastname'] else user.lastname
    user.email = data["email"] if data['email'] else user.email
    user.password = data["password"] if data['password'] else user.password
    user.region = data["region"] if data['region'] else user.region
    user.update()
    
    return jsonify({
        "msg": "User updated", "user":user.serialize()
    }), 200
    
        
@api.route('delete_user/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    user.delete()
    
    return jsonify({"msg": "User has been deleted", "user": {}}), 200


#-----< Login User  codigo original-rama form>------------------------------------------------------------------->
""" @api.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
        
    email = request.json.get("email")
    password = request.json.get("password")

# ------< validacion usuario, datos ingresados >------#
    if not email:
        return jsonify({"error": "email is requare"}), 422

    if not password:
        return jsonify({"error": "password is requare"}), 422

# ------< BUSCAMOS AL USUARIO >------------------------------------->
    user = User.query.filter_by(email=email).first()
    
#------< si no existe el usuario >------------------------------------->
    if not user: 
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401
    
#------< validamos la contraseña >------------------------------------->
    if not check_password_hash(user.password, password):
        return jsonify({"error": "tu usuario o contraseña son incorrectos"}), 401 
    
        
    expires=datetime.timedelta(days=30)
    
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    print(access_token)

    data = {
        "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }


    return jsonify(data), 200
 """

# -----< generando ruta privada, datos de usuario, perfil >---------------------------------------->
@api.route('/profile', methods=['GET', 'POST'])
@jwt_required()
def profile():

    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"msg": "ruta  privada", "user": user.serialize_user()
                    }), 200

""" 
#=======< ruta lista LIBRO >===========================================
@api.route('/books/<int:id>', methods=['POST'])
@jwt_required()
def post_book(id):
    data = request.get_json()
    id = get_jwt_identity()    # corregido sabado en CWeekend

    book = Book()
    book.title = data["title"] 
    book.author = data['author']
    book.cathegory = data['cathegory']
    book.number_of_pages = data['number_of_pages']
    book.description = data['description']
    book.sell_trade = data['sell_trade']
    book.price = data['price']
    book.cover = data['cover']
    book.user_book_id = id
    book.save()

    return jsonify({"message": "Book created", "book": book.serialize()}), 201

@api.route('/books', methods=['GET'])
@jwt_required()
def get_books():
    
    if request.method == 'GET':
        books = Book.query.all()
        books = list(map(lambda books: books.serialize(), books))
        
        return jsonify({
                "data": books
            }), 200



@api.route('/books/<int:id>', methods=['PUT'])
@jwt_required()
def update_book(id):
    data = request.get_json()
    
    book = Book.query.get(id)
    book.title = data["title"] if data['title'] else book.title
    book.author = data['author']  if data['author'] else book.author
    book.cathegory = data['cathegory'] if data['cathegory'] else book.cathegory
    book.number_of_pages = data['number_of_pages'] if data['number_of_pages'] else book.number_of_pages
    book.description = data['description'] if data['description'] else book.description
    book.price = data['price'] if data['price'] else book.price
    book.photo = data['photo'] if data['photo'] else book.photo
    book.update()
    
    return jsonify({"message": "book updated", "book": book.serialize()})

@api.route('/books/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_book(id): """
"""     book= Book.query.get(id)
    book.delete_book()
    
    book.delete()
    
    return jsonify({"message": "book deleted", "book": {}}), 200
     """
# ------------<  cloudinary >------------------------------------------------------------

#-------------< CARGAR IMAGENES >-------------------------------------------------
""" 
@api.route('/image_upload', methods=['POST'])
@jwt_required()  
def upload_image_route():

    title = request.form['title']
    book_id = request.form['book_id']
    # data = request.get_json()
    id = get_jwt_identity() 
    
    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400
    if not book_id:
        return jsonify({"msg": "debe agregar libro"}), 400

    image = request.files['image']
    
    if not 'image' in request.files:
        return jsonify({"msg": " la imagen es requerida"}), 400 

# -----< ahora hago un "fetch" a Cloudinary para agregar un archivo en la capeta galleries >-----
    
    public_id = image.filename
    
    resp = upload(image, folder='galleries', public_id=public_id)

    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400
    
    print(resp)

    gallery = Gallery()
    gallery.title = title
    gallery.image = resp['secure_url']
    gallery.public_id = public_id 
    gallery.user_id = id
    gallery.book_id = book_id

    gallery.save()

    return jsonify(gallery.serialize()), 201 
    """


@api.route('/image_get', methods=['GET'])
@jwt_required()
def image():
    if request.method == 'GET':
        gallery = Gallery.query.all()
        gallery = list(map(lambda image: image.serialize(), gallery))
        
        return jsonify({
                "data": gallery
            }), 200
        
#---------------------------        
@api.route('/image_update/<int:id>', methods=['PUT'])
@jwt_required()
def image_update(id):
    gallery = Gallery.query.get(id)
    if not gallery:
        return jsonify({"msg": "Gallery no encontrada"}), 404
    
    
    title = request.form['title']

    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400

    image = request.files['image']
    
    if not 'image' in request.files:
        return jsonify({"msg": " la imagen es requerida"}), 400
    
    public_id = image.filename

    resp = upload(image, folder='galleries', public_id=gallery.public_id)

    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400

    print(resp)

    gallery.title = title
    gallery.image = resp['secure_url']

    gallery.update()

    return jsonify(gallery.serialize()), 201
        
        
#------< cóodigo josé >------------------------------>
#-----< MENSAJES >------------------------------------>


@api.route('/upload', methods=['POST'])
def upload_image_route():
    
    
    title=request.form['title']
    
    
    if not title:
        return jsonify({"msg": "debe agregar titulo"}), 400
    
    image = request.files['image']
    if not 'image' in request.files:
        return jsonify({"msg":" la imagen es requerida"}), 400
        
    
    #-----< ahora hago un "fetch" a Cloudinary >-----
    public_id=image.filename
    resp=upload(image, fordel='galleries',public_id='public_id')
    
    if not resp:
        return jsonify({'msg': "error al cargar imagen"}), 400    
    print(resp)
    
    gallery = Gallery()
    gallery.title = title
    gallery.image = resp['secure_url']
    gallery.public_id = public_id 
    gallery.save()
    
    return jsonify(gallery.serialize()), 201

# END POINT COMENTARIOS
### AGREGAR COMENTARIO
@api.route('/comentarios', methods=['POST'])
@jwt_required()
def crear_comentario():
    #user_id = get_jwt_identity()  # ID del usuario autenticado
    
    #book_id = request.json.get("book_id")
    comentario = request.json.get("comentario")
    
    #if not book_id:
    #    return jsonify({"error": "book_id is required"}), 422
    
    if not comentario:
        return jsonify({"error": "comentario is required"}), 422
    
    comentario_obj = Comentario()
    #comentario_obj.book_id = book_id
    #comentario_obj.user_id = user_id
    comentario_obj.comentario = comentario
    comentario_obj.save()
    
    return jsonify({"message": "Comentario creado con éxito"}), 201

### VER TODOS LOS COMENTARIOS
@api.route('/comentarios', methods=['GET'])
def get_comentarios():
    comentarios = Comentario.query.all()  # Obtén todos los comentarios de la base de datos
    comentarios_list = [comentario.serialize() for comentario in comentarios]  # Serializa los comentarios
    return jsonify(comentarios_list), 200



# END POINT LIBRO
### AGREGAR LIBRO
@api.route('/registerBook', methods=['POST'])
@jwt_required() #solo usuario logeado publica
def register_Book():

    title= None
    author= None
    cathegory= None
    number_of_pages= None
    description= None
    type= None
    price= None
    photo= None
    available= True 
    user_id = get_jwt_identity() 



### VALIDANDO DATOS
    if 'title' in request.form:
        title =request.form["title"]
    else:
        return jsonify({"error": "Title is required"}), 400

    if 'author' in request.form:
        author =request.form["author"]
    else:
        return jsonify({"error": "Author is required"}), 400  

    if 'cathegory' in request.form:
        cathegory =request.form["cathegory"]
    else:
        return jsonify({"error": "Cathegory is required"}), 400  

    if 'number_of_pages' in request.form:
        number_of_pages =request.form["number_of_pages"]
    else:
        return jsonify({"error": "Number_of_pages is required"}), 400  

    if 'description' in request.form:
        description =request.form["description"]
    else:
        return jsonify({"error": "Description is required"}), 400  

    if 'type' in request.form:
        type =request.form["type"]
    else:
        return jsonify({"error": "Type is required"}), 400  

    if 'price' in request.form:
        price =request.form["price"]
    else:
        return jsonify({"error": "Price is required"}), 400    

    if 'photo' in request.files:
        photo =request.files["photo"]
    else:
        return jsonify({"error": "Photo is required"}), 400  
    
    response = upload(photo, folder="market_image")
    
## CREACION LIBRO         
    if response:
        book = Book()
        book.title = title
        book.author = author
        book.cathegory = cathegory
        book.number_of_pages = number_of_pages
        book.description = description
        book.type = type
        book.price = price
        book.photo = response['secure_url'] # Forma de creación con archivo
        book.user_id = user_id  # Asociar el libro con el usuario actual
        book.available = True # Se establece inicialemente como true
        book.save()
        return jsonify(book.serialize()), 200
    
    return jsonify({"succes": "Publiación de libro exitosa"}), 200


###LISTAR TODOS LOS LIBROS DISOPNIBLES
@api.route('/all_books', methods=['GET'])
def get_book():
    books = Book.query.filter_by(available=True).all()  # Filtrar libros disponibles  
    book_list = [book.serialize() for book in books]  
    return jsonify(book_list), 200

###LISTAR LIBROS PARA INTERCAMBIO
@api.route('/exchange_books', methods=['GET'])
def get_exchange_book():
    
    books = Book.query.filter(and_(Book.type == "Intercambio", Book.available == True)).all()  
    book_list = [book.serialize() for book in books]  
    return jsonify(book_list), 200

###LISTAR LIBROS PARA VENTA
@api.route('/sale_books', methods=['GET'])
def get_sale_book():
    books = Book.query.filter(and_(Book.type == "Venta", Book.available == True)).all()     
    book_list = [book.serialize() for book in books]  
    return jsonify(book_list), 200 

###LISTAR MIS LIBROS PARA VENTA
@api.route('/sale_books/<int:user_id>', methods=['GET'])
def get_my_sale_books(user_id):
    books = Book.query.filter_by(user_id=user_id, type="Venta").all()
    book_list = [book.serialize() for book in books]
    return jsonify(book_list), 200

###LISTAR MIS LIBROS PARA INTERCAMBIO
@api.route('/exchange_books/<int:user_id>', methods=['GET'])
def get_my_exchange_books(user_id):
    books = Book.query.filter_by(user_id=user_id, type="Intercambio").all()
    book_list = [book.serialize() for book in books]
    return jsonify(book_list), 200
    
    

###LISTAR DETALLE POR LIBRO
@api.route('/book_details/<int:id>', methods=['GET'])
def get_book_details(id):
    try:
        # Busca el libro en función del ID proporcionado
        book = Book.query.get(id)

        if book is None:
            # Si no se encuentra el libro, devuelve un código de estado 400
            return jsonify({'error': 'Libro no encontrado'}), 400

        # Convierte el libro encontrado en un formato serializable 
        book_details = {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'cathegory': book.cathegory,
            'number_of_pages': book.number_of_pages,
            'description': book.description,
            'type': book.type,
            'price': book.price,
            'photo': book.photo,
            'user_id': book.user_id,
            'user_name': book.user.name
        }

        # Devuelve los detalles del libro como una respuesta JSON
        return jsonify(book_details), 200

    except Exception as e:
        # Maneja cualquier excepción que pueda ocurrir y devuelve un error 500
        return jsonify({'error': str(e)}), 500
    
###CAMBIO DE DISPONIBLE A VENDIDO
@api.route('/comprar/<int:id>', methods=['PUT'])
def actualizar_disponibilidad(id):
        
    book = Book.query.get(id)
    if book is None:
    
        return jsonify({'error': 'Libro no encontrado'}), 400
    
                
    book.available = False
    book.update() 
        
    return jsonify({'message': 'Disponibilidad actualizada exitosamente'}), 200



###LISTAR LIBRO POR USUARIO
@api.route('/user_books/<int:user_id>', methods=['GET'])
def get_user_books(user_id):
    user = User.query.get(user_id)
    
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    user_books = Book.query.filter_by(user_id=user_id).all()
    user_books_list = [book.serialize() for book in user_books]
    
    return jsonify(user_books_list), 200
    
###MENSAJES ENTRE USUARIOS
#CREAR MENSAJE
@api.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    
    sender_id = request.json.get('sender_id')
    receiver_id = request.json.get('receiver_id')
    book_id = request.json.get('book_id')
    message_text = request.json.get('message_text')
    
    # Verificar usuarios y libro
    sender = User.query.get(sender_id)
    receiver = User.query.get(receiver_id)
    book = Book.query.get(book_id)
    
    if not sender or not receiver or not book:
        return jsonify({'error': 'Usuarios o libro no encontrados'}), 400
    
    # Crea el mensaje
    mensaje = Mensaje()
    mensaje.sender_id = sender_id
    mensaje.receiver_id = receiver_id
    mensaje.book_id = book_id
    mensaje.message_text = message_text
    mensaje.save()   
        
    return jsonify({'message': 'Mensaje creado correctamente'}), 200

#OBTENER MENSAJE POR LIBRO ESPECIFICO
@api.route('/messages/<int:book_id>', methods=['GET'])
def get_messages_book(book_id):
    mensaje = Mensaje.query.filter_by(book_id=book_id).all()
    return jsonify([mensaje.serialize() for mensaje in mensaje])

#OBTENER MENSAJE POR USUARIO ESPECIFICO
@api.route('/messages/sender/<int:sender_id>', methods=['GET'])
def get_messages_sender(sender_id):
    mensaje = Mensaje.query.filter_by(sender_id=sender_id).all()
    return jsonify([mensaje.serialize() for mensaje in mensaje])

#OBTENER TODOS LOS MENSAJES
@api.route('/messages', methods=['GET'])
def get_messages():
    mensajes = Mensaje.query.all()
    return jsonify([mensaje.serialize() for mensaje in mensajes])

#-----< MENSAJES >------------------------------------>
"""
# el modelo solo pide: el mensaje, el id del que envia, y el id dl que recibe

# @api.route("/messages", methods=['GET', 'POST'])
# @api.route("/messages/<int:id>", methods=['GET','POST'])
# @jwt_required()
# def messages(id=None):
#     current_user = get_jwt_identity()
#     if request.method == 'GET':
#         if id is not None:
#             message = Message.query.filter_by(id=id, user_from_id=current_user).first()
#             if not message:
#                 return jsonify({"msg": "No hay mensajes"}), 404
#             return jsonify(message.serialize())
#         else: 
#             messages = Message.query.filter_by(user_from_id=current_user)
#             messages = list(map(lambda msg: msg.serialize(), messages))
            
#             return jsonify(messages)
        
#     if request.method == 'POST':
#         message = request.json.get('message')
#         user_from_id = request.json.get('user_from_id')
#         user_to_id = request.json.get('user_to_id')
#         msg = Message()
#         msg.message = message
#         msg.user_from_id = user_from_id
#         msg.user_to_id= user_to_id
        
#         msg.save()
        
#         return jsonify(msg.serialize()), 201
    
# @api.route('/messages_update/<int:id>', methods=['PUT'])
# @jwt_required()
# def message_update(id):
    
#     data = request.get_json()
    
#     message = Message.query.get(id)
    
#     message.message = data["message"] if "message" in data else message.message
#     message.user_from_id = data["user_from_id"] if "user_from_id" in data else message.user_from_id
#     message.user_to_id = data["user_to_id"] if "user_to_id" in data else message.user_to_id
    
#     message.update()
    
#     return jsonify({
#         "msg": "mensaje actualizado", "mensaje": message.serialize()
#     }), 200

    
# @api.route('messages_delete/<int:id>', methods=['DELETE'])
# @jwt_required()
# def message_delete(id):
#     message = Message.query.get(id)
#     message.delete()
    
#     return jsonify({"msg": "Message has been deleted", "Message": {}}), 200

#message = Message().find_by_id(id=id, user_id=current_identity.user["sub"])
# def send_message():
#     if request.method != "POST":
#         return {"status":"fail","message":"bad method"},500
#     message=request.form["message"]
#     receiverId=request.form["receiverID"]
#     print("Message:",message,"Receiver ID:",receiverId,type(receiverId))
# """


#-----< mensajes >------------------------------------------------------>
""" @api.route('/messages', methods=['GET'])
# @jwt_required()
def get_all_messages():
    messages = Message.query.all()
    serialized_messages = [message.serialize_msg() for message in messages] # agregué _msg, eliminar antes de viernes

    return jsonify(serialized_messages), 200
#-----< buscar mensaje por id >----------------------------------------->
@api.route('/messages/<int:message_id>', methods=['GET'])
# @jwt_required()
def get_message(message_id):
    message = Message.query.get(message_id)

    if message:
        return jsonify(message.serialize()), 200
    else:
        return jsonify({"message": "Message not found"}), 404


@api.route('/messages', methods=['POST'])
# @jwt_required()
def create_message():
    data = request.get_json()

    message = Message(
        message=data['message'],
        user_from_id=data['user_from_id'],
        user_to_id=data['user_to_id']
    )

    message.save()

    return jsonify(message.serialize_msg()), 201

@api.route('/messages/<int:message_id>', methods=['PUT'])
# @jwt_required()
def update_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return jsonify({"message": "Message not found"}), 404

    data = request.get_json()

    message.message = data['message']
    message.user_from_id = data['user_from_id']
    message.user_to_id = data['user_to_id']

    message.update()

    return jsonify(message.serialize()), 200

@api.route('/messages/<int:message_id>', methods=['DELETE'])
# @jwt_required()
def delete_message(message_id):
    message = Message.query.get(message_id)

    if not message:
        return jsonify({"message": "Message not found"}), 404

    message.delete()

    return jsonify({"message": "Message deleted"}), 200



#-----< mensajes recibidos >----------------------------------------> 
@api.route('/users/<int:user_id>/received_messages', methods=['GET'])
# @jwt_required()
def get_received_messages(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    received_messages = Message.query.filter_by(user_to_id=user_id).all()
    serialized_messages = [message.serialize() for message in received_messages]
    
    return jsonify(serialized_messages), 200

#-----< mensajes enviados >----------------------------------------->
@api.route('/users/<int:user_id>/sent_messages', methods=['GET'])
# @jwt_required()
def get_sent_messages(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    sent_messages = Message.query.filter_by(user_to_id=user_id).all()
    serialized_messages = [message.serialize() for message in sent_messages]
    
    return jsonify(serialized_messages), 200
 """