import sys
import os
import requests
import json

def create_first_admin(base_url, username, password):

    try:
        response = requests.post(
            f"{base_url}/setup/admin",
            json={
                "username": username,
                "password": password
            },
            headers={"Content-Type": "application/json"}
        )
        
        return response.json()
    except Exception as e:
        return {"error": str(e)}

def main():
    if len(sys.argv) != 4:
        print("Uso: python create_admin.py BASE_URL USERNAME PASSWORD")
        print("Ejemplo: python create_admin.py http://localhost:4567/api admin Admin123!")
        sys.exit(1)
    
    base_url = sys.argv[1]
    username = sys.argv[2]
    password = sys.argv[3]
    
    print(f"Creando administrador con username: {username}...")
    result = create_first_admin(base_url, username, password)
    
    print(json.dumps(result, indent=2))
    
    if "error" in result:
        print("Error al crear el administrador.")
        sys.exit(1)
    else:
        print("Administrador creado exitosamente.")
        sys.exit(0)

if __name__ == "__main__":
    main()