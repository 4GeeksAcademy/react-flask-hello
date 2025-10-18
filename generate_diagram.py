from sqlalchemy_schemadisplay import create_schema_graph
import os
import sys

# Agregar el directorio src al path
sys.path.insert(0, os.path.join(os.getcwd(), 'src'))

# Importar desde la ubicación correcta
from api.models import db

# Importa tu aplicación Flask
try:
    from app import app
except ImportError:
    try:
        from wsgi import app
    except ImportError:
        try:
            from main import app
        except ImportError:
            print("Error: No se pudo encontrar la aplicación Flask")
            print("Asegúrate de tener un archivo app.py, wsgi.py o main.py en /src")
            sys.exit(1)

def generate_diagram():
    """Genera un diagrama ER de la base de datos"""
    
    print("Generando diagrama de la base de datos...")
    
    with app.app_context():
        # Crear el gráfico del esquema
        graph = create_schema_graph(
            engine=db.engine,          # Motor de la base de datos
            metadata=db.metadata,
            show_datatypes=True,       # Mostrar tipos de datos
            show_indexes=True,         # Mostrar índices
            rankdir='LR',              # Orientación: LR (izq-der) o TB (arriba-abajo)
            concentrate=False          # Simplificar líneas
        )
        
        # Guardar como PNG
        output_file = 'database_diagram.png'
        graph.write_png(output_file)
        
        # Obtener ruta absoluta
        abs_path = os.path.abspath(output_file)
        
        print(f"✓ Diagrama generado exitosamente!")
        print(f"📁 Ubicación: {abs_path}")
        
        # Información adicional
        tables = list(db.metadata.tables.keys())
        print(f"📊 Tablas incluidas ({len(tables)}): {', '.join(tables)}")

if __name__ == '__main__':
    generate_diagram()