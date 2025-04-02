from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Enum, ForeignKey, Numeric, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

class Admins(db.Model):
    __tablename__ = "admins"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    rol: Mapped[str] = mapped_column(Enum("Admin", name="role_admin"), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize_Admins(self):
        return {
            "id": self.id,
            "username": self.username,
            "rol": self.rol, 
            }
    
class Negocio(db.Model):
    __tablename__="negocio"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre_negocio: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    negocio_cif: Mapped[str] = mapped_column(String(15), unique=True, nullable=False) 
    negocio_cp: Mapped[str] = mapped_column(String(10), nullable=False)

    usuarios = relationship("Usuarios", back_populates="negocio")
    servicios = relationship("Servicio", back_populates="negocio")
    

    def serialize_Negocio(self):
        return {
            "id": self.id,
            "nombre": self.nombre_negocio,
            "CIF": self.negocio_cif,
            "CP": self.negocio_cp
        }
    
class Usuarios(db.Model):
    __tablename__ = "usuarios"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    negocio_id:Mapped[int] = mapped_column(ForeignKey("negocio.id"), nullable=False)
    rol: Mapped[str] = mapped_column(Enum("master", "jefe", "usuario", name="role_enum"), nullable=False)

    negocio = relationship("Negocio", back_populates="usuarios")
    citas = relationship("Citas", back_populates="usuario",cascade="all, delete-orphan") 
    problemas = relationship("Problemas", back_populates="usuario", cascade="all, delete-orphan")


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize_usuario(self):
        return {
            "id": self.id,
            "username": self.username,
            "rol": self.rol
            }
    
class Servicio(db.Model):
    __tablename__= 'servicio'
    id: Mapped[int] = mapped_column(primary_key=True)
    negocio_id:Mapped[int] = mapped_column(ForeignKey("negocio.id"), nullable=False)
    nombre: Mapped[str] = mapped_column(String(75), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500),  nullable=False)
    precio: Mapped[int] = mapped_column(Numeric(10,2), nullable=False)#precio con numeric, pero puede ser con Float o incluso Biginteger
    

    negocio = relationship("Negocio", back_populates="servicios")
    clientes = relationship("Clientes", back_populates="servicio")
    citas = relationship("Citas", back_populates="servicio", cascade="all, delete-orphan")

    def serialize_Servicio(self):
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
    direccion: Mapped[str] = mapped_column(String(255), nullable=True)
    telefono: Mapped[str] = mapped_column(String(15), nullable=False)
    cliente_dni: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    servicio_id: Mapped[int] = mapped_column(ForeignKey("servicio.id"), nullable=True) #nullable true porque puede que un cliente no tenga asignado un sevicio

    servicio = relationship("Servicio", back_populates="clientes")
    notas = relationship("Nota", back_populates="cliente", cascade="all, delete-orphan")#cascade pq las notas en sí depende del cleinte pq son ntoas de cliente
    pagos = relationship("Pagos", back_populates= "cliente", cascade="all, delete-orphan")
    citas = relationship("Citas", back_populates="cliente",cascade="all, delete-orphan")
    historial_servicios = relationship("HistorialDeServicios", back_populates="cliente", cascade="all, delete-orphan")


    def serialize_Cliente(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "direccion": self.direccion,
            "telefono": self.telefono,
            "cliente_dni": self.cliente_dni,
            "email": self.email,
            "servicio": self.servicio.serialize() if self.servicio else None,#para que se muestre en servicio y con if else para que pueda ser "none" si no tiene servicio asignado
            "notas": [nota.serialize() for nota in self.notas], #se serializa el serialize de notas para que este todo relacionado y vinculado correctamente 
        }
class Nota(db.Model):
    __tablename__ = "nota"
    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("clientes.id"), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=False)
#pongo nullable flase para evitar crear una nota vacía por error y que pueda sobrecargar la memoria en si
    cliente = relationship("Clientes", back_populates="notas")
    historial_servicio = relationship("HistorialDeServicios", back_populates="nota")

    def serialize_Nota(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "descripcion": self.descripcion
        }

class Pagos(db.Model):
    __tablename__="pagos"
    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("clientes.id"), nullable=False)
    metodo_pago: Mapped[str] = mapped_column(Enum("efectivo", "tarjeta", name="metodo_pago_enum"), nullable=False)
    total_estimado: Mapped[int] = mapped_column(Numeric(10, 2), nullable=False)
    pagos_realizados: Mapped[int] = mapped_column(Numeric(10, 2), nullable=False, default=0)
    fecha_pago: Mapped[Date] = mapped_column(Date, nullable=True)  # La fecha puede ser nullable si no se paga inmediatamente, aqui presupongo que se pone con cada pago 
    estado:Mapped[str] = mapped_column(Enum("pendiente", "pagado",  name = "estado_enum"), nullable = False, default= "pendiente")
    
    cliente = relationship("Clientes", back_populates="pagos")

    def serialize_Pagos(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "metodo_pago": self.metodo_pago,
            "total_estimado": str(self.total_estimado), #aqui convierte el total estiamdo en String cuando se serializa
            "pagos_realizados": self.pagos_realizados,
            "pagos_pendientes": max(0, self.total_estimado - self.pagos_realizados),
            "fecha_pago": self.fecha_pago.isoformat() if self.fecha_pago else None, #en resumen, el isoformat() convierte la serialización a formato "AÑO-MES-DIA"
            "estado": self.estado
        }
    
class Citas(db.Model):
    __tablename__= "citas"
    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable = False)
    cliente_id:Mapped[int] = mapped_column(ForeignKey("clientes.id"), nullable = False)
    servicio_id: Mapped[int] = mapped_column(ForeignKey("servicio.id"), nullable = False)
    estado: Mapped[str] = mapped_column(Enum("pendiente", "confirmada", "cancelada","realizada", name= "estado_cita"), nullable = False, default = "pendiente")

    usuario = relationship("Usuarios", back_populates="citas")
    cliente = relationship("Clientes", back_populates="citas")
    servicio = relationship("Servicio", back_populates="citas")
    calendario = relationship("Calendario", back_populates="cita", uselist=False)
    historial_servicio = relationship("HistorialDeServicios", back_populates="cita")


    def serialize_Citas(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "cliente_id": self.cliente_id,
            "servicio_id": self.servicio_id,
            "estado": self.estado,
            "calendario": self.calendario.serialize() if self.calendario else None
        }
    
class Calendario(db.Model):
    __tablename__ = "calendario"
    id: Mapped[int] = mapped_column(primary_key=True)
    dia: Mapped[Date] = mapped_column(Date, nullable=False)
    cita_id: Mapped[int] = mapped_column(ForeignKey("citas.id"), nullable=False, unique=True) 

    cita = relationship("Citas", back_populates="calendario")
    problemas = relationship("Problemas", back_populates="calendario", cascade="all, delete-orphan")

    def serialize_Calendario(self):
        return {
            "id": self.id,
            "dia": self.dia.isoformat(),
            "cita_id": self.cita_id
        }
    
class Problemas(db.Model):
    __tablename__ = "problemas"
    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), nullable = False)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=False)
    dia_id: Mapped[int] = mapped_column(ForeignKey("calendario.id"), nullable=False)

    usuario = relationship("Usuarios", back_populates="problemas")
    calendario = relationship("Calendario", back_populates="problemas")

    def serialize_Problemas(self):
        return {
            "id": self.id,
            "id_usuario": self.usuario_id,
            "descripcion": self.descripcion,
            "id_dia": self.dia_id,
        }

class HistorialDeServicios(db.Model):
    __tablename__ = "historial_de_servicio"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("clientes.id"), nullable=False)
    cita_id: Mapped[int] = mapped_column(ForeignKey("citas.id"), nullable=False)
    nota_id: Mapped[int] = mapped_column(ForeignKey("nota.id"), nullable=True)  # Puede no exisitir nota en alguna cita o cliuente 

    cliente = relationship("Clientes", back_populates="historial_servicios")
    cita = relationship("Citas", back_populates="historial_servicio")
    nota = relationship("Nota", back_populates="historial_servicio")

    def serialize_HistorialDeServicios(self):
        return {
            "id": self.id,
            "cliente": self.cliente.serialize() if self.cliente else None,
            "cita": self.cita.serialize() if self.cita else None,
            "nota": self.nota.serialize() if self.nota else None
        }

