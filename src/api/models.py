from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

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

    planet_favorites = relationship("PlanetFavorite", back_populates="user", cascade="all, delete-orphan")
    specie_favorites = relationship("SpecieFavorite", back_populates="user", cascade="all, delete-orphan")
    vehicle_favorites = relationship("VehicleFavorite", back_populates="user", cascade="all, delete-orphan")
    starship_favorites = relationship("StarshipFavorite", back_populates="user", cascade="all, delete-orphan")
    person_favorites = relationship("PersonFavorite", back_populates="user", cascade="all, delete-orphan")

    def serialize_user(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email
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

    favorites = relationship("PlanetFavorite", back_populates="planet", cascade="all, delete-orphan")

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

    favorites = relationship("SpecieFavorite", back_populates="specie", cascade="all, delete-orphan")

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

    favorites = relationship("VehicleFavorite", back_populates="vehicle", cascade="all, delete-orphan")

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

    favorites = relationship("StarshipFavorite", back_populates="starship", cascade="all, delete-orphan")

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

    favorites = relationship("PersonFavorite", back_populates="person", cascade="all, delete-orphan")

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


# ----------------------------MODELOS DE TABLAS DE FAVORITOS----------------------------#

class PlanetFavorite(db.Model):
    __tablename__ = "planet_favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    planet_id = Column(Integer, ForeignKey("planets.id"), nullable=False)

    user = relationship("User", back_populates="planet_favorites")
    planet = relationship("Planet", back_populates="favorites")

    def serialize_favorite(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": "planet",
            "planet_id": self.planet_id,
            "planet_name": self.planet.name
        }


class SpecieFavorite(db.Model):
    __tablename__ = "specie_favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    specie_id = Column(Integer, ForeignKey("species.id"), nullable=False)

    user = relationship("User", back_populates="specie_favorites")
    specie = relationship("Specie", back_populates="favorites")

    def serialize_favorite(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": "specie",
            "specie_id": self.specie_id,
            "specie_name": self.specie.name
        }


class VehicleFavorite(db.Model):
    __tablename__ = "vehicle_favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)

    user = relationship("User", back_populates="vehicle_favorites")
    vehicle = relationship("Vehicle", back_populates="favorites")

    def serialize_favorite(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": "vehicle",
            "vehicle_id": self.vehicle_id,
            "vehicle_name": self.vehicle.name
        }


class StarshipFavorite(db.Model):
    __tablename__ = "starship_favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    starship_id = Column(Integer, ForeignKey("starships.id"), nullable=False)

    user = relationship("User", back_populates="starship_favorites")
    starship = relationship("Starship", back_populates="favorites")

    def serialize_favorite(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": "starship",
            "starship_id": self.starship_id,
            "starship_name": self.starship.name
        }


class PersonFavorite(db.Model):
    __tablename__ = "person_favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    person_id = Column(Integer, ForeignKey("people.id"), nullable=False)

    user = relationship("User", back_populates="person_favorites")
    person = relationship("Person", back_populates="favorites")

    def serialize_favorite(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": "person",
            "person_id": self.person_id,
            "person_name": self.person.name
        }