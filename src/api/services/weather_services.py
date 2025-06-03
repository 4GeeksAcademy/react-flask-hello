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
        "params": "airTemperature,precipitation,cloudCover",
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
                hour_data = data["hours"][0]

                temperature = hour_data.get("airTemperature", {}).get("noaa")
                precipitation = hour_data.get("precipitation", {}).get("noaa")
                cloud_cover = hour_data.get("cloudCover", {}).get("noaa")

                return {
                    "temperatura": f"{temperature} °C" if temperature is not None else "No disponible",
                    "precipitaciones": f"{precipitation} mm" if precipitation is not None else "No disponible",
                    "cobertura_nubosa": f"{cloud_cover} %" if cloud_cover is not None else "No disponible",
                }
            else:
                return {"error": "Datos meteorológicos no disponibles"}
        else:
            return {"error": f"Error HTTP {response.status_code}", "detalle": response.text}
    except Exception as e:
        return {"error": f"Error al obtener el clima: {str(e)}"}
