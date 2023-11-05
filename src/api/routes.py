"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

import decimal
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Gallery, Comentario, Book,  Mensaje, Purchase
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from cloudinary.uploader import upload
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import cloudinary
from flask_mail import Mail, Message
from sqlalchemy import and_





api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message"
    }

    return jsonify(response_body), 200

# LISTA TODOS LOS USUARIOS CREADOS
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Obtén todos los usuarios de la base de datos
    user_list = [user.serialize() for user in users]  # Serializa los usuarios en una lista de objetos JSON
    return jsonify(user_list), 200  # Devuelve la lista de usuarios en formato JSON con código de estado 200


#------< registrar usuario >-------------#

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
           
    access_token = create_access_token(identity=user.id)
    print(access_token)
    data = {
        # "success": "inicio de sesion exitoso",
        "access_token": access_token,
        "type": "Bearer",
        "user": user.serialize()
    }
    return jsonify(data), 200


# generando ruta privada

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    
    id = get_jwt_identity()
    user = User.query.get(id)
    return jsonify({"message": "ruta  privada", "user": user.email}), 200


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

    title = request.form.get("title")
    author = request.form.get("author")
    cathegory = request.form.get("cathegory")
    number_of_pages = request.form.get("number_of_pages")
    description = request.form.get("description")
    type = request.form.get("type")
    price = request.form.get("price")
    photo = request.files.get("photo")
    available = True 
    user_id = get_jwt_identity() 

    ### VALIDANDO DATOS
    if not title or not author or not cathegory or not number_of_pages or not description or not type or not photo:
        return jsonify({"error": "Todos los campos son requeridos"}), 400

    # Si el campo 'price' se proporciona en el formulario, intenta obtener su valor
    if price:
        try:
            # Intenta convertir el valor de 'price' a un número decimal
            price = decimal.Decimal(price)
        except ValueError:
            return jsonify({"error": "Formato de preicio invalido"}), 400

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
        if price is not None:  # Solo establecer 'price' si se proporciona
            book.price = price
        book.photo = response['secure_url']
        book.user_id = user_id
        book.available = True
        book.save()
        return jsonify(book.serialize()), 200

    return jsonify({"succes": "Publicación de libro exitosa"}), 200

###EDITAR LIBROS
@api.route('/edit_book/<int:book_id>', methods=['PUT'])
@jwt_required()
def edit_book(book_id):
    user_id = get_jwt_identity()  # Obtener el ID del usuario actual
    book = Book.query.filter_by(id=book_id, user_id=user_id).first()

    if not book:
        return jsonify({"error": "El libro no existe o no tienes permiso para editarlo."}), 403

    # Obtener los datos actualizados del libro desde la solicitud formdata
    title = request.form.get('title', book.title)
    author = request.form.get('author', book.author)
    cathegory = request.form.get('cathegory', book.cathegory)
    number_of_pages = request.form.get('number_of_pages', book.number_of_pages)
    description = request.form.get('description', book.description)
    type = request.form.get('type', book.type)
    price = request.form.get('price', book.price)
    photo = request.files.get('photo')  # Obtener la nueva foto desde formdata

    # Actualizar los campos del libro con los datos proporcionados
    book.title = title
    book.author = author
    book.cathegory = cathegory
    book.number_of_pages = number_of_pages
    book.description = description
    book.type = type
    book.price = price

    # Actualizar la foto si se proporciona una nueva
    if photo:
        response = upload(photo, folder="market_image")
        if response:
            book.photo = response['secure_url']  # Actualizar la URL de la foto en la base de datos

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({"success": "El libro ha sido actualizado correctamente."}), 200


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
    purchase_id = request.json.get('purchase_id')
    message_text = request.json.get('message_text')
    
    # Verificar usuarios y libro
    sender = User.query.get(sender_id)
    receiver = User.query.get(receiver_id)
    book = Book.query.get(book_id)
    purchase = Purchase.query.get(purchase_id)
    
    if not sender or not receiver or not book  or not purchase:
        return jsonify({'error': 'Usuarios, libro o compra no encontrados'}), 400
    
    # Crea el mensaje
    mensaje = Mensaje()
    mensaje.sender_id = sender_id
    mensaje.receiver_id = receiver_id
    mensaje.book_id = book_id
    mensaje.purchase_id = purchase_id
    mensaje.message_text = message_text
    mensaje.save()   
        
    return jsonify({'message': 'Mensaje creado correctamente'}), 200

#OBTENER MENSAJE POR COMPRA
@api.route('/messages/purchase/<int:purchase_id>', methods=['GET'])
def get_messages_by_purchase(purchase_id):
    mensajes = Mensaje.query.filter_by(purchase_id=purchase_id).all()
    return jsonify([mensaje.serialize() for mensaje in mensajes])


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


#### REGISTROS DE COMPRA
@api.route('/purchases', methods=['POST'])
def create_purchase():
    data = request.get_json()
    
    seller_id = data.get('seller_id')
    buyer_id = data.get('buyer_id')
    book_id = data.get('book_id')
    purchase_date = data.get('purchase_date')
    
    # Verificar que el usuario y el libro existan
    seller = User.query.get(seller_id)
    buyer = User.query.get(buyer_id)
    book = Book.query.get(book_id)
    
    if not seller or not buyer or not book:
        return jsonify({'error': 'Vendedor, comprador o libro no encontrado'}), 400
    
    # Crea la compra
    compra = Purchase()
    compra.seller_id = seller_id
    compra.buyer_id = buyer_id
    compra.book_id = book_id
    compra.purchase_date = purchase_date
    compra.save()   
        
    return jsonify({'message': 'Compra creada correctamente'}), 200

#COMPRAS POR USUARIO ESPECIFICO
@api.route('/purchases/buyer/<int:buyer_id>', methods=['GET'])
def get_user_purchases(buyer_id):
    # Buscamos todas las compras donde el buyer_id coincida con el ID del usuario actual
    purchases = Purchase.query.filter_by(buyer_id=buyer_id).all()
    # Serializamos las compras en formato JSON
    purchases_data = [purchase.serialize() for purchase in purchases]
    return jsonify(purchases_data), 200

#VENTAS POR USUARIO ESPECIFICO
@api.route('/purchases/seller/<int:seller_id>', methods=['GET'])
def get_purchases_by_seller(seller_id):
    purchases = Purchase.query.filter_by(seller_id=seller_id).all()  
    purchases_data = [purchase.serialize() for purchase in purchases]
    return jsonify(purchases_data), 200

#COMPRA O VENTA POR LIBRO ESPECIFICO
@api.route('/purchases/book/<int:book_id>', methods=['GET'])
def get_purchases_by_book(book_id):
    purchases = Purchase.query.filter_by(book_id=book_id).all()
    purchases_data = [purchase.serialize() for purchase in purchases]
    return jsonify(purchases_data), 200
