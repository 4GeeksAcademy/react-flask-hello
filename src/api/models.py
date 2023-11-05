from flask_sqlalchemy import SQLAlchemy	
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum

db = SQLAlchemy()

class Status(str, Enum):
    pending = 'Pending'
    approved = 'Approved'
    #Archived means the booking proposal was rejected by the keeper and we should dispose this booking
    archived = 'Archived'
    #canceled means it was withdrawn by the user
    canceled = 'Canceled'
    done = 'Done'
    #Personal Time Off. Used by the keeper to go on vacation or other personal duties.
    pto = 'PTO'

class Booking(db.Model, SerializerMixin):
    __tablename__='booking'
    serialize_rules = ('-keeper','-keeper.booking')
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum(Status))
    #Many to one relationship booking to keeper
    keeper = relationship("Keeper", back_populates="booking")
    keeper_id = db.Column(db.Integer, db.ForeignKey('keeper.id'), nullable=False)
    #Many to many bookings/pets
    pets = relationship("Pet", secondary="booking_pet",
                        back_populates="bookings")

# Definición de la clase base 'User': encapsulara dentro los owner y los keepers, que serian una subclase de user
class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    serialize_rules = ('-password') #PROBAR
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_type = db.Column(db.String(50))

    # Configuración para el polimorfismo
    __mapper_args__ = {
        # <= # Identidad de user(representa una entidad con la que se pueden relacionar varias subentidades (en este caso Owner y Keeper)
        "polymorphic_identity": "user",
        # <= este es el link, donde los categorizamos como subcatgorias de User
        # establece que cualquier fila polymorphic_identity igual a user, se considera un tipo de user y se establece su tipo en la columna user_type
        "polymorphic_on": "user_type",
    }

# Definición de la clase 'Owner' que hereda de 'User', seria un user_type: Owner
class Owner (User, SerializerMixin):
    __tablename__ = 'owner'
    id = db.mapped_column(db.ForeignKey("user.id"), primary_key=True)
    # Relación one-to-many: Un propietario puede tener varias mascotas
    pets = relationship("Pet", back_populates="owner")

    # configuracion del polimorfismo(sus propiedades se heredan de su entidad base USER)
    __mapper_args__ = {
        # y se establece su identidad como subentidad de User, tipo => owner
        "polymorphic_identity": "owner",
    }

class Keeper(User, SerializerMixin):
    __tablename__ = 'keeper'
    id = db.mapped_column(db.ForeignKey("user.id"), primary_key=True)
    hourly_pay = db.Column(db.Float, nullable=False)
    #One keeper to many bookings
    booking = relationship("Booking", back_populates='keeper')

    __mapper_args__ = {
        "polymorphic_identity": "keeper",  # Identidad de cuidador
    }

class Pet (db.Model, SerializerMixin):
    __tablename__ = 'pet'
    serialize_rules = ('-bookings', '-owner.pets')
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    # Relación many-to-one multiple pets/one owner
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'))
    owner = relationship("Owner", back_populates="pets")
    #Ralacion many to many bookings/pets
    bookings = relationship(
        "Booking", secondary="booking_pet", back_populates="pets")

# Definición de la clase 'KeeperPet' para la relación muchos a muchos entre cuidadores y mascotas
class BookingPet (db.Model):
    __tablename__ = 'booking_pet'
    booking_id = db.Column(db.Integer, db.ForeignKey(
        'booking.id'), primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey(
        'pet.id'), primary_key=True) #HACER PET DUMMY PARA PTO
