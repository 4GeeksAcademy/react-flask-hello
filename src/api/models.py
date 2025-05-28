from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, Text, Numeric, TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from sqlalchemy import Boolean


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
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    creador_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable=False)
    ubicacion: Mapped[str] = mapped_column(String(255), nullable=False)
    fecha: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=False)
    descripcion: Mapped[str] = mapped_column(String(255), nullable=True)

    acepta_colaboradores: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    invitados: Mapped[str] = mapped_column(String(500), nullable=True)
    max_invitados: Mapped[int] = mapped_column(nullable=True)
    tipo_actividad: Mapped[str] = mapped_column(String(100), nullable=True)
    vestimenta: Mapped[str] = mapped_column(String(100), nullable=True)
    servicios: Mapped[str] = mapped_column(String(255), nullable=True)
    recursos: Mapped[str] = mapped_column(String(255), nullable=True)

    creador = relationship("User", back_populates="eventos_creados")
    participantes = relationship("Participante", back_populates="evento", lazy="joined")
    tareas = relationship("Tarea", back_populates="evento", lazy="joined")
    gastos = relationship("Gasto", back_populates="evento", lazy="joined")
    invitaciones = relationship("Invitacion", back_populates="evento", lazy="joined")

    def serialize(self):
        tareas_activas = [t.serialize() for t in self.tareas if not t.completada]
        tareas_realizadas = [t.serialize() for t in self.tareas if t.completada]

        gastos_evento = sum(g.monto for g in self.gastos if g.monto is not None)
        gastos_tareas = sum(
            sum(g.monto for g in tarea.gastos if g.monto is not None)
            for tarea in self.tareas
        )

        total_gastos = gastos_evento + gastos_tareas

        return {
            "id": self.id,
            "nombre": self.nombre,
            "creador_id": self.creador_id,
            "ubicacion": self.ubicacion,
            "fecha": self.fecha.isoformat() if self.fecha else None,
            "descripcion": self.descripcion,
            "acepta_colaboradores": self.acepta_colaboradores,
            "invitados": self.invitados,
            "max_invitados": self.max_invitados,
            "tipo_actividad": self.tipo_actividad,
            "vestimenta": self.vestimenta,
            "servicios": self.servicios,
            "recursos": self.recursos,
            "participantes": [p.serialize() for p in self.participantes],
            "tareas_activas": tareas_activas,
            "tareas_realizadas": tareas_realizadas,
            "total_gastos": total_gastos,
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
    gastos = relationship("Gasto", back_populates="tarea", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "evento_id": self.evento_id,
            "descripcion": self.descripcion,
            "asignado_a": self.asignado_a,
            "completada": self.completada,
            "gastos": [g.serialize() for g in self.gastos]
        }
