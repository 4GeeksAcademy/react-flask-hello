#👇 ❇️ Riki for the group success 10 Abril 👊

from datetime import datetime, timedelta

# Precios base por servicio (€/ha)
PRECIOS_BASE = {
    "fotogrametria": {
        "standard": 12.50,
        "premium": 18.00  # Incluye NDVI
    },
    "pulverizacion": {
        "herbicida": 20.00,
        "fungicida": 22.50
    }
}

# Factores de periodicidad
FACTOR_PERIODICIDAD = {
    "puntual": 1.0,
    "mensual": 0.9,
    "trimestral": 0.8
}

# Tipos de cultivo con sobrecoste
CULTIVOS_ESPECIALES = {
    "olivo": 1.15,
    "viña": 1.10
}

def calculate_quote(hectareas: float, tipo_cultivo: str, servicio: str, periodicidad: str) -> dict:
    if periodicidad not in FACTOR_PERIODICIDAD:
        raise ValueError("Periodicidad no válida")

    try:
        precio_base = PRECIOS_BASE[servicio]["standard"]
    except KeyError:
        raise ValueError("Servicio no disponible")

    factor_cultivo = CULTIVOS_ESPECIALES.get(tipo_cultivo.lower(), 1.0)

    precio_final = precio_base * FACTOR_PERIODICIDAD[periodicidad] * factor_cultivo
    total = round(precio_final * hectareas, 2)

    return {
        "precio_por_hectarea": round(precio_final, 2),
        "total": total,
        "valido_hasta": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
    }
