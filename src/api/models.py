from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    date_of_birth = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.Enum('Student', 'Instructor', name='role'), unique=False, nullable=True)

    id_subscription = db.Column(db.Integer, db.ForeignKey('subscription.id'))
    subscription = db.relationship('Subscription', backref='user', lazy=True)
    subscription_start_date = db.Column(db.String(120), unique=False, nullable=True)
    subscription_end_date = db.Column(db.String(120), unique=False, nullable=True) #Hacer funcion para si el usuario se da de baja, retorne en description_end_date la fecha?

    # is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'{self.name} {self.last_name}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(120), unique=True, nullable=False)
    price = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'{self.plan}'

    def serialize(self):
        return {
            "id": self.id,
            "plan": self.plan,
            "price": self.price,
            # do not serialize the password, its a security breach
        }
    

class Testimony(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    date = db.Column(db.String(120), unique=True, nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    user =  db.relationship('User', backref='testimony', lazy=True)
    
    id_session = db.Column(db.Integer, db.ForeignKey('session.id')) #unimos la sesion de la que crea el testimonio en caso necesario 



    def __repr__(self):
        return f'<Testimony {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            # do not serialize the password, its a security breach
        }

class Types_of_session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'{self.type}'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "description": self.description,
            # do not serialize the password, its a security breach
        }

class Instructor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    biografy = db.Column(db.String(300), unique=False, nullable=False)
    # sessions =  db.relationship('Session', backref='instructor', lazy=True)


    def __repr__(self):
        return f'{self.name} {self.last_name}' #Aquí ponemos que cuando se seleccione en sesion se haga con el nombre no el id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "biografy": self.biografy,
            # do not serialize the password, its a security breach
        }
    

class Session(db.Model):
    # __tablename__ = 'session'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    subtitle = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=False)
    link = db.Column(db.String(120), unique=True, nullable=False)
    asana_focus = db.Column(db.String(120), unique=False, nullable=False)
    level = db.Column(db.String(120), unique=False, nullable=False)
    duration = db.Column(db.String(120), unique=False, nullable=False)
    id_type_of_session = db.Column(db.Integer, db.ForeignKey('types_of_session.id'))
    type = db.relationship('Types_of_session', backref='session', lazy=True)
    instructor = db.relationship('Instructor', backref='session', lazy=True)

    id_instructor = db.Column(db.Integer, db.ForeignKey('instructor.id'))

    def __repr__(self):
        return f'<Session {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "subtitle": self.subtitle,
            "description": self.description,
            "link": self.link,
            "asana_focus": self.asana_focus,
            "level": self.level,
            "duration": self.duration,
            "type": self.type.serialize(), #Para serializar el modelo types_of_session. Si no da error al ser otro modelo
            "instructor": self.instructor.serialize()
            #Para serializar el modelo instructor. Si no da error al ser otro modelo.
            # do not serialize the password, its a security breach
        }
    