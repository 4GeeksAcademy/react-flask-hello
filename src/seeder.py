
from api.models import db, User, Tienda, Productos, Favoritos, Detalles_pedido, Notificaciones, Resenas, Historial
from datetime import date, datetime, timezone
from app import app
import random

def seed_data():
    db.drop_all()
    db.create_all()

    # === USERS ===
    users = [
        User(
            role=True,
            nickname="admin",
            nombre="Pepe",
            apellido="Lola",
            fecha_nacimiento=date(1990, 5, 17),
            email="admin@example.com",
            address="Calle Sol 123, Sevilla",
            telefono=600111222,
            password="hashed_password",
            registro_fecha=datetime.now(timezone.utc),
            is_active=True
        ),
        User(
            role=False,
            nickname="maria",
            nombre="María",
            apellido="Gómez",
            fecha_nacimiento=date(1995, 3, 22),
            email="maria@example.com",
            address="Av. Andalucía 45, Sevilla",
            telefono=600333444,
            password="hashed_password",
            registro_fecha=datetime.now(timezone.utc),
            is_active=True
        ),
        User(
            role=False,
            nickname="carlos",
            nombre="Carlos",
            apellido="Ole Ole",
            fecha_nacimiento=date(1988, 7, 9),
            email="carlos@example.com",
            address="Calle Luna 9, Sevilla",
            telefono=600555666,
            password="hashed_password",
            registro_fecha=datetime.now(timezone.utc),
            is_active=True
        ),
    ]
    db.session.add_all(users)
    db.session.commit()

    # === TIENDAS ===
    tiendas = [
        Tienda(
            owner_id=users[0].id,
            nombre_tienda="La Bodega del Sur",
            descripcion_tienda="Vinos y productos gourmet del sur de España.",
            categoria_principal="Gastronomía",
            telefono_comercial=955123456,
            logo_url="https://example.com/logos/bodega.png",
            primary_color=True,
            secondary_color=False,
            text_color=True,
            redes_sociales="@labodegadelSur",
            fecha_creacion=datetime.now(timezone.utc)
        ),
        Tienda(
            owner_id=users[1].id,
            nombre_tienda="EcoModa",
            descripcion_tienda="Ropa sostenible hecha con materiales reciclados.",
            categoria_principal="Moda",
            telefono_comercial=955987654,
            logo_url="https://example.com/logos/ecomoda.png",
            primary_color=False,
            secondary_color=True,
            text_color=False,
            redes_sociales="@ecomoda",
            fecha_creacion=datetime.now(timezone.utc)
        ),
        Tienda(
            owner_id=users[2].id,
            nombre_tienda="TechZone",
            descripcion_tienda="Tienda especializada en gadgets y accesorios electrónicos.",
            categoria_principal="Tecnología",
            telefono_comercial=955567890,
            logo_url="https://example.com/logos/techzone.png",
            primary_color=True,
            secondary_color=True,
            text_color=False,
            redes_sociales="@techzone_es",
            fecha_creacion=datetime.now(timezone.utc)
        ),
    ]
    db.session.add_all(tiendas)
    db.session.commit()

    # === PRODUCTOS ===
    productos = []
    for tienda in tiendas:
        for i in range(1, 5):
            productos.append(
                Productos(
                    tienda_id=tienda.id,
                    nombre_producto=f"Producto {i} de {tienda.nombre_tienda}",
                    descripcion_producto="Descripción breve del producto.",
                    precio=random.uniform(10, 200),
                    stock=random.randint(5, 100),
                    categoria_producto=tienda.categoria_principal,
                    peso=random.uniform(0.2, 5.0),
                    dimensiones="10x20x30 cm",
                    imagenes=f"https://example.com/img/producto_{i}_{tienda.id}.png",
                    estado="disponible",
                    fecha_subida=datetime.now(timezone.utc)
                )
            )
    db.session.add_all(productos)
    db.session.commit()

    # === FAVORITOS ===
    favoritos = [
        Favoritos(user_id=users[1].id, producto_id=productos[0].id, tienda_id=tiendas[0].id, fecha=datetime.now(timezone.utc)),
        Favoritos(user_id=users[2].id, producto_id=productos[1].id, tienda_id=tiendas[1].id, fecha=datetime.now(timezone.utc))
    ]
    db.session.add_all(favoritos)
    db.session.commit()

    # === RESEÑAS ===
    resenas = [
        Resenas(
            producto_id=productos[0].id,
            cliente_id=users[1].id,
            estrellas=5,
            comentario="Excelente producto, muy buena calidad.",
            fecha=datetime.now(timezone.utc),
            respuestas="¡Gracias por tu compra!"
        ),
        Resenas(
            producto_id=productos[2].id,
            cliente_id=users[2].id,
            estrellas=4,
            comentario="Buen servicio, aunque tardó un poco el envío.",
            fecha=datetime.now(timezone.utc),
            respuestas="Estamos mejorando los tiempos de entrega."
        ),
    ]
    db.session.add_all(resenas)
    db.session.commit()

    # === NOTIFICACIONES ===
    notificaciones = [
        Notificaciones(user_id=users[1].id, tipo="Pedido", mensaje="Tu pedido ha sido enviado", leido=False, fecha=datetime.now(timezone.utc)),
        Notificaciones(user_id=users[2].id, tipo="Promoción", mensaje="Descuento del 20% en TechZone", leido=True, fecha=datetime.now(timezone.utc))
    ]
    db.session.add_all(notificaciones)
    db.session.commit()

  # --- DETALLES_PEDIDO ---
    detalles = []
    historiales = []

    sample_orders = [
        {"user": users[1], "producto": productos[0], "cantidad": 2},
        {"user": users[2], "producto": productos[3], "cantidad": 1},
        {"user": users[1], "producto": productos[4], "cantidad": 3},
        {"user": users[0], "producto": productos[6], "cantidad": 1},
        {"user": users[2], "producto": productos[8], "cantidad": 2},
        {"user": users[0], "producto": productos[11], "cantidad": 1},
    ]

    for idx, ord in enumerate(sample_orders, start=1):
        precio_unitario = float(ord["producto"].precio)
        cantidad = ord["cantidad"]
        subtotal = round(precio_unitario * cantidad, 2)

        det = Detalles_pedido(
            user_id=ord["user"].id,
            producto_id=ord["producto"].id,
            subtotal=subtotal
        )
        detalles.append(det)

        hist = Historial(
            pedido_id=ord["user"].id,         
            tienda_id=ord["producto"].tienda_id,
            total=subtotal,
            gastos_envio=round(random.uniform(0.0, 10.0), 2),
            fecha_pedido=datetime.now(timezone.utc),
            direccion=ord["user"].address,
            pago=True if random.random() > 0.2 else False
        )
        historiales.append(hist)

    db.session.add_all(detalles)
    db.session.add_all(historiales)
    db.session.commit()

    print("✅ Seeder finalizado: users, tiendas, productos, favoritos, reseñas, notificaciones, detalles_pedido e historial creados.")


if __name__ == "__main__":
    with app.app_context():
        seed_data()
