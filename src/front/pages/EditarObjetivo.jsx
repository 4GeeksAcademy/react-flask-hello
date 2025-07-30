import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditarObjetivo = () => {
  const { index } = useParams();
  const objetivoIndex = parseInt(index, 10); 
  const navigate = useNavigate();

  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [fechaLimite, setFechaLimite] = useState("");

  useEffect(() => {
    const objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    if (objetivos[objetivoIndex]) {
      const obj = objetivos[objetivoIndex];
      setConcepto(obj.concepto);
      setCantidad(obj.cantidad);
      setFechaLimite(obj.fechaLimite);
    } else {
      navigate("/"); 
    }
  }, [objetivoIndex, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos[objetivoIndex] = { concepto, cantidad, fechaLimite };
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
    navigate("/Main");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h5>Editar objetivo de ahorro</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Concepto</label>
          <input
            type="text"
            className="form-control"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Cantidad: <strong>{cantidad} €</strong>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5000"
            step="50"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha límite</label>
          <input
            type="date"
            className="form-control"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
