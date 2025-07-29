from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Enum, Date, Numeric, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
import datetime
from typing import List

db = SQLAlchemy()


# Se definen los posibles estados de la orden de servicio con tipo de datos ENUM

class status(enum.Enum):
    INGRESADO = 'Ingresado'
    EN_PROCESO = 'En proceso'
    FINALIZADO = 'Finalizado'


class Orden_de_trabajo(db.Model):
    __tablename__ = "orden_de_trabajo"
    id_ot: Mapped[int] = mapped_column(primary_key=True)
    #nombre_cliente: Mapped[str] = mapped_column(String(80), nullable=False)
    fecha_ingreso: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    estado_servicio: Mapped[status] = mapped_column(
        Enum(status, name="estado_orden"), nullable=False)
    fecha_final: Mapped[datetime.date] = mapped_column(Date, nullable=True)

    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("user.id_user"), nullable=False)
    vehiculo_id: Mapped[int] = mapped_column(
        ForeignKey("vehiculos.id_vehiculo"), nullable=False)
    mecanico_id: Mapped[int] = mapped_column(
        ForeignKey("user.id_user"), nullable=False)

    # RELACIONES CON OTRAS TABLAS
    cliente: Mapped["User"] = relationship(
        foreign_keys=[usuario_id], back_populates="ordenes_cliente")
    mecanico: Mapped["User"] = relationship(
        foreign_keys=[mecanico_id], back_populates="ordenes_mecanico")
    vehiculo: Mapped["Vehiculos"] = relationship(
        back_populates="ordenes_trabajo")
    servicios_asociados: Mapped[list['AuxOrdenServicio']] = relationship(
        back_populates="orden")

    def __str__(self):
        return f'{self.id_ot}'

    def serialize(self):
        return {
            'id_ot': self.id_ot,
            #'nombre_cliente': self.nombre_cliente,
            'fecha_ingreso': self.fecha_ingreso,
            'estado_servicio': self.estado_servicio.value,
            'fecha_final': self.fecha_final,
            'usuario_id': self.usuario_id,
            'vehiculo_id': self.vehiculo_id,
            'mecanico_id': self.mecanico_id,
            'nombre_mecanico': self.mecanico.nombre,
            'matricula_vehiculo': self.vehiculo.matricula
        }


class AuxOrdenServicio(db.Model):
    __tablename__ = "auxOrdenServicio"
    id: Mapped[int] = mapped_column(primary_key=True)
    orden_id: Mapped[int] = mapped_column(
        ForeignKey("orden_de_trabajo.id_ot"), nullable=False)
    orden: Mapped['Orden_de_trabajo'] = relationship(
        back_populates='servicios_asociados')
    servicio_id: Mapped[int] = mapped_column(
        ForeignKey("servicio.id_service"), nullable=False)
    servicio: Mapped['Servicio'] = relationship(
        back_populates="ordenes_asociadas")

    def __str__(self):
        return f'{self.servicio}'

    def serialize(self):
        return {
            'id': self.id,
            'orden_id': self.orden_id,
            'servicio_id': self.servicio_id
        }


class RolEnum(enum.Enum):
    MECANICO = 'Mecanico'
    CLIENTE = 'Cliente'


class User(db.Model):
    __tablename__ = "user"
    id_user: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(80), nullable=False)
    identificacion: Mapped[int] = mapped_column(
        Integer, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(12), nullable=False)
    telefono: Mapped[str] = mapped_column(String(11))
    email: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False)
    foto_usuario: Mapped[str] = mapped_column(String(255), nullable=True)
    rol: Mapped[RolEnum] = mapped_column(
        Enum(RolEnum, name="rol_enum"), nullable=False)

    # RELACIONES CON OTRAS TABLAS
    vehiculos: Mapped[List["Vehiculos"]] = relationship(back_populates="user")
    ordenes_cliente: Mapped[List["Orden_de_trabajo"]] = relationship(
        back_populates="cliente", foreign_keys="Orden_de_trabajo.usuario_id")
    ordenes_mecanico: Mapped[List["Orden_de_trabajo"]] = relationship(
        back_populates="mecanico", foreign_keys="Orden_de_trabajo.mecanico_id")

    def __str__(self):
        return f'{self.nombre}'

    def serialize(self):
        print(self.rol)
        print(type(self.rol))
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'identificacion': self.identificacion,
            'telefono': self.telefono,
            'email': self.email,
            'is_active': self.is_active,
            'foto_usuario': self.foto_usuario,
            'rol': self.rol.value
            # do not serialize the password, its a security breach
        }


class Vehiculos(db.Model):
    __tablename__ = 'vehiculos'
    id_vehiculo: Mapped[int] = mapped_column(primary_key=True)
    matricula: Mapped[str] = mapped_column(
        String(8), unique=True, nullable=False)
    marca: Mapped[str] = mapped_column(String(15), nullable=False)
    modelo: Mapped[str] = mapped_column(String(15), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id_user"), nullable=False)

    # RELACIONES
    user: Mapped["User"] = relationship(back_populates="vehiculos")
    ordenes_trabajo: Mapped[list["Orden_de_trabajo"]
                            ] = relationship(back_populates="vehiculo")
    

    def __str__(self):
        return f'{self.matricula}'

    def serialize(self):
        return {
            'id_vehiculo': self.id_vehiculo,
            'matricula': self.matricula,
            'marca': self.marca,
            'modelo': self.modelo,
            'year': self.year,
            'user_id': self.user_id
        }


class Servicio(db.Model):
    __tablename__ = 'servicio'
    id_service: Mapped[int] = mapped_column(primary_key=True)
    name_service: Mapped[str] = mapped_column(String(100), nullable=False)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    # RELACIONES CON OTRAS TABLAS
    ordenes_asociadas: Mapped[List["AuxOrdenServicio"]
                              ] = relationship(back_populates="servicio")

    def __str__(self):
        return f'{self.name_service}'

    def serialize(self):
        return {
            'ide_service': self.id_service,
            'name_service': self.name_service,
            'price': self.price
        }
