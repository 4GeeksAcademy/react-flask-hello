from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Programs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    program_number = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(200), unique=False, nullable=False)
    monday_start = db.Column(db.String(10), unique=False, nullable=True)
    monday_end = db.Column(db.String(10), unique=False, nullable=True)
    tuesday_start = db.Column(db.String(10), unique=False, nullable=True)
    tuesday_end = db.Column(db.String(10), unique=False, nullable=True)
    wednesday_start = db.Column(db.String(10), unique=False, nullable=True)
    wednesday_end = db.Column(db.String(10), unique=False, nullable=True)
    thursday_start = db.Column(db.String(10), unique=False, nullable=True)
    thursday_end = db.Column(db.String(10), unique=False, nullable=True)
    friday_start = db.Column(db.String(10), unique=False, nullable=True)
    friday_end = db.Column(db.String(10), unique=False, nullable=True)
    saturday_start = db.Column(db.String(10), unique=False, nullable=True)
    saturday_end = db.Column(db.String(10), unique=False, nullable=True)
    sunday_start = db.Column(db.String(10), unique=False, nullable=True)
    sunday_end = db.Column(db.String(10), unique=False, nullable=True)
    
    def __repr__(self):
        return f'<Programs {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "program_number": self.program_number,
            "description": self.description,
            "monday_start": self.monday_start,
            "monday_end": self.monday_end,
            "tuesday_start": self.tuesday_start,
            "tuesday_end": self.tuesday_end,
            "wednesday_start": self.wednesday_start,
            "wednesday_end": self.wednesday_end,
            "thursday_start": self.thursday_start,
            "thursday_end": self.thursday_end,
            "friday_start": self.friday_start,
            "friday_end": self.friday_end,
            "saturday_start": self.saturday_start,
            "saturday_end": self.saturday_end,
            "sunday_start": self.sunday_start,
            "sunday_end": self.sunday_end,
            
            
            # do not serialize the password, its a security breach
        }