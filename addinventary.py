from flask import Flask, request, jsonify
import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
import os

app = Flask(__name__)

# Configuración de la base de datos (puede ser SQLite, MySQL o PostgreSQL)
DB_URL = "sqlite:///database.db"  
engine = create_engine(DB_URL)
metadata = MetaData()

# Carpeta para subir archivos
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def create_dynamic_table(table_name, df):
    """Crea una tabla en la base de datos si no existe y la devuelve."""
    metadata.reflect(bind=engine)  # Obtiene las tablas existentes

    if table_name in metadata.tables:
        print(f"La tabla '{table_name}' ya existe. Insertando datos...")
    else:
        print(f"Creando tabla '{table_name}'...")
        columns = [Column("id", Integer, primary_key=True, autoincrement=True)]

        for column_name in df.columns:
            columns.append(Column(column_name, String(255)))  # Se usa String por compatibilidad

        table = Table(table_name, metadata, *columns)
        metadata.create_all(engine)  # Crea la tabla en la base de datos

    return metadata.tables[table_name]

@app.route("/upload", methods=["POST"])
def upload_file():
    """Maneja la subida de archivos y los guarda en la base de datos."""
    if "file" not in request.files:
        return jsonify({"message": "No se envió ningún archivo"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        df = pd.read_excel(file_path)
        df.columns = [col.replace(" ", "_") for col in df.columns]  # Normalizar nombres de columna

        table_name = "iventario"
        create_dynamic_table(table_name, df)

        # Insertar datos en la tabla
        with engine.connect() as conn:
            df.to_sql(table_name, con=conn, if_exists="append", index=False)

        return jsonify({"message": "Archivo procesado y guardado en la base de datos."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=3000)
