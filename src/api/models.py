from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, Integer, Float, Numeric, Text, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from extensions import db 
from datetime import datetime


class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(50), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default= True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    #datos usuarios:
    peso: Mapped[float]= mapped_column(Float)
    altura: Mapped[float]= mapped_column(Float)
    objetivo: Mapped[str]= mapped_column(String(200))
    #campos de professional:
    telefono: Mapped[str]= mapped_column(String(50))
    profession_type: Mapped[str]= mapped_column(String(50))
    experiencia_años: Mapped[int]= mapped_column(Integer, default=0)
    #relaciones:
    auth_account= relationship('AuthAccount', backref='user', uselist=False)
    events_created= relationship('Event', backref='creator', lazy=True)
    event_singups= relationship('EventSignup', backref='user', lazy=True)


    def serialize(self):
        data = {
            "id": self.id,
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
                "experiencia_años": self.experiencia_años
            })
        return data





#class Professional(db.Model):
   # __tablename__ = 'professionals'
    #id: Mapped[int] = mapped_column(Integer, primary_key=True)
    #nombre: Mapped[str] = mapped_column(String(120), nullable= False)
    #email: Mapped[str] = mapped_column(String(120), unique= True, nullable=False)
    #telefono: Mapped[str] = mapped_column(String(50))
    #profession_type: Mapped[str] = mapped_column(String(120), nullable=False) # trainer o nutriconista
    #experiencia_años: Mapped[int] = mapped_column(Integer, default=0, nullable= False)

    #def serialize(self):
        #return{
           #"id": self.id,
            #"nombre": self.nombre,
            #"email": self.email,
            #"telefono": self.telefono,
            #"profession_type": self.profession_type,
            #"experiencia_años": self.experiencia_años
        #}
    
class AuthAccount(db.Model): 
    __tablename__ = 'auth_accounts'   
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    account_type: Mapped[str] = mapped_column(String(30), nullable= False)
    account_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable= False)
    email: Mapped[str] = mapped_column(String(120), unique= True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    last_login: Mapped[datetime] = mapped_column(DateTime)

    #relaciones:
    user = relationship('User', back_populates='auth_account')


    def serialize(self):
        return {
            "id": self.id,
            "account_type": self.account_type,
            "account_id": self.account_id,
            "email": self.email,
            "created_at": self.created_at.isoformat(),
            "last_login": self.last_login.isoformat() if self.last_login else None
        }

class PlanTemplate(db.Model):
    __tablename__ = 'plan_templates'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int]= mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    plan_type: Mapped[str] = mapped_column(String(120), nullable=False)
    nombre: Mapped[str]= mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    #relaciones:
    creator = relationship('User', back_populates='plans_created')
    items = relationship('TemplateItem', back_populates='template', lazy=True)

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
    template_id: Mapped[int] = mapped_column(Integer, ForeignKey('plan_templates.id'), nullable=False)
    item_type: Mapped[str] = mapped_column(String(30), nullable= False)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    calorias: Mapped[int] = mapped_column(Integer)
    proteinas: Mapped[int] = mapped_column(Integer)
    grasas: Mapped[int] = mapped_column(Integer)
    carbohidratos: Mapped[int] = mapped_column(Integer)
    meal_momento: Mapped[str] = mapped_column(String(60))
    cantidad: Mapped[float] = mapped_column(Float)
    muscle_group: Mapped[str] = mapped_column(String(50))
    series: Mapped[int] = mapped_column(Integer)
    repeticiones: Mapped[int] = mapped_column(Integer)
    orden: Mapped[int] = mapped_column(Integer)

    #relaciones:
    template = relationship('PlanTemplate', back_populates='items')

    def serialize(self):
        base = {
            "id": self.id,
            "template_id": self.template_id, 
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
                "repeticiones": self.repeticiones,
                "orden": self.orden
            })
        return base
        
class SubscriptionPlan(db.Model):
    __tablename__ = 'subscription_plans'
    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True , nullable=False)
    price: Mapped[Numeric] = mapped_column(Numeric, nullable= False)
    duration_month: Mapped[int] = mapped_column(Integer, default=1, nullable= False)
    description: Mapped[str] = mapped_column(Text)

    #relacion inversa:
    subscriptions = relationship('Subscription', back_populates='plan', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "duration_mounth": self.duration_month,
            "description": self.description
        }

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    subscription_plan_id: Mapped[int] = mapped_column(Integer, ForeignKey('subscription_plans.id'), nullable=False)
    start_date: Mapped[Date] = mapped_column(Date, default=datetime.utcnow, nullable= False)
    end_date: Mapped[Date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(30), nullable= False)

    #relaciones:
    user = relationship('User', back_populates='subscriptions')
    plan = relationship('SubscriptionPlan', back_populates='subscriptions')
    payments = relationship('Payment', back_populates='subscriptions', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "subscription_plan": self.subscription_plan,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "status": self.status
        }
    

class Payment(db.Model):
    __tablename__ = 'payments'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    subscription_id: Mapped[int]= mapped_column(Integer, ForeignKey('subscriptions.id'), nullable=False)
    amount: Mapped[Numeric]= mapped_column(Numeric, nullable=False)
    method: Mapped[str]= mapped_column(String(50), nullable=False)
    paid_at: Mapped[datetime]= mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    status: Mapped[str]= mapped_column(String(50), nullable=False)

    #relacion inversa:
    subscription = relationship('Subscription', back_populates='payments')

    def serialize(self):
        return {
            "id": self.id,
            "subscription_id": self.subscription_id,
            "amount": float (self.amount),
            "method": self.method,
            "paid_at": self.paid_at.isoformat(),
            "status": self.status
        }
    
class Event(db.Model):
    __tablename__ = 'events'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str]= mapped_column(String(50), nullable=False)
    creator_id: Mapped[int]= mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    description: Mapped[str]= mapped_column(Text)
    fecha_inicio: Mapped[datetime]= mapped_column(DateTime, nullable=False)
    fecha_fin: Mapped[datetime]= mapped_column(DateTime)
    ubicacion: Mapped[str]= mapped_column(String(60))
    capacidad: Mapped[int]= mapped_column(Integer)

    #relaciones:
    creator = relationship('User', back_populates='events_created')
    signups = relationship('EventSingup', back_populates='event')

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
    id: Mapped[int]= mapped_column(Integer, primary_key=True)
    event_id: Mapped[int]= mapped_column(Integer, ForeignKey('events.id'), nullable=False)
    user_id: Mapped[int]= mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    fecha_incripcion: Mapped[datetime]= mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    estado: Mapped[str]= mapped_column(String(30))

    #relacion: 
    event = relationship('Event', back_populates='signups')
    user = relationship('User', back_populates='event_signups')

    def serialize(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "signup_type": self.signup_type,
            "signup_id": self.signup_id,
            "fecha_inscripcion": self.fecha_incripcion.isoformat(),
            "estado": self.estado
        }

class SupportTicket(db.Model):
    __tablename__ = 'support_tickets'
    id: Mapped[int]= mapped_column(Integer, primary_key=True)
    user_id: Mapped[int]= mapped_column(Integer, ForeignKey('users.id'), nullable= False)
    asunto: Mapped[str]= mapped_column(String(50), nullable= False)
    mensaje: Mapped[str]= mapped_column(Text, nullable=False)
    status: Mapped[str]= mapped_column(String(40), default='abierto', nullable= False)
    creado_en: Mapped[datetime]= mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    actualizado_en: Mapped[datetime]= mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable= False)

    #relacion inversa:

    user = relationship('User', back_populates='support_tickets')


    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "professional_id": self.professional_id,
            "asunto": self.asunto,
            "mensaje": self.mensaje,
            "status": self.status,
            "creado_en": self.creado_en.isoformat(),
            "actualizado_en": self.actualizado_en.isoformat()
        }



