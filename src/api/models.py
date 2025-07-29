from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    username: Mapped[str] = mapped_column(String(120))
    firstname: Mapped[str] = mapped_column(String(120))
    lastname: Mapped[str] = mapped_column(String(120))
    country: Mapped[str] = mapped_column(String(120))
    phone: Mapped[str] = mapped_column(String(27), unique=True, nullable=False)
    sueldo = db.Column(db.Float, nullable=False)
    is_student: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "country": self.country,
            "phone": self.phone,
            "sueldo": self.sueldo,
            "is_student": self.is_student,
            # do not serialize the password, its a security breach
        }

    def set_password(self, password):
        self.password = Bcrypt().generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return Bcrypt().check_password_hash(self.password, password)

class Gasto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    concepto = db.Column(db.String(255))
    cantidad = db.Column(db.Float)
    emoji = db.Column(db.String(120))
    #categoria = db.Column(db.String(120))
    #fecha = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "concepto": self.concepto,
            "cantidad": self.cantidad,
            "emoji": self.emoji,
            "user_id": self.user_id,
        }


class Objetivo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    cantidad_meta = db.Column(db.Float, nullable=False)
    fecha_limite = db.Column(db.DateTime)
    completado = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "descripcion": self.descripcion,
            "cantidad_meta": self.cantidad_meta,
            "fecha_limite": self.fecha_limite,
            "completado": self.completado
        }

class Articulo(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    texto = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "texto": self.texto,
        }
class Link(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    url_imagen = db.Column(db.String(255))
    enlace = db.Column(db.String(255))
    articulo_id = db.Column(db.Integer, db.ForeignKey('articulo.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "url_imagen": self.url_imagen,
            "enlace": self.enlace,
            "articulo_id": self.articulo_id,
        }    