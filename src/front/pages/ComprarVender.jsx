import React, { useState } from "react";

export const CompraVenta = () => {
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
    console.log("Filtros aplicados:", filters);
  };

  return (
    <div>
      <h1>Búsqueda de cereales para comprar o vender</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        
        <select name="cereal" value={filters.cereal} onChange={handleChange}>
          <option value="">-- Tipo de cereal --</option>
          <option value="trigo">Trigo</option>
          <option value="maiz">Maíz</option>
          <option value="cebada">Cebada</option>
          <option value="avena">Avena</option>
          <option value="centeno">Centeno</option>
        </select>

        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="number" name="precioMin" placeholder="Precio mínimo (€)"value={filters.precioMin} onChange={handleChange}/>
          <input
            type="number" name="precioMax" placeholder="Precio máximo (€)" value={filters.precioMax} onChange={handleChange}/>
        </div>

        <select name="ciudad" value={filters.ciudad} onChange={handleChange}>
          <option value="">-- Capital de CCAA --</option>
          <option value="madrid">Madrid</option>
          <option value="barcelona">Barcelona</option>
          <option value="sevilla">Sevilla</option>
          <option value="valencia">Valencia</option>
          <option value="zaragoza">Zaragoza</option>
          <option value="vitoria">Vitoria</option>
          <option value="toledo">Toledo</option>
          <option value="murcia">Murcia</option>
          <option value="santiago">Santiago</option>
          <option value="oviedo">Oviedo</option>
          <option value="valladolid">Valladolid</option>
          <option value="logroño">Logroño</option>
          <option value="pamplona">Pamplona</option>
          <option value="santander">Santander</option>
          <option value="merida">Mérida</option>
          <option value="baleares">Palma de Mallorca</option>
        </select>

        <button onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
};
