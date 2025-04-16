"""
Generador de diagrama de la base de datos a partir de los modelos
"""

from eralchemy import render_er
from src.api.models import db

# Genera el archivo de imagen con el diagrama
render_er(db, "diagram.png")
print("✅ Diagrama generado correctamente como 'diagram.png'")
