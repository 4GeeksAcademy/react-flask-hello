from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Definición de la tabla intermedia para la relación muchos a muchos
# entre usuarios y eventos
event_participants = db.Table('event_participants',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    created_events = db.relationship('Event', backref='creator', lazy=True)
    joined_events = db.relationship(                     # 👈 aquí corregido
        'Event',
        secondary=event_participants,
        back_populates='joined_users',                   # 👈 nuevo nombre sin colisión
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
        }
# Definición del modelo de evento
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.String(50))
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    weather = db.Column(db.String(100))  # en caso de que uses clima
    distance = db.Column(db.Float)  # en caso de que uses distancia
    duration = db.Column(db.Float)  # en caso de que uses duración
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
# Una relación inversa para obtener el creador del evento
    joined_users = db.relationship(                      # 👈 también corregido
        'User',
        secondary=event_participants,
        back_populates='joined_events'
    )
# Función para obtener la ubicación como un diccionario
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "weather": self.weather,
            "distance": self.distance,
            "duration": self.duration,
            "creator_id": self.creator_id,
            "participants": [user.id for user in self.joined_users]
        }
