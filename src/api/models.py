from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime , TIMESTAMP , Integer , Date , DECIMAL , ForeignKey, Text, Float
from sqlalchemy.orm import Mapped, mapped_column , relationship
from datetime import datetime , timezone

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    role: Mapped[bool] = mapped_column(Boolean())
    nickname: Mapped[str] = mapped_column(unique=True, nullable=False)
    nombre: Mapped[str] = mapped_column(nullable=False)
    apellido: Mapped[str] = mapped_column(nullable=False)
    fecha_nacimiento: Mapped[datetime] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    address: Mapped[str] = mapped_column(nullable=False)
    telefono: Mapped[int] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    registro_fecha: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    tiendas: Mapped[list['Tienda']] = relationship(back_populates='owner')
    resenas: Mapped[list['Resenas']] = relationship(back_populates='autor')
    favoritos: Mapped[list['Favoritos']] = relationship(back_populates='user')
    pedidos: Mapped[list['Detalles_pedido']] = relationship(back_populates='user')
    notificaciones: Mapped[list['Notificaciones']] = relationship(back_populates='user')



    def serialize(self):
        return {
            "id": self.id,#id debe conectarse con user_id en class tienda
            "role": self.role,
            "nickname": self.nickname,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "fecha_nacimiento": self.fecha_nacimiento,
            "address": self.address,
            "telefono": self.telefono,
            "registro_fecha": self.registro_fecha,
            "email": self.email,
            "pedidos": [p.serialize() for p in self.pedidos] if self.pedidos else None,
            "resenas": [r.serialize for r in self.resenas] if self.resenas else None,
            "favoritos": [f.serialize() for f in self.favoritos] if self.favoritos else None,
            "notificaciones": [n.serialize() for n in self.notificaciones] if self.notificaciones else None,
            # do not serialize the password, its a security breach
        }

class Tienda(db.Model):
    __tablename__="tienda"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre_tienda: Mapped[str] = mapped_column(unique=False , nullable=False)
    descripcion_tienda: Mapped[str] = mapped_column(String(300) , nullable=False , unique=False)
    categoria_principal: Mapped[str] = mapped_column(nullable=False , unique=False)
    telefono_comercial: Mapped[int] = mapped_column(unique=True , nullable=False)
    logo_url: Mapped[str] = mapped_column(String(300),unique=True , nullable=False)
    primary_color: Mapped[str] = mapped_column(String(15), nullable=False , unique=False)
    secondary_color: Mapped[str] = mapped_column(String(15), nullable=False , unique=False)
    text_color: Mapped[str] = mapped_column(String(15), nullable=False , unique=False)
    redes_sociales: Mapped[str] = mapped_column(unique=False , nullable=False)
    fecha_creacion: Mapped[TIMESTAMP] = mapped_column(DateTime(), default=datetime.now(timezone.utc))

    owner_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    owner: Mapped['User'] = relationship(back_populates='tiendas')

    productos: Mapped[list['Productos']] = relationship(back_populates='tienda')
    favoritos: Mapped['Favoritos'] = relationship(back_populates='tienda')

    historial_tienda: Mapped[list['Historial']] = relationship(back_populates='tienda')


    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,#acordarse de preguntar esta parte
            "nombre_tienda": self.nombre_tienda,
            "descripcion_tienda": self.descripcion_tienda,
            "categoria_principal": self.categoria_principal,
            "telefono_comercial": self.telefono_comercial,
            "logo_url": self.logo_url,
            "primary_color": self.primary_color,
            "secondary_color": self.secondary_color,
            "text_color": self.text_color,
            "redes_sociales": self.redes_sociales,
            "fecha_creacion": self.fecha_creacion,
        }

class Productos(db.Model):
    __tablename__="productos"
    id: Mapped[int] = mapped_column(primary_key=True)
    tienda_id: Mapped[int] = mapped_column(ForeignKey('tienda.id'))
    nombre_producto: Mapped[str] = mapped_column(unique=False , nullable=False)
    descripcion_producto: Mapped[str] = mapped_column(String(300) , nullable=False , unique=False)
    precio: Mapped[float] = mapped_column(Float(), nullable=False , unique=False, default=0.0)
    stock: Mapped[int] = mapped_column(nullable=False , unique=False)
    categoria_producto: Mapped[str] = mapped_column(nullable=False , unique=False)
    peso: Mapped[float] = mapped_column(nullable=False , unique=False, default=0.0)
    dimensiones: Mapped[str] = mapped_column(nullable=False , unique=False)
    imagenes: Mapped[str] = mapped_column(String(300),unique=True , nullable=False)
    estado: Mapped[str] = mapped_column(unique=False , nullable=False)
    fecha_subida:  Mapped[TIMESTAMP] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    
    tienda_id: Mapped[int] = mapped_column(ForeignKey('tienda.id'))
    tienda: Mapped['Tienda'] = relationship(back_populates='productos', uselist=False)

    resenas: Mapped[list['Resenas']] = relationship(back_populates='producto')
    favoritos: Mapped['Favoritos'] = relationship(back_populates='producto')

    pedidos: Mapped['Detalles_pedido'] = relationship(back_populates="productos")



    def serialize(self):
        return{
            "id": self.id,
            "tienda_id": self.tienda_id,#acordarse de preguntar esta parte
            "nombre_producto": self.nombre_producto,
            "descripcion_producto": self.descripcion_producto,
            "precio": self.precio,
            "stock": self.stock,
            "categoria_producto": self.categoria_producto,
            "peso": self.peso,
            "dimensiones": self.dimensiones,
            "imagenes": self.imagenes,
            "estado": self.estado,
            "fecha_subida": self.fecha_subida,
            "tienda": {"nombre": self.tienda.nombre_tienda} if self.tienda else None, #cuando es UN solo objeto, podemos acceder directamente a sus propiedades
            "resenas": [r.serialize() for r in self.resenas] if self.resenas else None #cada vez que sea una lista de objetos, tenemos que hacer loop para serializar cada objeto.
        }


class Favoritos(db.Model):
    __tablename__="favoritos"
    id: Mapped[int] = mapped_column(primary_key=True)
   
    fecha: Mapped[TIMESTAMP] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    
    tienda_id: Mapped[int] = mapped_column(ForeignKey('tienda.id'))#conectar con id de tienda
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#conectar con id de usuario
    producto_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))#conectar con id de productos
    tienda: Mapped['Tienda'] = relationship(back_populates='favoritos')
    user: Mapped['User'] = relationship(back_populates='favoritos')
    producto:  Mapped['Productos'] = relationship(back_populates='favoritos')


    def serialize(self):
        return{
            "id": self.id,
            "tienda_id": self.tienda_id,#acordarse de preguntar esta parte
            "user_id": self.user_id,#conectar con id de usuario
            "producto_id": self.producto_id,#conectar con productos id
            "fecha": self.fecha,
            "producto": {"nombre_producto": self.producto.nombre_producto} if self.producto else None
        }
    

class Detalles_pedido(db.Model):
    __tablename__="detalles_pedido"
    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] =  mapped_column(ForeignKey('user.id'))#unir a producto
    user: Mapped['User'] = relationship(back_populates="pedidos")

    producto_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))#unir a producto
    productos: Mapped[list['Productos']] = relationship(back_populates="pedidos")
    subtotal: Mapped[float] = mapped_column(nullable=False , unique=False)
    
    historial_pedido: Mapped[list['Historial']] = relationship(back_populates='pedido')

    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "producto_id": self.producto_id,
            "user": {"email": self.user.email} if self.user else None,
            "productos": [p.serialize() for p in self.productos] if self.productos else None,
            "subtotal": self.subtotal,
        }


class Notificaciones(db.Model):
    __tablename__="notificaciones"
    id: Mapped[int] = mapped_column(primary_key=True)
    
    tipo: Mapped[str] = mapped_column(unique=False , nullable=False)
    mensaje: Mapped[str] = mapped_column(String(300),unique=False,nullable=False)
    leido: Mapped[bool] = mapped_column(Boolean())
    fecha: Mapped[TIMESTAMP] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))

    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#unir a user
    user: Mapped['User'] = relationship(back_populates="notificaciones")

    def serialize(self):
        return{
            "user_id": self.user_id,
            "tipo": self.tipo,
            "mensaje": self.mensaje,
            "leido": self.leido,
            "fecha": self.fecha,
            "user": {"email": self.user.email, "id": self.user.id} if self.user else None
        }


class Resenas(db.Model):
    __tablename__="resenas"
    id: Mapped[int] = mapped_column(primary_key=True)
    estrellas:  Mapped[int] = mapped_column(Integer())
    comentario: Mapped[str] = mapped_column(Text())
    fecha: Mapped[TIMESTAMP] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    respuestas: Mapped[str] = mapped_column(Text())


    cliente_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#unir a user
    autor: Mapped['User'] = relationship(back_populates='resenas')
    producto_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))#unir a product
    producto: Mapped['Productos'] = relationship(back_populates='resenas')

    def serialize(self):
        return{
            "id": self.id,
            "producto_id": self.producto_id,
            "cliente_id": self.cliente_id,
            "estrellas": self.estrellas,
            "comentario": self.comentario,
            "fecha": self.fecha,
            "respuestas": self.respuestas,
            "producto": {"nombre_producto": self.producto.nombre_producto} if self.producto else None
        }

class Historial(db.Model):
    __tablename__="historial"
    id: Mapped[int] = mapped_column(primary_key=True)
    total: Mapped[float] = mapped_column(unique=False,nullable=False, default=0.0)
    gastos_envio: Mapped[float] = mapped_column(unique=False,nullable=False, default=0.0)
    fecha_pedido: Mapped[TIMESTAMP] = mapped_column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    direccion: Mapped[str] = mapped_column(String(100),unique=False,nullable=False)
    pago: Mapped[bool] = mapped_column(Boolean())

    pedido_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#unir a detalles pedido (user = cliente)
    pedido: Mapped['Detalles_pedido'] = relationship(back_populates='historial_pedido')
    
    
    tienda_id: Mapped[int] = mapped_column(ForeignKey('tienda.id'))#unir a tienda id
    tienda: Mapped['Tienda'] = relationship(back_populates='historial_tienda')


    def serialize(self):
        return{
            "pedido_id": self.pedido_id,
            "tienda_id": self.tienda_id,
            "total": self.total,
            "gastos_envio": self.gastos_envio,
            "fecha_pedido": self.fecha_pedido,
            "direccion": self.direccion,
            "pago": self.pago,
        }