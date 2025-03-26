from api.models import db, Planet, Specie, Vehicle, Starship, Person, Category


def seed_database():

    if Category.query.count() == 0:
        print("Adding categories...")
        add_categories()

    if Planet.query.count() == 0:
        print("Adding planets...")
        add_planets()

    if Specie.query.count() == 0:
        print("Adding species...")
        add_species()

    if Vehicle.query.count() == 0:
        print("Adding vehicles...")
        add_vehicles()

    if Starship.query.count() == 0:
        print("Adding starships...")
        add_starships()

    if Person.query.count() == 0:
        print("Adding people...")
        add_people()




def add_categories():

    categories = [
        Category(
            name="planets"
        ),
        Category(
            name="species"
        ),
        Category(
            name="vehicles"
        ),
        Category(
            name="starships"
        ),
        Category(
            name="people"
        )
    ]

    db.session.add_all(categories)
    db.session.commit()


def add_planets():

    planets = [
        Planet(
            name="Tatooine",
            diameter=10465,
            gravity=1.0,
            population=200000,
            terrain="Desert",
            climate="Arid"
        ),
        Planet(
            name="Alderaan",
            diameter=12500,
            gravity=1.0,
            population=2000000000,
            terrain="Grasslands, Mountains",
            climate="Temperate"
        ),
        Planet(
            name="Hoth",
            diameter=7200,
            gravity=1.1,
            population=0,
            terrain="Tundra, Ice Caves",
            climate="Frozen"
        ),
        Planet(
            name="Dagobah",
            diameter=8900,
            gravity=0.9,
            population=0,
            terrain="Swamp, Jungles",
            climate="Misty"
        ),
        Planet(
            name="Endor",
            diameter=4900,
            gravity=0.85,
            population=30000000,
            terrain="Forests",
            climate="Temperate"
        )
    ]

    db.session.add_all(planets)
    db.session.commit()


def add_species():

    species = [
        Specie(
            name="Human",
            hair_color="Blond, Brown, Black",
            height=180.0,
            skin_color="Light to dark",
            language="Galactic Basic",
            average_life=120
        ),
        Specie(
            name="Wookiee",
            hair_color="Black, Brown",
            height=210.0,
            skin_color="Gray",
            language="Shyriiwook",
            average_life=400
        ),
        Specie(
            name="Jawa",
            hair_color="None",
            height=100.0,
            skin_color="Brown",
            language="Jawaese",
            average_life=80
        ),
        Specie(
            name="Hutt",
            hair_color="None",
            height=300.0,
            skin_color="Green, Brown",
            language="Huttese",
            average_life=900
        ),
        Specie(
            name="Ewok",
            hair_color="Brown",
            height=100.0,
            skin_color="Brown",
            language="Ewokese",
            average_life=100
        )
    ]

    db.session.add_all(species)
    db.session.commit()


def add_vehicles():

    vehicles = [
        Vehicle(
            name="Speeder",
            consumable="1 day",
            crew=1,
            passengers=1,
            class_name="Land",
            cargo_cap=50,
            terrain="Ground"
        ),
        Vehicle(
            name="AT-AT",
            consumable="1 week",
            crew=5,
            passengers=40,
            class_name="Assault",
            cargo_cap=1000,
            terrain="Ground, Snow"
        ),
        Vehicle(
            name="Podracer",
            consumable="None",
            crew=1,
            passengers=0,
            class_name="Racing",
            cargo_cap=0,
            terrain="Ground"
        ),
        Vehicle(
            name="Speeder Bike",
            consumable="1 day",
            crew=1,
            passengers=1,
            class_name="Light",
            cargo_cap=4,
            terrain="Ground"
        ),
        Vehicle(
            name="Sand Crawler",
            consumable="2 months",
            crew=46,
            passengers=30,
            class_name="Transport",
            cargo_cap=50000,
            terrain="Desert"
        )
    ]

    db.session.add_all(vehicles)
    db.session.commit()


def add_starships():

    starships = [
        Starship(
            name="Millennium Falcon",
            consumable="2 months",
            crew=4,
            passengers=6,
            class_name="Light Freighter",
            cargo_cap=100000,
            hyperdrive_rating=0.5
        ),
        Starship(
            name="Star Destroyer",
            consumable="Years",
            crew=47060,
            passengers=0,
            class_name="Star Destroyer",
            cargo_cap=36000000,
            hyperdrive_rating=2.0
        ),
        Starship(
            name="X-Wing",
            consumable="1 week",
            crew=1,
            passengers=0,
            class_name="Starfighter",
            cargo_cap=110,
            hyperdrive_rating=1.0
        ),
        Starship(
            name="TIE Fighter",
            consumable="2 days",
            crew=1,
            passengers=0,
            class_name="Starfighter",
            cargo_cap=65,
            hyperdrive_rating=0.0
        ),
        Starship(
            name="Slave I",
            consumable="1 month",
            crew=1,
            passengers=6,
            class_name="Patrol Ship",
            cargo_cap=70000,
            hyperdrive_rating=3.0
        )
    ]

    db.session.add_all(starships)
    db.session.commit()


def add_people():

    people = [
        Person(
            name="Luke Skywalker",
            hair_color="Blond",
            height=172.0,
            skin_color="Light",
            eye_color="Blue",
            gender="Male"
        ),
        Person(
            name="Darth Vader",
            hair_color="None",
            height=202.0,
            skin_color="White",
            eye_color="Yellow",
            gender="Male"
        ),
        Person(
            name="Leia Organa",
            hair_color="Brown",
            height=150.0,
            skin_color="Light",
            eye_color="Brown",
            gender="Female"
        ),
        Person(
            name="Han Solo",
            hair_color="Brown",
            height=180.0,
            skin_color="Light",
            eye_color="Brown",
            gender="Male"
        ),
        Person(
            name="Chewbacca",
            hair_color="Brown",
            height=228.0,
            skin_color="Unknown",
            eye_color="Blue",
            gender="Male"
        )
    ]

    db.session.add_all(people)
    db.session.commit()
