
from datetime import datetime, timedelta
from app import app
from api.models import db, User, PlanTemplate, TemplateItem, PlanTemplateItem, SubscriptionPlan, Subscription, Payment, Event, EventSignup, SupportTicket
from werkzeug.security import generate_password_hash
import os
from usuarios_seed import usuarios

with app.app_context():
    db.drop_all()
    db.create_all()

    # === USUARIOS ===
    user_instances = []
    for data in usuarios:
        user = User(
            email=data["email"],
            password=data["password"],
            nombre=data["nombre"],
            apellido=data["apellido"],
            imagen=data["imagen"],
            direccion=data["direccion"],
            experiencia=data["experiencia"],
            sexo=data["sexo"],
            is_professional=data["is_professional"],
            telefono=data["telefono"],
            peso=data.get("peso"),
            altura=data.get("altura"),
            objetivo=data.get("objetivo"),
            profession_type=data.get("profession_type")
        )
        user_instances.append(user)

    db.session.add_all(user_instances)
    db.session.commit()

    user1 = user_instances[0]
    user2 = user_instances[1]

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
    pti1 = PlanTemplateItem(plan_template_id=plan.id, template_item_id=item1.id, orden=1)
    pti2 = PlanTemplateItem(plan_template_id=plan.id, template_item_id=item2.id, orden=2)
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
