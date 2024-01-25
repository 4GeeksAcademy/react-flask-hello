from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            # do not serialize the password, its a security breach
        }

class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, db.ForeignKey ('user.id'))
    date_time = db.Column(db.DateTime, unique=False, nullable=False)
    location = db.Column(db.String, unique=False, nullable=False)
    liters = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return f'<UserData {self.date_time} {self.location} {self.liters}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date_time": self.date_time,
            "location": self.location,
            "liters": self.liters,
        }
