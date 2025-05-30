from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Tabla intermedia para la relación muchos a muchos entre usuarios y eventos
event_participants = db.Table('event_participants',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    created_events = db.relationship('Event', backref='creator', lazy=True)

    joined_events = db.relationship(
        'Event',
        secondary=event_participants,
        back_populates='joined_users',
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.String(50))
    time = db.Column(db.String(50), nullable=False)
    difficulty = db.Column(db.String(20))  # Fácil, Medio, Difícil
    capacity = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    weather = db.Column(db.String(100))  # Opcional
    distance = db.Column(db.Float)       # Opcional
    duration = db.Column(db.Float)       # Opcional
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    joined_users = db.relationship(
        'User',
        secondary=event_participants,
        back_populates='joined_events'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "time": self.time,
            "difficulty": self.difficulty,
            "capacity": self.capacity,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "weather": self.weather,
            "distance": self.distance,
            "duration": self.duration,
            "creator_id": self.creator_id,
            "participants": [user.id for user in self.joined_users]
        }
