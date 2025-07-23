import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CompraVenta = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    cereal: "",
    precioMin: "",
    precioMax: "",
    ciudad: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    navigate("/ofertas-filtradas", { state: filters });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buscar cereales para comprar o vender</h2>

      <select name="cereal" onChange={handleChange}>
        <option value="">-- Tipo de cereal --</option>
        <option value="trigo">Trigo</option>
        <option value="maiz">Maíz</option>
        <option value="cebada">Cebada</option>
        <option value="avena">Avena</option>
        <option value="centeno">Centeno</option>
      </select>

      <input
        type="number"
        name="precioMin"
        placeholder="Precio mínimo"
        onChange={handleChange}
      />
      <input
        type="number"
        name="precioMax"
        placeholder="Precio máximo"
        onChange={handleChange}
      />

      <select name="ciudad" onChange={handleChange}>
        <option value="">-- Ciudad --</option>
        <option value="zaragoza">Zaragoza</option>
        <option value="toledo">Toledo</option>
        <option value="madrid">Madrid</option>
      </select>

      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
