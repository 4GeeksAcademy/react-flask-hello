from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float,Integer,ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    vehicle: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    coordenates: Mapped[str] = mapped_column(String(120),nullable=False, unique=True)
    name: Mapped[str]= mapped_column(String(200),nullable=False)
    vehicle_consume_km: Mapped[float] = mapped_column(Float(50),nullable= True)
    


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name":self.name,
            "coordenates":self.coordenates,
            "vehicle":self.vehicle,
            "vehicle_consume_km":self.vehicle_consume_km

            # do not serialize the password, its a security breach
        }
    
class Oferta(db.Model):
    __tablename__="oferta"

    id: Mapped[int] = mapped_column(primary_key=True)
    id_comprador: Mapped[int] = mapped_column(Integer(),ForeignKey("user.id"), nullable=True)
    id_vendedor: Mapped[int] = mapped_column(Integer(),ForeignKey("user.id"),nullable=False)
    esta_realizada: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(600),nullable=False)
    titulo: Mapped[str]= mapped_column(String(200),nullable=False)
    coordenates_vendedor: Mapped[str] = mapped_column(String(120),ForeignKey("user.coordenates"),nullable=False)
    coordenates_comprador: Mapped[str] = mapped_column(String(120),ForeignKey("user.coordenates"),nullable=True)
    precio_ud: Mapped[int] = mapped_column(Integer(),nullable=True)
    ud:Mapped[str] = mapped_column(String(200),nullable=False)
    img_cosecha:Mapped[str] = mapped_column(String(),nullable=True)

    


    def serialize(self):
        return {
            "id": self.id,
            "id_comprador": self.id_comprador,
            "id_vendedor":self.id_vendedor,
            "esta_realizada":self.esta_realizada,
            "descripcion":self.descripcion,
            "titulo":self.titulo,
            "coordenates_vendedor":self.coordenates_vendedor,
            "coordenates_comprador":self.coordenates_comprador,
            "precio_ud":self.precio_ud,
            "img_cosecha":self.img_cosecha

            # do not serialize the password, its a security breach
        }