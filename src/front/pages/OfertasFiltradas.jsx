import React from "react";

const ofertasFiltradas = [
  {
    id: 1,
    titulo: "Venta de trigo premium",
    tipo: "Trigo",
    calidad: "Alta",
    cantidad: "1200kg",
    ciudad: "Zaragoza",
    coste: "0,87€/kg",
    tiempo: "3h 45min",
  },
  {
    id: 2,
    titulo: "Maíz para pienso",
    tipo: "Maíz",
    calidad: "Media",
    cantidad: "2000kg",
    ciudad: "Toledo",
    coste: "0,76€/kg",
    tiempo: "5h 30 min"
  },
  {
    id: 3,
    titulo: "Cebada para cerveza",
    tipo: "Cebada",
    calidad: "Alta",
    cantidad: "3400kg",
    ciudad: "Leon",
    coste: "0,76€/kg",
    tiempo: "5h 30 min"
  },
  {
    id: 4,
    titulo: "Avena",
    tipo: "Avena",
    calidad: "Media",
    cantidad: "2700kg",
    ciudad: "Cáceres",
    coste: "0,97€/kg",
    tiempo: "6h"
  },
  {
    id: 5,
    titulo: "Centeno",
    tipo: "Centeno",
    calidad: "Alta",
    cantidad: "1600kg",
    ciudad: "Bádajoz",
    coste: "0,87€/kg",
    tiempo: "3h 30min"
  }
];

export const OfertasFiltradas = () => {
  return (
    <div style={{
      padding: "30px",
      maxWidth: "800px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Ofertas encontradas</h2>

      {ofertasFiltradas.map((oferta) => (
        <div
          key={oferta.id}
          style={{
            border: "1px solid #ccc",
            backgroundColor: "#ffffff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#097e2cff" }}>{oferta.titulo}</h3>
          <p><strong>Tipo:</strong> {oferta.tipo}</p>
          <p><strong>Calidad:</strong> {oferta.calidad}</p>
          <p><strong>Cantidad:</strong> {oferta.cantidad}</p>
          <p><strong>Ciudad:</strong> {oferta.ciudad}</p>
          <p><strong>Tiempo de entrega estimado:</strong> {oferta.tiempo}</p>
          <p><strong>Coste estimado:</strong> {oferta.coste}</p>

          <button
            onClick={() => alert("Propuesta enviada")}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#fafafa",
              color: "#db0000ff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Hacer propuesta
          </button>
        </div>
      ))}
    </div>
  );
};