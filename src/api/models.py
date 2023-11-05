from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from sqlalchemy import ForeignKey


roles_users = db.Table(
    'roles_users', 
    db.Column('roles_id', db.Integer, db.ForeignKey('roles.id'), nullable=False, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
)
""" 
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    region = db.Column(db.String(120), nullable=False)
    #photo = db.Column(db.String(120), default="no-photo.png")
    message_from = db.relationship('Message', foreign_keys="[Message.user_from_id]", backref='user_from')
    message_to = db.relationship('Message', foreign_keys='[Message.user_to_id]', backref='user_to')
    books_user = db.relationship('Book', backref='user', lazy=True)
    is_active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=roles_user)  # secondary es la tabla intermedia entres usuarios y roles
    role_id = db.Column(db.Integer, default=1)


    def serialize_user(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "region": self.region,
            "photo": self.photo,
            "is_active": self.is_active
        }
    def serialize_User_gallery(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "region": self.region,
            "image": self.image
            
        }

    def serialize_with_message(self):
        return {
            "id": self.id,
            "name": self.name,
            "message_from": list(map(lambda msg: msg.serialize, self.message_from)),
            "message_to": list(map(lambda msg: msg.serialize, self.message_to)),
            "is_active": self.is_active
        }
    def serialize_with_books(self):
        return {
            "id": self.id,
            "name": self.name,
            "books_user": self.books_user,
        }


    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()    

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    users = db.relationship('User', secondary=roles_user, overlaps="roles")
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()   
        
        


# <--TABLA LIBRO-------------------------------------------->
class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    cathegory = db.Column(db.String(120), nullable=False)
    number_of_pages = db.Column(db.String(120))
    description = db.Column(db.String(250), nullable=False)
    sell_trade = db.Column(db.String(120), nullable=False)#type
    price = db.Column(db.String(120), nullable=False)    
    cover = db.Column(db.String(120), default="no-photo.png")
    user_book_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    
    

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cathegory": self.cathegory,
            "number_of_pages": self.number_of_pages,
            "description": self.description,
            "sell_trade": self.sell_trade,
            "price": self.price,
            "cover": self.cover
        }
    

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
#-----< Tabla imagen >---------------------------------------->
class Gallery(db.Model):
    __tablename__= 'gallery'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=True)
    image = db.Column(db.String(250), nullable=True)
    public_id = db.Column(db.String(250), nullable=True)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_gallery = db.relationship('User', backref='galleries')
    books = db.relationship('Book', backref='gallery', lazy=True)
    
    
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "image": self.image
        }    
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()    
    
#-----< Tabla imagen >---------------------------------------->
class Message(db.Model):
    __tablename__='message'
    id = db.Column(db.Integer, primary_key= True)
    message = db.Column(db.String(500), default=" ")
    user_from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime(), default=db.func.now())
    book = db.relationship('Book', backref='Message', lazy=True )
    
    
    def serialize(self):
        return {
            "id":self.id,
            "message": self.message,
            "user_from_id": self.user_from_id,
            "user_to_id": self.user_to_id,
            "date": self.date,
            "book": self.book.id


        }
        
        
        
    def serialize_msg(self):
        return {
            "id":self.id,
            "message": self.message,
            
        }
            
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()     """
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False, unique=True)
    users = db.relationship('User', secondary=roles_users, overlaps="roles")
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()   
        

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    region = db.Column(db.String(120), nullable=False)
    userImage = db.Column(db.String(120), default="no-userImage.png")
    roles = db.relationship('Role', secondary=roles_users) # secondary es la tabla intermedia entres usuarios y roles
    roles_id = db.Column(db.Integer, default=1)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "region": self.region,
            "userImage": self.userImage
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


# <--TABLA LIBRO-------------------------------------------->
class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    cathegory = db.Column(db.String(120), nullable=False)
    number_of_pages = db.Column(db.String(120))
    description = db.Column(db.String(250), nullable=False)
    type = db.Column(db.String(120), nullable=False) #venta o intercambio
    price = db.Column(db.String(120), nullable=False) 
    available = db.Column(db.Boolean, default=True) #disponibilidad del libro        
    photo = db.Column(db.String(120), default="no-photo.png")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # libro con id del usaurio
    user = db.relationship('User', backref=db.backref('books', lazy=True)) # definicion de realcion con usaurio

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "cathegory": self.cathegory,
            "number_of_pages": self.number_of_pages,
            "description": self.description,
            "type": self.type,
            "price": self.price,
            "photo": self.photo,
            "available": self.available,
            "user_id": self.user_id
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()



class Gallery(db.Model):
    __tablename__= 'gallery'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=True)
    image = db.Column(db.String(250), nullable=True)
    public_id = db.Column(db.String(250), nullable=True)
    
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "image": self.image
        }
        
        
    def save(self):
        db.session.add(self)
        db.session.commit()
        
        
    def update(self):
        db.session.commit()
        
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()    
    
        
# TABLA COMETARIOS

class Comentario(db.Model):
    __tablename__ = 'comentario'
    id = db.Column(db.Integer, primary_key=True)
    comentario = db.Column(db.String(250), nullable=False)
    #book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    #user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "comentario": self.comentario,
            #"book_id": self.book_id,
            #"user_id": self.user_id
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Mensaje(db.Model):
    __tablename__ = 'Mensajes'    
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    message_text = db.Column(db.String(250), nullable=False)
    
    sender = db.relationship('User', foreign_keys=[sender_id], backref=db.backref('sent_messages', lazy=True))
    receiver = db.relationship('User', foreign_keys=[receiver_id], backref=db.backref('received_messages', lazy=True))
    book = db.relationship('Book', foreign_keys=[book_id], backref=db.backref('related_messages', lazy=True)) 
    
    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "book_id": self.book_id,
            "message_text": self.message_text,
            "book": self.book.serialize()          
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
 