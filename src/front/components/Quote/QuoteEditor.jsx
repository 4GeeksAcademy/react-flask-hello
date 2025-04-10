// 👇 ❇️ Riki for the group success 10 Abril 👊

import React, { useState } from "react";

const QuoteEditor = () => {
  const [frequency, setFrequency] = useState("mensual");
  const [quoteTotal, setQuoteTotal] = useState(null);

  const hectares = 10;
  const cropType = "olivo";
  const services = ["fotogrametría"];
  const pricePerHectare = 13.2;

  const handleCalculate = () => {
    const factor = frequency === "puntual" ? 1 : frequency === "mensual" ? 0.9 : 0.8;
    const total = (pricePerHectare * factor * hectares).toFixed(2);
    setQuoteTotal(total);
  };

  const handleDownloadPDF = () => {
    alert("📄 ¡PDF simulado! Cuando el backend funcione, se descargará automáticamente.");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#4682B4]">🌾 Presupuesto de Servicios</h2>

      <p><strong>Cultivo:</strong> {cropType}</p>
      <p><strong>Área:</strong> {hectares} hectáreas</p>
      <p><strong>Servicios:</strong> {services.join(", ")}</p>

      <label className="block mt-4 font-semibold">Periodicidad:</label>
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      >
        <option value="puntual">Puntual</option>
        <option value="mensual">Mensual</option>
        <option value="trimestral">Trimestral</option>
      </select>

      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded font-bold"
        onClick={handleCalculate}
      >
        Calcular presupuesto
      </button>

      {quoteTotal && (
        <div className="mt-4">
          <p><strong>Total estimado:</strong> {quoteTotal} €</p>

          <button
            className="mt-3 px-4 py-2 bg-[#4682B4] text-white rounded"
            onClick={handleDownloadPDF}
          >
            Descargar PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteEditor;
