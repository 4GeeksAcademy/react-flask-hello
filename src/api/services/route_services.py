import os
import requests

def get_route_info(start_coords, end_coords, profile='foot-hiking'):

    """
    Llama a la API de OpenRouteService para obtener información sobre una ruta entre dos puntos.
    - start_coords: [lng, lat]
    - end_coords: [lng, lat]
    - profile: 'foot-hiking', 'cycling-mountain', etc.
    """
    api_key = os.getenv("ORS_API_KEY")
    if not api_key:
        return {"error": "API Key ORS no configurada"}

    url = f"https://api.openrouteservice.org/v2/directions/{profile}"

    headers = {
        "Authorization": api_key,
        "Content-Type": "application/json"
    }

    body = {
        "coordinates": [start_coords, end_coords]
    }

    try:
        response = requests.post(url, json=body, headers=headers)
        if response.status_code == 200:
            data = response.json()
            summary = data["features"][0]["properties"]["summary"]
            distance = summary["distance"] / 1000  # en kilómetros
            duration = summary["duration"] / 60    # en minutos
            return {
                "distance": round(distance, 2),
                "duration": round(duration, 2)
            }
        else:
            return {"error": f"HTTP {response.status_code}: {response.text}"}
    except Exception as e:
        return {"error": f"Excepción al obtener la ruta: {str(e)}"}
