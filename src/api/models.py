from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, Integer, Float, Numeric, Text, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    # nombre: Mapped[str] = mapped_column(String(120), nullable=False)
    # apellido: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(120), nullable=False) # se tiene que hacer hash EN LA RUTA!
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    # datos usuarios:
    peso: Mapped[float] = mapped_column(Float, nullable=True)
    altura: Mapped[float] = mapped_column(Float,  nullable=True)
    objetivo: Mapped[str] = mapped_column(Text, nullable=True)
    # campos de professional:
    is_professional: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    telefono: Mapped[str] = mapped_column(String(120), nullable=True) 
    profession_type: Mapped[str] = mapped_column(String(120), nullable=True) # aqui un ENUM --> cliente, entrenador, nutricionista
    experiencia: Mapped[int] = mapped_column(Integer, default=0)
    # relaciones:
    events_created = relationship('Event', back_populates='creator')
    event_signups = relationship('EventSignup', back_populates='user') # tabla de relacion
    plans_created = relationship('PlanTemplate', back_populates='creator')
    subscriptions = relationship('Subscription', back_populates='user')  # tabla de relacion
    support_tickets = relationship('SupportTicket', back_populates='user')
    template_items_created = relationship('TemplateItem', back_populates='creator')

    def serialize(self):
        data = {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat(),
            "peso": self.peso,
            "altura": self.altura,
            "objetivo": self.objetivo
        }
        if self.profession_type:
            data.update({
                "telefono": self.telefono,
                "profession_type": self.profession_type,
                "experiencia_años": self.experiencia
            })
        return data
    

class PlanTemplateItem(db.Model):
    __tablename__ = 'plan_template_items'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    plan_template_id: Mapped[int] = mapped_column(Integer, ForeignKey('plan_templates.id'), nullable=False)
    template_item_id: Mapped[int] = mapped_column(Integer, ForeignKey('template_items.id'), nullable=False)
    orden: Mapped[int] = mapped_column(Integer, nullable=True)  # Puedes añadir más campos si quieres

    # Relaciones
    plan_template = relationship('PlanTemplate', back_populates='plan_template_items')
    template_item = relationship('TemplateItem', back_populates='plan_template_items')

    def serialize(self):
        return{
            "id": self.id,
            "plan_template_id": self.plan_template_id,
            "template_item_id": self.template_item_id,
            "orden": self.orden
        }



class PlanTemplate(db.Model):
    __tablename__ = 'plan_templates'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    plan_type: Mapped[str] = mapped_column(String(120), nullable=False)
    nombre: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    creator = relationship('User', back_populates='plans_created')
    plan_template_items = relationship('PlanTemplateItem', back_populates='plan_template', cascade='all, delete-orphan')
    items = relationship('TemplateItem', secondary='plan_template_items', back_populates='templates', viewonly=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plan_type": self.plan_type,
            "nombre": self.nombre,
            "description": self.description,
            "created_at": self.created_at.isoformat()
        }
class TemplateItem(db.Model):
    __tablename__ = 'template_items'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    creator_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)  # NUEVO
    item_type: Mapped[str] = mapped_column(String(30), nullable=False)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    calorias: Mapped[int] = mapped_column(Integer, nullable=True)
    proteinas: Mapped[int] = mapped_column(Integer, nullable=True)
    grasas: Mapped[int] = mapped_column(Integer, nullable=True)
    carbohidratos: Mapped[int] = mapped_column(Integer, nullable=True)
    meal_momento: Mapped[str] = mapped_column(String(60), nullable=True)
    cantidad: Mapped[float] = mapped_column(Float, nullable=True)
    muscle_group: Mapped[str] = mapped_column(String(50), nullable=True)
    series: Mapped[int] = mapped_column(Integer, nullable=True)
    repeticiones: Mapped[int] = mapped_column(Integer, nullable=True)
    orden: Mapped[int] = mapped_column(Integer)

    # Relaciones
    creator = relationship('User', back_populates='template_items_created')  # NUEVO
    plan_template_items = relationship('PlanTemplateItem', back_populates='template_item', cascade='all, delete-orphan')
    templates = relationship('PlanTemplate', secondary='plan_template_items', back_populates='items', viewonly=True)

    def serialize(self):
        base = {
            "id": self.id,
            "creator_id": self.creator_id,
            "item_type": self.item_type,
            "nombre": self.nombre,
            "orden": self.orden
        }
        if self.item_type == 'food':
            base.update({
                "calorias": self.calorias,
                "proteinas": self.proteinas,
                "grasas": self.grasas,
                "carbohidratos": self.carbohidratos,
                "meal_momento": self.meal_momento,
                "cantidad": self.cantidad
            })
        else:
            base.update({
                "muscle_group": self.muscle_group,
                "series": self.series,
                "repeticiones": self.repeticiones
            })
        return base

# class TemplateItem(db.Model):
#     __tablename__ = 'template_items'
#     id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     template_id: Mapped[int] = mapped_column(Integer, ForeignKey('plan_templates.id'), nullable=False)
#     item_type: Mapped[str] = mapped_column(String(30), nullable=False)
#     nombre: Mapped[str] = mapped_column(String(30), nullable=False)
#     calorias: Mapped[int] = mapped_column(Integer)
#     proteinas: Mapped[int] = mapped_column(Integer)
#     grasas: Mapped[int] = mapped_column(Integer)
#     carbohidratos: Mapped[int] = mapped_column(Integer)
#     meal_momento: Mapped[str] = mapped_column(String(60))
#     cantidad: Mapped[float] = mapped_column(Float)
#     muscle_group: Mapped[str] = mapped_column(String(50))
#     series: Mapped[int] = mapped_column(Integer)
#     repeticiones: Mapped[int] = mapped_column(Integer)
#     orden: Mapped[int] = mapped_column(Integer)

#     # relaciones:
#     template = relationship('PlanTemplate', back_populates='items')

#     def serialize(self):
#         base = {
#             "id": self.id,
#             "template_id": self.template_id, 
#             "item_type": self.item_type,
#             "nombre": self.nombre,
#             "orden": self.orden
#         }
#         if self.item_type == 'food':
#             base.update({
#                 "calorias": self.calorias,
#                 "proteinas": self.proteinas,
#                 "grasas": self.grasas,
#                 "carbohidratos": self.carbohidratos,
#                 "meal_momento": self.meal_momento,
#                 "cantidad": self.cantidad
#             })
#         else:
#             base.update({
#                 "muscle_group": self.muscle_group,
#                 "series": self.series,
#                 "repeticiones": self.repeticiones
#             })
#         return base

class SubscriptionPlan(db.Model):
    __tablename__ = 'subscription_plans'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    price: Mapped[Numeric] = mapped_column(Numeric, nullable=False)
    duration_month: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    description: Mapped[str] = mapped_column(Text)
    price_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=True)

    # relacion inversa:
    subscriptions = relationship('Subscription', back_populates='plan', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": float(self.price),
            "duration_month": self.duration_month,
            "description": self.description,
            "price_id": self.price_id
        }

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    subscription_plan_id: Mapped[int] = mapped_column(Integer, ForeignKey('subscription_plans.id'), nullable=False)
    start_date: Mapped[Date] = mapped_column(Date, default=datetime.utcnow, nullable=False)
    end_date: Mapped[Date] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(30), nullable=False)

    # relaciones:
    user = relationship('User', back_populates='subscriptions')
    plan = relationship('SubscriptionPlan', back_populates='subscriptions')
    payments = relationship('Payment', back_populates='subscription', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "subscription_plan_id": self.subscription_plan_id,
            "start_date": self.start_date.isoformat() if self.start_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
            "status": self.status
        }

class Payment(db.Model):
    __tablename__ = 'payments'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    subscription_id: Mapped[int] = mapped_column(Integer, ForeignKey('subscriptions.id'), nullable=False)
    amount: Mapped[Numeric] = mapped_column(Numeric, nullable=False)
    method: Mapped[str] = mapped_column(String(50), nullable=False)
    paid_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)

    # relacion inversa:
    subscription = relationship('Subscription', back_populates='payments')

    def serialize(self):
        return {
            "id": self.id,
            "subscription_id": self.subscription_id,
            "amount": float(self.amount),
            "method": self.method,
            "paid_at": self.paid_at.isoformat(),
            "status": self.status
        }

class Event(db.Model):
    __tablename__ = 'events'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    creator_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    description: Mapped[str] = mapped_column(Text)
    fecha_inicio: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    fecha_fin: Mapped[datetime] = mapped_column(DateTime)
    ubicacion: Mapped[str] = mapped_column(String(60))
    capacidad: Mapped[int] = mapped_column(Integer)

    # relaciones:
    creator = relationship('User', back_populates='events_created')
    signups = relationship('EventSignup', back_populates='event', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "description": self.description,
            "fecha_inicio": self.fecha_inicio.isoformat(),
            "fecha_fin": self.fecha_fin.isoformat() if self.fecha_fin else None,
            "ubicacion": self.ubicacion,
            "capacidad": self.capacidad
        }

class EventSignup(db.Model):
    __tablename__ = 'event_signups'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    event_id: Mapped[int] = mapped_column(Integer, ForeignKey('events.id'), nullable=False)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    fecha_inscripcion: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    estado: Mapped[str] = mapped_column(String(30))

    # relaciones:
    event = relationship('Event', back_populates='signups')
    user = relationship('User', back_populates='event_signups')

    def serialize(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "user_id": self.user_id,
            "fecha_inscripcion": self.fecha_inscripcion.isoformat(),
            "estado": self.estado
        }

class SupportTicket(db.Model):
    __tablename__ = 'support_tickets'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    asunto: Mapped[str] = mapped_column(String(50), nullable=False)
    mensaje: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(40), default='abierto', nullable=False)
    creado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    actualizado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # relaciones:
    user = relationship('User', back_populates='support_tickets')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "asunto": self.asunto,
            "mensaje": self.mensaje,
            "status": self.status,
            "creado_en": self.creado_en.isoformat(),
            "actualizado_en": self.actualizado_en.isoformat()
        }



