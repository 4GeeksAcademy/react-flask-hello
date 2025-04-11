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
    
    _password = db.Column('password', db.String(128), nullable=False)

    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=False)

    # PROPIEDADES PARA MANEJAR LA CONTRASEÑA DE FORMA SEGURA
    @property
    def password(self):
        # Este es el getter para obtener el valor de la contraseña (encriptada)
        return self._password

    @password.setter
    def password(self, password):
        # Este es el setter que encripta la contraseña antes de guardarla
        self._password = generate_password_hash(password)

    # MÉTODO PARA VERIFICAR LA CONTRASEÑA
    def check_password(self, password):
        # Este método compara la contraseña proporcionada con la almacenada (encriptada)
        return check_password_hash(self._password, password)

    # RELACION UNO A MUCHOS CON ROL, LA TABLA DE MUCHOS
    roles = relationship("Rol", back_populates="user")

    # AÑADIMOS RELACIONES (A PRODUCTOS Y A TIGRIS FILES)
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
            # DO NOT SERIALIZE THE PASSWORD, ITS A SECURITY BREACH
        }

# TABLA DE ROL
class Rol(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # RELACION MUCHOS A UNO CON USER, LA TABLA "UNO"
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user = relationship("User", back_populates="roles")

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

# TABLA DE PRODUCTOS
class Productos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    product_name: Mapped[str] = mapped_column(String(120), nullable=False)
    price_per_unit: Mapped[float] = mapped_column(Float, nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    image_url: Mapped[str] = mapped_column(
        String(500), nullable=False, default="https://placehold.co/600x400/EEE/31343C")

    # RELACION UNO A MUCHOS CON DETALLES_FACTURA, LA TABLA DE MUCHOS
    factura_detalles = relationship("Detalles_Facturas", back_populates="prod")

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
    cif_empresa: Mapped[str] = mapped_column(String(50))

    # RELACION UNO A MUCHOS CON DETALLES_FACTURAS, LA TABLA DE MUCHOS
    id_factura = relationship("Detalles_Facturas", back_populates="factura")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "cif_empresa": self.cif_empresa
        }

# TABLA DETALLES_FACTURA (PRODUCTOS - FACTURAS)
class Detalles_Facturas(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)

    # Relación muchos a uno con Facturas, la tabla "uno"
    factura_id: Mapped[int] = mapped_column(ForeignKey('facturas.id'))
    factura = relationship("Facturas", back_populates="id_factura")

    # Relación muchos a uno con Productos, la tabla "uno"
    prod_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))
    prod = relationship("Productos", back_populates="factura_detalles")

    def serialize(self):
        return {
            "id": self.id,
            "factura_id": self.factura_id,
            "prod_id": self.prod_id
        }

# TABLA DE LOGOS
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