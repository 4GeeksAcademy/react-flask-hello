import React, { useEffect, useState } from "react";
import LogoDronFarm from "../../assets/img/Logo_DronFarm2.png";
import "./Quote.css";
import { showSuccessAlert, showErrorAlert } from "../../components/modal_alerts/modal_alerts";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


const Quote = () => {
  const [userData, setUserData] = useState(null);
  const [fieldData, setFieldData] = useState(null);
  const [frequency, setFrequency] = useState("Mensual");
  const [services, setServices] = useState(["fotogrametria"]);
  const [pricePerHectare, setPricePerHectare] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [validUntil, setValidUntil] = useState(getDefaultValidDate());
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [additionalEmail, setAdditionalEmail] = useState("");
  const [isSendingToAdditional, setIsSendingToAdditional] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(true);
  const { store } = useGlobalReducer();


  const frequencyMultipliers = {
    Mensual: 1,
    Trimestral: 3,
    Semestral: 6,
    Anual: 12
  };

  const token = store.auth.token;
  const userId = store.auth.userId;
  const selectedField = store.selectedField;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!store.selectedField) {
      const storedField = localStorage.getItem("selectedField");
      if (storedField) {
        const parsedField = JSON.parse(storedField);
        setFieldData(parsedField);
      }
    }
  }, []);


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
    const fetchUserData = async () => {
      try {
        console.log("🎯 Iniciando carga de datos para presupuesto...");
        console.log("🔑 Token:", token);
        console.log("👤 UserID:", userId);
        console.log("🌐 BACKEND_URL:", BACKEND_URL);

        const userRes = await fetch(`${BACKEND_URL}/user/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await userRes.json();
        console.log("📥 userData:", userData);
        setUserData(userData);
        setUserEmail(userData.email || "");

      } catch (err) {
        console.error("❌ Error al cargar usuario:", err);
        showErrorAlert("Error al obtener datos del usuario.");
      } finally {
        setIsLoading(false);
        setIsPdfReady(true);
      }
    };

    if (token && userId && store.selectedField) {
      console.log("🌱 Usando parcela seleccionada:", store.selectedField);
      setFieldData(store.selectedField);
      fetchUserData();
    } else if (!store.selectedField) {
      showErrorAlert("No hay ninguna parcela seleccionada.");
      setIsLoading(false);
    }
  }, [token, userId, store.selectedField]);


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
        // Modal personalizado
        showSuccessAlert(
          "Gracias por confiar en DronFarm, en breves contactaremos contigo para gestionar el vuelo.",
          () => navigate("/app/dashboard"),
          true // 👈 Mostrar botón "Okey" solo acá
        );

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

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 14px;">
        <h2 style="color: #198754;">¡Hola ${userData?.name}!</h2>
        <p>Gracias por confiar en <strong>DroneFarm</strong>.</p>
        <p>Adjunto encontrarás el presupuesto generado para tu parcela <strong>${fieldData?.name}</strong>.</p>
        <p><strong>Total estimado:</strong> ${totalPrice()} €</p>
        <p><strong>Válido hasta:</strong> ${formatDate(validUntil)}</p>
        <p style="margin-top: 20px;">Quedamos atentos para cualquier duda o ajuste.</p>
        <p>Un saludo,<br/>Equipo DroneFarm 🚀</p>
      </div>
    `;

    const payload = {
      email: userEmail,
      quoteDataHtml: htmlBody,
      user: userData?.name,
      field: fieldData?.name,
      cropType: capitalize(fieldData?.crop),
      hectares: fieldData?.area,
      services: services.join(', '),
      frequency: capitalize(frequency),
      pricePerHectare,
      total: totalPrice(),
      validUntil: validUntil
    };

    setIsEmailSending(true);
    try {
      const response = await fetch(`${BACKEND_URL}/quote/enviar-presupuesto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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

  const handleSendToOther = async () => {
    if (!additionalEmail || !additionalEmail.includes("@")) {
      showErrorAlert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (!recipientName.trim()) {
      showErrorAlert("Por favor, introduce el nombre del destinatario.");
      return;
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333; font-size: 14px;">
        <h2 style="color: #198754;">¡Hola ${recipientName.trim()}!</h2>
        <p>El agricultor <strong>${userData?.name}</strong> ha compartido contigo un presupuesto generado desde <strong>DroneFarm</strong>.</p>
        <p>Adjunto encontrarás el presupuesto para la parcela <strong>${fieldData?.name}</strong>.</p>
        <p><strong>Total estimado:</strong> ${totalPrice()} €</p>
        <p><strong>Válido hasta:</strong> ${formatDate(validUntil)}</p>
        <p style="margin-top: 20px;">Para más detalles, no dudes en contactarnos.</p>
        <p>Un saludo,<br/>Equipo DroneFarm 🚀</p>
      </div>
    `;

    const payload = {
      email: additionalEmail,
      quoteDataHtml: htmlBody,
      user: userData?.name,
      field: fieldData?.name,
      cropType: capitalize(fieldData?.crop),
      hectares: fieldData?.area,
      services: services.join(', '),
      frequency: capitalize(frequency),
      pricePerHectare,
      total: totalPrice(),
      validUntil: validUntil
    };

    setIsSendingToAdditional(true);
    try {
      const response = await fetch(`${BACKEND_URL}/quote/enviar-presupuesto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showSuccessAlert("Presupuesto enviado correctamente al destinatario.");
        setAdditionalEmail("");
        setRecipientName("");
      } else {
        const error = await response.json();
        showErrorAlert("Error al enviar el correo: " + error.error);
      }
    } catch (err) {
      showErrorAlert("Error al conectar con el servidor: " + err.message);
      console.error(err);
    } finally {
      setIsSendingToAdditional(false);
    }
  };



  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/quote/descargar-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: userData?.name,
          field: fieldData?.name,
          cropType: capitalize(fieldData?.crop),
          hectares: fieldData?.area,
          services: services.join(', '),
          frequency: capitalize(frequency),
          price_per_hectare: pricePerHectare,
          total: totalPrice(),
          valid_until: validUntil
        })
      });

      if (!response.ok) throw new Error("Error al generar PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `presupuesto_${userData?.name?.replace(/\s+/g, '_').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("❌ Error al descargar PDF:", err);
      showErrorAlert("No se pudo generar el PDF.");
    }
  };



  const isFormValid = userData && fieldData && fieldData.area > 0 && frequency && pricePerHectare > 0;

  if (isLoading) return <p className="quote-loading">Cargando datos...</p>;

  return (
    <div className="quote-editor-container">
      <h2 className="editor-title">📄 Vista Previa de Presupuesto</h2>
      {showEmailConfirmation && (
        <div className="email-confirmation-box">
          <div className="email-icon">📨</div>
          <div className="email-message">
            <h4>Presupuesto enviado por correo</h4>
            <p>Hemos enviado una copia de tu presupuesto al correo electrónico registrado.</p>
            <p>
              Muchas gracias por confiar en <strong>DroneFarm</strong>. En breves nos pondremos en contacto contigo para coordinar el vuelo.
            </p>
            <p>Ante cualquier duda, no dudes en escribirnos. ¡Estamos aquí para ayudarte! 🤝</p>
          </div>
        </div>
      )}

      <div className="quote-email-forward">
        <div className="quote-email-forward-header">
          <span className="forward-icon">📤</span>
          <h3>Enviar a otra persona</h3>
        </div>
        <p className="quote-email-forward-text">
          ¿Quieres compartir este presupuesto con un jefe, socio u otra persona?
        </p>

        <form className="forward-form" onSubmit={(e) => { e.preventDefault(); handleSendToOther(); }}>
          <input
            type="text"
            placeholder="Nombre del destinatario"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="email"
            placeholder="Correo del destinatario"
            value={additionalEmail}
            onChange={(e) => setAdditionalEmail(e.target.value)}
            className="form-input"
            required
          />
          <button
            type="submit"
            className="action-button blue-button"
            disabled={isSendingToAdditional || !additionalEmail || !recipientName}
          >
            {isSendingToAdditional ? "Enviando..." : "Enviar presupuesto"}
          </button>
        </form>
      </div>


      <div className="button-container">
        <button
          type="button"
          onClick={handleSubmit}
          className="action-button green-button"
          disabled={!isFormValid}
        >
          Aceptar Presupuesto
        </button>

        {isPdfReady && isFormValid && (
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="action-button orange-button"
          >
            Descargar PDF
          </button>
        )}
      </div>

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
    </div>
  );

};

export default Quote;
