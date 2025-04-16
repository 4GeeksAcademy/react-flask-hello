import bcrypt
import uuid

# Generar hash de la contraseña
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verificar contraseña contra hash guardado
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# Generar token único para recuperación de contraseña u otras funciones
def generate_token():
    return str(uuid.uuid4())
