import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plot_form.css";
import { showSuccessAlert, showErrorAlert } from "../../components/modal_alerts/modal_alerts";
import {useGlobalReducer} from "../../hooks/useGlobalReducer";


const CROP_OPTIONS = {
  "Cereales y Cultivos Extensivos": ["Trigo", "Cebada", "Avena", "Maíz", "Arroz", "Girasol", "Algodón"],
  "Frutales de Clima Templado": ["Manzano", "Peral", "Membrillero", "Melocotonero", "Nectarina", "Cerezo", "Ciruelo", "Albaricoquero"],
  "Frutales Subtropicales": ["Aguacate", "Mango", "Chirimoya", "Níspero", "Caqui"],
  "Cítricos": ["Naranjo", "Mandarina", "Limonero", "Pomelo", "Clementina"],
  "Frutos Secos": ["Almendro", "Nogal", "Avellano", "Pistacho"],
  "Viñedo y Olivar": ["Viñedo (Vino)", "Viñedo (Mesa)", "Olivar (Aceite)", "Olivar (Aceituna Mesa)"],
  "Hortalizas": ["Tomate", "Pimiento", "Pepino", "Calabacín", "Berenjena", "Sandía", "Melón", "Fresa", "Frambuesa", "Arándano"],
  "Cultivos Especiales": ["Kiwi (Asturias/Galicia)", "Té (Galicia)", "Aloe Vera (Canarias)", "Platanera (Canarias)", "Papaya (Canarias)"]
};

const PlotForm = () => {
  const { store } = useGlobalReducer();
  const [plotData, setPlotData] = useState({
    name: "",
    area: "",
    cropType: "",
    street: "",
    number: "",
    postalCode: "",
    city: "",
    coordinates: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlotData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCoordinates = (coords) => {
    if (!coords) return true;
    const regex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
    return regex.test(coords);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPlotData(prev => ({
            ...prev,
            coordinates: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          }));
          showSuccessAlert("Ubicación obtenida correctamente");
        },
        (error) => {
          showErrorAlert("No se pudo obtener la ubicación: " + error.message);
        }
      );
    } else {
      showErrorAlert("Geolocalización no soportada por tu navegador");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (plotData.coordinates && !validateCoordinates(plotData.coordinates)) {
      showErrorAlert("Formato de coordenadas inválido. Use: latitud,longitud");
      return;
    }

    try {
      const token = store.auth.token;
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/fields/fields`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: plotData.name,
          area: parseFloat(plotData.area),
          crop: plotData.cropType,
          street: plotData.street,
          number: plotData.number,
          postal_code: plotData.postalCode,
          city: plotData.city,
          coordinates: plotData.coordinates || ""
        })
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessAlert("Parcela registrada correctamente", () => {
          navigate("/app/dashboard");
        });
      } else {
        showErrorAlert(data.error || "Error al registrar la parcela");
      }

    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="plot-form-container">
      <div className="plot-form-card">
        <h2 className="plot-form-title">Registro de Nueva Parcela</h2>

        <form onSubmit={handleSubmit} className="plot-form">
          {/* Sección 1: Información Básica */}
          <div className="form-section">
            <h3 className="section-title">Información básica</h3>
            <div className="form-group">
              <label htmlFor="name">Nombre de parcela*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={plotData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="area">Nº de hectáreas*</label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={plotData.area}
                  onChange={handleChange}
                  step="0.01"
                  min="0.1"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cropType">Tipo de Cultivo*</label>
                <select
                  id="cropType"
                  name="cropType"
                  value={plotData.cropType}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Seleccione...</option>
                  {Object.entries(CROP_OPTIONS).map(([group, crops]) => (
                    <optgroup label={group} key={group}>
                      {crops.map(crop => (
                        <option value={crop} key={crop}>{crop}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Otro">Otro (Especificar en observaciones)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección 2: Ubicación */}
          <div className="form-section">
            <h3 className="section-title">Ubicación</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street">Calle*</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={plotData.street}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="number">Número*</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={plotData.number}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postalCode">Código Postal*</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={plotData.postalCode}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">Ciudad*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={plotData.city}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="coordinates">Coordenadas (opcional)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  id="coordinates"
                  name="coordinates"
                  value={plotData.coordinates}
                  onChange={handleChange}
                  placeholder="Ej: 40.4168, -3.7038"
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="location-button"
                  style={{
                    padding: '0.5rem',
                    background: '#f8f9fa',
                    border: '1px solid #ced4da',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  📍
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Registrar Parcela
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlotForm;