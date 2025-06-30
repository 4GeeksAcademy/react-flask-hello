"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_current_user
from api.models import db, User, Product, CartItem, Order, OrderItem, CategoryEnum, OrderStatusEnum
from api.utils import APIException
from email_validator import validate_email, EmailNotValidError
from sqlalchemy import or_
import stripe
import os

# Configurar Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

api = Blueprint('api', __name__)

# ================== RUTAS DE AUTENTICACIÓN ==================

@api.route('/register', methods=['POST'])
def register():
    try:
        body = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if field not in body or not body[field]:
                raise APIException(f"El campo {field} es requerido", status_code=400)
        
        # Validar email
        try:
            validate_email(body['email'])
        except EmailNotValidError:
            raise APIException("Email no válido", status_code=400)
        
        # Verificar si el email ya existe
        if User.query.filter_by(email=body['email']).first():
            raise APIException("El email ya está registrado", status_code=400)
        
        # Validar contraseña
        if len(body['password']) < 6:
            raise APIException("La contraseña debe tener al menos 6 caracteres", status_code=400)
        
        # Crear usuario
        user = User(
            email=body['email'],
            first_name=body['first_name'],
            last_name=body['last_name'],
            phone=body.get('phone'),
            address=body.get('address'),
            city=body.get('city'),
            postal_code=body.get('postal_code')
        )
        user.set_password(body['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Crear token de acceso
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            "message": "Usuario registrado exitosamente",
            "user": user.serialize(),
            "access_token": access_token
        }), 201
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error interno del servidor: {str(e)}", status_code=500)

@api.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        
        if not body.get('email') or not body.get('password'):
            raise APIException("Email y contraseña son requeridos", status_code=400)
        
        # Buscar usuario
        user = User.query.filter_by(email=body['email']).first()
        
        if not user or not user.check_password(body['password']):
            raise APIException("Credenciales inválidas", status_code=401)
        
        if not user.is_active:
            raise APIException("Cuenta desactivada", status_code=401)
        
        # Crear token de acceso
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            "message": "Login exitoso",
            "user": user.serialize(),
            "access_token": access_token
        }), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error interno del servidor: {str(e)}", status_code=500)

# ================== RUTAS DE USUARIO ==================

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user = get_current_user()
        return jsonify(current_user.serialize()), 200
    except Exception as e:
        raise APIException(f"Error al obtener perfil: {str(e)}", status_code=500)

@api.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user = get_current_user()
        body = request.get_json()
        
        # Actualizar campos permitidos
        allowed_fields = ['first_name', 'last_name', 'phone', 'address', 'city', 'postal_code']
        for field in allowed_fields:
            if field in body:
                setattr(current_user, field, body[field])
        
        # Validar email si se proporciona
        if 'email' in body:
            try:
                validate_email(body['email'])
                # Verificar que el email no esté en uso por otro usuario
                existing_user = User.query.filter_by(email=body['email']).first()
                if existing_user and existing_user.id != current_user.id:
                    raise APIException("El email ya está en uso", status_code=400)
                current_user.email = body['email']
            except EmailNotValidError:
                raise APIException("Email no válido", status_code=400)
        
        db.session.commit()
        
        return jsonify({
            "message": "Perfil actualizado exitosamente",
            "user": current_user.serialize()
        }), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al actualizar perfil: {str(e)}", status_code=500)

@api.route('/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    try:
        current_user = get_current_user()
        
        # Marcar como inactivo en lugar de eliminar
        current_user.is_active = False
        db.session.commit()
        
        return jsonify({"message": "Cuenta desactivada exitosamente"}), 200
        
    except Exception as e:
        raise APIException(f"Error al desactivar cuenta: {str(e)}", status_code=500)

# ================== RUTAS DE PRODUCTOS ==================

@api.route('/products', methods=['GET'])
def get_products():
    try:
        # Parámetros de filtro y paginación
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 12, type=int)
        category = request.args.get('category')
        search = request.args.get('search')
        
        # Construir query
        query = Product.query.filter_by(is_active=True)
        
        if category:
            query = query.filter(Product.category == CategoryEnum(category))
        
        if search:
            query = query.filter(or_(
                Product.name.ilike(f'%{search}%'),
                Product.description.ilike(f'%{search}%')
            ))
        
        # Paginación
        products = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            "products": [product.serialize() for product in products.items],
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total": products.total,
                "pages": products.pages,
                "has_next": products.has_next,
                "has_prev": products.has_prev
            }
        }), 200
        
    except Exception as e:
        raise APIException(f"Error al obtener productos: {str(e)}", status_code=500)

@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = Product.query.filter_by(id=product_id, is_active=True).first()
        
        if not product:
            raise APIException("Producto no encontrado", status_code=404)
        
        return jsonify(product.serialize()), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al obtener producto: {str(e)}", status_code=500)

@api.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = [{"value": category.value, "label": category.value.title()} 
                     for category in CategoryEnum]
        return jsonify(categories), 200
    except Exception as e:
        raise APIException(f"Error al obtener categorías: {str(e)}", status_code=500)

# ================== RUTAS DE CARRITO ==================

@api.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    try:
        current_user = get_current_user()
        cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
        
        total = sum(item.product.price * item.quantity for item in cart_items if item.product)
        
        return jsonify({
            "items": [item.serialize() for item in cart_items],
            "total": float(total),
            "count": len(cart_items)
        }), 200
        
    except Exception as e:
        raise APIException(f"Error al obtener carrito: {str(e)}", status_code=500)

@api.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    try:
        current_user = get_current_user()
        body = request.get_json()
        
        if not body.get('product_id'):
            raise APIException("ID del producto es requerido", status_code=400)
        
        product_id = body['product_id']
        quantity = body.get('quantity', 1)
        
        # Verificar que el producto existe y está activo
        product = Product.query.filter_by(id=product_id, is_active=True).first()
        if not product:
            raise APIException("Producto no encontrado", status_code=404)
        
        # Verificar stock
        if product.stock < quantity:
            raise APIException("Stock insuficiente", status_code=400)
        
        # Verificar si el item ya está en el carrito
        existing_item = CartItem.query.filter_by(
            user_id=current_user.id, 
            product_id=product_id
        ).first()
        
        if existing_item:
            # Actualizar cantidad
            new_quantity = existing_item.quantity + quantity
            if product.stock < new_quantity:
                raise APIException("Stock insuficiente", status_code=400)
            existing_item.quantity = new_quantity
        else:
            # Crear nuevo item
            cart_item = CartItem(
                user_id=current_user.id,
                product_id=product_id,
                quantity=quantity
            )
            db.session.add(cart_item)
        
        db.session.commit()
        
        return jsonify({"message": "Producto agregado al carrito"}), 201
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al agregar al carrito: {str(e)}", status_code=500)

@api.route('/cart/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    try:
        current_user = get_current_user()
        body = request.get_json()
        
        cart_item = CartItem.query.filter_by(
            id=item_id, 
            user_id=current_user.id
        ).first()
        
        if not cart_item:
            raise APIException("Item no encontrado", status_code=404)
        
        quantity = body.get('quantity', 1)
        
        # Verificar stock
        if cart_item.product.stock < quantity:
            raise APIException("Stock insuficiente", status_code=400)
        
        cart_item.quantity = quantity
        db.session.commit()
        
        return jsonify({"message": "Carrito actualizado"}), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al actualizar carrito: {str(e)}", status_code=500)

@api.route('/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(item_id):
    try:
        current_user = get_current_user()
        
        cart_item = CartItem.query.filter_by(
            id=item_id, 
            user_id=current_user.id
        ).first()
        
        if not cart_item:
            raise APIException("Item no encontrado", status_code=404)
        
        db.session.delete(cart_item)
        db.session.commit()
        
        return jsonify({"message": "Item eliminado del carrito"}), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al eliminar del carrito: {str(e)}", status_code=500)

# ================== RUTAS DE PAGO ==================

@api.route('/create-payment-intent', methods=['POST'])
@jwt_required()
def create_payment_intent():
    try:
        current_user = get_current_user()
        body = request.get_json()
        
        # Obtener items del carrito
        cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
        
        if not cart_items:
            raise APIException("Carrito vacío", status_code=400)
        
        # Calcular total
        total = sum(item.product.price * item.quantity for item in cart_items)
        
        # Crear payment intent en Stripe
        intent = stripe.PaymentIntent.create(
            amount=int(total * 100),  # Stripe usa centavos
            currency='usd',
            metadata={
                'user_id': current_user.id,
                'user_email': current_user.email
            }
        )
        
        return jsonify({
            'client_secret': intent.client_secret,
            'amount': float(total)
        }), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al crear intento de pago: {str(e)}", status_code=500)

@api.route('/confirm-payment', methods=['POST'])
@jwt_required()
def confirm_payment():
    try:
        current_user = get_current_user()
        body = request.get_json()
        
        payment_intent_id = body.get('payment_intent_id')
        shipping_address = body.get('shipping_address')
        
        if not payment_intent_id or not shipping_address:
            raise APIException("Datos de pago incompletos", status_code=400)
        
        # Obtener items del carrito
        cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
        
        if not cart_items:
            raise APIException("Carrito vacío", status_code=400)
        
        # Calcular total
        total = sum(item.product.price * item.quantity for item in cart_items)
        
        # Crear orden
        order = Order(
            user_id=current_user.id,
            total_amount=total,
            stripe_payment_intent_id=payment_intent_id,
            shipping_address=shipping_address,
            status=OrderStatusEnum.PROCESSING
        )
        db.session.add(order)
        db.session.flush()  # Para obtener el ID de la orden
        
        # Crear items de la orden y actualizar stock
        for cart_item in cart_items:
            # Verificar stock nuevamente
            if cart_item.product.stock < cart_item.quantity:
                raise APIException(f"Stock insuficiente para {cart_item.product.name}", status_code=400)
            
            # Crear item de orden
            order_item = OrderItem(
                order_id=order.id,
                product_id=cart_item.product_id,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            db.session.add(order_item)
            
            # Actualizar stock
            cart_item.product.stock -= cart_item.quantity
        
        # Limpiar carrito
        for cart_item in cart_items:
            db.session.delete(cart_item)
        
        db.session.commit()
        
        return jsonify({
            "message": "Pago confirmado exitosamente",
            "order": order.serialize()
        }), 200
        
    except APIException as e:
        db.session.rollback()
        raise e
    except Exception as e:
        db.session.rollback()
        raise APIException(f"Error al confirmar pago: {str(e)}", status_code=500)

# ================== RUTAS DE ÓRDENES ==================

@api.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    try:
        current_user = get_current_user()
        orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at.desc()).all()
        
        return jsonify([order.serialize() for order in orders]), 200
        
    except Exception as e:
        raise APIException(f"Error al obtener órdenes: {str(e)}", status_code=500)

@api.route('/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    try:
        current_user = get_current_user()
        order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()
        
        if not order:
            raise APIException("Orden no encontrada", status_code=404)
        
        return jsonify(order.serialize()), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al obtener orden: {str(e)}", status_code=500)

# ================== RUTAS ADMIN (CRUD PRODUCTOS) ==================

@api.route('/admin/products', methods=['POST'])
@jwt_required()
def create_product():
    try:
        # Nota: En producción, deberías verificar que el usuario sea admin
        body = request.get_json()
        
        required_fields = ['name', 'price', 'stock', 'category']
        for field in required_fields:
            if field not in body:
                raise APIException(f"El campo {field} es requerido", status_code=400)
        
        # Validar categoría
        try:
            category = CategoryEnum(body['category'])
        except ValueError:
            raise APIException("Categoría inválida", status_code=400)
        
        product = Product(
            name=body['name'],
            description=body.get('description'),
            price=body['price'],
            stock=body['stock'],
            category=category,
            image_url=body.get('image_url')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            "message": "Producto creado exitosamente",
            "product": product.serialize()
        }), 201
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al crear producto: {str(e)}", status_code=500)

@api.route('/admin/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    try:
        product = Product.query.get(product_id)
        
        if not product:
            raise APIException("Producto no encontrado", status_code=404)
        
        body = request.get_json()
        
        # Actualizar campos permitidos
        allowed_fields = ['name', 'description', 'price', 'stock', 'image_url', 'is_active']
        for field in allowed_fields:
            if field in body:
                setattr(product, field, body[field])
        
        # Manejar categoría
        if 'category' in body:
            try:
                product.category = CategoryEnum(body['category'])
            except ValueError:
                raise APIException("Categoría inválida", status_code=400)
        
        db.session.commit()
        
        return jsonify({
            "message": "Producto actualizado exitosamente",
            "product": product.serialize()
        }), 200
        
    except APIException as e:
        raise e
    except Exception as e:
        raise APIException(f"Error al actualizar producto: {str(e)}", status_code=500)

@api.route('/admin/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    try:
        product = Product.query.get(product_id)
        
        if not product:
            raise APIException("Producto no encontrado", status_code=404)
        
        # Marcar como inactivo en lugar de eliminar
        product.is_active = False
        db.session.commit()
        
        return jsonify({"message": "Producto eliminado exitosamente"}), 200
        
    except Exception as e:
        raise APIException(f"Error al eliminar producto: {str(e)}", status_code=500)