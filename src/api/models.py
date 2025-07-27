from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    username: Mapped[str] = mapped_column(String(120), nullable=False)
    firstname: Mapped[str] = mapped_column(String(120))
    lastname: Mapped[str] = mapped_column(String(120))
    country: Mapped[str] = mapped_column(String(120))
    phone: Mapped[str] = mapped_column(String(27), unique=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "country": self.country,
            "phone": self.phone,
            # do not serialize the password, its a security breach
        }

    def set_password(self, password):
        self.password = Bcrypt().generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return Bcrypt().check_password_hash(self.password, password)


class Gasto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sueldo = db.Column(db.Float, nullable=False)
    is_student: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    # concepto = db.Column(db.String(255), nullable=False)
    # monto = db.Column(db.Float, nullable=False)
    # categoria = db.Column(db.String(120))
    # fecha = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


""" class Objetivo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    cantidad_meta = db.Column(db.Float, nullable=False)
    fecha_limite = db.Column(db.DateTime)
    completado = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Articulo(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    texto = db.Column(db.Text, nullable=False)
    url_imagen = db.Column(db.String(255))
    enlace = db.Column(db.String(255)) """
