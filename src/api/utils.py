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
        <ul style="text-align: left;">"""+links_html+"""</ul>
        <p align="justify" style="padding: 1.8rem;" " dir="auto">Aquí te explico de forma sencilla cómo funciona la API de usuarios desarrollada con Flask y Python:<br>
        <br><b style="color: Orange;">La API permite gestionar usuarios mediante los siguientes endpoints:</b><br>
        <b style="color: blue;">api/user/register: (Método POST)</b><br>
        Este endpoint permite registrar un nuevo usuario recibiendo sus datos a través de un request JSON. Crea un objeto User con la información, lo guarda en la base de datos y devuelve un token de autenticación. Almacena también datos como sueldo e información estudiantil.<br>
        <b style="color: blue;">api/user/login: (Método POST)</b><br>
        Permite iniciar sesión introduciendo el nombre de usuario o email junto a la contraseña. Busca el usuario y devuelve un token si coincide. De lo contrario, devuelve un error.<br>
        <b style="color: green;">api/user/profile: (Método GET)</b><br>
        Actualiza los datos del perfil del usuario autenticado, permitiendo modificar nombre, email y demás campos. Requiere el token JWT en la cabecera para validar la identidad.<br>
        <b style="color: purple;">api/user/update: (Método PUT)</b><br>
        Actualiza datos del perfil como nombre de usuario o email, etc. Requiere autorización.<br>
        <b style="color: purple;">api/user/change-password: (Método PUT)</b><br>
        Cambia la contraseña del usuario. Requiere la contraseña actual y la nueva.<br>
        <b style="color: blue;">api/user/forgotten: (Método POST)</b><br>
        Inicia sesión con el email para recuperar la cuenta. Devuelve un token.<br>
        <b style="color: purple;">api/user/new-password: (Método PUT)</b><br>
        Fija una nueva contraseña una vez iniciado sesión por forgotten. Requiere autorización.<br>
        <b style="color: red;">api/user/delete: (Método DELETE)</b><br>
        Elimina la cuenta del usuario autenticado. Requiere autorización.<br>
        <b style="color: blue;">api/user/token: (Método POST)</b><br>
        Renueva el token de autorización. Requiere autorización.<br>
        <br>Los endpoints requieren el token JWT para autenticar las peticiones, excepto los de registro y login. Esto permite gestionar de forma segura los usuarios de la API de forma sencilla con Flask.<br>
        <br><b style="color: Orange;">Endpoints de gastos:</b><br>
        <b style="color: blue;">api/gasto/register:(Método POST)</b><br>
        Registra un nuevo gasto almacenando concepto, cantidad y emoji. Vincula el gasto al usuario autenticado a través de su id obtenido del token.<br>
        <b style="color: green;">api/gasto/(int:gasto_id): (Método GET)</b><br>
        Obtiene un gasto por id.<br>
        <b style="color: green;">api/gasto:(Método GET)</b> <br>
        Obtiene todos los gastos registrados por el usuario autenticado, serializándolos y devolviéndolos en el response.<br>
        <b style="color: purple;">api/gasto/update/(int:gasto_id): (Método PUT)</b><br>
        Actualiza la información de un gasto existente, modificando los campos recibidos por el body si es necesario. Validar que el gasto pertenece al usuario.<br>
        <b style="color: red;">api/gasto/delete/(int:gasto_id): (Método DELETE)</b><br>
        Elimina un gasto.<br>
        <br><b style="color: Orange;">Endpoints de objetivos:</b><br>
        <b style="color: blue;">api/objetivo/register: (Método POST)</b><br>
        Crea un nuevo objetivo almacenando su titulo, descripción, cantidad meta y fecha límite. Vincula el objetivo al usuario autenticado.<br>
        <b style="color: green;">api/objetivo/(int:objetivo_id): (Método GET)</b><br>
        Obtiene un objetivo por id (método GET).<br>
        <b style="color: green;">api/objetivo: (Método GET)</b> <br>
        Devuelve una lista con todos los objetivos registrados por el usuario, serializados en el response.<br>
        <b style="color: purple;">api/objetivo/update/(int:objetivo_id):</b><br>
        Modifica la información de un objetivo existente enviada en el body. Validar que el objetivo sea del usuario autenticado.<br>
        <b style="color: red;">api/objetivo/delete/(int:objetivo_id):  (Método DELETE)</b><br>
        Elimina un objetivo.<br>
        <br><b style="color: Orange;">Endpoints de Artículos:</b><br>
        <b style="color: blue;">/articulo/register: (Método POST)</b><br>
        Este endpoint permite registrar un nuevo artículo. Recibe los datos del artículo (título y texto) a través del body de la petición. Crea un objeto Articulo en la base de datos y devuelve un mensaje de éxito junto con el artículo serializado. Requiere autenticación.<br>
        <b style="color: green;">/articulo/int:articulo_id: (Método GET)</b><br>
        Permite obtener un artículo mediante su id. Busca el artículo con ese id en la base de datos. Si lo encuentra, devuelve el artículo serializado junto a un mensaje. En caso contrario, devuelve un mensaje de error. No requiere autenticación.<br>
        <b style="color: purple;">/articulo/update/int:articulo_id: (Método PUT)</b> <br>
        Actualiza los datos de un artículo existente. Busca el artículo por id, y si lo encuentra, actualiza los campos título y texto si están presentes en el body. Una vez actualizado, devuelve un mensaje y el artículo con los datos actualizados. No requiere autenticación.<br>
        <b style="color: red;">api/artículo/delete/int:artículo_id:  (Método DELETE)</b><br>
        Elimina un artículo.<br>
        <br><b style="color: Orange;">Endpoints de Links:</b><br>
        <b style="color: blue;">/link/register: (Método POST)</b><br>
        Registra un nuevo enlace asociado a un artículo. Recibe los datos del link (imagen, url, id del artículo) y lo guarda en la base de datos. Devuelve el link creado y un mensaje. Requiere autenticación.<br>
        <b style="color: green;">/link/int:link_id: (Método GET)</b><br>
        Obtiene un link mediante su id. Busca el link, y si existe devuelve sus datos serializados junto a un mensaje. En caso contrario, error. No requiere autenticación.<br>
        <b style="color: green;">/articulo/int:articulo_id/links: (Método GET)</b><br>
        Obtiene todos los links asociados a un artículo. Busca todos los links filtrados por el id del artículo, serializa los resultados y los devuelve junto a un mensaje. No requiere autenticación.<br>
        <b style="color: purple;">api/link/update/(int:link.id):</b><br>
        Actualiza los datos de un link.(método PUT).<br>
        <b style="color: red;">api/link/delete/(int:link.id): (Método DELETE)</b><br>
        Elimina un link.</p>
        </div>"""




