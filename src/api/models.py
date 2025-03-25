from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Column, Integer, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()


# ----------------------------MODELOS DE TABLAS BASE----------------------------#

class User(db.Model):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    firstname = Column(String(50))
    lastname = Column(String(50))
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

    favorites = relationship("Favorite", back_populates="user")

    def __init__(self, username, password, firstname, lastname, email):
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(str(password))

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize_user(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
        }


class Planet(db.Model):

    __tablename__ = "planets"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    diameter = Column(Integer)
    gravity = Column(Float)
    population = Column(Integer)
    terrain = Column(String(100))
    climate = Column(String(100))

    def serialize_planet(self):
        return {
            "id": self.id,
            "name": self.name,
            "diameter": self.diameter,
            "gravity": self.gravity,
            "population": self.population,
            "terrain": self.terrain,
            "climate": self.climate
        }


class Specie(db.Model):

    __tablename__ = "species"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    hair_color = Column(String(50))
    height = Column(Float)
    skin_color = Column(String(50))
    language = Column(String(50))
    average_life = Column(Integer)

    def serialize_specie(self):
        return {
            "id": self.id,
            "name": self.name,
            "hair_color": self.hair_color,
            "height": self.height,
            "skin_color": self.skin_color,
            "language": self.language,
            "average_life": self.average_life
        }


class Vehicle(db.Model):

    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    consumable = Column(String(50))
    crew = Column(Integer)
    passengers = Column(Integer)
    class_name = Column(String(50))
    cargo_cap = Column(Integer)
    terrain = Column(String(50))

    def serialize_vehicle(self):
        return {
            "id": self.id,
            "name": self.name,
            "consumable": self.consumable,
            "crew": self.crew,
            "passengers": self.passengers,
            "class_name": self.class_name,
            "cargo_cap": self.cargo_cap,
            "terrain": self.terrain
        }


class Starship(db.Model):

    __tablename__ = "starships"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    consumable = Column(String(50))
    crew = Column(Integer)
    passengers = Column(Integer)
    class_name = Column(String(50))
    cargo_cap = Column(Integer)
    hyperdrive_rating = Column(Float)

    def serialize_starship(self):
        return {
            "id": self.id,
            "name": self.name,
            "consumable": self.consumable,
            "crew": self.crew,
            "passengers": self.passengers,
            "class_name": self.class_name,
            "cargo_cap": self.cargo_cap,
            "hyperdrive_rating": self.hyperdrive_rating
        }


class Person(db.Model):

    __tablename__ = "people"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    hair_color = Column(String(50))
    height = Column(Float)
    skin_color = Column(String(50))
    eye_color = Column(String(50))
    gender = Column(String(50))

    def serialize_person(self):
        return {
            "id": self.id,
            "name": self.name,
            "hair_color": self.hair_color,
            "height": self.height,
            "skin_color": self.skin_color,
            "eye_color": self.eye_color,
            "gender": self.gender
        }


# ---------------------------- MODELO DE TABLA FAVORITOS ----------------------------#

class Category(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)

    def serialize_category(self):
        return {
            "id": self.id,
            "name": self.name
        }




class Favorite(db.Model):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    planet_id = Column(Integer, ForeignKey('planets.id'), nullable=True)
    specie_id = Column(Integer, ForeignKey('species.id'), nullable=True)
    vehicle_id = Column(Integer, ForeignKey('vehicles.id'), nullable=True)
    starship_id = Column(Integer, ForeignKey('starships.id'), nullable=True)
    person_id = Column(Integer, ForeignKey('people.id'), nullable=True)

    user = relationship("User", back_populates="favorites")
    planet = relationship("Planet")
    specie = relationship("Specie")
    vehicle = relationship("Vehicle")
    starship = relationship("Starship")
    person = relationship("Person")

    def serialize_favorite(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "planet": self.planet.serialize_planet() if self.planet else None,
            "specie": self.specie.serialize_specie() if self.specie else None,
            "vehicle": self.vehicle.serialize_vehicle() if self.vehicle else None,
            "starship": self.starship.serialize_starship() if self.starship else None,
            "person": self.person.serialize_person() if self.person else None
        }
