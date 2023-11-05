"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorite, Component, Plan, Payment
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt() 

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# # # # # USER 👨👨👨👨👨👨

# USER SIGNUP
@api.route('/signup', methods=['POST'])
def signup_user():
    body = json.loads(request.data)
    #pw_hash = current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8') # NO

    # user exist ?
    user = User.query.filter_by(email=body["email"]).first()
    if user is None:  
        # hashing the password
        #hashed_password = bcrypt.hashpw(body["password"].encode('utf-8'), bcrypt.gensalt()) # NO
        #hashed_password = api.bcrypt.generate_password_hash(body["password"]).decode('utf-8') # NO
        hashed_password = bcrypt.generate_password_hash(body["password"]).decode('utf-8')

        new_user = User(
            name=body["name"],
            last_name=body["last_name"],
            email=body["email"],
            #password=body["password"],
            password= hashed_password,
            is_active=body["is_active"],
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User created."}), 200
    
    return jsonify({"msg": "User already exists."}), 400


# USER LOGIN
@api.route('/login', methods=['POST'])  
def login_user():

  email = request.json.get('email', None)
  password = request.json.get('password', None)

  user = User.query.filter_by(email=email).first()
  if not user or not bcrypt.check_password_hash(user.password, password): #check hashed password
    return jsonify({'msg': 'Invalid username/password'}), 401

  access_token = create_access_token(identity=email)
  return jsonify(access_token=access_token)


# muestra todos los usuarios
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    # email=get_jwt_identity()
    user = User.query.all()
    results = list(map(lambda usuarios: usuarios.serialize(), user))

    if user is None:
        return jsonify({"msg": "no existen usuarios"}), 404
    return jsonify(results), 200

# SEARCH ONE USER
@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_one_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    response_body = {"msg": "Component:",
                     "results": user.serialize()}

    return jsonify(response_body), 200


# Modifica un Usuario por id
@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_users(user_id):
    body = json.loads(request.data)
    # busca que el usuario exista
    user = User.query.filter_by(id=user_id).first()

    if user is None:
        return jsonify({"msg": "no existe el usuario"}), 404
    if "name" in body:
        user.name = body["name"]
    if "last_name" in body:
        user.last_name = body["last_name"]
    if "password" in body:
        user.password = body["password"]
    if "is_active" in body:
        user.is_active = body["is_active"]

    db.session.commit()
    return jsonify({"msg": "usuario modificado"}), 200

# Borra usuario por id
@api.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    else:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted"}), 200

 # Validacion del Token

@api.route("/valid-token", methods=["GET"])
@jwt_required()
def valid_token():
    current_user = get_jwt_identity()
    return jsonify({"is_login":True}), 200




# # # # # Favorite 🔳🔳🔳🟧🟨🟩🟦

# muestra todos los favoritos
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorite():
    # email=get_jwt_identity()
    favorites = Favorite.query.all()
    results = list(map(lambda favoritos: favoritos.serialize(), favorites))

    if favorites is None:
        return jsonify({"msg": "no existen favoritos"}), 404
    return jsonify(results), 200


# Crea un  favorito
@api.route('/favorites', methods=['POST'])
# @jwt_required()
def add_favorite():
    body = json.loads(request.data)
    new_favorite = Favorite(
        id_user=body["id_user"],
        id_component=body["id_component"]
    )

    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({"msg": "favorite Create"}), 200


# Borra un favorite por id
@api.route('/favorite/<int:favorite_id>', methods=['DELETE'])
# @jwt_required()
def delete_favorite(favorite_id):

    favorite = Favorite.query.get(favorite_id)
    if not favorite:
        return jsonify({"msg": "Favorite not found"}), 404
    else:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"msg": "Favorite  deleted"}), 200


# Modifica  el favorito por id
@api.route('/favorite/<int:favorite_id>', methods=['PUT'])
# @jwt_required()
def update_favorite(favorite_id):
    body = json.loads(request.data)
    # busca que el favorite exista
    favorite = Favorite.query.filter_by(id=favorite_id).first()

    if favorite is None:
        return jsonify({"msg": "no existe el Favorite"}), 404

    if  "id_user"  in body:
        favorite.id_user  = body["id_user"]

    if "id_component" in body:
        favorite.id_component = body["id_component"]

   
    db.session.commit()
    return jsonify({"msg": "Favorite Modificado"}), 200

# # # # # Payment 🔳🔳🔳🟧🟨🟩🟦


# muestra todos los pagos
@api.route('/payment', methods=['GET'])
# @jwt_required()
def get_payment():
    # email=get_jwt_identity()
    payment = Payment.query.all()
    results = list(map(lambda payment: payment.serialize(), payment))

    if payment is None:
        return jsonify({"msg": "no existen payment"}), 404
    return jsonify(results), 200


# Crea un  Payment
@api.route('/payment', methods=['POST'])
# @jwt_required()
def add_payment():
    body = json.loads(request.data)
    new_payment = Payment(
        id_user=body["id_user"],
        plan_start_date =body["plan_start_date"],
        plan_end_date =body["plan_end_date"],
        id_plan =body["id_plan"]
    )


    db.session.add(new_payment)
    db.session.commit()
    return jsonify({"msg": "Payment Create"}), 200



# # Modifica  el Payment por id
@api.route('/payment/<int:payment_id>', methods=['PUT'])
# @jwt_required()
def update_Payment(payment_id):
    body = json.loads(request.data)
    # busca que el payment exista
    payment= Payment.query.filter_by(id=payment_id).first()

    if payment is None:
        return jsonify({"msg": "no existe el Payment"}), 404

    if "id_user" in body:
        payment.id_user = body["id_user"]

    if "id_plan" in body:
        payment.id_plan = body["id_plan"]

    if "plan_start_date" in body:
        payment.plan_start_date = body["plan_start_date"]
        
    if "plan_end_date" in body:
        payment.plan_end_date = body["plan_end_date"]

   
    db.session.commit()
    return jsonify({"msg":"Payment Modificado"}), 200



# # Borra un  payment por id
@api.route('/payment/<int:payment_id>', methods=['DELETE'])
# @jwt_required()
def delete_payment(payment_id):

    payment = Payment.query.get(payment_id)
    if not payment:
        return jsonify({"msg": "payment not found"}), 404
    else:
        db.session.delete(payment)
        db.session.commit()
        return jsonify({"msg": "payment  deleted"}), 200







# @api.route('/favorites', methods=['POST'])
# # @jwt_required()
# def add_favorite():
#     body = json.loads(request.data)
#     new_favorite = Favorite(
#         id_user=body["id_user"],
#         id_component=body["id_component"]
#     )

#     db.session.add(new_favorite)
#     db.session.commit()
#     return jsonify({"msg": "favorite Create"}), 200






# # # # # Plans 🔳🔳🔳🟧🟨🟩🟦

# muestra todos los plan
@api.route('/plan', methods=['GET'])
# @jwt_required()
def get_plan():
    # email=get_jwt_identity()
    plan = Plan.query.all()
    results = list(map(lambda plan: plan.serialize(), plan))

    if plan is None:
        return jsonify({"msg": "no existen plan"}), 404
    return jsonify(results), 200


# Crea un  plan
@api.route('/plan', methods=['POST'])
# @jwt_required()
def add_plan():
    body = json.loads(request.data)
    new_plan = Plan(
        plan_type_name = body["plan_type_name"],
        price = body["price"],
        description= body["description"]
    ) 

    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"msg": "plan Create"}), 200


# Modifica  el plan 
@api.route('/plan/<int:plan_id>', methods=['PUT'])
# @jwt_required()
def update_plan(plan_id):
    body = json.loads(request.data)
    # busca que el plan exista
    plan = Plan.query.filter_by(id=plan_id).first()

    if plan is None:
        return jsonify({"msg": "no existe el Plan"}), 404

    if "plan_type_name" in body:
        plan.plan_type_name = body["plan_type_name"]

    if "price" in body:
        plan.price = body["price"]

    if "description" in body:
        plan.description= body["description"]

    db.session.commit()
    return jsonify({"msg": "Plan Modificado"}), 200
 


# Borra un plan por id
@api.route('/plan/<int:plan_id>', methods=['DELETE'])
# @jwt_required()
def delete_plan(plan_id):

    plan = Plan.query.get(plan_id)
    if not plan:
        return jsonify({"msg": "Plan not found"}), 404
    else:
        db.session.delete(plan)
        db.session.commit()
        return jsonify({"msg": "Plan  deleted"}), 200



# # # # # COMPONENT 🔳🔳🔳🟧🟨🟩🟦

@api.route('/components', methods = ['GET'])
def get_components():
    # /components?page=1&per_page=10 #get first page, 10 components.
    # /components?page=2&per_page=10 #get second page, 10 components.

    page=request.args.get('page', default = 1, type = int)
    per_page=request.args.get('per_page', default = 10, type = int)

    start_index=(page - 1) * per_page
    end_index=start_index + per_page

    component_query=Component.query.slice(
        start_index, end_index).all()  # Pagination
    # component_query = Component.query.all() # No pagination

    results=list(map(lambda item: item.serialize(), component_query))
    response_body= {"msg": "All components:",
                     "results": results}

    return jsonify(response_body), 200


@ api.route('/component/<int:component_id>', methods=['GET'])
def get_one_component(component_id):

    component = Component.query.filter_by(id=component_id).first()
    if not component:
        return jsonify({"msg": "Component not found"}), 404

    response_body = {"msg": "Component:",
                     "results": component.serialize()}

    return jsonify(response_body), 200


@ api.route('/component/add', methods=['POST'])  # TODO >> only admin jwt
def add_component():
    request_body = request.get_json(force=True)
    

    new_component = Component(
                                name = request_body["name"],
                                type = request_body["type"],
                                html_code = request_body["html_code"],
                                css_code = request_body["css_code"],
                                js_code = request_body["js_code"],
                                react_code = request_body["react_code"],
                             )

    db.session.add(new_component)
    db.session.commit()
   
    return { "msg": "Component created", 
            "response": new_component.serialize()
            }


@api.route('/component/delete/<int:component_id>', methods=['DELETE']) # TODO >> only admin jwt
def delete_component(component_id):
    # component exist ?
    component = Component.query.get(component_id)
    if not component:
        return jsonify({"msg": "Component not found"}), 404
    else:
        db.session.delete(component)
        db.session.commit()
        return jsonify({"msg": f"Component {component_id} has been removed from database"}), 200


@api.route('/component/update/<int:component_id>', methods=['PUT'])  # TODO >> only admin jwt
def update_component(component_id):
    # component exist ?
    component = Component.query.get(component_id)
    if not component:
        return jsonify({"msg": "Component not found"}), 404

    request_body = request.get_json(force=True)

    # Update the component attributes
    component.name = request_body.get("name", component.name)
    component.type = request_body.get("type", component.type)
    component.html_code = request_body.get("html_code", component.html_code)
    component.css_code = request_body.get("css_code", component.css_code)
    component.js_code = request_body.get("js_code", component.js_code)
    component.react_code = request_body.get("react_code", component.react_code)

    db.session.commit()

    return jsonify({"msg": f"Component {component_id} has been updated",
                    "response": component.serialize() }), 200


