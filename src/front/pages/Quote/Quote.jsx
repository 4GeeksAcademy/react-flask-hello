// 👇 ❇️ Riki for the group success 12 Abril 👊

import React, { useEffect, useState } from "react";
import "./Quote.css";
import { showSuccessAlert, showErrorAlert } from "../../components/modal_alerts/modal_alerts";

const Quote = () => {
  const [userData, setUserData] = useState(null);
  const [fieldData, setFieldData] = useState(null);
  const [frequency, setFrequency] = useState("Mensual");
  const [pricePerHectare, setPricePerHectare] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  const frequencyMultipliers = {
    Mensual: 1,
    Trimestral: 3,
    Semestral: 6,
    Anual: 12
  };

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userRes.json();
        setUserData(userData);

        const fieldRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fields/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fieldData = await fieldRes.json();
        setFieldData(fieldData);

      } catch (err) {
        console.error("Error al cargar datos:", err);
        showErrorAlert("Error al obtener datos del usuario o la parcela");
      } finally {
        setIsLoading(false);
      }
    };

    if (token && userId) fetchData();
  }, []);

  const totalPrice = () => {
    if (!fieldData?.area || !frequency) return 0;
    const multiplier = frequencyMultipliers[frequency] || 1;
    return (fieldData.area * pricePerHectare * multiplier).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      user_id: parseInt(userId),
      field_id: fieldData.id,
      hectares: parseFloat(fieldData.area),
      cropType: fieldData.crop,
      services: ["fotogrametria"],
      frequency: frequency.toLowerCase()
    };

    console.log("📤 Enviando a backend:", dataToSend);

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quote/presupuesto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await resp.json();

      if (resp.ok) {
        showSuccessAlert("Presupuesto enviado correctamente 🚀");
      } else {
        showErrorAlert(data.error || "Error al enviar presupuesto");
      }

    } catch (err) {
      console.error(err);
      showErrorAlert("Error al conectar con el servidor");
    }
  };

  if (isLoading) return <p className="quote-loading">Cargando datos...</p>;

  return (
    <div className="quote-container">
      <h2 className="quote-title">📄 Generar Presupuesto</h2>

      <form onSubmit={handleSubmit} className="quote-form">
        <div className="quote-info">
          <p><strong>Cliente:</strong> {userData?.name}</p>
          <p><strong>Parcela:</strong> {fieldData?.name}</p>
          <p><strong>Cultivo:</strong> {fieldData?.crop}</p>
          <p><strong>Área:</strong> {fieldData?.area} ha</p>
        </div>

        <div className="form-group">
          <label htmlFor="frequency">Periodicidad del servicio</label>
          <select
            id="frequency"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="form-input"
          >
            <option value="Mensual">Mensual</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Semestral">Semestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>

        <div className="quote-result">
          <p><strong>Precio por hectárea:</strong> {pricePerHectare} €</p>
          <p><strong>Total estimado:</strong> <span className="total-price">{totalPrice()} €</span></p>
        </div>

        <button type="submit" className="submit-button">Generar Presupuesto</button>
      </form>
    </div>
  );
};

export default Quote;
