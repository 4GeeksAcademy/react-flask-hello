
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plot_form.css";

const PlotForm = () => {
    const [plotData, setPlotData] = useState({
        name: "",
        area: "",
        cropType: "",
        sowingDate: "",
        street: "",
        number: "",
        postalCode: "",
        city: "",
        coordinates: ""
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlotData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem("token");
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
                    sowing_date: plotData.sowingDate,
                    street: plotData.street,
                    number: plotData.number,
                    postal_code: plotData.postalCode,
                    city: plotData.city,
                    coordinates: plotData.coordinates
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Parcela registrada correctamente");
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setError(data.error || "Error al registrar la parcela");
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
                        <h3 className="section-title">Información Básica</h3>
                        <div className="form-group">
                            <label htmlFor="name">Nombre de la Parcela*</label>
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
                                <label htmlFor="area">Área (hectáreas)*</label>
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
                                    {/* Cereales y cultivos extensivos */}
                                    <optgroup label="Cereales y Cultivos Extensivos">
                                        <option value="Trigo">Trigo</option>
                                        <option value="Cebada">Cebada</option>
                                        <option value="Avena">Avena</option>
                                        <option value="Maíz">Maíz</option>
                                        <option value="Arroz">Arroz</option>
                                        <option value="Girasol">Girasol</option>
                                        <option value="Algodón">Algodón</option>
                                    </optgroup>

                                    {/* Frutales de clima templado */}
                                    <optgroup label="Frutales de Clima Templado">
                                        <option value="Manzano">Manzano</option>
                                        <option value="Peral">Peral</option>
                                        <option value="Membrillero">Membrillero</option>
                                        <option value="Melocotonero">Melocotonero</option>
                                        <option value="Nectarina">Nectarina</option>
                                        <option value="Cerezo">Cerezo</option>
                                        <option value="Ciruelo">Ciruelo</option>
                                        <option value="Albaricoquero">Albaricoquero</option>
                                    </optgroup>

                                    {/* Frutales subtropicales (Andalucía) */}
                                    <optgroup label="Frutales Subtropicales">
                                        <option value="Aguacate">Aguacate</option>
                                        <option value="Mango">Mango</option>
                                        <option value="Chirimoya">Chirimoya</option>
                                        <option value="Níspero">Níspero</option>
                                        <option value="Caqui">Caqui</option>
                                    </optgroup>

                                    {/* Cítricos (Levante) */}
                                    <optgroup label="Cítricos">
                                        <option value="Naranjo">Naranjo</option>
                                        <option value="Mandarina">Mandarina</option>
                                        <option value="Limonero">Limonero</option>
                                        <option value="Pomelo">Pomelo</option>
                                        <option value="Clementina">Clementina</option>
                                    </optgroup>

                                    {/* Frutos secos */}
                                    <optgroup label="Frutos Secos">
                                        <option value="Almendro">Almendro</option>
                                        <option value="Nogal">Nogal</option>
                                        <option value="Avellano">Avellano</option>
                                        <option value="Pistacho">Pistacho</option>
                                    </optgroup>

                                    {/* Viñedo y Olivar */}
                                    <optgroup label="Viñedo y Olivar">
                                        <option value="Viñedo (Vino)">Viñedo (Vino)</option>
                                        <option value="Viñedo (Mesa)">Viñedo (Mesa)</option>
                                        <option value="Olivar (Aceite)">Olivar (Aceite)</option>
                                        <option value="Olivar (Aceituna Mesa)">Olivar (Aceituna Mesa)</option>
                                    </optgroup>

                                    {/* Hortalizas */}
                                    <optgroup label="Hortalizas">
                                        <option value="Tomate">Tomate</option>
                                        <option value="Pimiento">Pimiento</option>
                                        <option value="Pepino">Pepino</option>
                                        <option value="Calabacín">Calabacín</option>
                                        <option value="Berenjena">Berenjena</option>
                                        <option value="Sandía">Sandía</option>
                                        <option value="Melón">Melón</option>
                                        <option value="Fresa">Fresa</option>
                                        <option value="Frambuesa">Frambuesa</option>
                                        <option value="Arándano">Arándano</option>
                                    </optgroup>

                                    {/* Cultivos especiales */}
                                    <optgroup label="Cultivos Especiales">
                                        <option value="Kiwi">Kiwi (Asturias/Galicia)</option>
                                        <option value="Té">Té (Galicia)</option>
                                        <option value="Aloe Vera">Aloe Vera (Canarias)</option>
                                        <option value="Platanera">Platanera (Canarias)</option>
                                        <option value="Papaya">Papaya (Canarias)</option>
                                    </optgroup>

                                    <option value="Otro">Otro (Especificar en observaciones)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="sowingDate">Fecha de Siembra*</label>
                            <input
                                type="date"
                                id="sowingDate"
                                name="sowingDate"
                                value={plotData.sowingDate}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
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
                            <input
                                type="text"
                                id="coordinates"
                                name="coordinates"
                                value={plotData.coordinates}
                                onChange={handleChange}
                                placeholder="Ej: 40.4168, -3.7038"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            Registrar Parcela
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlotForm;