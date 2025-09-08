import os
import requests

def get_weather(lat, lng, date):
    api_key = os.getenv("STORMGLASS_API_KEY")
    if not api_key:
        return "API Key no configurada"

    url = "https://api.stormglass.io/v2/weather/point"
    params = {
        "lat": lat,
        "lng": lng,
        "start": date,
        "end": date,
        "params": "airTemperature",
        "source": "noaa"
    }
    headers = {
        "Authorization": api_key
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        if response.status_code == 200:
            data = response.json()
            if "hours" in data and len(data["hours"]) > 0:
                temperature_data = data["hours"][0].get("airTemperature", {})
                temperature = temperature_data.get("noaa")
                if temperature is not None:
                    return f"{temperature} °C"
                else:
                    return "Temperatura no disponible"
            else:
                return "Datos meteorológicos no disponibles"
        else:
            return f"Error HTTP {response.status_code}"
    except Exception as e:
        return f"Error al obtener el clima: {str(e)}"
