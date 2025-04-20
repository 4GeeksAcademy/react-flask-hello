# En api/services/tigris_service.py
import os
import requests
from flask import current_app

def upload_file_to_tigris(file, filename, folder):
    """
    Sube un archivo a TigrisData y devuelve la URL
    
    Args:
        file: Archivo a subir
        filename: Nombre del archivo
        folder: Carpeta donde guardar (productos, logos, etc.)
    
    Returns:
        URL del archivo subido
    """
    # Configuración de TigrisData (desde environment o config)
    tigris_api_key = os.environ.get('TIGRIS_API_KEY')
    tigris_project = os.environ.get('TIGRIS_PROJECT')
    tigris_bucket = os.environ.get('TIGRIS_BUCKET')
    
    if not all([tigris_api_key, tigris_project, tigris_bucket]):
        raise ValueError("Faltan credenciales de TigrisData")
    
    # Construir path en TigrisData
    path = f"{folder}/{filename}"
    
    # Leer contenido del archivo
    file_content = file.read()
    
    # Preparar headers
    headers = {
        "Authorization": f"Bearer {tigris_api_key}",
        "Content-Type": file.content_type
    }
    
    # URL de la API de TigrisData
    url = f"https://api.tigrisdata.cloud/v1/projects/{tigris_project}/buckets/{tigris_bucket}/files/{path}"
    
    # Subir archivo
    response = requests.put(url, headers=headers, data=file_content)
    
    if response.status_code != 200:
        raise Exception(f"Error al subir archivo a TigrisData: {response.text}")
    
    # Devolver URL pública
    public_url = f"https://assets.tigrisdata.cloud/{tigris_project}/{tigris_bucket}/{path}"
    
    return public_url