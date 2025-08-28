from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Date, Text, Numeric, DateTime, func, UniqueConstraint, Float
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import date, datetime
from decimal import Decimal

db = SQLAlchemy()

# Tabla que relaciona user con rol
UserRole = db.Table(
    'user_rol',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey(
        'rol.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           server_default=func.current_timestamp())
    modified_at = db.Column(db.DateTime, nullable=False, server_default=func.current_timestamp(
    ), server_onupdate=func.current_timestamp())
    roles = db.relationship('Rol', secondary='user_rol',)
    messages = db.relationship('Message', back_populates='user')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
            # no serializar "password" para no exponerlo
        }


class Rol(db.Model):
    __tablename__ = 'rol'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), unique=True, nullable=False)
    user = db.relationship('User', secondary='user_rol')

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
        }


class Profile(db.Model):
    __tablename__ = 'profile'
    user_id = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    avatar = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(50), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    bio = db.Column(db.String(250), nullable=True)
    skills = db.Column(db.String(250), nullable=True)
    rating_avg = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "last_name": self.last_name,
            "avatar": self.avatar,
            "city": self.city,
            "birth_date": self.birth_date,
            "bio": self.bio,
            "skills": self.skills,
            "rating_avg": self.rating_avg,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }


class AccountSettings(db.Model):
    __tablename__ = 'account_settings'
    user_id = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
    phone = db.Column(db.String(20), nullable=True)
    billing_info = db.Column(db.String(250), nullable=True)
    language = db.Column(db.String(50), nullable=True)
    marketing_emails = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, nullable=False)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "phone": self.phone,
            "billing_info": self.billing_info,
            "language": self.language,
            "marketing_emails": self.marketing_emails,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
        }


# Tabla que relaciona task con categories
task_categories = db.Table(
    "task_categories",
    db.Column("task_id", Integer, db.ForeignKey(
        "task.id", ondelete="CASCADE"), primary_key=True),
    db.Column("category_id", Integer, db.ForeignKey(
        "category.id", ondelete="CASCADE"), primary_key=True),
)


class Task(db.Model):
    __tablename__ = "task"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=True)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(120), nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=True)

    # dates
    due_at = db.Column(db.DateTime, nullable=True)   # timestamp
    # DB fills posted_at automatically with current_date()
    posted_at = db.Column(db.Date, nullable=False,
                          server_default=func.current_date())
    assigned_at = db.Column(db.Date, nullable=True)
    completed_at = db.Column(db.Date, nullable=True)

    # business-defined value (app.py)
    status = db.Column(db.String(30), nullable=False, server_default="pending")

    # FK + relationship (1 User -> many Tasks)
    publisher_id = db.Column(db.Integer, ForeignKey(
        "user.id"), nullable=False, index=True)
    publisher = db.relationship("User", backref="tasks")

    # relationship categories
    categories = db.relationship(
        "Category", secondary=task_categories, back_populates="tasks")

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
        }

    def serialize_all_data(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "location": self.location,
            "price": float(self.price) if self.price is not None else None,
            "due_at": self.due_at.isoformat() if self.due_at else None,
            "status": self.status,
            "posted_at": self.posted_at.isoformat() if self.posted_at else None,
            "assigned_at": self.assigned_at.isoformat() if self.assigned_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "publisher_id": self.publisher_id,
            "categories": [categories.serialize() for categories in self.categories] if self.categories else [],
        }


class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    # relationship
    tasks = db.relationship(
        "Task", secondary=task_categories, back_populates="categories")
    # return type

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class TaskOffered(db.Model):
    __tablename__ = "tasks_offered"

    id = db.Column(db.Integer, primary_key=True)
    # the values will be defined in the business layer(app.py)
    status = db.Column(db.Numeric(10, 2), nullable=True)
    # dates
    created_at = db.Column(
        db.Date, nullable=False, server_default=func.current_date())
    updated_at = db.Column(
        db.Date, nullable=False,
        server_default=func.current_date(),
        server_onupdate=func.current_date()
    )
    # FK
    task_id = db.Column(db.Integer, ForeignKey(
        "task.id"), nullable=False, index=True)
    tasker_id = db.Column(db.Integer, ForeignKey(
        "user.id"), nullable=False, index=True)

    # one offer per (task, tasker) in pair
    __table_args__ = (
        UniqueConstraint("task_id", "tasker_id",
                         name="uq_tasks_offered_task_tasker"),
    )

    # return type

    def serialize(self):
        return {
            "id": self.id,
            "task_id": self.task_id,
            "tasker_id": self.tasker_id,
            "status": float(self.status) if self.status is not None else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }


class TaskDealed(db.Model):
    __tablename__ = "task_dealed"

    id = db.Column(db.Integer, primary_key=True)
    fixed_price = db.Column(db.Numeric(10, 2), nullable=True)

    # the values will be defined in the business layer(app.py)
    status = db.Column(db.String(30), nullable=False)
    # dates
    accepted_at = db.Column(db.Date, nullable=True)
    delivered_at = db.Column(db.Date, nullable=True)
    cancelled_at = db.Column(db.Date, nullable=True)
    # FK
    task_id = db.Column(
        db.Integer, ForeignKey("task.id"), nullable=False, index=True
    )
    offer_id = db.Column(db.Integer, ForeignKey(
        "tasks_offered.id"), nullable=False, index=True)
    client_id = db.Column(db.Integer, ForeignKey(
        "user.id"), nullable=False, index=True)
    tasker_id = db.Column(db.Integer, ForeignKey(
        "user.id"), nullable=False, index=True)

    def serialize(self):
        return {
            "id": self.id,
            "task_id": self.task_id,
            "offer_id": self.offer_id,
            "client_id": self.client_id,
            "tasker_id": self.tasker_id,
            "fixed_price": float(self.fixed_price) if self.fixed_price is not None else None,
            "status": self.status,
            "accepted_at": self.accepted_at.isoformat() if self.accepted_at else None,
            "delivered_at": self.delivered_at.isoformat() if self.delivered_at else None,
            "cancelled_at": self.cancelled_at.isoformat() if self.cancelled_at else None
        }


class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    # the values will be defined in the business layer(app.py)
    status = db.Column(db.String(20), nullable=False)
    # dates
    created_at = db.Column(
        db.Date, nullable=False, server_default=func.current_date()
    )
    updated_at = db.Column(
        db.Date, nullable=False,
        server_default=func.current_date(),
        server_onupdate=func.current_date()
    )

    # FK
    dealed_id = db.Column(db.Integer, ForeignKey(
        "task_dealed.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)

    def serialize(self):
        return {
            "id": self.id,
            "dealed_id": self.dealed_id,
            "amount": float(self.amount),
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(10000), nullable=True)
    rate = db.Column(db.Numeric(3, 2), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True))
    publisher_id = db.Column(
        db.Integer, ForeignKey('user.id'), nullable=False)
    worker_id = db.Column(
        db.Integer, ForeignKey('user.id'), nullable=False)
    task_dealed_id = db.Column(
        db.Integer, ForeignKey('task_dealed.id'), unique=True, nullable=False)
    task_id = db.Column(db.Integer, ForeignKey('task.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "review": self.review,
            "rate": self.rate,
            "created_at": self.created_at,
            "worker_id": self.worker_id,
            "task_id": self.task_id,
        }


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(10000), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    dealer_id = db.Column(db.Integer, ForeignKey(
        'task_dealed.id'), unique=True, nullable=False)
    sender_id = db.Column(db.Integer, ForeignKey(
        'user.id'), nullable=False)
    user = db.relationship('User', back_populates='messages')

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "created_at": self.created_at,
            "dealer_id": self.dealer_id,
            "sender_id": self.sender_id,
        }


class Dispute(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reason = db.Column(db.String(120), nullable=False)
    details = db.Column(db.String(1000), nullable=False)
    status = db.Column(db.String(30), nullable=False)
    resolution = db.Column(db.String(1000), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True))
    updated_at = db.Column(db.DateTime(timezone=True))
    dealed_id = db.Column(db.Integer, ForeignKey(
        'task_dealed.id'), unique=True, nullable=False)
    raised_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    resolved_by_admin_user = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "reason": self.reason,
            "details": self.details,
            "status": self.status,
            "resolution": self.resolution,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "dealed_id": self.dealed_id,
            "raised_by": self.raised_by,
            "resolved_by_admin_user": self.resolved_by_admin_user,
        }


class Admin_action(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True))
    dispute_id = db.Column(
        db.Integer, ForeignKey('dispute.id'), nullable=False)
    admin_user = db.Column(
        db.Integer, ForeignKey('user.id'), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "action": self.action,
            "created_at": self.created_at,
            "dispute_id": self.dispute_id,
            "admin_user": self.admin_user,
        }
