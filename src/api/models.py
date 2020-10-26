from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class UserImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return '<Image %r>' % self.id

    def serialize(self):
        return {
            "url": self.url,
            "id": self.id
        }