from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime , TIMESTAMP , Integer , Date , DECIMAL , ForeignKey
from sqlalchemy.orm import Mapped, mapped_column , relationship
from datetime import datetime , timezone

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    role: Mapped[bool] = mapped_column(Boolean())
    nickname: Mapped[str] = mapped_column(unique=True , nullable=False)
    nombre: Mapped[str] = mapped_column(unique=False , nullable=False)
    apellido: Mapped[str] = mapped_column(unique=False , nullable=False)
    fecha_nacimiento: Mapped[Date] = mapped_column(unique=False , nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    address: Mapped[str] = mapped_column(unique=False , nullable=False)
    telefono: Mapped[int] = mapped_column(unique=True , nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    registro_fecha: Mapped[TIMESTAMP] = mapped_column(Integer())
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    tiendas: Mapped[list['Tienda']] = relationship(back_populates='owner')



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
            # do not serialize the password, its a security breach
        }

class Tienda(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#conectar con id de usuario
    nombre_tienda: Mapped[str] = mapped_column(unique=False , nullable=False)
    descripcion_tienda: Mapped[str] = mapped_column(String(300) , nullable=False , unique=False)
    categoría_principal: Mapped[str] = mapped_column(nullable=False , unique=False)
    telefono_comercial: Mapped[int] = mapped_column(unique=True , nullable=False)
    logo_url: Mapped[str] = mapped_column(String(300),unique=True , nullable=False)
    primary_color: Mapped[bool] = mapped_column(Boolean())
    secondary_color: Mapped[bool] = mapped_column(Boolean())
    text_color: Mapped[bool] = mapped_column(Boolean())
    redes_sociales: Mapped[str] = mapped_column(unique=False , nullable=False)
    fecha_creacion: Mapped[DateTime] = mapped_column(DateTime(),datetime.now(timezone.utc))

    owner: Mapped['User'] = relationship(back_populates='tiendas')


    def serialize(self):
        return{
            "id": self.id,
            "user_id": self.user_id,#acordarse de preguntar esta parte
            "nombre_tienda": self.nombre_tienda,
            "descripcion_tienda": self.descripcion_tienda,
            "categoria_principal": self.categoría_principal,
            "telefono_comercial": self.telefono_comercial,
            "logo_url": self.logo_url,
            "primary_color": self.primary_color,
            "secondary_color": self.secondary_color,
            "text_color": self.text_color,
            "redes_sociales": self.redes_sociales,
            "fecha_creacion": self.fecha_creacion,
        }

class Productos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    tienda_id: Mapped[int] = mapped_column(ForeignKey('tienda.id'))
    nombre_producto: Mapped[str] = mapped_column(unique=False , nullable=False)
    descripcion_producto: Mapped[str] = mapped_column(String(300) , nullable=False , unique=False)
    precio: Mapped[DECIMAL] = mapped_column(nullable=False , unique=False)
    stock: Mapped[int] = mapped_column(nullable=False , unique=False)
    categoría_producto: Mapped[str] = mapped_column(nullable=False , unique=False)
    peso: Mapped[DECIMAL] = mapped_column(nullable=False , unique=False)
    dimensiones: Mapped[str] = mapped_column(nullable=False , unique=False)
    imagenes: Mapped[str] = mapped_column(String(300),unique=True , nullable=False)
    estado: Mapped[str] = mapped_column(unique=True , nullable=False)
    fecha_subida: Mapped[DateTime] = mapped_column(DateTime(),datetime.now(timezone.utc))





    def serialize(self):
        return{
            "id": self.id,
            "tienda_id": self.tienda_id,#acordarse de preguntar esta parte
            "nombre_producto": self.nombre_producto,
            "descripcion_producto": self.descripcion_producto,
            "precio": self.precio,
            "stock": self.stock,
            "categoria_producto": self.categoría_producto,
            "peso": self.peso,
            "dimensiones": self.dimensiones,
            "imagenes": self.imagenes,
            "estado": self.estado,
            "fecha_subida": self.fecha_subida,
        }


class Favoritos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    tienda_id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#conectar con id de usuario
    producto_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))#conectar con id de productos
    fecha: Mapped[DateTime] = mapped_column(DateTime(),datetime.now(timezone.utc))


    def serialize(self):
        return{
            "id": self.id,
            "tienda_id": self.tienda_id,#acordarse de preguntar esta parte
            "user_id": self.user_id,#conectar con id de usuario
            "producto_id": self.producto_id,#conectar con productos id
            "fecha": self.fecha,
        }
    

class Detalles_pedido(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    pedido_id: Mapped[int] = mapped_column(primary_key=True)
    producto_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))#unir a producto
    cantidad: Mapped[int] = mapped_column(primary_key=True)
    precio_unitario: Mapped[DECIMAL] = mapped_column(nullable=False , unique=False)
    subtotal: Mapped[DECIMAL] = mapped_column(nullable=False , unique=False)


    def serialize(self):
        return{
            "id": self.id,
            "pedido_id": self.pedido_id,
            "producto_id": self.producto_id,
            "cantidad": self.cantidad,
            "precio_unitario": self.precio_unitario,
            "subtotal": self.subtotal,
        }


class Notificaciones(db.Model):
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#unir a user
    tipo: Mapped[str] = mapped_column(unique=False , nullable=False)
    mensaje: Mapped[str] = mapped_column(String(300),unique=False,nullable=False)
    leido: Mapped[bool] = mapped_column(Boolean())
    fecha: Mapped[DateTime] = mapped_column(DateTime(),datetime.now(timezone.utc))


    def serialize(self):
        return{
            "user_id": self.user_id,
            "tipo": self.tipo,
            "mensaje": self.mensaje,
            "leido": self.leido,
            "fecha": self.fecha,
        }


class Reseñas(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    producto_id: Mapped[int] = mapped_column(ForeignKey('productos.id'))#unir a product
    cliente_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#unir a user
    estrellas:  Mapped[int] = mapped_column(Integer())
    comentario: Mapped[str] = mapped_column(String(300))
    fecha: Mapped[DateTime] = mapped_column(DateTime(),datetime.now(timezone.utc))
    respuestas: Mapped[str] = mapped_column(String(300))


    def serialize(self):
        return{
            "id": self.id,
            "producto_id": self.producto_id,
            "cliente_id": self.cliente_id,
            "estrellas": self.estrellas,
            "comentario": self.comentario,
            "fecha": self.fecha,
            "respuestas": self.respuestas,
        }

class Historial(db.Model):
    pedido_id: Mapped[int] = mapped_column(ForeignKey('user.id'))#unir a detalles pedido (user = cliente)
    tienda_id: Mapped[int] = mapped_column(ForeignKey('tienda.id'))#unir a tienda id
    total: Mapped[DECIMAL] = mapped_column(DECIMAL(),unique=False,nullable=False)
    gastos_envio: Mapped[DECIMAL] = mapped_column(DECIMAL(),unique=False,nullable=False)
    fecha_pedido: Mapped[DateTime] = mapped_column(DateTime(),datetime.now(timezone.utc))
    direccion: Mapped[str] = mapped_column(String(100),unique=False,nullable=False)
    pago: Mapped[bool] = mapped_column(Boolean())


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