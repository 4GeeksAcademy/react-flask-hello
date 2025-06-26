from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

db = SQLAlchemy()

class ProjectStatus(enum.Enum):
    yet_to_start = "yet to start"
    in_progress = "in progress"
    done = "done"
    dismissed = "dismissed"

class TaskStatus(enum.Enum):
    in_progress = "in progress"
    delegated = "delegated"
    urgent = "urgent"
    done = "done"

class RoleType(enum.Enum):
    admin = "admin"
    member = "member"

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[int] = mapped_column(Integer, nullable=True)
    country: Mapped[str] = mapped_column(String(120), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    profile_picture_url: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    random_profile_color: Mapped[int] = mapped_column(Integer, nullable=True)
    time_zone: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    admin_of: Mapped[list['Project']]=relationship(
        back_populates='admin', cascade='all, delete-orphan')
    member_of: Mapped[list['Project_Member']] = relationship(
        back_populates='member', cascade='all, delete-orphan')
    author_of_task: Mapped[list['Task']] = relationship(
        back_populates='task_author', cascade='all, delete-orphan')
    roles: Mapped[list['Role']] = relationship(
        back_populates='user', cascade='all, delete-orphan')
    author_of_comment: Mapped[list['Comment']] = relationship(
        back_populates='comment_author', cascade='all, delete-orphan')
    
class Project(db.Model):
    __tablename__ = 'project'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    proyect_picture_url: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    due_date: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    status: Mapped[ProjectStatus] = mapped_column(Enum(ProjectStatus), nullable=False, default=ProjectStatus.yet_to_start)
    admin_id: Mapped[int]= mapped_column(ForeignKey('user.id'))
    admin: Mapped[User]=relationship(back_populates='admin_of')
    members: Mapped[list['Project_Member']] = relationship(
        back_populates='project', cascade='all, delete-orphan')
    tasks: Mapped[list['Task']] = relationship(
        back_populates='project', cascade='all, delete-orphan')
    roles: Mapped[list['Role']] = relationship(
        back_populates='project', cascade='all, delete-orphan')
    

class Project_Member(db.Model):
    __tablename__ = 'project_member'
    id: Mapped[int] = mapped_column(primary_key=True)
    member_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    project_id: Mapped[int] = mapped_column(ForeignKey('project.id'))
    member: Mapped[User] = relationship(back_populates='member_of')
    project: Mapped[Project] = relationship(back_populates='members')

class Task(db.Model):
    __tablename__= 'task'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus), nullable=False, default=ProjectStatus.in_progress)
    author_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    task_author: Mapped[User] = relationship(back_populates='author_of_task')
    project_id: Mapped[int] = mapped_column(ForeignKey('project.id'))
    project: Mapped[Project] = relationship(back_populates='tasks')
    comments: Mapped[list['Comment']] = relationship(  
        back_populates='task', cascade='all, delete-orphan')
    tags: Mapped[list['Tags']] = relationship(
        back_populates='task', cascade='all, delete-orphan')

class Comment(db.Model):
    __tablename__='comment'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    task_id: Mapped[int] = mapped_column(ForeignKey('task.id'))
    task: Mapped[Task] = relationship(back_populates='comments')
    author_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    comment_author: Mapped[User] = relationship(back_populates='author_of_comment')

class Role(db.Model):
    __tablename__='role'
    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[RoleType] = mapped_column(Enum(RoleType), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    user: Mapped[User] = relationship(back_populates='roles')
    project_id: Mapped[int] = mapped_column(ForeignKey('project.id'))
    project: Mapped[Project] = relationship(back_populates='roles')

class Tags(db.Model):
    __tablename__='tags'
    id: Mapped[int] = mapped_column(primary_key=True)
    tag: Mapped[str] = mapped_column(String(120), nullable=False)
    task_id: Mapped[int] = mapped_column(ForeignKey('task.id'))
    task: Mapped[Task] = relationship(back_populates='tags')
