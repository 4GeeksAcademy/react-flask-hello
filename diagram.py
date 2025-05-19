import os
import importlib.util

# Usar SQLite solo para generar el ERD
if os.path.basename(__file__) == "diagram.py":
    db_path = os.path.join(os.path.dirname(__file__), 'levelup.db')
    os.environ["DATABASE_URL"] = f"sqlite:///{db_path}"


BASE_DIR = os.path.dirname(__file__)
APP_PATH = os.path.join(BASE_DIR, 'src', 'app.py')

# Cargar app.py
spec_app = importlib.util.spec_from_file_location("app_module", APP_PATH)
app_module = importlib.util.module_from_spec(spec_app)
spec_app.loader.exec_module(app_module)

create_app = app_module.create_app
db = app_module.db
app = create_app()

with app.app_context():
    print("📋 Tablas detectadas antes de crear:")
    print(list(db.metadata.tables.keys()))
    
    db.drop_all()
    db.create_all()
    
    print("📋 Tablas después de crear:")
    print(list(db.metadata.tables.keys()))
