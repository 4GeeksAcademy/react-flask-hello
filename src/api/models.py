from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # Relationships: 1 user n favorites
    favorites = db.relationship('Favorite', backref='user', lazy=True)  # <---
    payments = db.relationship('Payment', backref='user', lazy=True)  # <---

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # Relationships: n favorites a 1 con user, 1 con component
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True) # ---
    id_component = db.Column(db.Integer, db.ForeignKey('component.id'),nullable=True) # ---

    def __repr__(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_component": self.id_component,
            # do not serialize the password, its a security breach
        }

class Component(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    type = db.Column(db.String(120), unique=False, nullable=False)
    html_code = db.Column(db.String(10000), nullable=True)  
    css_code = db.Column(db.String(10000), nullable=True)   
    js_code = db.Column(db.String(10000), nullable=True)    
    react_code = db.Column(db.String(10000), nullable=True) 

    # relationship: 1 component n favorites
    favorites = db.relationship('Favorite', backref='component', lazy=True)

    def __repr__(self):
        return f'<Component {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "html_code": self.html_code,
            "css_code": self.css_code,
            "js_code": self.js_code,
            "react_code": self.react_code
            # do not serialize the password, its a security breach
        }

class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan_type_name = db.Column(db.String(120), unique=False, nullable=False)
    price = db.Column(db.Float(50), nullable=False)
    description =db.Column(db.String(120), unique=False, nullable=False)
    
    # Relationships: 1 a N
    payments = db.relationship('Payment', backref='plan', lazy=True)  # <---
    

    def __repr__(self):
        return f'<Plan {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "plan_type_name": self.plan_type_name,
            "price": self.price,
            "description": self.description       
            # do not serialize the password, its a security breach
        }
    
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan_start_date = db.Column(db.String(120), unique=False, nullable=False)
    plan_end_date = db.Column(db.String(120), unique=False, nullable=False)
    
    # Relationships: n payment a 1 con user, 1 con component
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True) # ---
    id_plan = db.Column(db.Integer, db.ForeignKey('plan.id'),nullable=True) # ---

    def __repr__(self):
        return f'<Payment {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "plan_start_date": self.plan_start_date,
            "plan_end_date": self.plan_end_date,
            "id_user": self.id_user,
            "id_plan":self.id_plan,     
            # do not serialize the password, its a security breach
        }