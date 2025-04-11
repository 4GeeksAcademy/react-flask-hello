// 👇 ❇️ Riki for the group success  11 Abril 👊


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PdfDocument from "../../components/Quote/PdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./quote.css";

const Quote = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [fieldData, setFieldData] = useState(null);
  const [formData, setFormData] = useState({
    frequency: "",
    services: "",
    pricePerHectare: ""
  });
  const [total, setTotal] = useState(0);

  // ✅ Cargar datos de usuario y parcela
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userRes.data);

        const fieldRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fields/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFieldData(fieldRes.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ Actualizar total
  useEffect(() => {
    if (fieldData && formData.pricePerHectare) {
      const totalCalc = (fieldData.area * parseFloat(formData.pricePerHectare)).toFixed(2);
      setTotal(totalCalc);
    }
  }, [formData.pricePerHectare, fieldData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/presupuesto`, {
        cost: total,
        description: `${fieldData.crop} | ${formData.services} | ${formData.frequency}`,
        field_id: fieldData.id,
        user_id: userData.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (resp.status === 201) {
        alert("✅ Presupuesto guardado correctamente");
        navigate("/app/dashboard");
      }
    } catch (err) {
      console.error("Error al guardar presupuesto:", err);
      alert("❌ No se pudo guardar el presupuesto");
    }
  };

  if (!userData || !fieldData) return <div>Cargando datos...</div>;

  return (
    <div className="quote-container">
      <h2>Generar Presupuesto</h2>
      <form onSubmit={handleSubmit} className="quote-form">
        <div>
          <label>Periodicidad:</label>
          <select name="frequency" value={formData.frequency} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            <option value="Mensual">Mensual</option>
            <option value="Trimestral">Trimestral</option>
            <option value="Anual">Anual</option>
          </select>
        </div>

        <div>
          <label>Servicios contratados:</label>
          <input
            type="text"
            name="services"
            value={formData.services}
            onChange={handleChange}
            required
            placeholder="Ej: Monitoreo con dron, análisis de cultivo..."
          />
        </div>

        <div>
          <label>Precio por hectárea (€):</label>
          <input
            type="number"
            name="pricePerHectare"
            value={formData.pricePerHectare}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="quote-actions">
          <button type="submit">💾 Guardar Presupuesto</button>
          <PDFDownloadLink
            document={
              <PdfDocument
                user={userData.name}
                field={fieldData.name}
                cropType={fieldData.crop}
                hectares={fieldData.area}
                services={formData.services}
                frequency={formData.frequency}
                pricePerHectare={formData.pricePerHectare}
                total={total}
                validUntil={"2025-06-30"}
              />
            }
            fileName={`Presupuesto_${userData.name}.pdf`}
            className="btn-pdf"
          >
            📄 Descargar PDF
          </PDFDownloadLink>
        </div>
      </form>
    </div>
  );
};

export default Quote;
