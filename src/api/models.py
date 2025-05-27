from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Text, Numeric, TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import TIMESTAMP

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    telefono: Mapped[str] = mapped_column(Text, nullable=True)
    password: Mapped[str] = mapped_column(String, nullable=False)

    eventos_creados = relationship("Evento", back_populates="creador", cascade="all, delete-orphan")
    gastos = relationship("Gasto", back_populates="usuario")
    invitaciones = relationship("Invitacion", back_populates="usuario")
    participantes = relationship("Participante", back_populates="usuario")
    tareas_asignadas = relationship("Tarea", back_populates="asignado")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "telefono": self.telefono,
            # No incluir password por seguridad
        }

class Evento(db.Model):
    __tablename__ = "eventos"

    id: Mapped[int] = mapped_column(primary_key=True)
    creador_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    nombre: Mapped[str] = mapped_column(Text, nullable=True)
    fecha: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=True)
    ubicacion: Mapped[str] = mapped_column(Text, nullable=True)
    descripcion: Mapped[str] = mapped_column(Text, nullable=True)

    creador = relationship("User", back_populates="eventos_creados")
    gastos = relationship("Gasto", back_populates="evento")
    invitaciones = relationship("Invitacion", back_populates="evento")
    participantes = relationship("Participante", back_populates="evento")
    tareas = relationship("Tarea", back_populates="evento")

    def serialize(self):
        return {
            "id": self.id,
            "creador_id": self.creador_id,
            "nombre": self.nombre,
            "fecha": self.fecha.isoformat() if self.fecha else None,
            "ubicacion": self.ubicacion,
            "descripcion": self.descripcion,
        }

class Gasto(db.Model):
    __tablename__ = "gastos"

    id: Mapped[int] = mapped_column(primary_key=True)
    evento_id: Mapped[int] = mapped_column(ForeignKey("eventos.id"), nullable=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    tarea_id: Mapped[int] = mapped_column(ForeignKey("tareas.id"), nullable=False)
    monto: Mapped[float] = mapped_column(Numeric, nullable=True)
    etiqueta: Mapped[str] = mapped_column(Text, nullable=True)

    evento = relationship("Evento", back_populates="gastos")
    usuario = relationship("User", back_populates="gastos")
    tarea = relationship("Tarea", back_populates="gastos")

    def serialize(self):
        return {
            "id": self.id,
            "evento_id": self.evento_id,
            "usuario_id": self.usuario_id,
            "tarea_id": self.tarea_id,
            "monto": float(self.monto) if self.monto is not None else None,
            "etiqueta": self.etiqueta,
        }


class Invitacion(db.Model):
    __tablename__ = "invitaciones"

    id: Mapped[int] = mapped_column(primary_key=True)
    evento_id: Mapped[int] = mapped_column(ForeignKey("eventos.id"), nullable=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    estado: Mapped[str] = mapped_column(Text, nullable=True)

    evento = relationship("Evento", back_populates="invitaciones")
    usuario = relationship("User", back_populates="invitaciones")

    def serialize(self):
        return {
            "id": self.id,
            "evento_id": self.evento_id,
            "usuario_id": self.usuario_id,
            "estado": self.estado,
        }

class Participante(db.Model):
    __tablename__ = "participantes"

    id: Mapped[int] = mapped_column(primary_key=True)
    evento_id: Mapped[int] = mapped_column(ForeignKey("eventos.id"), nullable=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    aceptado: Mapped[bool] = mapped_column(Boolean, nullable=True)

    evento = relationship("Evento", back_populates="participantes")
    usuario = relationship("User", back_populates="participantes")

    def serialize(self):
        return {
            "id": self.id,
            "evento_id": self.evento_id,
            "usuario_id": self.usuario_id,
            "aceptado": self.aceptado,
        }

class Tarea(db.Model):
    __tablename__ = "tareas"

    id: Mapped[int] = mapped_column(primary_key=True)
    evento_id: Mapped[int] = mapped_column(ForeignKey("eventos.id"), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    asignado_a: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=True)
    completada: Mapped[bool] = mapped_column(Boolean, default=False)

    evento = relationship("Evento", back_populates="tareas")
    asignado = relationship("User", back_populates="tareas_asignadas")
    
    # Nueva relación con Gasto
    gastos = relationship("Gasto", back_populates="tarea", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "evento_id": self.evento_id,
            "descripcion": self.descripcion,
            "asignado_a": self.asignado_a,
            "completada": self.completada,
            "gastos": [g.serialize() for g in self.gastos]  # Opcional: incluir los gastos en la tarea
        }
