from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_token
from flask_cors import CORS
from ..supabase_client import supabase


api = Blueprint('user', __name__)

# Allow CORS requests to this API
CORS(api)

# Registrar


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Validaciones básicas
    required_fields = ['email', 'password']
    missing_fields = [
        field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({"error": f"Faltan campos obligatorios: {', '.join(missing_fields)}"}), 400

    if '@' not in data['email'] or '.' not in data['email']:
        return jsonify({"error": "Email no válido"}), 400

    if len(data['password']) < 6:
        return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

    telefono = data.get('telefono')
    if telefono and (not telefono.isdigit() or len(telefono) < 7):
        return jsonify({"error": "Teléfono no válido"}), 400

    email = data['email']
    password = data['password']

    # Crear usuario en Supabase Auth
    auth_response = supabase.auth.sign_up({
        "email": email,
        "password": password,
        "options": {
            "data": {
                "nickname": data.get('nickname', ''),
                "nombre": data.get('nombre', ''),
                "apellido": data.get('apellido', ''),
                "telefono": telefono or ''
            }
        }
    })

    if auth_response.user is None:
        return jsonify({"error": "No se pudo registrar el usuario"}), 400

    # Insertar en la tabla Usuario usando el UUID de Supabase
    usuario_data = {
        'id': auth_response.user.id,  # UUID de Supabase
        'email': email,
        'nombre': data.get('nombre', ''),
        'apellido': data.get('apellido', ''),
        'nickname': data.get('nickname', ''),
        'telefono': telefono or '',
        'avatar': data.get('avatar', ''),
        'rol': data.get('rol', 'user')
    }

    insert_response = supabase.table('Usuario').insert(usuario_data).execute()
    print("Insert response: ", insert_response)

    return jsonify({
        "message": "Usuario registrado correctamente",
        "user": {
            "id": auth_response.user.id,
            "email": email
        }
    }), 200


# Login

@api.route('/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()

        # Validar datos requeridos
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400

        email = data['email']
        password = data['password']

        # Autenticar con Supabase
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if response.user and response.session:
            # Generar JWT token personalizado
            token = generate_token(response.user.id, response.user.email)

            return jsonify({
                'message': 'Login successful',
                'token': token,
                'user': {
                    'id': response.user.id,
                    'email': response.user.email,
                    'user_metadata': response.user.user_metadata
                },
                'expires_in': 86400
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        print(f"Signin error: {str(e)}")
        return jsonify({'error': 'Invalid credentials'}), 401

    # Recuperar contraseña


@api.route('/forgot', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    print("Solicitud de recuperación recibida para:", email)

    if not email:
        print("Error: email no proporcionado.")
        return jsonify({"error": "El email es requerido"}), 400

    try:
        supabase.auth.reset_password_for_email(email)
        return jsonify("Enviado"), 200

    except Exception as e:
        print(" Error al enviar email de recuperación:", str(e))
        return jsonify({"error": "No se pudo enviar el email de recuperación", "details": str(e)}), 500


# Restablecer contraseña

@api.route('/reset', methods=['POST'])
def reset_password():
    data = request.get_json()
    new_password = data.get('new_password')
    # token que viene del email de Supabase
    access_token = data.get('access_token')
    email = data.get('email')
    if not new_password or not access_token:
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    if len(new_password) < 6:
        return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

    try:
        print(type(access_token))
        # Usar el access_token para autenticar temporalmente al usuario
        user_response = supabase.auth.verify_otp({
            "email": email,
            "token": access_token,
            "type": "recovery"
        })

        # Actualizar la contraseña
        response = supabase.auth.update_user({"password": new_password})

        supabase.auth.sign_out()

        return jsonify({
            "message": "Contraseña actualizada correctamente",
            "supabase_response": str(response)
        }), 200

    except Exception as e:
        return jsonify({
            "error": "No se pudo restablecer la contraseña",
            "details": str(e)
        }), 500


@api.route('/<user_id>', methods=['GET'])
def get_user_data(user_id):
    try:
        resp = supabase.table('Usuario') \
            .select('id, email, nombre, apellido, nickname, telefono, avatar, rol') \
            .eq('id', user_id) \
            .single() \
            .execute()

        if resp.data:
            return jsonify({
                "message": "Datos usuario obtenidos exitosamente",
                "resp": resp.data
            }), 200
        else:
            return jsonify({
                "message": "No se encontraron datos de este usuario",
                "resp": []
            }), 200

    except Exception as e:
        print("Error obteniendo datos usuario:", e)
        return jsonify({"error": "Error al obtener datos usuario"}), 500
    

@api.route('/<user_id>', methods=['PUT'])
def put_user_data(user_id):
    try:
        datosUsuario = request.get_json()

        actualizar = ['nickname', 'telefono', 'avatar']
        datos_actualizar = {k: v for k, v in datosUsuario.items() if k in actualizar}

        if not datos_actualizar:
            return jsonify ({'error': 'imposoble actualizar vuelve a intentarlo despues'})
        
        resp = supabase.table('Usuario')  \
            .update(datos_actualizar)\
            .eq('id', user_id) \
            .execute()
        
        if resp.data:
            return jsonify({
                "message": "Datos usuario actualizados exitosamente",
                "resp": resp.data
            }), 200
        else:
            return jsonify({
                "message": "No se actualizaron datos de este usuario",
                "resp": []
            }), 400

    except Exception as e:
        print("Error al actualizar datos usuario:", e)
        return jsonify({"error": str(e)}), 500