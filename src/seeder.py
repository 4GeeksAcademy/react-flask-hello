from datetime import datetime, timedelta
from app import app
from api.models import db, User, PlanTemplate, TemplateItem, PlanTemplateItem, SubscriptionPlan, Subscription, Payment, Event, EventSignup, SupportTicket
from werkzeug.security import generate_password_hash, check_password_hash
import os

with app.app_context():
    # Borra todo
    db.drop_all()
    db.create_all()

# === PROFESIONALES ===

user1 = User(
    email="porcelleticia@macias-campillo.com",
    password=generate_password_hash('pepe123'),
    nombre="Ámbar",
    apellido="Sureda",
    experiencia=7,
    is_professional=True,
    telefono=615531759,
    profession_type="nutricionista"
)

user2 = User(
    email="menendezfelicidad@berrocal-rios.com",
    password=generate_password_hash('pepe123'),
    nombre="Joaquina",
    apellido="Aguirre",
    experiencia=7,
    is_professional=True,
    telefono=694949276,
    profession_type="entrenador"
)

user3 = User(
    email="mollcarlos@alcazar.es",
    password=generate_password_hash('pepe123'),
    nombre="Ricarda",
    apellido="Campos",
    experiencia=2,
    is_professional=True,
    telefono=682928560,
    profession_type="entrenador"
)

user4 = User(
    email="ygallart@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Selena",
    apellido="Salvador",
    experiencia=1,
    is_professional=True,
    telefono=620319194,
    profession_type="nutricionista"
)

user5 = User(
    email="veronicajara@vara-pla.com",
    password=generate_password_hash('pepe123'),
    nombre="Cristina",
    apellido="Bolaños",
    experiencia=10,
    is_professional=True,
    telefono=630438603,
    profession_type="entrenador"
)

user6 = User(
    email="simonlapiedra@aol.com",
    password=generate_password_hash('pepe123'),
    nombre="Salvador",
    apellido="Fernández",
    experiencia=9,
    is_professional=True,
    telefono=661263731,
    profession_type="entrenador"
)

user7 = User(
    email="mariemorell@cruz.org",
    password=generate_password_hash('pepe123'),
    nombre="Hugo",
    apellido="Sancho",
    experiencia=4,
    is_professional=True,
    telefono=698439605,
    profession_type="nutricionista"
)

user8 = User(
    email="albertosole@outlook.com",
    password=generate_password_hash('pepe123'),
    nombre="Isaac",
    apellido="Pérez",
    experiencia=8,
    is_professional=True,
    telefono=644392209,
    profession_type="nutricionista"
)

user9 = User(
    email="berzosaandoni@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Tamara",
    apellido="Navarro",
    experiencia=6,
    is_professional=True,
    telefono=669284113,
    profession_type="entrenador"
)

user10 = User(
    email="luciapuig@castro-marin.org",
    password=generate_password_hash('pepe123'),
    nombre="Lucía",
    apellido="Puig",
    experiencia=3,
    is_professional=True,
    telefono=685726001,
    profession_type="nutricionista"
)
# === PLANES ===
plan = PlanTemplate(
    user_id=user2.id,
    plan_type="entrenamiento",
    nombre="Fuerza Inicial",
    description="Rutina para principiantes enfocada en fuerza"
)# === USUARIOS NORMALES ===

user11 = User(
    email="patriciabellido@correo.es",
    password=generate_password_hash('pepe123'),
    nombre="Patricia",
    apellido="Bellido",
    experiencia=6,
    is_professional=False,
    peso=68.7,
    altura=1.64,
    objetivo="Tonificar"
)

user12 = User(
    email="joseluisbenet@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="José Luis",
    apellido="Benet",
    experiencia=2,
    is_professional=False,
    peso=81.2,
    altura=1.78,
    objetivo="Perder grasa"
)

user13 = User(
    email="lauraruiz@outlook.com",
    password=generate_password_hash('pepe123'),
    nombre="Laura",
    apellido="Ruiz",
    experiencia=5,
    is_professional=False,
    peso=56.4,
    altura=1.62,
    objetivo="Mejorar resistencia"
)

user14 = User(
    email="carlosprieto@alba.com",
    password=generate_password_hash('pepe123'),
    nombre="Carlos",
    apellido="Prieto",
    experiencia=3,
    is_professional=False,
    peso=73.8,
    altura=1.70,
    objetivo="Ganar masa muscular"
)

user15 = User(
    email="martamorales@mixmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Marta",
    apellido="Morales",
    experiencia=4,
    is_professional=False,
    peso=60.1,
    altura=1.66,
    objetivo="Tonificar"
)

user16 = User(
    email="franciscogil@terra.es",
    password=generate_password_hash('pepe123'),
    nombre="Francisco",
    apellido="Gil",
    experiencia=1,
    is_professional=False,
    peso=85.3,
    altura=1.80,
    objetivo="Perder grasa"
)

user17 = User(
    email="veronicapascual@yahoo.es",
    password=generate_password_hash('pepe123'),
    nombre="Verónica",
    apellido="Pascual",
    experiencia=2,
    is_professional=False,
    peso=63.2,
    altura=1.68,
    objetivo="Mejorar resistencia"
)

user18 = User(
    email="miguelherrera@hotmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Miguel",
    apellido="Herrera",
    experiencia=5,
    is_professional=False,
    peso=77.0,
    altura=1.75,
    objetivo="Ganar masa muscular"
)

user19 = User(
    email="saraperez@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Sara",
    apellido="Pérez",
    experiencia=3,
    is_professional=False,
    peso=59.5,
    altura=1.63,
    objetivo="Tonificar"
)

user20 = User(
    email="javierlopez@live.com",
    password=generate_password_hash('pepe123'),
    nombre="Javier",
    apellido="López",
    experiencia=7,
    is_professional=False,
    peso=82.4,
    altura=1.82,
    objetivo="Ganar masa muscular"
)
user21 = User(
    email="mariadelmar@correo.es",
    password=generate_password_hash('pepe123'),
    nombre="María del Mar",
    apellido="Ramírez",
    experiencia=2,
    is_professional=False,
    peso=58.9,
    altura=1.60,
    objetivo="Perder grasa"
)

user22 = User(
    email="danielcastillo@aol.com",
    password=generate_password_hash('pepe123'),
    nombre="Daniel",
    apellido="Castillo",
    experiencia=4,
    is_professional=False,
    peso=79.6,
    altura=1.76,
    objetivo="Tonificar"
)

user23 = User(
    email="cristinagomez@mixmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Cristina",
    apellido="Gómez",
    experiencia=6,
    is_professional=False,
    peso=64.3,
    altura=1.67,
    objetivo="Mejorar resistencia"
)

user24 = User(
    email="raulgonzalez@outlook.com",
    password=generate_password_hash('pepe123'),
    nombre="Raúl",
    apellido="González",
    experiencia=3,
    is_professional=False,
    peso=74.2,
    altura=1.74,
    objetivo="Ganar masa muscular"
)

user25 = User(
    email="aliciamartin@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Alicia",
    apellido="Martín",
    experiencia=2,
    is_professional=False,
    peso=61.0,
    altura=1.61,
    objetivo="Tonificar"
)

user26 = User(
    email="ignaciotorres@yahoo.es",
    password=generate_password_hash('pepe123'),
    nombre="Ignacio",
    apellido="Torres",
    experiencia=1,
    is_professional=False,
    peso=88.5,
    altura=1.83,
    objetivo="Perder grasa"
)

user27 = User(
    email="rociosaez@terra.es",
    password=generate_password_hash('pepe123'),
    nombre="Rocío",
    apellido="Saez",
    experiencia=5,
    is_professional=False,
    peso=60.8,
    altura=1.65,
    objetivo="Tonificar"
)

user28 = User(
    email="pedrosantos@alba.com",
    password=generate_password_hash('pepe123'),
    nombre="Pedro",
    apellido="Santos",
    experiencia=2,
    is_professional=False,
    peso=80.9,
    altura=1.77,
    objetivo="Ganar masa muscular"
)

user29 = User(
    email="beatrizfernandez@correo.es",
    password=generate_password_hash('pepe123'),
    nombre="Beatriz",
    apellido="Fernández",
    experiencia=4,
    is_professional=False,
    peso=57.6,
    altura=1.59,
    objetivo="Mejorar resistencia"
)

user30 = User(
    email="ramonrodriguez@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Ramón",
    apellido="Rodríguez",
    experiencia=6,
    is_professional=False,
    peso=76.7,
    altura=1.73,
    objetivo="Tonificar"
)
user31 = User(
    email="nuriadiaz@outlook.com",
    password=generate_password_hash('pepe123'),
    nombre="Nuria",
    apellido="Díaz",
    experiencia=3,
    is_professional=False,
    peso=62.1,
    altura=1.64,
    objetivo="Perder grasa"
)

user32 = User(
    email="sergioperez@yahoo.es",
    password=generate_password_hash('pepe123'),
    nombre="Sergio",
    apellido="Pérez",
    experiencia=2,
    is_professional=False,
    peso=78.4,
    altura=1.79,
    objetivo="Tonificar"
)

user33 = User(
    email="elenalopez@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Elena",
    apellido="López",
    experiencia=4,
    is_professional=False,
    peso=59.0,
    altura=1.62,
    objetivo="Mejorar resistencia"
)

user34 = User(
    email="adriangarcia@correo.es",
    password=generate_password_hash('pepe123'),
    nombre="Adrián",
    apellido="García",
    experiencia=5,
    is_professional=False,
    peso=82.6,
    altura=1.80,
    objetivo="Ganar masa muscular"
)

user35 = User(
    email="sandrapozo@mixmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Sandra",
    apellido="Pozo",
    experiencia=1,
    is_professional=False,
    peso=60.2,
    altura=1.65,
    objetivo="Tonificar"
)

user36 = User(
    email="alvarovidal@terra.es",
    password=generate_password_hash('pepe123'),
    nombre="Álvaro",
    apellido="Vidal",
    experiencia=3,
    is_professional=False,
    peso=86.3,
    altura=1.81,
    objetivo="Perder grasa"
)

user37 = User(
    email="raquelnavarro@hotmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Raquel",
    apellido="Navarro",
    experiencia=2,
    is_professional=False,
    peso=64.5,
    altura=1.68,
    objetivo="Mejorar resistencia"
)

user38 = User(
    email="manuelfernandez@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Manuel",
    apellido="Fernández",
    experiencia=6,
    is_professional=False,
    peso=75.1,
    altura=1.74,
    objetivo="Tonificar"
)

user39 = User(
    email="paulamartinez@live.com",
    password=generate_password_hash('pepe123'),
    nombre="Paula",
    apellido="Martínez",
    experiencia=4,
    is_professional=False,
    peso=58.0,
    altura=1.60,
    objetivo="Ganar masa muscular"
)

user40 = User(
    email="davidserrano@alba.com",
    password=generate_password_hash('pepe123'),
    nombre="David",
    apellido="Serrano",
    experiencia=5,
    is_professional=False,
    peso=79.7,
    altura=1.78,
    objetivo="Tonificar"
)

user41 = User(
    email="carolinamoya@correo.es",
    password=generate_password_hash('pepe123'),
    nombre="Carolina",
    apellido="Moya",
    experiencia=3,
    is_professional=False,
    peso=62.8,
    altura=1.66,
    objetivo="Perder grasa"
)

user42 = User(
    email="ivangarcia@aol.com",
    password=generate_password_hash('pepe123'),
    nombre="Iván",
    apellido="García",
    experiencia=1,
    is_professional=False,
    peso=83.2,
    altura=1.79,
    objetivo="Tonificar"
)

user43 = User(
    email="aliciaruiz@terra.es",
    password=generate_password_hash('pepe123'),
    nombre="Alicia",
    apellido="Ruiz",
    experiencia=4,
    is_professional=False,
    peso=59.9,
    altura=1.63,
    objetivo="Mejorar resistencia"
)

user44 = User(
    email="juanmartin@outlook.com",
    password=generate_password_hash('pepe123'),
    nombre="Juan",
    apellido="Martín",
    experiencia=2,
    is_professional=False,
    peso=81.0,
    altura=1.76,
    objetivo="Ganar masa muscular"
)

user45 = User(
    email="irenemendez@gmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Irene",
    apellido="Méndez",
    experiencia=3,
    is_professional=False,
    peso=60.7,
    altura=1.61,
    objetivo="Tonificar"
)

user46 = User(
    email="cristianfernandez@yahoo.es",
    password=generate_password_hash('pepe123'),
    nombre="Cristian",
    apellido="Fernández",
    experiencia=5,
    is_professional=False,
    peso=77.8,
    altura=1.75,
    objetivo="Perder grasa"
)

user47 = User(
    email="saragomez@live.com",
    password=generate_password_hash('pepe123'),
    nombre="Sara",
    apellido="Gómez",
    experiencia=4,
    is_professional=False,
    peso=63.4,
    altura=1.64,
    objetivo="Tonificar"
)

user48 = User(
    email="victorcampos@hotmail.com",
    password=generate_password_hash('pepe123'),
    nombre="Víctor",
    apellido="Campos",
    experiencia=6,
    is_professional=False,
    peso=84.6,
    altura=1.82,
    objetivo="Ganar masa muscular"
)

user49 = User(
    email="angelafernandez@correo.es",
    password=generate_password_hash('pepe123'),
    nombre="Ángela",
    apellido="Fernández",
    experiencia=2,
    is_professional=False,
    peso=61.9,
    altura=1.62,
    objetivo="Mejorar resistencia"
)

user50 = User(
    email="joseramirez@alba.com",
    password=generate_password_hash('pepe123'),
    nombre="José",
    apellido="Ramírez",
    experiencia=3,
    is_professional=False,
    peso=78.9,
    altura=1.78,
    objetivo="Tonificar"
)



db.session.add(plan)
db.session.commit()

# === ITEMS ===
item1 = TemplateItem(
    item_type="exercise",
    nombre="Sentadilla",
    muscle_group="Piernas",
    series=4,
    calorias=100,
    proteinas=20,
    repeticiones=12,
    grasas=5,
    meal_momento="desayuno",
    cantidad=1,
    carbohidratos=30,
    orden=1,
    creator_id=user2.id
)

item2 = TemplateItem(
    item_type="exercise",
    nombre="Press Banca",
    muscle_group="Pecho",
    series=3,
    calorias=100,
    carbohidratos=30,
    meal_momento="desayuno",
    proteinas=20,
    cantidad=1,
    repeticiones=10,
    grasas=5,
    orden=2,
    creator_id=user2.id

)

db.session.add_all([item1, item2])
db.session.commit()

# === ASOCIACIÓN PLAN <-> ITEMS ===
pti1 = PlanTemplateItem(plan_template_id=plan.id,
                        template_item_id=item1.id, orden=1)
pti2 = PlanTemplateItem(plan_template_id=plan.id,
                        template_item_id=item2.id, orden=2)
db.session.add_all([pti1, pti2])
db.session.commit()

# === SUBSCRIPTION PLANS ===
basic_plan = SubscriptionPlan(
    name="Básico",
    price=45.00,
    duration_month=1,
    description="Acceso a planes y eventos",
    price_id=os.getenv("VITE_BASIC_PRICE_ID")
)

premium_plan = SubscriptionPlan(
    name="Premium",
    price=55.00,
    duration_month=1,
    description="Acceso completo + contacto directo con profesionales",
    price_id=os.getenv("VITE_PREMIUM_PRICE_ID")
)
dmpc_plan = SubscriptionPlan(
    name="Dmpc",
    price=65.00,
    duration_month=1,
    description="Acceso completo + contacto directo con profesionales",
    price_id=os.getenv("VITE_DMPC_PRICE_ID")
)

db.session.add_all([basic_plan, premium_plan, dmpc_plan])
db.session.commit()

# === SUBSCRIPTION ===
sub = Subscription(
    user_id=user1.id,
    subscription_plan_id=basic_plan.id,
    start_date=datetime.utcnow().date(),
    end_date=(datetime.utcnow() + timedelta(days=30)).date(),
    status="activa"
)

db.session.add(sub)
db.session.commit()

# === PAYMENTS ===
payment = Payment(
    subscription_id=sub.id,
    amount=19.99,
    method="tarjeta",
    status="pagado"
)

db.session.add(payment)
db.session.commit()

# === EVENTS ===
event = Event(
    nombre="Bootcamp en el parque",
    creator_id=user2.id,
    description="Entrenamiento funcional al aire libre",
    fecha_inicio=datetime.utcnow() + timedelta(days=2),
    fecha_fin=datetime.utcnow() + timedelta(days=2, hours=2),
    ubicacion="Parque Central",
    capacidad=20
)

db.session.add(event)
db.session.commit()

# === SIGNUP ===
signup = EventSignup(
    event_id=event.id,
    user_id=user1.id,
    estado="confirmado"
)

db.session.add(signup)
db.session.commit()

# === TICKET ===
ticket = SupportTicket(
    user_id=user1.id,
    asunto="Error al acceder al plan",
    mensaje="No puedo ver el contenido del plan 'Fuerza Inicial'.",
)

db.session.add(ticket)
db.session.commit()

print("Base de datos poblada con datos de ejemplo.")
