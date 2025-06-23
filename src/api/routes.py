"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, abort
from api.models import db, User, PlanTemplate, TemplateItem, UserProfesional, SubscriptionPlan, Subscription, Payment, Event, EventSignup, SupportTicket, PlanTemplateItem, TrainingEntry, NutritionEntry
from api.utils import APIException
from flask_cors import CORS
from sqlalchemy import select
import stripe
import os
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta

from api.models import db, User
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

stripe.api_key = os.getenv("STRIPE_API_KEY")
# Allow CORS requests to this API
bcrypt = Bcrypt()

# USERS


@api.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


@api.route('/users/me', methods=['GET'])
@jwt_required()
def current_user():
    id = get_jwt_identity()
    user = User.query.get(id)
    if not user:
        abort(404, description="Usuario no encontrado")
    return jsonify(user.serialize()), 200


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description="Usuario no encontrado")
    return jsonify(user.serialize()), 200


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    required = ('nombre', 'email', 'password', 'account_type')
    if not all(f in data for f in required):
        raise APIException(
            f"faltan datos obligatorios: {', '.join(required)}", status_code=400)
    hashed_password = bcrypt.generate_password_hash(
        data["password"]).decode("utf-8")

    account_type = data['account_type'].lower()
    if account_type not in ['cliente', 'entrenador', 'nutricionista']:
        raise APIException(
            "account_type debe ser: 'cliente', 'entrenador' o 'nutricionista'", status_code=400)

    is_professional = account_type in ['entrenador', 'nutricionista']
    profession_type = account_type if is_professional else None

    user = User(
        email=data['email'],
        password=hashed_password,
        is_active=data.get('is_active', True),
        peso=data.get('peso'),
        altura=data.get('altura'),
        objetivo=data.get('objetivo'),
        telefono=data.get('telefono'),
        is_professional=is_professional,
        profession_type=profession_type,
        experiencia=data.get('experiencia', 0)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201


@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    user_id_from_token = get_jwt_identity()

    # Seguridad: Solo puedes editar tu propio perfil
    if str(user_id_from_token) != str(id):
        return jsonify({"msg": "No tienes permiso para editar este usuario"}), 403

    user = User.query.get(id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    body = request.get_json() or {}

    # Asignación de campos seguros
    user.nombre = body.get("nombre", user.nombre)
    user.apellido = body.get("apellido", user.apellido)
    user.email = body.get("email", user.email)
    user.telefono = body.get("telefono", user.telefono)
    user.direccion = body.get("direccion", user.direccion)
    user.sexo = body.get("sexo", user.sexo)
    user.imagen = body.get("imagen", user.imagen)
    user.objetivo = body.get("objetivo", user.objetivo)
    user.altura = body.get("altura", user.altura)
    user.peso = body.get("peso", user.peso)
    user.experiencia = body.get("experiencia", user.experiencia)
    user.profession_type = body.get("profession_type", user.profession_type)
    user.apellido = body.get("apellido", user.apellido)
    user.objetivo = body.get("objetivo", user.objetivo)
    user.altura = body.get("altura", user.altura)
    user.peso = body.get("peso", user.peso)

    if "descripcion" in body:
        user.descripcion = body["descripcion"] or ""

    # ✅ CORRECTO: fuera del bloque anterior y con buena identación
    if "profesional_id" in body:
        profesional_id = body["profesional_id"]

        # Elimina vínculos anteriores
        UserProfesional.query.filter_by(user_id=user.id).delete()

        # Crea nuevo vínculo
        nuevo = UserProfesional(user_id=user.id, profesional_id=profesional_id)
        db.session.add(nuevo)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al guardar el usuario", "detalle": str(e)}), 500

    return jsonify(user.serialize()), 200


@api.route('/users', methods=['DELETE'])
@jwt_required()
def delete_user():
    id = get_jwt_identity()
    user = User.query.get(id)
    if not user:
        abort(404, description="Usuario no encontrado")
    db.session.delete(user)
    db.session.commit()
    return '', 204

# PROFESSIONALS


@api.route('/professionals', methods=['GET'])
def list_professionals():
    stm = select(User).where(User.is_professional == True)
    query = db.session.execute(stm).scalars()
    return jsonify([p.serialize() for p in query]), 200


@api.route('/professionals/enroll_user', methods=['POST'])
@jwt_required()
def enroll_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        abort(404, description="Usuario no encontrado")
    if not user.subscriptions:
        raise APIException(
            "Usuario no tiene una subscripcion activa", status_code=403)
    data = request.get_json() or {}
    required = ('profesional_id',)
    if not all(f in data for f in required):
        raise APIException(
            f"faltan datos obligatorios: {', '.join(required)}", status_code=400)

    profesional = User.query.get(data['profesional_id'])
    if not profesional or not profesional.is_professional:
        raise APIException("Profesional no encontrado", status_code=404)

    enrollment = UserProfesional(
        user_id=user.id,
        profesional_id=profesional.id
    )
    db.session.add(enrollment)
    db.session.commit()
    return jsonify(enrollment.serialize()), 201

# Listar profesionales contratados por el usuario


@api.route('/user_professionals', methods=['GET'])
@jwt_required()
def list_user_professionals():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        abort(404, description="Usuario no encontrado")
    return jsonify([up.serialize() for up in user.profesionales_contratados]), 200

# Listar usuarios del profesional


@api.route('/professionals_user', methods=['GET'])
@jwt_required()
def get_user_enrolled():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        abort(404, description="Usuario no encontrado")
    return jsonify([up.serialize() for up in user.usuarios_contratantes]), 200

# Eliminar relación profesional-usuario


@api.route('/delete_user_professional', methods=['DELETE'])
@jwt_required()
def delete_user_professional():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        abort(404, description="Usuario no encontrado")
    data = request.get_json() or {}
    required = ('profesional_id',)
    if not all(f in data for f in required):
        raise APIException(
            f"faltan datos obligatorios: {', '.join(required)}", status_code=400)

    profesional = User.query.get(data['profesional_id'])
    if not profesional or not profesional.is_professional:
        raise APIException("Profesional no encontrado", status_code=404)

    enrollment = UserProfesional.query.filter_by(
        user_id=user.id,
        profesional_id=profesional.id
    ).first()
    if not enrollment:
        raise APIException("No existe la relación", status_code=404)

    db.session.delete(enrollment)
    db.session.commit()
    return '', 204


@api.route('/professionals/<int:id>', methods=['GET'])
def get_professional(id):
    user = User.query.get(id)
    if not user or not user.is_professional:
        return jsonify({"error": "Entrenador no encontrado"}), 404
    return jsonify(user.serialize()), 200


# @api.route('/professionals', methods=['POST'])
# def create_professional():
    # data = request.get_json() or {}
    # required = ('nombre', 'email', 'profession_type')
    # if not all(field in data for field in required):
    # raise APIException(f"faltan campos obligatorios: {', '.join(required)}", status_code=400)
    # pro = Professional(
    # nombre=data['nombre'],
    # email=data['email'],
    # telefono=data.get('telefono'),
    # profession_type=data['profession_type'],
    # experiencia_años=data.get('experiencia_años', 0)
    # )
    # db.session.add(pro)
    # db.session.commit()
    # return jsonify(pro.serialize()), 200

# @api.route('/professionals/<int:pid>', methods=['PUT'])
# def update_professional(pid):
    # pro = Professional.query.get(pid)
    # if not pro:
    # abort(400, description="Professional no encontrado")
    # data = request.get_json() or {}
    # if not any(f in data for f in ('nombre', 'email', 'telefono', 'profession_type', 'experiencia_años')):
    # raise APIException("No hay campos para actualizat", status_code=400)
    # for attr in ('nombre','email', 'telefono', 'profession_type', 'experiencia_años'):
    # if attr in data:
    # setattr(pro, attr, data[attr])
    # db.session.commit()
    # return jsonify(pro.serialize()),200

# @api.route('/professionals/<int:pid>', methods=['DELETE'])
# def delete_professional(pid):
    # pro = Professional.query.get(pid)
    # if not pro:
    # abort(404, description="Professional no encontrado")
    # db.session.delete(pro)
    d  # b.session.commit()
    # return '', 204


# PLAN TEMPLATE ITEM

@api.route('/plan_template_items', methods=['GET'])
def list_plan_template_items():
    items = PlanTemplateItem.query.all()
    if not items:
        abort(404, description="PlanTemplateItem no encontrado")
    return jsonify([i.serialize() for i in items]), 200


@api.route('/plan_template_items/<int:pti_id>', methods=['GET'])
def get_plan_template_item(pti_id):
    item = PlanTemplateItem.query.get(pti_id)
    if not item:
        abort(404, description="PlanTemplateItem no encontrado")
    return jsonify(item.serialize()), 200


@api.route('/plan_template_items', methods=['POST'])
def create_plan_template_item():
    data = request.get_json() or {}
    required = ('plan_template_id', 'template_item_id')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos: {', '.join(required)}", status_code=400)
    item = PlanTemplateItem(
        plan_template_id=data['plan_template_id'],
        template_item_id=data['template_item_id'],
        orden=data.get('orden')
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.serialize()), 201


@api.route('/plan_template_items/<int:pti_id>', methods=['PUT'])
def update_plan_template_item(pti_id):
    item = PlanTemplateItem.query.get(pti_id)
    if not item:
        abort(404, description="PlanTemplateItem no encontrado")
    data = request.get_json() or {}
    for field in ('plan_template_id', 'template_item_id', 'orden'):
        if field in data:
            setattr(item, field, data[field])
    db.session.commit()
    return jsonify(item.serialize()), 200


@api.route('/plan_template_items/<int:pti_id>', methods=['DELETE'])
def delete_plan_template_item(pti_id):
    item = PlanTemplateItem.query.get(pti_id)
    if not item:
        abort(404, description="PlanTemplateItem no encontrado")
    db.session.delete(item)
    db.session.commit()
    return '', 204


# PLAN TEMPLATES

@api.route('/plan_templates', methods=['GET'])
def list_plan_templates():
    templates = PlanTemplate.query.all()
    return jsonify([t.serialize() for t in templates]), 200


@api.route('/plan_templates/<int:tid>', methods=['GET'])
def get_plan_template(tid):
    t = PlanTemplate.query.get(tid)
    if not t:
        abort(404, description="No se enceuntra la plantilla")
    return jsonify(t.serialize()), 200


@api.route('/plan_templates', methods=['POST'])
@jwt_required()
def create_plan_template():
    data = request.get_json() or {}
    required = ('user_id', 'plan_type', 'nombre')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos obligatorios: {', '.join(required)}", status_code=400)
    t = PlanTemplate(
        user_id=data['user_id'],
        plan_type=data['plan_type'],
        nombre=data['nombre'],
        description=data.get('description')
    )
    db.session.add(t)
    db.session.commit()
    return jsonify(t.serialize()), 201


@api.route('/plan_templates/<int:tid>', methods=['PUT'])
def update_plan_template(tid):
    t = PlanTemplate.query.get(tid)
    if not t:
        abort(400, description="Plantilla no encontrada")
    data = request.get_json() or {}
    updatable = ('user_id', 'plan_type', 'nombre', 'descripcion')
    if not any(f in data for f in updatable):
        raise APIException(
            f"No ha enviado campos validos para actualizar", status_code=400)
    for field in updatable:
        if field in data:
            setattr(t, field, data[field])
    db.session.commit()
    return jsonify(t.serialize()), 200


@api.route('/plan_templates/<int:tid>', methods=['DELETE'])
def delete_plan_templates(tid):
    t = PlanTemplate.query.get(tid)
    if not t:
        abort(404, description="Plantilla no encontrada")
    db.session.delete(t)
    db.session.commit()
    return '', 204

# TEMPLATE ITEMS


@api.route('/template_items', methods=['GET'])
def list_template_items():
    items = TemplateItem.query.all()
    return jsonify([i.serialize() for i in items]), 200


@api.route('/template_items/<int:iid>', methods=['GET'])
def get_template_item(iid):
    i = TemplateItem.query.get(iid)
    if not i:
        abort(400, description="No se encuentra el item")
    return jsonify(i.serialize()), 200


@api.route('/template_items', methods=['POST'])
def create_template_item():
    data = request.json or {}

    required = ('creator_id', 'item_type', 'nombre')

    required = ('template_id', 'item_type', 'nombre')

    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos obligatorios: {', '.join(required)}", status_code=400)
    i = TemplateItem(
        creator_id=data['creator_id'],
        item_type=data['item_type'],
        nombre=data['nombre'],
        calorias=data.get('calorias'),
        proteinas=data.get('proteinas'),
        grasas=data.get('grasas'),
        carbohidratos=data.get('carbohidratos'),
        meal_momento=data.get('meal_momento'),
        cantidad=data.get('cantidad'),
        muscle_group=data.get('muscle_group'),
        series=data.get('series'),
        repeticiones=data.get('repeticiones'),
        orden=data.get('orden')
    )
    db.session.add(i)
    db.session.commit()
    return jsonify(i.serialize()), 200


@api.route('/template_items/<int:iid>', methods=['PUT'])
def update_template_item(iid):
    i = TemplateItem.query.get(iid)
    if not i:
        abort(400, description="Item no encontrado")
    data = request.get_json() or {}
    updatable = (
        'template_id', 'item_type', 'nombre', 'calorias', 'proteinas',
        'grasas', 'carbohidratos', 'meal_momento',
        'cantidad', 'muscle_group', 'series', 'repeticiones', 'orden'
    )
    if not any(f in data for f in updatable):
        raise APIException(
            f"No ha enviado ningun item para actualizat", status_code=400)
    for field in updatable:
        if field in data:
            setattr(i, field, data[field])
    db.session.commit()
    return jsonify(i.serialize()), 200


@api.route('/template_items/<int:iid>', methods=['DELETE'])
def delete_template_item(iid):
    i = TemplateItem.query.get(iid)
    if not i:
        abort(400, description="Item no encontrado")
    db.session.delete(i)
    db.session.commit()
    return '', 204

# SUBSCRIPTION PLANS


@api.route('/subscription_plans', methods=['GET'])
def list_subscription_plans():
    plans = SubscriptionPlan.query.all()
    return jsonify([p.serialize() for p in plans]), 200


@api.route('/subscription_plans/<int:pid>', methods=['GET'])
def get_subscription_plan(pid):
    p = SubscriptionPlan.query.get(pid)
    if not p:
        abort(400, description="Plan de subscripcion no encontrado")
    return jsonify(p.serialize()), 200


@api.route('/subscription_plans', methods=['POST'])
def create_subscription_plan():
    data = request.get_json() or {}
    required = ('name', 'price', 'duration_month')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos obligatorios: {', '.join(required)}", status_code=400)
    p = SubscriptionPlan(
        name=data['name'],
        price=data['price'],
        duration_month=data['duration_month'],
        description=data.get('description')
    )
    db.session.add(p)
    db.session.commit()
    return jsonify(p.serialize()), 201


@api.route('/subscription_plans/<int:pid>', methods=['PUT'])
def update_subscription_plan(pid):
    p = SubscriptionPlan.query.get(pid)
    if not p:
        abort(400, description="Plan no encontrado")
    data = request.get_json() or {}
    updatable = ('name', 'price', 'duration_month', 'description')
    if not any(f in data for f in updatable):
        raise APIException(
            f"No hay campos validos para actualizar", status_code=400)
    for field in updatable:
        if field in data:
            setattr(p, field, data[field])
    db.session.commit()
    return jsonify(p.serialize()), 200


@api.route('/subscription_plans/<int:pid>', methods=['DELETE'])
def delete_subscription_plan(pid):
    p = SubscriptionPlan.query.get(pid)
    if not p:
        abort(400, description="plan no encontrado")
    db.session.delete(p)
    db.session.commit()
    return '', 204

# SUBSCRIPTIONS


@api.route('/subscriptions', methods=['GET'])
def list_subscriptions():
    subs = Subscription.query.all()
    return jsonify([s.serialize() for s in subs]), 200


@api.route('/subscriptions/<int:sid>', methods=['GET'])
def get_subscription(sid):
    s = Subscription.query.get(sid)
    if not s:
        abort(400, description="No se ha encontrado la subscripcion")
    return jsonify(s.serialize()), 200


@api.route('/subscriptions', methods=['POST'])
def create_subscription():
    data = request.get_json() or {}
    required = ('user_id', 'subscription_plan_id', 'start_date', 'status')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos obligatorios: {', '.join(required)}", status_code=400)
    s = Subscription(
        user_id=data['user_id'],
        subscription_plan_id=data['subscription_plan_id'],
        start_date=data['start_date'],
        end_date=data.get('end_date'),
        status=data['status']
    )
    db.session.add(s)
    db.session.commit()
    return jsonify(s.serialize()), 200


@api.route('/subscriptions/<int:sid>', methods=['PUT'])
def update_subscription(sid):
    s = Subscription.query.get(sid)
    if not s:
        abort(404, description="Subscripcion no encontada")
    data = request.get_json() or {}
    updatable = ('user_id', 'subscription_plan_id',
                 'start_date', 'end_date', 'status')
    if not any(f in data for f in updatable):
        raise APIException(
            f"No ha enviado campos validos para actualizar:", status_code=400)
    for field in updatable:
        if field in data:
            setattr(s, field, data[field])
    db.session.commit()
    return jsonify(s.serialize()), 200


@api.route('/subscriptions/<int:sid>', methods=['DELETE'])
def delete_subscription(sid):
    s = Subscription.query.get(sid)
    if not s:
        abort(404, description="No se ha encontrado la subscripcion")
    db.session.delete(s)
    db.session.commit()
    return '', 200


# PAYMENTS

@api.route("/api/payments", methods=["POST"])
@jwt_required()
def register_payment():
    data = request.get_json()

    session_id = data.get("session_id")
    user_id = data.get("user_id")
    subscription_plan_id = data.get("subscription_id")
    amount = data.get("amount")
    method = data.get("method", "stripe")
    status = data.get("status", "complete")

    if not session_id or not user_id or not subscription_plan_id:
        return jsonify({"error": "Faltan datos requeridos"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    plan = SubscriptionPlan.query.get(subscription_plan_id)
    if not plan:
        return jsonify({"error": "Plan de suscripción no encontrado"}), 404

    end_date = datetime.utcnow() + timedelta(days=plan.duration_month * 30)

    subscription = Subscription(
        user_id=user_id,
        subscription_plan_id=subscription_plan_id,
        start_date=datetime.utcnow(),
        end_date=end_date,
        status="active"
    )
    db.session.add(subscription)
    db.session.commit()

    payment = Payment(
        subscription_id=subscription.id,
        amount=amount,
        method=method,
        paid_at=datetime.utcnow(),
        status=status
    )
    db.session.add(payment)
    db.session.commit()

    return jsonify({
        "message": "Pago y suscripción registrados",
        "subscription": subscription.serialize()
    }), 200


@api.route('/payments', methods=['POST'])
@jwt_required()
def create_payment():

    data = request.get_json() or {}
    required = ('subscription_id', 'amount',
                'method', 'status', 'session_id')
    user_id = get_jwt_identity()
    if not all(f in data for f in required):
        return jsonify(
            {"error": f"Faltan datos obligatorios: {', '.join(required)}"}), 400
    stm = select(SubscriptionPlan).where(
        SubscriptionPlan.name == data['subscription_id'].capitalize()
    )
    plan = db.session.execute(stm).scalar_one_or_none()
    if not plan:
        return jsonify(
            {"error": "Plan de subscripción no encontrado"}), 400

    subscription = Subscription(
        user_id=user_id,
        subscription_plan_id=plan.id,
        start_date=datetime.utcnow().date(),
        end_date=(datetime.utcnow() + timedelta(days=30)).date(),
        status=data['status']
    )
    if not subscription.user_id:
        db.session.rollback()
        return jsonify({"error": "Usuario no encontrado"}), 400

    db.session.add(subscription)
    db.session.commit()

    payment = Payment(
        subscription_id=subscription.id,
        amount=data['amount'],
        method=data['method'],
        paid_at=datetime.utcnow(),
        status=data['status']
    )
    if not payment.subscription_id:
        db.session.rollback()
        return jsonify({"error": "Subscripción no encontrada"}), 400

    db.session.add(payment)
    db.session.commit()

    return jsonify(payment.serialize()), 201


@api.route('/payments/<int:pid>', methods=['PUT'])
def update_payment(pid):
    p = Payment.query.get(pid)
    if not p:
        abort(404, description="pago no encontrado")
    data = request.get_json() or {}
    updatable = ('subscription_id', 'amount', 'method', 'paid_at', 'status')
    if not any(f in data for f in updatable):
        raise APIException(
            f"Faltan campos obligatorios de pago", status_code=400)
    for field in updatable:
        if field in data:
            setattr(p, field, data[field])
    db.session.commit()
    return jsonify(p.serialize()), 200


@api.route('/payment/<int:pid>', methods=['DELETE'])
def delete_payment(pid):
    p = Payment.query.get(pid)
    if not p:
        abort(404, description="No se ha encontado el pago")
    db.session.delete(p)
    db.session.commit()
    return '', 204


@api.route('/session-status', methods=['GET'])
def session_status():
    session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

    return jsonify(status=session.status, customer_email=session.customer_details.email)


@api.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    try:
        body = request.json
        if not body or 'items' not in body:
            return jsonify({"error": "Invalid request, 'items' is required"}), 400
        session = stripe.checkout.Session.create(
            ui_mode='embedded',
            line_items=body['items'],
            mode='payment',
            # implementar un webhook para que se ejecute una funcion cuando se complete el pago
            return_url=str(os.getenv("FRONT")) +
            'return?session_id={CHECKOUT_SESSION_ID}',
        )
    except Exception as e:
        print(str(e))
        return str(e)

    return jsonify({"clientSecret": session.client_secret})


# EVENTS

@api.route('/events', methods=['GET'])
def list_events():
    evs = Event.query.all()
    return jsonify([e.serialize() for e in evs]), 200


@api.route('/events/<int:eid>', methods=['GET'])
def get_events(eid):
    evs = Event.query.get(eid)
    if not evs:
        abort(404, description="No se ha encontrado el evento")
    return jsonify(evs.serialize()), 200


@api.route('/events', methods=['POST'])
def create_event():
    data = request.get_json() or {}
    required = ('nombre', 'creator_id', 'fecha_inicio')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos: {','.join(required)}", status_code=400)
    evs = Event(
        nombre=data['nombre'],
        creator_id=data['creator_id'],
        description=data.get('description'),
        fecha_inicio=data['fecha_inicio'],
        fecha_fin=data.get('fecha_fin'),
        ubicacion=data.get('ubicacion'),
        capacidad=data.get('capacidad')
    )
    db.session.add(evs)
    db.session.commit()
    return jsonify(evs.serialize()), 200


@api.route('/events/<int:eid>', methods=['PUT'])
def update_event(eid):
    evs = Event.query.get(eid)
    if not evs:
        abort(404, description=f"No se ha encontrado el evento")
    data = request.get_json() or {}
    updatable = ('nombre', 'descripcion', 'fecha_inicio',
                 'fecha_fin', 'ubicacion', 'capacidad')
    if not any(f in data for f in updatable):
        raise APIException(f"Faltan datos para actualizar", status_code=400)
    for field in updatable:
        if field in data:
            setattr(evs, field, data[field])
    db.session.commit()
    return jsonify(evs.serialize()), 200


@api.route('/events/<int:eid>', methods=['DELETE'])
def delete_event(eid):
    evs = Event.query.get(eid)
    if not evs:
        abort(404, description="No se ha encontrado el evento")
    db.session.delete(evs)
    db.session.commit()
    return '', 204

# Eevents Signup


@api.route('/event_signups', methods=['GET'])
def list_event_signups():
    siups = EventSignup.query.all()
    return jsonify([s.serialize() for s in siups]), 200


@api.route('/event_signups/<int:esid>', methods=['GET'])
def get_event_signup(esid):
    siup = EventSignup.query.get(esid)
    if not siup:
        abort(404, description="Inscripcion a evento no encontrada")
    return jsonify(siup.serialize()), 200


@api.route('/event_signups', methods=['POST'])
def create_sign_up():
    data = request.get_json() or {}
    required = ('event_id', 'user_id', 'estado')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos: {', '.join(required)}", status_code=400)
    siup = EventSignup(
        event_id=data['event_id'],
        user_id=data['user_id'],
        estado=data['estado']
    )
    db.session.add(siup)
    db.session.commit()
    return jsonify(siup.serialize()), 200


@api.route('/event_signups/<int:esid>', methods=['PUT'])
def update_event_signup(esid):
    evsup = EventSignup.query.get(esid)
    if not evsup:
        abort(404, description="No se ha encontado la inscripcion")
    data = request.get_json() or {}
    updatable = ('event_id', 'user_id', 'estado')
    if not any(f in data for f in updatable):
        raise APIException(f"Faltan campos para actualizar", status_code=400)
    for field in updatable:
        if field in data:
            setattr(evsup, field, data[field])
    db.session.commit()
    return jsonify(evsup.serialize()), 204


@api.route('/event_signups/<int:esid>', methods=['DELETE'])
def delete_event_signup(esid):
    evsup = EventSignup.query.get(esid)
    if not evsup:
        abort(404, description="No se ha encontado la inscripcion")
    db.session.delete(evsup)
    db.session.commit()
    return '', 204

# SUPPORT TIKETS


@api.route('/support_tickets', methods=['GET'])
def list_support_tickets():
    st = SupportTicket.query.all()
    return jsonify([s.serialize() for s in st]), 200


@api.route('/support_tickets/<int:stid>', methods=['GET'])
def get_support_ticket(stid):
    st = SupportTicket.query.get(stid)
    if not st:
        abort(404, description="No se ha encontrado el ticket")
    return jsonify(st.serialize()), 200


@api.route('/support_tickets', methods=['POST'])
def create_support_ticket():
    data = request.get_json() or {}
    required = ('user_id', 'asunto', 'mensaje')
    if not all(f in data for f in required):
        raise APIException(
            f"Faltan campos obligatorios: {', '.join(required)}", status_code=400)
    st = SupportTicket(
        user_id=data['user_id'],
        asunto=data['asunto'],
        mensaje=data['mensaje'],
        status=data.get('status', 'abierto')
    )
    db.session.add(st)
    db.session.commit()
    return jsonify(st.serialize()), 200


@api.route('/support_tickets/<int:stid>', methods=['PUT'])
def update_support_ticket(stid):
    st = SupportTicket.query.get(stid)
    if not st:
        abort(404, description="No se ha encontado el ticket")
    data = request.get_json() or {}
    updatable = ('status', 'asunto', 'mensaje')
    if not any(f in data for f in updatable):
        raise APIException(
            f"Faltan datos para actualizar ticket", status_code=400)
    for field in updatable:
        if field in data:
            setattr(st, field, data[field])
    db.session.commit()
    return jsonify(st.serialize()), 200


@api.route('/support_tickets/<int:stid>', methods=['DELETE'])
def delete_support_ticket(stid):
    st = SupportTicket.query.get(stid)
    if not st:
        abort(404, description="No se ha encontado el ticket")
    db.session.delete(st)
    db.session.commit()
    return '', 200


#### register #####
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "missing data"}), 400

    user = db.session.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()
    if not user:
        return jsonify({"error": "email not found"}), 404

    if not check_password_hash(user.password, password):
        return jsonify({"success": False, "msg": "email/password wrong"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
        "msg": "login ok",
        "token": token,
        "success": True,
        "user": user.serialize()
    }), 200


# ruta protegida


@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_inf():
    try:
        id = get_jwt_identity()
        stm = select(User).where(User.id == id)
        user = db.session.execute(stm).scalar_one_or_none()
        if not user:
            return jsonify({"msg": "what tha hell?"}), 418
        return jsonify(user.serialize())
    except Exception as e:
        print(e)
        return jsonify({"error": "something went wrong"})


@api.route('/register', methods=['POST'])
def register():
    try:
        data = request.json

        if not data['email'] or not data['password']:
            return jsonify({"error": 'missing data'})

        stm = select(User).where(User.email == data['email'])
        existing_user = db.session.execute(stm).scalar_one_or_none()
        if existing_user:
            return jsonify({"error": 'email taken, try logging in'})

        hashed_password = generate_password_hash(data['password'])
        is_professional = data.get('isProfessional', False)

        new_user = User(
            email=data['email'],
            password=hashed_password,
            is_active=True,
            is_professional=is_professional
        )

        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=str(new_user.id))

        return jsonify({"msg": "register ok", "token": token, "success": True}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({"error": "something went wrong", "success": False}), 400


@api.route('/training_entries', methods=['GET'])
@jwt_required()
def list_training_entries():
    user_id = get_jwt_identity()
    stm = select(TrainingEntry).where(TrainingEntry.profesional_id == user_id)
    entries = db.session.execute(stm).scalars.all()
    return jsonify([e.serialize() for e in entries]), 200


@api.route('/training_entries/<int:user_id>', methods=['GET'])
@jwt_required()
def get_training_entry(user_id):
    professional_id = get_jwt_identity()
    TrainingEntries = TrainingEntry.query.filter_by(
        user_id=user_id,
        profesional_id=professional_id
    ).all()
    if not TrainingEntries:
        return jsonify({"error": "No se encuentra el plan entrenamiento para este usuario"}), 404
    TrainingEntries_serialized = [entry.serialize()
                                  for entry in TrainingEntries]
    return jsonify(TrainingEntries_serialized), 200

@api.route('/user/training_entries', methods=['GET'])
@jwt_required()
def get_my_training_entries():
    user_id = get_jwt_identity()
    TrainingEntries = TrainingEntry.query.filter_by(
        user_id=user_id,
    ).all()
    if not TrainingEntries:
        return jsonify({"error": "No se encuentra el plan entrenamiento para este usuario"}), 404
    TrainingEntries_serialized = [entry.serialize()
                                  for entry in TrainingEntries]
    return jsonify(TrainingEntries_serialized), 200


@api.route('/training_entries', methods=['POST'])
@jwt_required()
def create_training_entry():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    exists = TrainingEntry.query.filter_by(
        user_id=data["userId"],
        profesional_id=user_id
    ).first()
    if exists:
        return jsonify({"error": "Ya existe un plan entrenamiento para este usuario"}), 400
    for dia in data["plan"]:
        entry = TrainingEntry(
            user_id=data["userId"],
            profesional_id=user_id,
            dia_semana=dia,
            grupo=data["plan"][dia].get('Grupo'),
            nota=data["plan"][dia].get('Nota'),
        )
        db.session.add(entry)
        db.session.commit()
        TrainingEntries = TrainingEntry.query.filter_by(
            user_id=data["userId"],
            profesional_id=user_id,
        ).all()
        TrainingEntries_serialized = [
            entry.serialize() for entry in TrainingEntries]
    return jsonify({"message": "Plan entrenamiento creado correctamente", "Training_entry_list": TrainingEntries_serialized}), 201


@api.route('/training_entries/<int:entry_id>', methods=['PUT'])
@jwt_required()
def update_training_entry(entry_id):
    user_id = get_jwt_identity()
    entry = TrainingEntry.query.filter_by(id=entry_id).first()
    data = request.get_json() or {}
    for key, value in data.items():
        setattr(entry, key, value)
    db.session.commit()
    return jsonify(entry.serialize()), 200


@api.route('/training_entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_training_entry(entry_id):
    user_id = get_jwt_identity()
    entry = TrainingEntry.query.get(entry_id)
    if not entry or str(entry.user_id) != user_id:
        abort(404, description="No se encuentra la entrada de nutricion")
    db.session.delete(entry)
    db.session.commit()
    return '', 204


@api.route('/nutrition_entries', methods=['GET'])
@jwt_required()
def list_nutrition_entries():
    user_id = get_jwt_identity()
    stm = select(NutritionEntry).where(
        NutritionEntry.profesional_id == user_id)
    entries = db.session.execute(stm).scalars.all()
    return jsonify([e.serialize() for e in entries]), 200


@api.route('/nutrition_entries/<int:user_id>', methods=['GET'])
@jwt_required()
def get_nutrition_entries_for_user(user_id):
    professional_id = get_jwt_identity()
    NutritionEntries = NutritionEntry.query.filter_by(
        user_id=user_id,
        profesional_id=professional_id
    ).all()
    if not NutritionEntries:
        return jsonify({"error": "No se encuentra el plan nutricional para este usuario"}), 404
    NutritionEntries_serialized = [entry.serialize()
                                   for entry in NutritionEntries]
    return jsonify(NutritionEntries_serialized), 200


@api.route('/user/nutrition_entries', methods=['GET'])
@jwt_required()
def get_my_nutrition_entries():
    user_id = get_jwt_identity()

    NutritionEntries = NutritionEntry.query.filter_by(
        user_id=user_id,
    ).all()
    if not NutritionEntries:
        return jsonify({"error": "No se encuentra el plan nutricional para este usuario"}), 404
    NutritionEntries_serialized = [entry.serialize()
                                   for entry in NutritionEntries]
    return jsonify(NutritionEntries_serialized), 200


@api.route('/nutrition_entries', methods=['POST'])
@jwt_required()
def create_nutrition_entry():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    exists = NutritionEntry.query.filter_by(
        user_id=data["userId"],
        profesional_id=user_id
    ).first()
    if exists:
        return jsonify({"error": "Ya existe un plan nutricional para este usuario"}), 400
    for dia in data["plan"]:
        entry = NutritionEntry(
            user_id=data["userId"],
            profesional_id=user_id,
            dia_semana=dia,
            desayuno=data["plan"][dia].get('Desayuno'),
            media_mañana=data["plan"][dia].get('Almuerzo'),
            comida=data["plan"][dia].get('Comida'),
            cena=data["plan"][dia].get('Cena')
        )
        db.session.add(entry)
        db.session.commit()
        NutritionEntries = NutritionEntry.query.filter_by(
            user_id=data["userId"],
            profesional_id=user_id,
        ).all()
        NutritionEntries_serialized = [
            entry.serialize() for entry in NutritionEntries]
    return jsonify({"message": "Plan nutricional creado correctamente", "Nutrition_entry_list": NutritionEntries_serialized}), 201


@api.route('/nutrition_entries/<int:entry_id>', methods=['PUT'])
@jwt_required()
def update_nutrition_entry(entry_id):
    user_id = get_jwt_identity()
    entry = NutritionEntry.query.filter_by(id=entry_id).first()
    print(entry)
    data = request.get_json() or {}
    for key, value in data.items():
        setattr(entry, key, value)
    db.session.commit()
    return jsonify(entry.serialize()), 200


@api.route('/nutrition_entries/<int:entry_id>', methods=['DELETE'])
@jwt_required()
def delete_nutrition_entry(entry_id):
    user_id = get_jwt_identity()
    entry = NutritionEntry.query.get(entry_id)
    if not entry or str(entry.user_id) != user_id:
        abort(404, description="No se encuentra la entrada de nutricion")
    db.session.delete(entry)
    db.session.commit()
    return '', 204
