from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List

db = SQLAlchemy()


class User(db.Model):
    
    __tablename__="user"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True) 

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.email,
            "user_name": self.user_name
            # do not serialize the password, its a security breach
        }
    
    def __repr__(self):
        return self.user_name

class Todo(db.Model):
    
    __tablename__="todo"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False, default="No description")
    is_active : Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    user_id : Mapped[int] = mapped_column(ForeignKey("user.id"))
    
    user : Mapped["User"] = relationship(backref="todo")
    
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "is_active": self.is_active
        }
    


class Friend(db.Model):

    __tablename__="friend"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_to_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user_from_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    user_to: Mapped['User'] = relationship("User", foreign_keys=[user_to_id], backref="friend_from")
    user_from: Mapped['User'] = relationship("User", foreign_keys=[user_from_id], backref="friend_to")
    group_todo : Mapped[List['GroupTodo']] = relationship("GroupTodo", backref="friend")

    def serialize(self):
        return {
            "id": self.id,
            "user_to": self.user_to_id,
            "user_from": self.user_from_id,
            "group_todo": [todo.serialize() for todo in self.group_todo]

        }


class GroupTodo(db.Model):

    __tablename__="group_todo"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False, default="No description")
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)
    
    friend_id: Mapped[int] = mapped_column(ForeignKey("friend.id"))


    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "decription": self.description,
            "is_active": self.is_active
        }
    
    def __repr__(self):
        return self.title

