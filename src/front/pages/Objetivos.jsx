import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource/bebas-neue';
export default  Objetivos = () => {
  const [concepto, setConcepto] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [fechaLimite, setFechaLimite] = useState('');
  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h5>Crear objetivo de ahorro</h5>
      <div className="mb-3">
        <label htmlFor="concepto" className="form-label">Concepto</label>
        <input
          type="text"
          id="concepto"
          className="form-control"
          placeholder="Ej: Vacaciones"
          value={concepto}
          onChange={e => setConcepto(e.target.value)}
        />
      </div>
      {/* Slider de monto */}
      <div className="mb-3">
        <label htmlFor="monto" className="form-label">
          Monto a ahorrar: <strong>{cantidad} €</strong>
        </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="5000"
          step="50"
          id="monto"
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
        />
      </div>
      {/* Calendario */}
      <div className="mb-3">
        <label htmlFor="fechaLimite" className="form-label">Fecha límite</label>
        <input
          type="date"
          id="fechaLimite"
          className="form-control"
          value={fechaLimite}
          onChange={e => setFechaLimite(e.target.value)}
        />
      </div>
    </div>
  );
}