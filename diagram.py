import os
import sys
import importlib.util

# Forzar SQLite
os.environ["DATABASE_URL"] = "postgresql://neondb_owner:npg_Mg6qwKYmtk9P@ep-wild-bar-a4z2yqfv-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Rutas reales
BASE_DIR = os.path.dirname(__file__)
APP_PATH = os.path.join(BASE_DIR, 'src', 'app.py')
MODELS_PATH = os.path.join(BASE_DIR, 'src', 'api', 'models.py')

# Cargar app.py
spec_app = importlib.util.spec_from_file_location("app_module", APP_PATH)
app_module = importlib.util.module_from_spec(spec_app)
spec_app.loader.exec_module(app_module)

# Cargar models.py (para que se registren las tablas)
spec_models = importlib.util.spec_from_file_location("models_module", MODELS_PATH)
models_module = importlib.util.module_from_spec(spec_models)
spec_models.loader.exec_module(models_module)

# Usar app y db desde app_module (el db vinculado correctamente)
create_app = app_module.create_app
db = app_module.db

app = create_app()

with app.app_context():
    print("📦 Creando base de datos...")
    db.drop_all()
    db.create_all()
    print("✅ Base de datos creada con éxito")