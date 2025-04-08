from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, ForeignKey, Numeric, DateTime, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()


class Admins(db.Model):
    __tablename__ = "admins"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    rol: Mapped[str] = mapped_column(
        Enum("Admin", name="role_admin"), nullable=False)

    def __init__(self, username, password, rol):
        self.username = username
        self.rol = rol
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize_admins(self):
        return {
            "id": self.id,
            "username": self.username,
            "rol": self.rol,
            "password": self.password_hash
        }


class Negocios(db.Model):
    __tablename__ = "negocio"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre_negocio: Mapped[str] = mapped_column(String(50), nullable=False)
    negocio_cif: Mapped[str] = mapped_column(
        String(15), unique=True, nullable=False)
    negocio_cp: Mapped[str] = mapped_column(String(10), nullable=False)

    usuarios = relationship("Usuarios", back_populates="negocio")
    servicios = relationship("Servicios", back_populates="negocio")

    def serialize_negocio(self):
        return {
            "id": self.id,
            "nombre": self.nombre_negocio,
            "CIF": self.negocio_cif,
            "CP": self.negocio_cp
        }


class Usuarios(db.Model):
    __tablename__ = "usuarios"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    negocio_cif: Mapped[str] = mapped_column(
        ForeignKey("negocio.negocio_cif"), nullable=False)
    rol: Mapped[str] = mapped_column(
        Enum("master", "jefe", "empleado", name="role_enum"), nullable=False)

    negocio = relationship("Negocios", back_populates="usuarios")
    citas = relationship("Citas", back_populates="usuario",
                         cascade="all, delete-orphan")

    def __init__(self, username, password, negocio_cif, rol="empleado"):
        self.username = username
        self.negocio_cif = negocio_cif
        self.rol = rol
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize_usuario(self):
        return {
            "id": self.id,
            "username": self.username,
            "rol": self.rol,
            "password": self.password_hash
        }


class Servicios(db.Model):
    __tablename__ = 'servicio'
    id: Mapped[int] = mapped_column(primary_key=True)
    negocio_id: Mapped[int] = mapped_column(
        ForeignKey("negocio.id"), nullable=False)  # limitar (8)
    nombre: Mapped[str] = mapped_column(
        String(75), unique=True, nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500),  nullable=False)
    # precio con numeric, pero puede ser con Float o incluso Biginteger
    precio: Mapped[int] = mapped_column(Numeric(10, 2), nullable=False)

    negocio = relationship("Negocios", back_populates="servicios")
    clientes = relationship(
        "Clientes", secondary="cliente_servicio", back_populates="servicios")
    citas = relationship("Citas", back_populates="servicio",
                         cascade="all, delete-orphan")

    def serialize_servicio(self):
        return {
            "id": self.id,
            "negocio_id": self.negocio_id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio
        }


# DEJO AQUI UN HUECO PARA EL PROBLEMA DE AL CLASE DE SERVICIOS

class Clientes(db.Model):
    __tablename__ = "clientes"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(75), nullable=False)
    dirección: Mapped[str] = mapped_column(String(255), nullable=True)
    telefono: Mapped[str] = mapped_column(String(15), nullable=False)
    cliente_dni: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(100), unique=True, nullable=False)
    # nullable true porque puede que un cliente no tenga asignado un sevicio
    servicios = relationship(
        "Servicios", secondary="cliente_servicio", back_populates="clientes")
    # cascade pq las notas en sí depende del cleinte pq son ntoas de cliente
    notas = relationship("Notas", back_populates="cliente",
                         cascade="all, delete-orphan")
    pagos = relationship("Pagos", back_populates="cliente",
                         cascade="all, delete-orphan")
    citas = relationship("Citas", back_populates="cliente",
                         cascade="all, delete-orphan")
    historial_servicios = relationship(
        "HistorialDeServicios", back_populates="cliente", cascade="all, delete-orphan")

    def serialize_cliente(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "dirección": self.dirección,
            "telefono": self.telefono,
            "cliente_dni": self.cliente_dni,
            "email": self.email,
            "servicios": [servicio.serialize_servicio() for servicio in self.servicios] if self.servicios else [],            "notas": [nota.serialize_nota() for nota in self.notas],
            "pagos": [pago.serialize_pago() for pago in self.pagos] if self.pagos else [],
            "citas": [cita.serialize_cita() for cita in self.citas] if self.citas else [],
            "historial_servicios": [historial.serialize_historial() for historial in self.historial_servicios] if self.historial_servicios else []
        }


class Notas(db.Model):
    __tablename__ = "nota"
    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(
        ForeignKey("clientes.id"), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=False)
# pongo nullable flase para evitar crear una nota vacía por error y que pueda sobrecargar la memoria en si
    cliente = relationship("Clientes", back_populates="notas")
    historial_servicio = relationship(
        "HistorialDeServicios", back_populates="nota")

    def serialize_nota(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "cliente_nombre": self.cliente.nombre,
            "descripcion": self.descripcion
        }


class Pagos(db.Model):
    __tablename__ = "pagos"
    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(
        ForeignKey("clientes.id"), nullable=False)
    metodo_pago: Mapped[str] = mapped_column(
        Enum("efectivo", "tarjeta", name="metodo_pago_enum"), nullable=False)
    total_estimado: Mapped[int] = mapped_column(Numeric(10, 2), nullable=False)
    pagos_realizados: Mapped[int] = mapped_column(
        Numeric(10, 2), nullable=False, default=0)
    # La fecha puede ser nullable si no se paga inmediatamente, aqui presupongo que se pone con cada pago
    fecha_pago: Mapped[Date] = mapped_column(Date, nullable=True)
    estado: Mapped[str] = mapped_column(Enum(
        "pendiente", "pagado",  name="estado_enum"), nullable=False, default="pendiente")

    cliente = relationship("Clientes", back_populates="pagos")

    def serialize_pago(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "metodo_pago": self.metodo_pago,
            # aqui convierte el total estiamdo en String cuando se serializa
            "total_estimado": str(self.total_estimado),
            "pagos_realizados": self.pagos_realizados,
            "pagos_pendientes": max(0, self.total_estimado - self.pagos_realizados),
            # en resumen, el isoformat() convierte la serialización a formato "AÑO-MES-DIA"
            "fecha_pago": self.fecha_pago.isoformat() if self.fecha_pago else None,
            "estado": self.estado
        }


class Citas(db.Model):
    __tablename__ = "citas"
    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(
        ForeignKey("usuarios.id"), nullable=False)
    cliente_id: Mapped[int] = mapped_column(
        ForeignKey("clientes.id"), nullable=False)
    servicio_id: Mapped[int] = mapped_column(
        ForeignKey("servicio.id"), nullable=False)
    fecha_hora: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    estado: Mapped[str] = mapped_column(Enum(
        "pendiente", "confirmada", "cancelada", "realizada", name="estado_cita"), nullable=False, default="pendiente")

    usuario = relationship("Usuarios", back_populates="citas")
    cliente = relationship("Clientes", back_populates="citas")
    servicio = relationship("Servicios", back_populates="citas")
    calendario = relationship(
        "Calendario", back_populates="cita", uselist=False)
    historial_servicio = relationship(
        "HistorialDeServicios", back_populates="cita")

    def serialize_cita(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "usuario_nombre": self.usuario.username,
            "cliente_id": self.cliente_id,
            "cliente_nombre": self.cliente.nombre,
            "cliente_email": self.cliente.email,
            "servicio_id": self.servicio_id,
            "servicio_nombre": self.servicio.nombre,
            # Mostramos todos los servicios contratados por el cliente
            "servicios_cliente": [servicio.serialize_servicio() for servicio in self.cliente.servicios] if self.cliente.servicios else [],
            "fecha_hora": self.fecha_hora.isoformat(),
            "estado": self.estado,
            "calendario": self.calendario.serialize_calendario() if self.calendario else None
        }


class Calendario(db.Model):
    __tablename__ = "calendario"
    id: Mapped[int] = mapped_column(primary_key=True)
    fecha_hora_inicio: Mapped[DateTime] = mapped_column(
        DateTime, nullable=False)
    fecha_hora_fin: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    cita_id: Mapped[int] = mapped_column(
        ForeignKey("citas.id"), nullable=False, unique=True)
    google_event_id: Mapped[str] = mapped_column(String(255), nullable=True)
    ultimo_sync: Mapped[DateTime] = mapped_column(DateTime, nullable=True)

    cita = relationship("Citas", back_populates="calendario")

    def serialize_calendario(self):
        return {
            "id": self.id,
            "fecha_hora_inicio": self.fecha_hora_inicio.isoformat(),
            "fecha_hora_fin": self.fecha_hora_fin.isoformat(),
            "cita_id": self.cita_id,
            "google_event_id": self.google_event_id,
            "ultimo_sync": self.ultimo_sync.isoformat() if self.ultimo_sync else None
        }



class HistorialDeServicios(db.Model):
    __tablename__ = "historial_de_servicio"

    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(
        ForeignKey("clientes.id"), nullable=False)
    cita_id: Mapped[int] = mapped_column(
        ForeignKey("citas.id"), nullable=False)
    nota_id: Mapped[int] = mapped_column(ForeignKey("nota.id"), nullable=True)

    cliente = relationship("Clientes", back_populates="historial_servicios")
    cita = relationship("Citas", back_populates="historial_servicio")
    nota = relationship("Notas", back_populates="historial_servicio")

    def serialize_historial(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "cliente_nombre": self.cliente.nombre if self.cliente else None,
            "cita_id": self.cita_id,
            "cita_info": {
                "fecha_hora": self.cita.fecha_hora.isoformat() if self.cita else None,
                "servicio": self.cita.servicio.nombre if self.cita and self.cita.servicio else None,
                "estado": self.cita.estado if self.cita else None
            },
            "nota_id": self.nota_id,
            "nota_descripcion": self.nota.descripcion if self.nota else None
        }
