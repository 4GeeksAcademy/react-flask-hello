import os
from flask import Flask, send_file, jsonify
import pandas as pd
from tigrisdb import TigrisClient, TigrisSearchOptions
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

EXPORT_FOLDER = "exports"
os.makedirs(EXPORT_FOLDER, exist_ok=True)
EXCEL_FILE = os.path.join(EXPORT_FOLDER, "exportado.xlsx")

# Configuración de Tigris
client = TigrisClient()

# Define tu colección (modelo de ejemplo)
class Inventario:
    __collection__ = "inventario"

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

@app.route("/download-excel", methods=["GET"])
def download_excel():
    try:
        # Accede al inventario
        inventary = client.get_inventary(Inventario)

        # Obtener todos los documentos
        results = inventary.find_many({})

        # Convertir a DataFrame
        data = [doc.__dict__ for doc in results]
        if not data:
            return jsonify({"message": "No hay inventario que descargar"}), 404

        df = pd.DataFrame(data)
        df.to_excel(EXCEL_FILE, index=False)

        return send_file(EXCEL_FILE, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=3000)
