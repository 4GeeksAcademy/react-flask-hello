from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from sqlalchemy import ForeignKey


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)
    region = db.Column(db.String(120), nullable=False)
    photo = db.Column(db.String(120), default="no-photo.png")
    # roles = db.relationship('Role', secondary=roles_users)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "region": self.region,
            "photo": self.photo
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
    type = db.Column(db.String(120), nullable=False)
    price = db.Column(db.String(120), nullable=False)    
    photo = db.Column(db.String(120), default="no-photo.png")

    

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
            "photo": self.photo
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

 