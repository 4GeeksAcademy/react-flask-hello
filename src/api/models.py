from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        first_name = db.Column(db.String(50))
        last_name = db.Column(db.String(50))
        saved_trips = db.Column(db.Text)
        xp_points = db.Column(db.Integer)

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
