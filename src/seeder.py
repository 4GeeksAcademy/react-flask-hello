from datetime import datetime, timedelta
from app import app
from api.models import db, User, PlanTemplate, TemplateItem, SubscriptionPlan, Subscription, Payment, Event, EventSignup, SupportTicket

with app.app_context():
    # Create a superuser
        
    # Borra todo
    db.drop_all()
    db.create_all()

    # === USERS ===
    user1 = User(
        email="cliente@example.com",
        password="hashed_password_123",
        peso=70.5,
        altura=1.75,
        objetivo="Perder grasa y tonificar",
        is_professional=False,
        experiencia=5,
        nombre="Jose",
        apellido="Gonzalez"
    )

    user2 = User(
        email="entrenador@example.com",
        password="hashed_password_456",
        is_professional=True,
        telefono="666777888",
        profession_type="entrenador",
        experiencia=5,
        nombre="Jose",
        apellido="Gonzalez"
    )

    user3 = User(
        email="nutricionista@example.com",
        password="hashed_password_789",
        is_professional=True,
        telefono="611222333",
        profession_type="nutricionista",
        experiencia=8,
        nombre="Jose",
        apellido="Gonzalez"
    )

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # === PLANES ===
    plan = PlanTemplate(
        user_id=user2.id,
        plan_type="entrenamiento",
        nombre="Fuerza Inicial",
        description="Rutina para principiantes enfocada en fuerza"
    )

    db.session.add(plan)
    db.session.commit()

    # === ITEMS ===
    item1 = TemplateItem(
        template_id=plan.id,
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
        orden=1
    )

    item2 = TemplateItem(
        template_id=plan.id,
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
        orden=2
    )

    db.session.add_all([item1, item2])
    db.session.commit()

    # === SUBSCRIPTION PLANS ===
    basic_plan = SubscriptionPlan(
        name="Básico",
        price=19.99,
        duration_month=1,
        description="Acceso a planes y eventos"
    )

    premium_plan = SubscriptionPlan(
        name="Premium",
        price=39.99,
        duration_month=1,
        description="Acceso completo + contacto directo con profesionales"
    )

    db.session.add_all([basic_plan, premium_plan])
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
