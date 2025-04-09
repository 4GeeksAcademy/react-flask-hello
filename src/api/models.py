from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Column, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Tabla Usuario

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

    # Relación uno a muchos con Rol, la tabla muchos
    id_user = relationship("Rol", back_populates="user")

    # Añadimos relaciones (A productos y a tigris_files)
    products = relationship("Productos", back_populates="user")
    tigris_files = relationship("TigrisFiles", back_populates="user")

    # Relación uno a muchos con Logo, la tabla muchos
    logo = relationship("Logo", back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "shopname": self.shopname,
            "email": self.email,

            # do not serialize the password, its a security breach
        }

    # Encriptar contraseña
    def hash_password(password):
        return generate_password_hash(password)

    # Comprobar si el password que introduce el usuario es el mismo que la el de la BD

    def check_password(self, password):
        return check_password_hash(self.password, password)


# Tabla Rol

class Rol(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # Relación muchos a uno con User, la tabla "uno"
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user = relationship("User", back_populates="id_user")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }


# Tabla Compras

class Compras(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))

    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }


# Tabla Stock

class Stock(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

# Tabla Productos

class Productos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    product_name: Mapped[str] = mapped_column(String(120), nullable=False)
    price_per_unit: Mapped[float] = mapped_column(Float, nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    image_url: Mapped[str] = mapped_column(
        String(500), nullable=False, default="https://placehold.co/600x400/EEE/31343C")
    
    # Relación uno a muchos con Detalles_Facturas, la tabla muchos
    id_prod = relationship("Detalles_Facturas", back_populates="prod")

    # Añadimos la relación con el usuario
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

    # Añadimos la relación con el usuario
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="tigris_files")

    def serialize_tigris(self):
        return {
            "id": self.id,
            "tigris_url": self.url,
            "user_id": self.user_id
        }


# Tabla Facturas

class Facturas(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    cif_empresa: Mapped[str] = mapped_column(String(50))

    # Relación uno a muchos con Detalles_Facturas, la tabla muchos
    id_factura = relationship("Detalles_Facturas", back_populates="factura")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cif_empresa": self.cif_empresa
        }

# Tabla Detalles_Facturas (Productos - Facturas)

class Detalles_Facturas(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    # Relación muchos a uno con Facturas, la tabla "uno"
    factura_id: Mapped[int] = mapped_column(ForeignKey('facturas.id'))
    factura = relationship("Facturas", back_populates="id_factura")

    # Relación muchos a uno con Productos, la tabla "uno"
    prod_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))
    prod = relationship("Productos", back_populates="id_prod")

    def serialize(self):
        return {
            "id": self.id,
            "factura_id": self.factura_id,
            "prod_id": self.prod_id
        }
    
# Tabla Logo

class Logo(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    image_logo_url: Mapped[str] = mapped_column(
        String(500), nullable=False, default="https://placehold.co/600x400/EEE/31343C")
    
    # Añadimos la relación con el usuario
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    user = relationship("User", back_populates="logo")
    
    def serialize(self):
        return {
            "id": self.id,
            "image_logo_url": self.image_logo_url,
            "user_id": self.user_id
        }
