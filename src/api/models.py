from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


                       ################# nuevo modelado de tablas  #####################


eventos = db.Table('eventos', db.Model.metadata,
    db.Column('evento_id', db.Integer, db.ForeignKey('evento.id'),primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'),primary_key=True)
)
hobbies = db.Table('hobbies', db.Model.metadata,
    db.Column('categoria_id', db.Integer, db.ForeignKey('categoria.id'),primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'),primary_key=True)
)





class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    email = db.Column(db.String(250), nullable=True)
    password = db.Column(db.String(250), nullable=True)
    eventos = db.relationship('Evento', secondary=eventos, backref= 'user', lazy=True)
    hobbies = db.relationship('Categoria', secondary=hobbies, lazy='subquery', backref=db.backref('user', lazy=True))
    creado = db.relationship('Evento', backref='creador', lazy=True)
    
    def __repr__(self):
        return  self.name
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "eventos":list(map(lambda item: item.serialize(), self.eventos)),
            "hobbies":list(map(lambda item: item.serialize(), self.hobbies))
            # do not serialize the password, its a security breach
        }
    


class Categoria(db.Model):
    __tablename__ = 'categoria'
    id = db.Column(db.Integer, primary_key=True)
    categoria = db.Column(db.String(250), nullable=True)
    name = db.Column(db.String(250), nullable=True)
    eventos = db.relationship('Evento', backref='categoria', lazy=True)

    def __repr__(self):
        return  self.name
    def serialize(self):
        return {
            "id": self.id,
            "categoria": self.categoria,
            "name": self.name,
            "eventos":list(map(lambda item: item.serialize(), self.eventos))
            # do not serialize the password, its a security breach
        }





class Evento(db.Model):
    __tablename__ = 'evento'
    id = db.Column(db.Integer, primary_key=True)
    evento = db.Column(db.String(250), nullable=True)
    descripcion = db.Column(db.String(250), nullable=True)
    ciudad = db.Column(db.String(250), nullable=True)
    ubicación = db.Column(db.String(250), nullable=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    precio = db.Column(db.String(250), nullable=True)
    max_personas = db.Column(db.Integer, nullable=True)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categoria.id'), nullable=False)
    user_creador = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return self.evento
    def serialize(self):
        return {
            "id": self.id,
            "evento": self.evento,
            "descripcion": self.descripcion,
            "ciudad": self.ciudad,
            "ubicación":self.ubicación,
            "precio":self.precio,
            "fecha": self.fecha,
            "max_personas": self.max_personas,
            # do not serialize the password, its a security breach
        }



class Aficiones(db.Model):
    __table__ = hobbies
    
    

class Asistencia(db.Model):
    __table__ = eventos
    

