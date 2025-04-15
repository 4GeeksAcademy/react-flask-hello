from flask import jsonify, url_for
from fpdf import FPDF #modificación de Javi 
import os #modificación de Javi 

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
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"


#Código añadido por JAVI para crear funcion pdf

def generate_invoice_pdf(compra, buyer, seller, item):
    factura_dir = os.getenv("FACTURA_DIR", "static/facturas")
    os.makedirs(factura_dir, exist_ok=True)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Título
    pdf.set_font("Arial", "B", 16)
    pdf.cell(200, 10, "Invoice / Factura", ln=True, align="C")

    pdf.set_font("Arial", size=12)
    pdf.ln(10)

    # Info de comprador y vendedor
    pdf.cell(100, 10, f"Buyer: {buyer.email}", ln=True)
    pdf.cell(100, 10, f"Seller: {seller.email}", ln=True)
    pdf.ln(10)

    # Detalles del producto
    pdf.cell(100, 10, f"Product: {item['title']}", ln=True)
    pdf.cell(100, 10, f"Quantity: {item['cantidad']}", ln=True)
    pdf.cell(100, 10, f"Unit Price: ${item['precio']}", ln=True)
    pdf.cell(100, 10, f"Total: ${item['cantidad'] * item['precio']}", ln=True)

    pdf.ln(10)
    pdf.cell(100, 10, f"Purchase ID: {compra.id}", ln=True)

    filename = f"factura_{compra.id}.pdf"
    filepath = os.path.join(factura_dir, filename)
    pdf.output(filepath)

    return f"/{filepath}"  # Ruta relativa para usarla en el frontend
