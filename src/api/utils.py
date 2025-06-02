from flask import request, jsonify, current_app, url_for
from src.api.models import User
from functools import wraps
import jwt


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" +
                         y + "</a></li>" for y in links])
    return f"""
        <div style="text-align: center;">
            <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
            <h1>Rigo welcomes you to your API!!</h1>
            <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
            <p>Start working on your project by following the 
            <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
            <p>Remember to specify a real endpoint path like: </p>
            <ul style="text-align: left;">{links_html}</ul>
        </div>
    """


# ✅ Decorador para proteger rutas privadas con token JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            token = auth_header.split(
                " ")[1] if " " in auth_header else auth_header

        if not token:
            return jsonify({"error": "Token faltante"}), 401

        try:
            data = jwt.decode(
                token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])
            if not current_user:
                return jsonify({"error": "Usuario no válido"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except Exception:
            return jsonify({"error": "Token inválido"}), 401

        # Pasa el usuario a la función protegida
        return f(current_user=current_user, *args, **kwargs)

    return decorated
