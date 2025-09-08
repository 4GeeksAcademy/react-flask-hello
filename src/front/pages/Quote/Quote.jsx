import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../../components/Quote/PdfDocument";
import LogoDronFarm from "../../assets/img/Logo_DronFarm2.png";
import "./Quote.css";
import { showSuccessAlert, showErrorAlert } from "../../components/modal_alerts/modal_alerts";
import {useGlobalReducer} from "../../hooks/useGlobalReducer";

const Quote = () => {
  const [userData, setUserData] = useState(null);
  const [fieldData, setFieldData] = useState(null);
  const [frequency, setFrequency] = useState("Mensual");
  const [services, setServices] = useState(["fotogrametria"]);
  const [pricePerHectare, setPricePerHectare] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [validUntil, setValidUntil] = useState(getDefaultValidDate());
  const [isPdfReady, setIsPdfReady] = useState(false);
  const { store } = useGlobalReducer();

  const frequencyMultipliers = {
    Mensual: 1,
    Trimestral: 3,
    Semestral: 6,
    Anual: 12
  };

  const token = store.auth.token;
  const userId = store.auth.userId;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function getDefaultValidDate() {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(`${BACKEND_URL}/user/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userRes.json();
        setUserData(userData);
        setUserEmail(userData.email || "");

        const fieldRes = await fetch(`${BACKEND_URL}/fields/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const fieldData = await fieldRes.json();
        setFieldData(fieldData);

      } catch (err) {
        console.error("Error al cargar datos:", err);
        showErrorAlert("Error al obtener datos del usuario o la parcela");
      } finally {
        setIsLoading(false);
        setIsPdfReady(true);
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
    if (e) e.preventDefault();

    const dataToSend = {
      user_id: parseInt(userId),
      field_id: fieldData.id,
      hectares: parseFloat(fieldData.area),
      cropType: fieldData.crop,
      services: services,
      frequency: frequency.toLowerCase()
    };

    console.log("📤 Enviando a backend:", dataToSend);

    try {
      const resp = await fetch(`${BACKEND_URL}/quote/presupuesto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await resp.json();

      if (resp.ok) {
        showSuccessAlert("Presupuesto guardado correctamente 🚀");
      } else {
        showErrorAlert(data.error || "Error al enviar presupuesto");
      }

    } catch (err) {
      console.error(err);
      showErrorAlert("Error al conectar con el servidor");
    }
  };

  const handleSendEmail = async () => {
    if (!userEmail) {
      showErrorAlert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    setIsEmailSending(true);
    try {
      const response = await fetch(`${BACKEND_URL}/email/enviar-presupuesto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userEmail,
          quoteData: {
            user: userData?.name,
            field: fieldData?.name,
            cropType: capitalize(fieldData?.crop),
            hectares: fieldData?.area,
            services: services.join(', '),
            frequency: capitalize(frequency),
            pricePerHectare,
            total: totalPrice(),
            validUntil: formatDate(validUntil)
          }
        })
      });

      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 5000);
        showSuccessAlert("Presupuesto enviado por correo correctamente.");
      } else {
        const error = await response.json();
        showErrorAlert("Error al enviar el correo: " + error.error);
      }
    } catch (err) {
      showErrorAlert("Error al conectar con el servidor: " + err.message);
      console.error(err);
    } finally {
      setIsEmailSending(false);
    }
  };

  const isFormValid = userData && fieldData && fieldData.area > 0 && frequency && pricePerHectare > 0;

  if (isLoading) return <p className="quote-loading">Cargando datos...</p>;

  return (
    <div className="quote-editor-container">
      <h2 className="editor-title">📄 Generar Presupuesto</h2>

      <form onSubmit={handleSubmit} className="quote-form">
        <div className="editor-card">
          <h2 className="section-title">Información del Cliente</h2>
          <div className="quote-info">
            <p><strong>Cliente:</strong> {userData?.name}</p>
            <p><strong>Parcela:</strong> {fieldData?.name}</p>
            <p><strong>Cultivo:</strong> {fieldData?.crop}</p>
            <p><strong>Área:</strong> {fieldData?.area} ha</p>
          </div>

          <div className="form-group">
            <label htmlFor="frequency" className="form-label">Periodicidad del servicio</label>
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
            <p><strong>Válido hasta:</strong> {formatDate(validUntil)}</p>
          </div>
        </div>

        <div className="button-container">
          <button type="submit" className="action-button green-button">
            Guardar Presupuesto
          </button>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="action-button blue-button"
          >
            {showPreview ? "Ocultar Presupuesto" : "Ver Presupuesto"}
          </button>

          {isPdfReady && isFormValid && (
            <PDFDownloadLink
              document={
                <PdfDocument
                  user={userData?.name}
                  field={fieldData?.name}
                  cropType={capitalize(fieldData?.crop)}
                  hectares={fieldData?.area}
                  services={services.join(', ')}
                  frequency={capitalize(frequency)}
                  pricePerHectare={pricePerHectare}
                  total={totalPrice()}
                  validUntil={formatDate(validUntil)}
                />
              }
              fileName={`presupuesto_${userData?.name?.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.pdf`}
              className="action-button orange-button"
            >
              {({ loading }) => loading ? "Generando PDF..." : "Descargar PDF"}
            </PDFDownloadLink>
          )}
        </div>

        <div className="email-section">
          <h3>Enviar por correo electrónico</h3>
          <div className="email-form">
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="email-input"
            />
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={!isFormValid || !userEmail || isEmailSending}
              className="email-button"
            >
              {isEmailSending ? "Enviando..." : "Enviar por correo"}
            </button>
          </div>
          {emailSent && (
            <div className="success-message">
              ✅ Presupuesto enviado correctamente a {userEmail}
            </div>
          )}
        </div>
      </form>

      {showPreview && (
        <div className="quote-preview-container">
          <h2 className="quote-preview-title">Vista Previa del Presupuesto</h2>
          <div className="quote-preview">
            <div className="quote-preview-header">
              <div className="logo-container">
                <img
                  src={LogoDronFarm}
                  alt="DronFarm Logo"
                  style={{ width: '350px', height: 'auto' }}
                />
                <h1>Presupuesto de Servicios Agrícolas</h1>
              </div>
              <div className="quote-preview-date">
                <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES')}</p>
                <p><strong>Válido hasta:</strong> {formatDate(validUntil)}</p>
              </div>
            </div>

            <div className="quote-preview-section">
              <h3>CLIENTE</h3>
              <table className="quote-preview-table">
                <tbody>
                  <tr><td><strong>Cliente:</strong></td><td>{userData?.name}</td></tr>
                  <tr><td><strong>Parcela:</strong></td><td>{fieldData?.name}</td></tr>
                  <tr><td><strong>Cultivo:</strong></td><td>{capitalize(fieldData?.crop)}</td></tr>
                  <tr><td><strong>Hectáreas:</strong></td><td>{fieldData?.area} ha</td></tr>
                </tbody>
              </table>
            </div>

            <div className="quote-preview-section">
              <h3>SERVICIOS</h3>
              <table className="quote-preview-table">
                <tbody>
                  <tr><td><strong>Servicios incluidos:</strong></td><td>{services.join(', ')}</td></tr>
                  <tr><td><strong>Periodicidad:</strong></td><td>{capitalize(frequency)}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="quote-preview-section">
              <h3>DETALLES ECONÓMICOS</h3>
              <table className="quote-preview-table">
                <tbody>
                  <tr><td><strong>Precio por hectárea:</strong></td><td>{pricePerHectare} €</td></tr>
                  <tr><td><strong>Hectáreas:</strong></td><td>{fieldData?.area}</td></tr>
                  <tr className="quote-preview-total"><td><strong>TOTAL:</strong></td><td><strong>{totalPrice()} €</strong></td></tr>
                </tbody>
              </table>
            </div>

            <div className="quote-preview-footer">
              <p>* Este presupuesto no incluye IVA</p>
              <p>* Los servicios se realizarán según las condiciones meteorológicas</p>
              <p>* DronFarm se reserva el derecho a modificar el servicio en caso de condiciones adversas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quote;
