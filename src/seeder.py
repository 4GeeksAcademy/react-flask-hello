# -*- coding: utf-8 -*-
from datetime import datetime, timedelta
from src.app import app
from src.api.models import db, User, PlanTemplate, TemplateItem, PlanTemplateItem, SubscriptionPlan, Subscription, Payment, Event, EventSignup, SupportTicket
from werkzeug.security import generate_password_hash
import os

with app.app_context():
    db.drop_all()
    db.create_all()

    # === USUARIOS ===
user1 = User(
    email="rita.estrada@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Rita",
    apellido="Estrada",
    experiencia=9,
    is_professional=True,
    telefono="613012963",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/1.jpg",
    direccion="Cuesta Leyre Orozco 81, Navarra, 52730",
    peso=92.8,
    altura=1.76,
    objetivo="Perder grasa", profession_type='entrenador')

user2 = User(
    email="josé ángel.varela@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="José Ángel",
    apellido="Varela",
    experiencia=5,
    is_professional=True,
    telefono="647093015",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/2.jpg",
    direccion="Calle de Mariana Llorens 271, Córdoba, 18214",
    peso=66.4,
    altura=1.69,
    objetivo="Mejorar resistencia", profession_type='entrenador')

user3 = User(
    email="isidora.gutierrez@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Isidora",
    apellido="Gutierrez",
    experiencia=6,
    is_professional=True,
    telefono="684139546",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/3.jpg",
    direccion="Camino de Inocencio Ballesteros 44 Piso 2 , Salamanca, 10614",
    peso=55.9,
    altura=1.63,
    objetivo="Tonificar", profession_type='entrenador')

user4 = User(
    email="glauco.aller@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Glauco",
    apellido="Aller",
    experiencia=7,
    is_professional=True,
    telefono="658873937",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/4.jpg",
    direccion="Alameda de Valentina Torres 9 Puerta 3 , Soria, 16907",
    peso=95.0,
    altura=1.75,
    objetivo="Mejorar resistencia", profession_type='entrenador')

user5 = User(
    email="berta.font@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Berta",
    apellido="Font",
    experiencia=10,
    is_professional=True,
    telefono="632648215",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/5.jpg",
    direccion="Vial de Sergio Real 3, Girona, 76525",
    peso=71.4,
    altura=1.72,
    objetivo="Tonificar", profession_type='entrenador')

user6 = User(
    email="baldomero.campos@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Baldomero",
    apellido="Campos",
    experiencia=2,
    is_professional=True,
    telefono="629688300",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/6.jpg",
    direccion="Urbanización de Vidal Tudela 9, Cantabria, 08153",
    peso=69.0,
    altura=1.72,
    objetivo="Mejorar resistencia", profession_type='entrenador')

user7 = User(
    email="florencia.amores@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Florencia",
    apellido="Amores",
    experiencia=4,
    is_professional=True,
    telefono="698839401",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/7.jpg",
    direccion="C. de Caridad Parra 300, Murcia, 46510",
    peso=83.0,
    altura=1.65,
    objetivo="Ganar masa muscular", profession_type='entrenador')

user8 = User(
    email="lalo.andres@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Lalo",
    apellido="Andres",
    experiencia=10,
    is_professional=True,
    telefono="686700300",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/8.jpg",
    direccion="Glorieta de Plácido Bernat 419 Piso 6 , Albacete, 92057",
    peso=59.1,
    altura=1.64,
    objetivo="Ganar masa muscular", profession_type='entrenador')

user9 = User(
    email="leyre.hoz@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Leyre",
    apellido="Hoz",
    experiencia=6,
    is_professional=True,
    telefono="630552482",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/9.jpg",
    direccion="Calle Leocadia Patiño 94, Lleida, 00508",
    peso=92.4,
    altura=1.59,
    objetivo="Perder grasa", profession_type='entrenador')

user10 = User(
    email="marcelino.roma@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Marcelino",
    apellido="Roma",
    experiencia=3,
    is_professional=True,
    telefono="683947950",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/10.jpg",
    direccion="Vial de Marcio Sureda 716 Piso 3 , Jaén, 81378",
    peso=72.4,
    altura=1.65,
    objetivo="Perder grasa", profession_type='entrenador')

user11 = User(
    email="borja.cañas@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Borja",
    apellido="Cañas",
    experiencia=2,
    is_professional=False,
    telefono="688402516",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/11.jpg",
    direccion="Avenida de Teodoro Sureda 82, Asturias, 21266",
    peso=90.9,
    altura=1.62,
    objetivo="Ganar masa muscular"
)

user12 = User(
    email="graciana.romero@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Graciana",
    apellido="Romero",
    experiencia=10,
    is_professional=False,
    telefono="667115313",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/12.jpg",
    direccion="Urbanización Alba Álvarez 781 Apt. 75 , Granada, 20232",
    peso=62.0,
    altura=1.73,
    objetivo="Mejorar resistencia"
)

user13 = User(
    email="piedad.terrón@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Piedad",
    apellido="Terrón",
    experiencia=4,
    is_professional=False,
    telefono="673631123",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/13.jpg",
    direccion="Urbanización de Hernando Pareja 90 Apt. 90 , Teruel, 74740",
    peso=92.2,
    altura=1.65,
    objetivo="Ganar masa muscular"
)

user14 = User(
    email="ciríaco.escobar@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Ciríaco",
    apellido="Escobar",
    experiencia=8,
    is_professional=False,
    telefono="639213458",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/14.jpg",
    direccion="Acceso Lorenzo Cerdá 315, Teruel, 75336",
    peso=72.9,
    altura=1.65,
    objetivo="Tonificar"
)

user15 = User(
    email="brunilda.burgos@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Brunilda",
    apellido="Burgos",
    experiencia=5,
    is_professional=False,
    telefono="687399329",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/15.jpg",
    direccion="Pasaje de Amaro Mariscal 89 Apt. 37 , Valencia, 12823",
    peso=65.2,
    altura=1.8,
    objetivo="Tonificar"
)

user16 = User(
    email="dan.batalla@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Dan",
    apellido="Batalla",
    experiencia=8,
    is_professional=False,
    telefono="688759190",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/16.jpg",
    direccion="Pasadizo de Reinaldo Baños 3 Puerta 3 , Navarra, 88120",
    peso=69.8,
    altura=1.62,
    objetivo="Perder grasa"
)

user17 = User(
    email="maite.echevarría@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Maite",
    apellido="Echevarría",
    experiencia=2,
    is_professional=False,
    telefono="664185051",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/17.jpg",
    direccion="Camino Estela Contreras 30, La Rioja, 89778",
    peso=60.0,
    altura=1.83,
    objetivo="Mejorar resistencia"
)

user18 = User(
    email="fátima.miranda@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Fátima",
    apellido="Miranda",
    experiencia=1,
    is_professional=False,
    telefono="676876111",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/18.jpg",
    direccion="Pasaje Dan Vidal 9, Lleida, 87348",
    peso=63.6,
    altura=1.78,
    objetivo="Ganar masa muscular"
)

user19 = User(
    email="nuria.almazán@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Nuria",
    apellido="Almazán",
    experiencia=3,
    is_professional=False,
    telefono="674346014",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/19.jpg",
    direccion="Pasadizo Teodosio Puig 21 Piso 6 , Asturias, 21084",
    peso=68.1,
    altura=1.57,
    objetivo="Mejorar resistencia"
)

user20 = User(
    email="victor.guardiola@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Victor",
    apellido="Guardiola",
    experiencia=4,
    is_professional=False,
    telefono="679283218",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/20.jpg",
    direccion="Acceso de Florentina Pereira 630 Apt. 45 , Huelva, 72806",
    peso=66.8,
    altura=1.61,
    objetivo="Mejorar resistencia"
)

user21 = User(
    email="teo.galan@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Teo",
    apellido="Galan",
    experiencia=6,
    is_professional=False,
    telefono="623083707",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/21.jpg",
    direccion="Avenida de Brígida Lumbreras 577 Piso 5 , Soria, 02084",
    peso=59.7,
    altura=1.79,
    objetivo="Tonificar"
)

user22 = User(
    email="eulalia.revilla@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Eulalia",
    apellido="Revilla",
    experiencia=5,
    is_professional=False,
    telefono="684982636",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/22.jpg",
    direccion="Cuesta Evaristo Nebot 948 Piso 2 , Cáceres, 38739",
    peso=63.7,
    altura=1.6,
    objetivo="Tonificar"
)

user23 = User(
    email="luna.marcos@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Luna",
    apellido="Marcos",
    experiencia=4,
    is_professional=False,
    telefono="665384079",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/23.jpg",
    direccion="Alameda Marcelo Carrera 21 Puerta 3 , Jaén, 37170",
    peso=69.1,
    altura=1.69,
    objetivo="Perder grasa"
)

user24 = User(
    email="apolonia.asensio@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Apolonia",
    apellido="Asensio",
    experiencia=4,
    is_professional=False,
    telefono="613396590",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/24.jpg",
    direccion="Urbanización Apolinar Osorio 13, Córdoba, 58543",
    peso=56.9,
    altura=1.88,
    objetivo="Tonificar"
)

user25 = User(
    email="damián.carrasco@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Damián",
    apellido="Carrasco",
    experiencia=4,
    is_professional=False,
    telefono="613285596",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/25.jpg",
    direccion="Pasaje Rubén Guillen 77, Salamanca, 15944",
    peso=92.3,
    altura=1.87,
    objetivo="Perder grasa"
)

user26 = User(
    email="guillermo.infante@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Guillermo",
    apellido="Infante",
    experiencia=2,
    is_professional=False,
    telefono="663494115",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/26.jpg",
    direccion="Acceso Ana Belén Vélez 45 Apt. 95 , Pontevedra, 50820",
    peso=84.9,
    altura=1.65,
    objetivo="Perder grasa"
)

user27 = User(
    email="paulina.anglada@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Paulina",
    apellido="Anglada",
    experiencia=8,
    is_professional=False,
    telefono="679422287",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/27.jpg",
    direccion="Pasadizo Teófilo Simó 372, Tarragona, 24796",
    peso=55.4,
    altura=1.57,
    objetivo="Ganar masa muscular"
)

user28 = User(
    email="bernardino.sotelo@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Bernardino",
    apellido="Sotelo",
    experiencia=6,
    is_professional=False,
    telefono="620251752",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/28.jpg",
    direccion="C. de Saturnino Amores 2, Albacete, 74004",
    peso=90.5,
    altura=1.59,
    objetivo="Ganar masa muscular"
)

user29 = User(
    email="leandra.chamorro@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Leandra",
    apellido="Chamorro",
    experiencia=9,
    is_professional=False,
    telefono="628326163",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/29.jpg",
    direccion="Ronda Teófilo Ortiz 11, Albacete, 08588",
    peso=82.4,
    altura=1.76,
    objetivo="Tonificar"
)

user30 = User(
    email="sebastián.gomila@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Sebastián",
    apellido="Gomila",
    experiencia=3,
    is_professional=False,
    telefono="652230612",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/30.jpg",
    direccion="Rambla Tomasa Batalla 2 Puerta 1 , León, 27688",
    peso=63.6,
    altura=1.73,
    objetivo="Ganar masa muscular"
)

user31 = User(
    email="viviana.peiró@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Viviana",
    apellido="Peiró",
    experiencia=7,
    is_professional=False,
    telefono="667015638",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/31.jpg",
    direccion="Plaza Iris Vilalta 985 Piso 3 , Melilla, 22478",
    peso=71.4,
    altura=1.62,
    objetivo="Mejorar resistencia"
)

user32 = User(
    email="wilfredo.hoz@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Wilfredo",
    apellido="Hoz",
    experiencia=9,
    is_professional=False,
    telefono="614096934",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/32.jpg",
    direccion="Ronda de Cristian Bou 1 Puerta 9 , Teruel, 86884",
    peso=90.7,
    altura=1.87,
    objetivo="Ganar masa muscular"
)

user33 = User(
    email="toño.luján@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Toño",
    apellido="Luján",
    experiencia=6,
    is_professional=False,
    telefono="671609217",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/33.jpg",
    direccion="Avenida Florentina Manjón 448 Piso 1 , Jaén, 34992",
    peso=86.7,
    altura=1.65,
    objetivo="Mejorar resistencia"
)

user34 = User(
    email="merche.pardo@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Merche",
    apellido="Pardo",
    experiencia=9,
    is_professional=False,
    telefono="664475709",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/34.jpg",
    direccion="Urbanización de Amaya Catalá 45, Sevilla, 23586",
    peso=58.7,
    altura=1.87,
    objetivo="Perder grasa"
)

user35 = User(
    email="florina.simó@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Florina",
    apellido="Simó",
    experiencia=10,
    is_professional=False,
    telefono="621343960",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/35.jpg",
    direccion="Cañada Esmeralda Galán 4 Apt. 94 , Salamanca, 67862",
    peso=74.3,
    altura=1.81,
    objetivo="Tonificar"
)

user36 = User(
    email="trinidad.batalla@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Trinidad",
    apellido="Batalla",
    experiencia=1,
    is_professional=False,
    telefono="639079209",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/36.jpg",
    direccion="Vial de Felisa Sevillano 50 Piso 3 , Cádiz, 74243",
    peso=64.2,
    altura=1.77,
    objetivo="Perder grasa"
)

user37 = User(
    email="juanita.mercader@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Juanita",
    apellido="Mercader",
    experiencia=9,
    is_professional=False,
    telefono="687351302",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/37.jpg",
    direccion="Plaza de Ezequiel Contreras 979 Puerta 3 , León, 59762",
    peso=58.3,
    altura=1.9,
    objetivo="Tonificar"
)

user38 = User(
    email="vasco.exposito@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Vasco",
    apellido="Exposito",
    experiencia=8,
    is_professional=False,
    telefono="668520393",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/38.jpg",
    direccion="Callejón de Ileana Duran 511 Piso 0 , Barcelona, 91483",
    peso=85.9,
    altura=1.65,
    objetivo="Mejorar resistencia"
)

user39 = User(
    email="chus.pou@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Chus",
    apellido="Pou",
    experiencia=6,
    is_professional=False,
    telefono="633291488",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/39.jpg",
    direccion="Plaza de Teresita Menendez 7 Puerta 3 , Almería, 64613",
    peso=74.2,
    altura=1.6,
    objetivo="Mejorar resistencia"
)

user40 = User(
    email="maría manuela.roura@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="María Manuela",
    apellido="Roura",
    experiencia=2,
    is_professional=False,
    telefono="680787158",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/40.jpg",
    direccion="Urbanización de Baltasar Ordóñez 39, Madrid, 03073",
    peso=71.6,
    altura=1.69,
    objetivo="Perder grasa"
)

user41 = User(
    email="micaela.juliá@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Micaela",
    apellido="Juliá",
    experiencia=10,
    is_professional=False,
    telefono="673247449",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/41.jpg",
    direccion="Acceso Reynaldo Carro 23 Puerta 1 , León, 70427",
    peso=82.4,
    altura=1.64,
    objetivo="Ganar masa muscular"
)

user42 = User(
    email="dolores.salamanca@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Dolores",
    apellido="Salamanca",
    experiencia=7,
    is_professional=False,
    telefono="624991869",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/42.jpg",
    direccion="Rambla de Asunción Hernández 51 Piso 4 , Lugo, 29619",
    peso=74.1,
    altura=1.65,
    objetivo="Tonificar"
)

user43 = User(
    email="ale.paz@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Ale",
    apellido="Paz",
    experiencia=3,
    is_professional=False,
    telefono="649278131",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/43.jpg",
    direccion="Callejón de Marita Velázquez 119 Apt. 65 , Huelva, 22399",
    peso=55.9,
    altura=1.8,
    objetivo="Mejorar resistencia"
)

user44 = User(
    email="moreno.quiroga@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Moreno",
    apellido="Quiroga",
    experiencia=2,
    is_professional=False,
    telefono="662348421",
    sexo="Hombre",
    imagen="https://randomuser.me/api/portraits/men/44.jpg",
    direccion="Camino Clotilde Ribas 820, Cantabria, 83944",
    peso=86.2,
    altura=1.81,
    objetivo="Tonificar"
)

user45 = User(
    email="raquel.iglesias@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Raquel",
    apellido="Iglesias",
    experiencia=2,
    is_professional=False,
    telefono="644611344",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/45.jpg",
    direccion="Paseo de Paz Gibert 571, Zamora, 65386",
    peso=66.0,
    altura=1.77,
    objetivo="Perder grasa"
)

user46 = User(
    email="vanesa.cano@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Vanesa",
    apellido="Cano",
    experiencia=2,
    is_professional=False,
    telefono="678686335",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/46.jpg",
    direccion="Urbanización Natanael Vigil 144, Ourense, 21835",
    peso=61.4,
    altura=1.68,
    objetivo="Mejorar resistencia"
)

user47 = User(
    email="régulo.castellanos@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Régulo",
    apellido="Castellanos",
    experiencia=6,
    is_professional=False,
    telefono="662853000",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/47.jpg",
    direccion="Calle de Maribel Cabezas 7, Vizcaya, 11242",
    peso=79.2,
    altura=1.59,
    objetivo="Ganar masa muscular"
)

user48 = User(
    email="adelardo.barbero@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Adelardo",
    apellido="Barbero",
    experiencia=9,
    is_professional=False,
    telefono="644961018",
    sexo="Mujer",
    imagen="https://randomuser.me/api/portraits/women/48.jpg",
    direccion="Vial Javier Bas 55, Ourense, 60270",
    peso=63.6,
    altura=1.68,
    objetivo="Tonificar"
)

user49 = User(
    email="lara.barrena@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Lara",
    apellido="Barrena",
    experiencia=9,
    is_professional=False,
    telefono="678784883",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/49.jpg",
    direccion="Calle de Paola Diéguez 46 Apt. 86 , Santa Cruz de Tenerife, 33760",
    peso=87.8,
    altura=1.86,
    objetivo="Tonificar"
)

user50 = User(
    email="vasco.fonseca@mail.com",
    password=generate_password_hash('pepe123'),
    nombre="Vasco",
    apellido="Fonseca",
    experiencia=3,
    is_professional=False,
    telefono="662424038",
    sexo="Indefinido",
    imagen="https://randomuser.me/api/portraits/women/50.jpg",
    direccion="Plaza de Federico Gisbert 21, Badajoz, 57186",
    peso=86.2,
    altura=1.75,
    objetivo="Ganar masa muscular"
)

db.session.add_all([user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25,
                   user26, user27, user28, user29, user30, user31, user32, user33, user34, user35, user36, user37, user38, user39, user40, user41, user42, user43, user44, user45, user46, user47, user48, user49, user50])
db.session.commit()

# === PLAN DE ENTRENAMIENTO DE EJEMPLO ===
plan = PlanTemplate(
    user_id=user2.id,
    plan_type="entrenamiento",
    nombre="Fuerza Inicial",
    description="Rutina para principiantes enfocada en fuerza"
)
db.session.add(plan)
db.session.commit()

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

pti1 = PlanTemplateItem(plan_template_id=plan.id,
                        template_item_id=item1.id, orden=1)
pti2 = PlanTemplateItem(plan_template_id=plan.id,
                        template_item_id=item2.id, orden=2)
db.session.add_all([pti1, pti2])
db.session.commit()

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

sub = Subscription(
    user_id=user1.id,
    subscription_plan_id=basic_plan.id,
    start_date=datetime.utcnow().date(),
    end_date=(datetime.utcnow() + timedelta(days=30)).date(),
    status="activa"
)
db.session.add(sub)
db.session.commit()

payment = Payment(subscription_id=sub.id, amount=19.99,
                  method="tarjeta", status="pagado")
db.session.add(payment)
db.session.commit()

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

signup = EventSignup(
    event_id=event.id, user_id=user1.id, estado="confirmado")
db.session.add(signup)
db.session.commit()

ticket = SupportTicket(
    user_id=user1.id,
    asunto="Error al acceder al plan",
    mensaje="No puedo ver el contenido del plan 'Fuerza Inicial'."
)
db.session.add(ticket)
db.session.commit()

print("Seeder ejecutado correctamente con todos los campos.")
