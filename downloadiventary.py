import os
from flask import Flask, send_file, jsonify
import pandas as pd
from dotenv import load_dotenv
from tigrisdb import TigrisClient

# Cargar variables de entorno
load_dotenv()

# Crear instancia de Flask
app = Flask(__name__)

# Crear carpeta para exportaciones
EXPORT_FOLDER = "exports"
os.makedirs(EXPORT_FOLDER, exist_ok=True)

# Ruta del archivo Excel a generar
EXCEL_FILE = os.path.join(EXPORT_FOLDER, "inventario.xlsx")

# Inicializar cliente de Tigris
client = TigrisClient()

# Modelo para la colección "inventario"
class Inventario:
    __collection__ = "inventario"

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

# Ruta para descargar el Excel desde Tigris
@app.route("/download-excel", methods=["GET"])
def download_excel():
    try:
        # Obtener colección y documentos
        collection = client.get_collection(Inventario)
        results = collection.find_many({})

        # Convertir documentos a lista de diccionarios
        data = [doc.__dict__ for doc in results]

        # Si no hay datos, devolver 404
        if not data:
            return jsonify({"message": "No hay inventario que descargar"}), 404

        # Crear DataFrame y exportarlo a Excel
        df = pd.DataFrame(data)
        df.to_excel(EXCEL_FILE, index=False)

        # Enviar el archivo al cliente
        return send_file(EXCEL_FILE, as_attachment=True, download_name="inventario.xlsx")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ejecutar servidor Flask en el puerto 3000
if __name__ == "__main__":
    app.run(debug=True, port=3000)
