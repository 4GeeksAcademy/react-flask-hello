#👇 ❇️ Riki for the group success 9 Abril 👊

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
    "mensual": 0.9,  # 10% descuento
    "trimestral": 0.8  # 20% descuento
}

# Tipos de cultivo con precios diferenciados
CULTIVOS_ESPECIALES = {
    "olivo": 1.15,  # +15% por dificultad en terreno irregular
    "viña": 1.10
}

def calculate_quote(hectareas: float, tipo_cultivo: str, servicio: str, periodicidad: str) -> dict:
    """Calcula el presupuesto basado en:
    - Hectáreas: Área del cultivo
    - Tipo de cultivo: Maíz, olivo, etc. (puede afectar precios)
    - Servicio: Fotogrametría/pulverización
    - Periodicidad: Frecuencia del servicio
    """
    # Validar periodicidad
    if periodicidad not in FACTOR_PERIODICIDAD:
        raise ValueError("Periodicidad no válida")

    # Obtener precio base según servicio
    try:
        precio_base = PRECIOS_BASE[servicio]["standard"]  # Versión simplificada
    except KeyError:
        raise ValueError("Servicio no disponible")
    
    # Ajuste por tipo de cultivo
    factor_cultivo = CULTIVOS_ESPECIALES.get(tipo_cultivo, 1.0)
    precio_final = (precio_base * FACTOR_PERIODICIDAD[periodicidad]) * factor_cultivo
    

    # Aplicar descuento por periodicidad
    precio_final = precio_base * FACTOR_PERIODICIDAD[periodicidad]
    
    # Calcular total
    total = round(precio_final * hectareas, 2)

    return {
        "precio_por_hectarea": precio_final,
        "total": total,
        "valido_hasta": (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
    }