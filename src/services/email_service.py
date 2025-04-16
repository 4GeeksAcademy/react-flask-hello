import smtplib
from email.message import EmailMessage
from email.header import Header
from email.utils import formataddr

EMAIL_ADDRESS = "dronfarm.mail@gmail.com"
EMAIL_PASSWORD = "bxgb afpl mfdu umdh"


def send_quote_email(destinatario, asunto, cuerpo, adjunto_path=None):
    msg = EmailMessage()

    # ✅ Usar str() para convertir los objetos Header a string
    msg["Subject"] = str(Header(asunto, 'utf-8'))
    msg["From"] = formataddr(
        (str(Header("DroneFarm", "utf-8")), EMAIL_ADDRESS))
    msg["To"] = destinatario

    msg.set_content("Tu cliente de correo no soporta contenido HTML.")
    msg.add_alternative(cuerpo, subtype="html", charset="utf-8")

    # ✅ Adjuntar el PDF si se ha pasado
    if adjunto_path:
        with open(adjunto_path, "rb") as f:
            file_data = f.read()
            msg.add_attachment(
                file_data,
                maintype="application",
                subtype="pdf",
                filename="presupuesto_dronfarm.pdf"
            )

    # ✅ Enviar correo
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
