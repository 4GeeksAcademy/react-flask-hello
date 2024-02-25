from flask_sqlalchemy import SQLAlchemy
# from eralchemy2 import render_er

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    

    def __repr__(self):
        return '<User: %r>' % self.email

    def serialize(self):
        return {"id": self.id, 
                "email": self.email,
                "is_active": self.is_active}

class Profiles(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    lastname = db.Column(db.String(20), nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    nickname = db.Column(db.String(6), nullable=False)
    imgurl = db.Column(db.String(), nullable=False)
    # Relacion One to One. Un usuario un perfil.
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True) #Define un user a un perfil únicamente
    users = db.relationship(Users)


    def __repr__(self):
        return '<Profiles %r>' % self.firstname
       
    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "nickname": self.nickname,
            "lastname": self.lastname,
            "firstname": self.firstname,
            "imgurl": self.imgurl,
            "users_id": self.users_id}
        
    
class Characters(db.Model):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(), nullable=False)
    gender = db.Column(db.String(), nullable=False)
    height = db.Column(db.Integer())
    mass = db.Column(db.Integer())
    hair_color = db.Column(db.String())
    skin_color = db.Column(db.String())
    # users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # users = db.relationship(Users)


    def __repr__(self):
        return '<Characters %r>' % self.name
   
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "height": self.height,
            "hair_color": self.hair_color,
            "skin_color": self.skin_color
            # "users_id": self.users_id
        }


class Planets(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    diameter = db.Column(db.Integer())
    rotation_period = db.Column(db.Numeric())
    gravity = db.Column(db.Integer())        
    population = db.Column(db.Integer())
    climate = db.Column(db.String())
    terrain = db.Column(db.String())
    surface_water = db.Column(db.Integer)
    # users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # users = db.relationship(Users)


    def __repr__(self):
        return '<Planets %r>' % self.name
   
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "diameter": self.diameter,
            "rotation_period": self.rotation_period,
            "gravity": self.gravity,
            "population": self.population,
            "climate": self.climate,
            "terrain": self.terrain,
            "surface_water": self.surface_water
            # "users_id": self.users_id
            # do not serialize the password, its a security breach
        }
 
class Movies(db.Model):
    __tablename__ = 'movies'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    year  = db.Column(db.Integer, nullable=False)
    # users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # users = db.relationship(Users)

    def __repr__(self):
        return '<Movies %r>' % self.title
   
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "year": self.year
            # "users_id": self.users_id
            # do not serialize the password, its a security breach
        }


#Creamos las tablas de favoritos. Opción1:
class FavoriteCharacters(db.Model):
    __tablename__ = "favorite_characters"
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    characters_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    users = db.relationship(Users)
    characters = db.relationship (Characters)

    def __repr__(self):
        return '<FavoriteCharacters %r>' % self.id
   
    def serialize(self):
        return {
            "id": self.id,
            "characters_id": self.characters_id,
            "users_id": self.users_id
               }


class FavoritePlanets(db.Model):
    __tablename__ = "favorite_planets"
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    planets_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    users = db.relationship(Users)
    planets = db.relationship (Planets)
    
    def __repr__(self):
        return '<FavoritePlanets %r>' % self.id
   
    def serialize(self):
        return {
            "id": self.id,
            "planets_id": self.planets_id,
            "users_id": self.users_id
               }

    # render_er(Base,'diagram.png')