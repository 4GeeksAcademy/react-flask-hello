from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Integer, ForeignKey, Time, Date, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[str] = mapped_column(String(20))
    status: Mapped[str] = mapped_column(String(20))

    student = relationship("Student", back_populates="user", uselist=False)
    teacher = relationship("Teacher", back_populates="user", uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "role": self.role,
            "status": self.status,
            "student": self.student.serialize() if self.role == 'student' and self.student else None,
            "teacher": self.teacher.serialize() if self.role == 'teacher' and self.teacher else None
        }

class Student(db.Model):
    __tablename__ = 'student'

    id: Mapped[int] = mapped_column(ForeignKey('user.id'), primary_key=True)
    student_code: Mapped[str] = mapped_column(String(50), unique=True)
    phone: Mapped[str] = mapped_column(String(20))
    grade_level: Mapped[str] = mapped_column(String(50))

    user = relationship("User", back_populates="student")
    enrollments = relationship("Enrollment", back_populates="student")
    payments = relationship("Payment", back_populates="student")

    def serialize(self):
        return {
            "student_code": self.student_code,
            "phone": self.phone,
            "grade_level": self.grade_level
        }

class Teacher(db.Model):
    __tablename__ = 'teacher'

    id: Mapped[int] = mapped_column(ForeignKey('user.id'), primary_key=True)
    department: Mapped[str] = mapped_column(String(100))
    phone: Mapped[str] = mapped_column(String(20))

    user = relationship("User", back_populates="teacher")
    courses = relationship("Course", back_populates="teacher")
    grades = relationship("Grade", back_populates="teacher")

    def serialize(self):
        return {
            "department": self.department,
            "phone": self.phone
        }

class Course(db.Model):
    __tablename__ = 'course'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id'))

    teacher = relationship("Teacher", back_populates="courses")
    schedules = relationship("Schedule", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")

class Schedule(db.Model):
    __tablename__ = 'schedule'

    id: Mapped[int] = mapped_column(primary_key=True)
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id'))
    day: Mapped[str] = mapped_column(String(20))
    start_time: Mapped[datetime.time] = mapped_column(Time)
    end_time: Mapped[datetime.time] = mapped_column(Time)
    classroom: Mapped[str] = mapped_column(String(50))

    course = relationship("Course", back_populates="schedules")

class Enrollment(db.Model):
    __tablename__ = 'enrollment'

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey('student.id'))
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id'))
    created_by: Mapped[int] = mapped_column(ForeignKey('user.id'))

    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

class Attendance(db.Model):
    __tablename__ = 'attendance'

    id: Mapped[int] = mapped_column(primary_key=True)
    enrollment_id: Mapped[int] = mapped_column(ForeignKey('enrollment.id'))
    date: Mapped[datetime.date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(20))

class Grade(db.Model):
    __tablename__ = 'grade'

    id: Mapped[int] = mapped_column(primary_key=True)
    enrollment_id: Mapped[int] = mapped_column(ForeignKey('enrollment.id'))
    teacher_id: Mapped[int] = mapped_column(ForeignKey('teacher.id'))
    score: Mapped[float] = mapped_column()
    comment: Mapped[str] = mapped_column(String(255))

    teacher = relationship("Teacher", back_populates="grades")

class Payment(db.Model):
    __tablename__ = 'payment'

    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey('student.id'))
    amount: Mapped[float] = mapped_column()
    date: Mapped[datetime.date] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String(20))

    student = relationship("Student", back_populates="payments")
