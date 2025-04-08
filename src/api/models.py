from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Column, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# TABLA DE USUARIO


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(120), nullable=True)
    lastname: Mapped[str] = mapped_column(String(120), nullable=True)
    shopname: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=False)

    # RELACION UNO A MUCHOS CON FAVORITES, LA TABLA DE MUCHOS

    id_user = relationship("Rol", back_populates="user")

    # AÑADIMOS RELACIONES (A PRODUCTOS Y A TIGRIS FILES)

    products = relationship("Productos", back_populates="user")
    tigris_files = relationship("TigrisFiles", back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "shopname": self.shopname,
            "email": self.email,

            # DO NOT SERIALIZE THE PASSWORD, ITS A SECURITY BREACH
        }

    # ENCRIPTA LA CONTRASEÑA

    def hash_password(password):
        return generate_password_hash(password)

    # COMPROBAR SI EL PASSWORD QUE INTRODUCE EL USUARIO ES EL MISMO QUE LA EL DE LA DB

    def check_password(self, password):
        return check_password_hash(self.password, password)


# TABLA DE ROL

class Rol(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # RELACION MUCHOS A UNO CON USER, LA TABLA "UNO"

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user = relationship("User", back_populates="id_user")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
            # DO NOT SERIALIZE THE PASSWORD, ITS A SECURITY BREACH
        }

# TABLA DE COMPRAS

class Compras(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

# TABLA DE STOCK


class Stock(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


class Productos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    product_name: Mapped[str] = mapped_column(String(120), nullable=False)
    price_per_unit: Mapped[float] = mapped_column(Float, nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    image_url: Mapped[str] = mapped_column(
        String(500), nullable=False, default="https://placehold.co/600x400/EEE/31343C")

    # AÑADIMOS LA RELACION CON EL USUARIO
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="products")

    def serialize(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "price_per_unit": self.price_per_unit,
            "description": self.description,
            "quantity": self.quantity,
            "user_id": self.user_id,
            "image_url": self.image_url
        }


class TigrisFiles(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    url: Mapped[str] = mapped_column(String(500), nullable=False)

    # AÑADIMOS LA RELACION CON EL USUARIO
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="tigris_files")

    def serialize_tigris(self):
        return {
            "id": self.id,
            "tigris_url": self.url,
            "user_id": self.user_id
        }

# TABLA DE FACTURAS


class Facturas(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

#TABLA DETALLES_FACTURA (PRODUCTOS - FACTURAS)


class Detalles_Facturas(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    def serialize(self):
        return {
            "id": self.id
        }
