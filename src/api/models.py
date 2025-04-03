from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Column, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Tabla Usuario
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=False)

    # Relación uno a muchos con Favourites, la tabla muchos
    id_user = relationship("Rol", back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
            # do not serialize the password, its a security breach
        }
    
    # Encriptar contraseña
    def hash_password(self, password):
        self.password = generate_password_hash(password)
    
    def __init__(self, email, password, username):
        self.email = email
        self.hash_password(password)
        self.username = username
        
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
    
