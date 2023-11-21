from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Tracker(db.Model):
    __tablename__ = "trackers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    scholarship_id = db.Column(db.Integer, db.ForeignKey('scholarship.id'))
    user = db.relationship('User', back_populates='tracker')
    scholarship = db.relationship('Scholarship', back_populates='trackers')

    def __repr__(self):
        return f'{self.user}'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            "user": self.user,
            "beca": self.beca,
        }
    


class Scholarship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    scholarship_name = db.Column(db.String(120), unique=False, nullable=False)
    institution = db.Column(db.String(130), unique=False, nullable=False)
    deadline = db.Column(db.String(50), unique=False, nullable=False)
    modality = db.Column(db.String(50), unique=False, nullable=False)
    coverage = db.Column(db.String(50), unique=False, nullable=False)
    professional_field = db.Column(db.String(50), unique=False, nullable=False)
    description = db.Column(db.String(800), unique=False, nullable=False)
    url_to = db.Column(db.String(250), unique=False, nullable=False)
    trackers = db.relationship('Tracker', back_populates='scholarship')

    def __repr__(self):
        return f'{self.scholarship_name}'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            "id": self.id,
            "scholarship_name": self.scholarship_name,
            "institution": self.institution,
            "deadline": self.deadline,
            "modality": self.modality,
            "coverage": self.coverage,
            "professional_field": self.professional_field,
            "description": self.description,
            "url_to": self.url_to,
        }    

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    tracker = db.relationship('Tracker', back_populates='user')

    def __repr__(self):
        return f'<User {self.email}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "tracker_id" : self.tracker_id,
            # do not serialize the password, its a security breach
        }
    
class InstitutionalUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    institutional_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<InstitutionalUser {self.email}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()


    def serialize(self):
        return {
            "id": self.id,
            "institutional_name": self.institutional_name,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
