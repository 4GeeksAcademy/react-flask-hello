from flask import jsonify, url_for

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
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://api.zoviz.com/lfp?b=K2NLr2r0IWQZfbqE&f=btCSiQWhf6m4&d=1'""" 'https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' """ />
        <h1>Mo'money welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p align="justify" style="padding: 1.8rem">Aquí te explico de forma sencilla cómo funciona la API de usuarios desarrollada con Flask y Python:<br>
        La API permite gestionar usuarios mediante los siguientes endpoints:<br>
        /user/register:<br>
        Este endpoint permite registrar un nuevo usuario. <br>Recibe los datos del usuario por POST (nombre de usuario, email, contraseña) y crea un objeto User en la base de datos. Devuelve un token que se usará para futuras peticiones autenticadas.<br>
        /user/login:<br>
        Permite iniciar sesión con el email/nombre de usuario y contraseña. Devuelve un token si las credenciales son correctas.<br>
        /user/profile:<br>
        Obtiene el perfil del usuario autenticado mediante el token. Requiere autorización.<br>
        /user/update:<br>
        Actualiza datos del perfil como nombre de usuario o email. Requiere autorización.<br>
        /user/change-password:<br>
        Cambia la contraseña del usuario. Requiere la contraseña actual y la nueva.<br>
        /user/forgotten:<br>
        Inicia sesión con el email para recuperar la cuenta. Devuelve un token.<br>
        /user/new-password:<br>
        Fija una nueva contraseña una vez iniciado sesión por forgotten. Requiere autorización.<br>
        /user/delete:<br>
        Elimina la cuenta del usuario autenticado. Requiere autorización.<br>
        /user/token:<br>
        Renueva el token de autorización. Requiere autorización.<br>
        Los endpoints requieren el token JWT para autenticar las peticiones, excepto los de registro y login. Esto permite gestionar de forma segura los usuarios de la API de forma sencilla con Flask.<br>
        Espero haber explicado de forma clara el funcionamiento básico de la API. </p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"
