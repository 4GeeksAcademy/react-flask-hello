import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Main = () => {
  const [objetivos, setObjetivos] = useState([]);
  const [sueldo, setSueldo] = useState(0);
  const [ahorro, setAhorro] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const objetivosGuardados = JSON.parse(localStorage.getItem("objetivos")) || [];
    setObjetivos(objetivosGuardados);
     const sueldoGuardado = localStorage.getItem("sueldo");
    const ahorroGuardado = localStorage.getItem("ahorro");

    if (sueldoGuardado) setSueldo(parseFloat(sueldoGuardado));
    if (ahorroGuardado) setAhorro(parseFloat(ahorroGuardado));
  }, []);
  

  
  const calcularDiasRestantes = (fechaLimite) => {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diff = limite - hoy;
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  const eliminarObjetivo = (index) => {
    const nuevosObjetivos = objetivos.filter((_, i) => i !== index);
    setObjetivos(nuevosObjetivos);
    localStorage.setItem("objetivos", JSON.stringify(nuevosObjetivos));
  };

  const handleEditarObjetivo = (index) => {
    navigate(`/objetivos/editar/${index}`);
  };

  const marcarComoCompletado = (index) => {
    const nuevosObjetivos = [...objetivos];
    nuevosObjetivos[index].completado = !nuevosObjetivos[index].completado; // Alterna el estado
    setObjetivos(nuevosObjetivos);
    localStorage.setItem("objetivos", JSON.stringify(nuevosObjetivos));
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "18px",
          }}
        >
          P
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div
            className="card text-center p-3"
            style={{ backgroundColor: "#b7ff00", border: "none" }}
          >
            <h5>Dinero Total</h5>
            <p className="display-6">{sueldo}€</p>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card text-center p-3"
            style={{ backgroundColor: "#b7ff00", border: "none" }}
          >
            <h5>Dinero Ahorrado</h5>
            <p className="display-6">{ahorro}€</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <Link to="/objetivos">
          <button className="btn btn-success">+ Crear objetivo</button>
        </Link>
      </div>

      <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
        {objetivos.map((obj, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: obj.completado ? "green" : "#007bff", // ✅ cambia color si está completado
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: "5px",
            }}
          >
            <small>{obj.concepto}</small>
            <strong>{obj.cantidad}€</strong>
            <small>{calcularDiasRestantes(obj.fechaLimite)} días</small>

            {/* Botón editar */}
            <button
              onClick={() => handleEditarObjetivo(index)}
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
              title="Editar objetivo"
            >
              ✏️
            </button>

            {/* Botón eliminar */}
            <button
              onClick={() => eliminarObjetivo(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "transparent",
                border: "none",
                color: "red",
                fontSize: "20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              title="Eliminar objetivo"
            >
              ✖️
            </button>

            {/* ✅ Botón marcar como completado */}
            <button
              onClick={() => marcarComoCompletado(index)}
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "limegreen",
              }}
              title="Marcar como completado"
            >
              ✅
            </button>
          </div>
        ))}
        <div className="text-center mb-4">
        <Link to="/addnewgasto">
        <button className="btn btn-warning">➕ Añadir gasto</button>
        </Link>
        </div>
      </div>
    </div>
  );
};