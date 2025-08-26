"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task, Category, TaskOffered, Profile, AccountSettings, TaskDealed, Payment, Review, Message, Dispute, Admin_action
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Endpoint para obtener todos los usuarios


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [user.serialize() for user in users]
    return jsonify(users_list), 200

# Endpoint para obtener un usuario por su id


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    return jsonify({"error": "Usuario no encontrado"}), 404

# Endpoint para crear un nuevo usuario


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({"error": "Se requiere un Email valido"}), 400
    if not data or 'password' not in data:
        return jsonify({"error": "Se requiere una contraseña valida"}), 400
    if not data or 'username' not in data:
        return jsonify({"error": "Se requiere un nombre de usuario valido"}), 400

    # Importar datetime y crear current_time
    current_time = datetime.utcnow()

    new_user = User(
        email=data['email'], password=data['password'], username=data['username'],
        created_at=current_time, modified_at=current_time
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# Endpoint para actualizar un usuario

@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    user.email = data.get('email', user.email)
    user.username = data.get('username', user.username)
    user.password = data.get('password', user.password)
    user.modified_at = datetime.utcnow()

    db.session.commit()
    return jsonify(user.serialize()), 200

# Endpoint para eliminar un usuario


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado"}), 200
    return jsonify({"error": "Usuario no encontrado"}), 404

# Endpoint para obtener todas las tareas


@api.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    tasks_list = [task.serialize() for task in tasks]

    return jsonify(tasks_list), 200

# Endpoint para obtener una tarea en concreto


@api.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get(task_id)
    if task:
        return jsonify(task.serialize()), 200
    return jsonify({"error": "Tarea no encontrada"}), 404

# Endpoint para eliminar una tarea en concreto


@api.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_tasks(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Tarea eliminada"}), 200
    return jsonify({"error": "Tarea no encontrada"}), 404

# Endpoint para crear una tarea


@api.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Datos inválidos"}), 400
        if 'title' not in data:
            return jsonify({"error": "Se requiere un título válido"}), 400
        if 'description' not in data:
            return jsonify({"error": "Se requiere una descripción válida"}), 400
        if 'publisher_id' not in data:
            return jsonify({"error": "Se requiere un ID de publicador válido"}), 400

        current_time = datetime.utcnow()
        new_task = Task(
            title=data['title'],
            description=data['description'],
            publisher_id=data['publisher_id'],
            location=data.get('location'),
            price=data.get('price'),
            due_at=current_time,
            # Valor por defecto 'pending' si no se proporciona
            status=data.get('status', 'pending')
        )

        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.serialize_all_data()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear la tarea: {str(e)}"}), 500

# Endpoint para actualizar una tarea ya existente


@api.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    try:
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Tarea no encontrada"}), 404

        data = request.get_json()
        if not data:
            return jsonify({"error": "Datos inválidos"}), 400

        # Actualizar campos
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.location = data.get('location', task.location)
        task.price = data.get('price', task.price)
        task.due_at = data.get('due_at', task.due_at)
        task.status = data.get('status', task.status)
        task.publisher_id = data.get('publisher_id', task.publisher_id)

        # Manejar categorías (relación n:n)
        if 'category_id' in data:
            # Primero verificamos si la categoría existe
            category = Category.query.get(data['category_id'])
            if not category:
                return jsonify({"error": "Categoría no encontrada"}), 404

            # Limpiar categorías actuales y agregar la nueva
            task.categories = [category]

        db.session.commit()
        return jsonify(task.serialize_all_data()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al actualizar la tarea: {str(e)}"}), 500

# Endpoint para obtener las tareas de un usuario en concreto


@api.route('/users/<int:user_id>/tasks', methods=['GET'])
def get_tasks_by_user(user_id):
    user = User.query.get(user_id)
    # Si el usuario no existe, da error
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    query = Task.query.filter_by(publisher_id=user_id)

    # Filtrar por estado
    status = request.args.get('status')
    if status:
        query = query.filter_by(status=status)

    # Filtrar por fechas
    from_date = request.args.get('from_date')
    if from_date:
        query = query.filter(Task.created_at >= from_date)

    to_date = request.args.get('to_date')
    if to_date:
        query = query.filter(Task.created_at <= to_date)

    tasks = query.all()
    tasks_list = [task.serialize_all_data() for task in tasks]
    return jsonify(tasks_list), 200

# Endpoint para eliminar una tarea en concreto de un usuario en concreto


@api.route('/users/<int:user_id>/tasks/<int:task_id>', methods=['DELETE'])
def delete_tasks_by_user(user_id, task_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "usuario inválido"}), 404

    task = Task.query.filter_by(id=task_id, publisher_id=user_id).first()
    if not task:
        return jsonify({"error": "tarea inválida o no pertenece al usuario"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Tarea eliminada"}), 200

# Endpoint para obtener todas las categorías


@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    categories_list = [category.serialize() for category in categories]
    return jsonify(categories_list), 200

# Endpoint para obtener una categoría específica


@api.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get(category_id)
    if category:
        return jsonify(category.serialize()), 200
    return jsonify({"error": "Categoría no encontrada"}), 404

# Endpoint para crear una nueva categoría


@api.route('/categories', methods=['POST'])
def create_category():
    try:
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify({"error": "Se requiere un nombre válido para la categoría"}), 400

        new_category = Category(name=data['name'])
        db.session.add(new_category)
        db.session.commit()
        return jsonify(new_category.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al crear la categoría: {str(e)}"}), 500

# Endpoint para eliminar una categoria en concreto


@api.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    db.session.delete(category)
    db.session.commit()
    return jsonify({"message": "Categoría eliminada"}), 200

# Endpoint para actualizar una categoría ya existente


@api.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({"error": "Se requiere un nombre válido para la categoría"}), 400

    category.name = data['name']
    db.session.commit()
    return jsonify(category.serialize()), 200

# Endpoint para obtener todas las categorías de una tarea específica


@api.route('/tasks/<int:task_id>/categories', methods=['GET'])
def get_categories_by_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    categories = task.categories
    return jsonify([category.serialize() for category in categories]), 200

# Endpoint para obtener todas las tareas de una categoría específica


@api.route('/categories/<int:category_id>/tasks', methods=['GET'])
def get_tasks_by_category(category_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    tasks = category.tasks
    return jsonify([task.serialize() for task in tasks]), 200

# Endpoint para agregar una categoría a una tarea


@api.route('/tasks/<int:task_id>/categories', methods=['POST'])
def add_category_to_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    data = request.get_json()
    if not data or 'category_id' not in data:
        return jsonify({"error": "Se requiere un ID de categoría válido"}), 400

    category = Category.query.get(data['category_id'])
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    task.categories.append(category)
    db.session.commit()
    return jsonify(task.serialize()), 200

# Endpoint para eliminar una categoria de una tarea en especifico


@api.route('/tasks/<int:task_id>/categories', methods=['DELETE'])
def remove_category_from_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Tarea no encontrada"}), 404

    data = request.get_json()
    if not data or 'category_id' not in data:
        return jsonify({"error": "Se requiere un ID de categoría válido"}), 400

    category = Category.query.get(data['category_id'])
    if not category:
        return jsonify({"error": "Categoría no encontrada"}), 404

    if category in task.categories:
        task.categories.remove(category)
        db.session.commit()
        return jsonify(task.serialize()), 200
    else:
        return jsonify({"error": "La categoría no está asociada a la tarea"}), 400

# Endpoint para obtener el perfil de un usuario


@api.route('/users/<int:user_id>/profile', methods=['GET'])
def get_profile(user_id):
    profile = Profile.query.get(user_id)
    if not profile:
        return jsonify({"error": "Perfil no encontrado"}), 404

    return jsonify(profile.serialize()), 200

# Endpoint para modificar el perfil de un usuario


@api.route('/users/<int:user_id>/profile', methods=['PUT'])
def update_profile(user_id):
    profile = Profile.query.get(user_id)
    if not profile:
        return jsonify({"error": "Perfil no encontrado"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    current_time = datetime.utcnow()

    profile.name = data.get("name", profile.name)
    profile.last_name = data.get("last_name", profile.last_name)
    profile.birth_date = data.get("birth_date", profile.birth_date)
    profile.bio = data.get("bio", profile.bio)
    profile.avatar = data.get("avatar", profile.avatar)
    profile.skills = data.get("skills", profile.skills)
    profile.rating_avg = data.get("rating_avg", profile.rating_avg)
    profile.city = data.get("city", profile.city)
    profile.modified_at = current_time

    db.session.commit()
    return jsonify(profile.serialize()), 200

