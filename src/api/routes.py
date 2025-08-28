# src/api/routes.py
from flask import Blueprint, jsonify, request
from flask_cors import CORS
from datetime import datetime

from api.models import db, User, Task, Profile  # <-- asegúrate que Profile está en models.py

api = Blueprint("api", __name__)
CORS(api, supports_credentials=True)  # útil si el front envía cookies/credenciales

# =========================
# HEALTH
# =========================
@api.get("/health")
def health():
    return jsonify({"msg": "Hello from Tasky API"}), 200


# =========================
# USERS
# =========================
@api.get("/users")
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


@api.get("/users/<int:user_id>")
def get_user(user_id):
    u = User.query.get(user_id)
    if not u:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(u.serialize()), 200


@api.post("/users")
def create_user():
    data = request.get_json() or {}
    if not data.get("email") or not data.get("password") or not data.get("username"):
        return jsonify({"error": "email, password y username son requeridos"}), 400

    u = User(
        email=data["email"],
        password=data["password"],      # TODO: hashear en prod
        username=data["username"]
    )
    db.session.add(u)
    db.session.commit()
    return jsonify(u.serialize()), 201


@api.put("/users/<int:user_id>")
def update_user(user_id):
    u = User.query.get(user_id)
    if not u:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json() or {}
    u.email = data.get("email", u.email)
    u.username = data.get("username", u.username)
    u.password = data.get("password", u.password)  # TODO: hashear en prod
    db.session.commit()
    return jsonify(u.serialize()), 200


@api.delete("/users/<int:user_id>")
def delete_user(user_id):
    u = User.query.get(user_id)
    if not u:
        return jsonify({"error": "Usuario no encontrado"}), 404
    db.session.delete(u)
    db.session.commit()
    return jsonify({"message": "Usuario eliminado"}), 200


@api.get("/users/by-username/<string:username>")
def get_user_by_username(username):
    # .ilike hace búsqueda case-insensitive
    u = User.query.filter(User.username.ilike(username)).first()
    if not u:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(u.serialize()), 200


# =========================
# PROFILES (PUBLIC/PRIVATE)
# =========================
@api.get("/users/<int:user_id>/profile")
def get_profile(user_id):
    prof = Profile.query.get(user_id)  # PK = user_id en este modelo
    if not prof:
        return jsonify({"error": "Perfil no encontrado"}), 404
    return jsonify(prof.serialize()), 200


@api.put("/users/<int:user_id>/profile")
def update_profile(user_id):
    """
    Crea o actualiza el perfil del usuario.
    Si el perfil no existe, lo crea con valores por defecto para
    las columnas NOT NULL (name, etc.).
    """
    data = request.get_json() or {}

    # por si quieres validar que el usuario existe
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    prof = Profile.query.get(user_id)  # PK = user_id
    if not prof:
        # ---- crear con DEFAULTS para NOT NULL ----
        prof = Profile(
            user_id=user_id,
            # name es NOT NULL -> usa body o username o string vacío
            name=(data.get("name") or user.username or ""),
            # estas pueden ser NOT NULL en tu modelo; si lo son, ponles default
            last_name=data.get("last_name") or "",
            avatar=data.get("avatar") or "",
            city=data.get("city") or "",
            birth_date=data.get("birth_date"),  # si tu col no es NOT NULL, puede ir None
            bio=data.get("bio") or "",
            skills=data.get("skills") or "",
            rating_avg=data.get("rating_avg") or 0.0,
            created_at=datetime.utcnow(),
            modified_at=datetime.utcnow(),
        )
        db.session.add(prof)
    else:
        # ---- actualizar sólo los campos recibidos ----
        for field in ["name", "last_name", "avatar", "city", "birth_date", "bio", "skills", "rating_avg"]:
            if field in data and data[field] is not None:
                setattr(prof, field, data[field])
        prof.modified_at = datetime.utcnow()

    db.session.commit()
    return jsonify(prof.serialize()), 200

# =========================
# TASKS (mínimo viable)
# =========================
@api.get("/tasks")
def list_tasks():
    tasks = Task.query.all()
    return jsonify([t.serialize() for t in tasks]), 200


@api.post("/tasks")
def create_task():
    data = request.get_json() or {}
    if not data.get("title") or not data.get("description") or not data.get("publisher_id"):
        return jsonify({"error": "title, description, publisher_id son requeridos"}), 400

    t = Task(
        title=data["title"],
        description=data["description"],
        publisher_id=data["publisher_id"],
        location=data.get("location"),
        price=data.get("price"),
        status=data.get("status", "pending"),
    )
    db.session.add(t)
    db.session.commit()
    return jsonify(t.serialize()), 201


@api.get("/tasks/<int:task_id>")
def get_task(task_id):
    t = Task.query.get(task_id)
    if not t:
        return jsonify({"error": "Tarea no encontrada"}), 404
    return jsonify(t.serialize()), 200


@api.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    t = Task.query.get(task_id)
    if not t:
        return jsonify({"error": "Tarea no encontrada"}), 404
    db.session.delete(t)
    db.session.commit()
    return jsonify({"message": "Tarea eliminada"}), 200
