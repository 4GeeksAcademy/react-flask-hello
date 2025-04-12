import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quote.css";
import { showSuccessAlert, showErrorAlert } from "../../components/modal_alerts/modal_alerts";

const Quote = () => {
  const [fieldData, setFieldData] = useState(null);
  const [frequency, setFrequency] = useState("Mensual");
  const [pricePerHectare, setPricePerHectare] = useState(80);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fields/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setFieldData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los datos de la parcela:", err);
      }
    };

    fetchFieldData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      const total = fieldData.area * pricePerHectare;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/presupuesto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          cost: total,
          description: `${fieldData.crop} | ${fieldData.area} ha | ${frequency}`,
        }),
      });

      if (response.ok) {
        showSuccessAlert("Presupuesto enviado correctamente", () => navigate("/quotehistory"));
      } else {
        const data = await response.json();
        showErrorAlert(data.error || "Error al enviar presupuesto");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      showErrorAlert("Error de conexión con el servidor");
    }
  };

  if (loading || !fieldData) return <div className="quote-container">Cargando datos de la parcela...</div>;

  const total = (fieldData.area * pricePerHectare).toFixed(2);

  return (
    <div className="quote-container">
      <h2 className="quote-title">Generar Presupuesto</h2>

      <form className="quote-form" onSubmit={handleSubmit}>
        <div className="quote-section">
          <h3>Datos de la Parcela</h3>
          <p><strong>Nombre:</strong> {fieldData.name}</p>
          <p><strong>Área:</strong> {fieldData.area} hectáreas</p>
          <p><strong>Cultivo:</strong> {fieldData.crop}</p>
        </div>

        <div className="quote-section">
          <label htmlFor="frequency">Periodicidad del Servicio:</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="quote-form-group"
          >
            <option value="Mensual">Mensual</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>

        <div className="quote-section">
          <p><strong>Precio por hectárea:</strong> {pricePerHectare} €</p>
          <p className="quote-total"><strong>Total estimado:</strong> {total} €</p>
        </div>

        <button type="submit" className="quote-submit">Solicitar Presupuesto</button>
      </form>
    </div>
  );
};

export default Quote;
