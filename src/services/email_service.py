import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

EMAIL_ADDRESS = "dronfarm.mail@gmail.com"
EMAIL_PASSWORD = "bxgb afpl mfdu umdh"

def send_quote_email(destinatario, asunto, cuerpo):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = destinatario
    msg['Subject'] = asunto
    msg.attach(MIMEText(cuerpo, 'html'))  # Puede ser 'plain' o 'html'

    try:
        servidor = smtplib.SMTP('smtp.gmail.com', 587)
        servidor.starttls()
        servidor.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        servidor.send_message(msg)
        servidor.quit()
        print("✅ Correo enviado a", destinatario)
    except Exception as e:
        print("❌ Error al enviar el correo:", str(e))
