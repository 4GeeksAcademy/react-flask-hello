from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Date, Text, Numeric, DateTime, func, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date, datetime
from decimal import Decimal


db = SQLAlchemy()

task_categories = db.Table(
    "task_categories",
    db.Column("task_id", Integer, db.ForeignKey(
        "tasks.id", ondelete="CASCADE"), primary_key=True),
    db.Column("category_id", Integer, db.ForeignKey(
        "categories.id", ondelete="CASCADE"), primary_key=True),
)


class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Task(db.Model):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str | None] = mapped_column(String(120), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    location: Mapped[str | None] = mapped_column(String(120), nullable=True)
    price: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2), nullable=True)

    # dates
    due_at: Mapped[datetime | None] = mapped_column(
        DateTime, nullable=True)   # timestamp
    # DB fills posted_at automatically with current_date()
    posted_at: Mapped[date] = mapped_column(
        Date, nullable=False, server_default=func.current_date())
    assigned_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    completed_at: Mapped[date | None] = mapped_column(Date, nullable=True)

    # business-defined value (app.py)
    status: Mapped[str] = mapped_column(
        String(30), nullable=False, server_default="pending")

    # FK + relationship (1 User -> many Tasks)
    publisher_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False, index=True)
    publisher: Mapped["User"] = relationship(backref="tasks")

    # relationship categories
    categories: Mapped[list["Category"]] = relationship(
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
        }


class Category(db.Model):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(
        String(50), nullable=False, unique=True)

    # relationship
    tasks: Mapped[list["Task"]] = relationship(
        "Task", secondary=task_categories, back_populates="categories")
    # return type

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }


class TaskOffered(db.Model):
    __tablename__ = "tasks_offered"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    # the values will be defined in the business layer(app.py)
    status: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2), nullable=True)
    # dates
    created_at: Mapped[date] = mapped_column(
        Date, nullable=False, server_default=func.current_date())
    updated_at: Mapped[date] = mapped_column(
        Date, nullable=False,
        server_default=func.current_date(),
        server_onupdate=func.current_date()
    )
    # FK
    task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id"), nullable=False, index=True)
    tasker_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False, index=True)

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
    __tablename__ = "tasks_dealed"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    fixed_price: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2), nullable=True)

    # the values will be defined in the business layer(app.py)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    # dates
    accepted_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    delivered_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    cancelled_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    # FK
    task_id: Mapped[int] = mapped_column(
        ForeignKey("tasks.id"), nullable=False, index=True
    )
    offer_id: Mapped[int] = mapped_column(
        ForeignKey("tasks_offered.id"), nullable=False, index=True
    )
    client_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False, index=True
    )
    tasker_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False, index=True
    )

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
            # do not serialize the password, its a security breach
        }


class Payment(db.Model):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    # the values will be defined in the business layer(app.py)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    # dates
    created_at: Mapped[date] = mapped_column(
        Date, nullable=False, server_default=func.current_date()
    )
    updated_at: Mapped[date] = mapped_column(
        Date, nullable=False,
        server_default=func.current_date(),
        server_onupdate=func.current_date()
    )

    # FK
    dealed_id: Mapped[int] = mapped_column(
        ForeignKey("tasks_dealed.id", ondelete="CASCADE"), unique=True, nullable=False, index=True
    )

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
    id: Mapped[int] = mapped_column(primary_key=True)
    review: Mapped[str] = mapped_column(String(10000), nullable=True)
    rate: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    publisher_id: Mapped[int] = mapped_column(ForeignKey('user.id'), unique=True, nullable=False)
    worker_id: Mapped[int] = mapped_column(ForeignKey('user.id'), unique=True, nullable=False)
    task_id: Mapped[int] = mapped_column(ForeignKey('task.id'), unique=True, nullable=False)

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
    id: Mapped[int] = mapped_column(primary_key=True)
    body: Mapped[str] = mapped_column(String(100000), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    dealed_id: Mapped[int] = mapped_column(ForeignKey('task_dealed.id'), unique=True, nullable=False)
    sender_id: Mapped[int] = mapped_column(ForeignKey('user.id'), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "body": self.body,
            "created_at": self.created_at,
            "dealed_id": self.dealed_id,
            "sender_id": self.sender_id,
        }

class Dispute(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    reason: Mapped[str] = mapped_column(String(120), nullable=False)
    details: Mapped[str] = mapped_column(String(1000), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    resolution: Mapped[str] = mapped_column(String(1000), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    dealed_id: Mapped[int] = mapped_column(ForeignKey('task_dealed.id'), unique=True, nullable=False)
    raised_by: Mapped[int] = mapped_column(ForeignKey('user.id'), unique=True, nullable=False)
    resolved_by_admin_user: Mapped[int] = mapped_column(ForeignKey('user.id'), unique=True, nullable=True)

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
    id: Mapped[int] = mapped_column(primary_key=True)
    action: Mapped[str] = mapped_column(String(60), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    dispute_id: Mapped[int] = mapped_column(ForeignKey('dispute.id'), unique=True, nullable=False)
    admin_user: Mapped[int] = mapped_column(ForeignKey('user.id'), unique=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "action": self.action,
            "created_at": self.created_at,
            "dispute_id": self.dispute_id,
            "admin_user": self.admin_user,
        }