from werkzeug.security import generate_password_hash
import random

nombres = ["David", "Cristian", "Pere", "María", "Lucía", "Carlos", "Elena", "Jorge", "Marta", "Raúl"]
apellidos = ["Gómez", "Pérez", "Martínez", "Sánchez", "López", "Ruiz", "Torres", "Díaz", "Romero", "Navarro"]
objetivos = ["Perder grasa", "Ganar masa muscular", "Tonificar", "Mejorar resistencia"]
profesiones = ["entrenador", "nutricionista"]
sexos = ["masculino", "femenino", "otro"]
direcciones = [
    "Calle Mayor 12, Madrid", "Av. Andalucía 45, Sevilla", "Calle Colón 7, Valencia",
    "Gran Vía 88, Barcelona", "Paseo de Gracia 5, Barcelona", "Calle Larios 30, Málaga",
    "Av. Constitución 20, Zaragoza", "Calle Uría 10, Oviedo", "Ronda Sant Pere 15, Barcelona",
    "Av. del Oeste 50, Valencia"
]
imagenes = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/men/7.jpg",
    "https://randomuser.me/api/portraits/women/8.jpg"
]

usuarios = []

for i in range(1, 51):
    nombre = random.choice(nombres)
    apellido = random.choice(apellidos)
    sexo = random.choice(sexos)
    direccion = random.choice(direcciones)
    imagen = random.choice(imagenes)

    if i <= 10:
        usuario = {
            "email": f"profesional{i}@example.com",
            "password": generate_password_hash("pepe123"),
            "nombre": nombre,
            "apellido": apellido,
            "sexo": sexo,
            "imagen": imagen,
            "direccion": direccion,
            "experiencia": random.randint(3, 15),
            "telefono": str(600000000 + i),
            "is_professional": True,
            "profession_type": random.choice(profesiones),
            "peso": None,
            "altura": None,
            "objetivo": None
        }
    else:
        usuario = {
            "email": f"usuario{i}@example.com",
            "password": generate_password_hash("pepe123"),
            "nombre": nombre,
            "apellido": apellido,
            "sexo": sexo,
            "imagen": imagen,
            "direccion": direccion,
            "experiencia": random.randint(0, 5),
            "telefono": str(600000000 + i),
            "is_professional": False,
            "profession_type": None,
            "peso": round(random.uniform(55, 90), 1),
            "altura": round(random.uniform(1.55, 1.90), 2),
            "objetivo": random.choice(objetivos)
        }

    usuarios.append(usuario)
