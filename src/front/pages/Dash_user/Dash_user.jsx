import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Dash_user.css';
import MapboxParcel from '../../components/MapboxParcel/MapboxParcel';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import Report from '../../components/Reports/Reports'; // o ajusta la ruta según tu estructura
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import FieldSelectorModal from "../../components/FieldSelectorModal/FieldSelectorModal";


const Dash_user = () => {
    const { store, dispatch } = useGlobalReducer();
    const [userData, setUserData] = useState(null);
    const [fieldsList, setFieldsList] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const navigate = useNavigate();
    const [forecast, setForecast] = useState([]);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        user: true,
        weather: true,
        reports: true
    });
    const [initialSelectionDone, setInitialSelectionDone] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const token = store.auth.token;
            const userId = store.auth.userId;

            if (!token || !userId) {
                setError("Usuario no autenticado");
                setLoading({ user: false, weather: false, reports: false });
                return;
            }

            try {
                const userRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(userRes.data);
                setLoading(prev => ({ ...prev, user: false }));

                const fieldRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/fields/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userFields = Array.isArray(fieldRes.data) ? fieldRes.data : [];
                setFieldsList(userFields);

                const lastSelectedId = localStorage.getItem("selectedFieldId");
                const matchingField = userFields.find(f => f.id.toString() === lastSelectedId);

                if (matchingField) {
                    setSelectedField(matchingField);
                    dispatch({ type: "SET_SELECTED_FIELD", payload: matchingField });
                    setInitialSelectionDone(true); // ✅ no mostramos modal
                } else {
                    setSelectedField(userFields[0]);
                }
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("Error al cargar datos del usuario o la tierra");
            } finally {
                setLoading(prev => ({ ...prev, weather: false }));
            }

            try {
                const reportsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report_routes/user_reports/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReports(Array.isArray(reportsRes.data) ? reportsRes.data : []);
            } catch (err) {
                console.error('Error al cargar informes:', err);
                setReports([]);
            } finally {
                setLoading(prev => ({ ...prev, reports: false }));
            }
        };

        fetchData();
    }, []);


    // clima en funcion del cultivo
    useEffect(() => {
        const fetchWeatherForField = async () => {
            if (!selectedField) return;

            const [lat, lon] = selectedField.coordinates
                .split(',')
                .map(coord => parseFloat(coord.trim()));

            try {
                const forecastRes = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e3007f5e69ba980e3897f92c2c2d4750&units=metric&lang=es`
                );

                const groupedDays = forecastRes.data.list.reduce((acc, item) => {
                    const date = item.dt_txt.split(' ')[0];
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(item);
                    return acc;
                }, {});

                const daily = Object.values(groupedDays).slice(0, 10).map(group => {
                    const temps = group.map(i => i.main.temp);
                    return {
                        dt: group[0].dt,
                        temp: {
                            max: Math.max(...temps),
                            min: Math.min(...temps)
                        },
                        weather: group[0].weather
                    };
                });

                setForecast(daily);
            } catch (err) {
                console.error("Error al cargar el clima:", err);
            }
        };

        fetchWeatherForField();
    }, [selectedField]);


    const pointsClave = selectedField ? [
        {
            lat: parseFloat(selectedField.coordinates.split(',')[0]) + 0.0003,
            lon: parseFloat(selectedField.coordinates.split(',')[1]) + 0.0002,
            name: "Sensor 1",
            description: "Humedad: 68%",
            color: "blue"
        },
        {
            lat: parseFloat(selectedField.coordinates.split(',')[0]) - 0.0004,
            lon: parseFloat(selectedField.coordinates.split(',')[1]) - 0.0001,
            name: "Punto de riego",
            description: "Activo",
            color: "green"
        }
    ] : [];

    const handleDeleteReport = async (reportId) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar este informe?");
        if (!confirm) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/report_routes/delete/${reportId}`, {
                headers: {
                    Authorization: `Bearer ${store.auth.token}` // 👈 usamos el token desde el store
                }
            });

            // actualizar la lista
            setReports(prev => prev.filter(r => r.id !== reportId));
        } catch (err) {
            console.error("Error al eliminar informe:", err);
            alert("No se pudo eliminar el informe.");
        }
    };

    const filteredReports = reports.filter(
        (report) => report.field_id === selectedField?.id
    );


    const handleSendEmail = async () => {
        if (!userData?.email || !selectedField) return;

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const userEmail = userData.email;
        const frequency = "Mensual";
        const pricePerHectare = 30;
        const services = ["fotogrametria"];
        const total = (selectedField.area * pricePerHectare).toFixed(2);
        const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

        const htmlBody = `
          <div style="font-family: Arial, sans-serif; color: #333; font-size: 14px;">
            <h2 style="color: #198754;">¡Hola ${userData?.name}!</h2>
            <p>Gracias por confiar en <strong>DroneFarm</strong>.</p>
            <p>Adjunto encontrarás el presupuesto generado para tu parcela <strong>${selectedField?.name}</strong>.</p>
            <p><strong>Total estimado:</strong> ${total} €</p>
            <p><strong>Válido hasta:</strong> ${new Date(validUntil).toLocaleDateString('es-ES')}</p>
            <p style="margin-top: 20px;">Quedamos atentos para cualquier duda o ajuste.</p>
            <p>Un saludo,<br/>Equipo DroneFarm 🚀</p>
          </div>
        `;

        const payload = {
            email: userEmail,
            quoteDataHtml: htmlBody,
            user: userData.name,
            field: selectedField.name,
            cropType: selectedField.crop,
            hectares: selectedField.area,
            services: services.join(", "),
            frequency,
            pricePerHectare,
            total,
            validUntil
        };

        try {
            await axios.post(`${BACKEND_URL}/quote/enviar-presupuesto`, payload);
            console.log("✅ Correo con PDF enviado desde Dashboard");
        } catch (error) {
            console.error("❌ Error al enviar el correo:", error);
        }
    };




    if (error) return <div className="error-message">{error}</div>;


    return (

        <>
            {(!initialSelectionDone && fieldsList.length > 1) && (
                <FieldSelectorModal
                    fields={fieldsList}
                    setSelected={(field) => {
                        setSelectedField(field);
                        dispatch({
                            type: "SET_SELECTED_FIELD",
                            payload: field
                        });
                        localStorage.setItem("selectedFieldId", field.id); // ✅ Guardamos selección
                        setInitialSelectionDone(true);

                    }}

                    onClose={() => setInitialSelectionDone(true)}
                    selected={selectedField} // no olvides pasar esto si lo usas en la clase `selected`
                />
            )}

            <div className="dashboard-container">
                <div className="top-section two-column-layout">
                    <div className="left-panel">
                        <div className="map-container">
                            {selectedField && selectedField.coordinates ? (
                                (() => {
                                    const [lat, lon] = selectedField.coordinates
                                        .split(',')
                                        .map(coord => parseFloat(coord.trim()));

                                    return (
                                        <MapboxParcel
                                            key={selectedField.id}
                                            latitude={lat}
                                            longitude={lon}
                                            fields={fieldsList}
                                            onFieldClick={(field) => {
                                                setSelectedField(field);
                                                dispatch({
                                                    type: "SET_DRAWN_FIELD", 
                                                    payload: polygon.geometry,
                                                });

                                                localStorage.setItem("selectedFieldId", field.id);
                                            }}
                                        />
                                    );
                                })()
                            ) : (
                                <div className="map-placeholder">Cargando mapa...</div>
                            )}
                        </div>

                        <div className="weather-horizontal-section">
                            <WeatherForecast daily={forecast} loading={loading.weather} />
                        </div>
                    </div>

                    <div className="info-panel">
                        {userData && selectedField && (
                            <>

                                <div className="user-info">
                                    <h2>{userData.name?.toUpperCase()}</h2>
                                    {fieldsList.length > 1 && (
                                        <button
                                            className="change-field-button"
                                            onClick={() => setInitialSelectionDone(false)}
                                        >
                                            🔄 Cambiar de cultivo
                                        </button>
                                    )}
                                    <p>{selectedField.street}, {selectedField.number}</p>
                                    <p>{selectedField.city}</p>
                                    <p><strong>{selectedField.area} HCT</strong></p>
                                    <p>{selectedField.crop.toUpperCase()}</p>
                                </div>

                                <div className="reports-section">
                                    <h4>Mis Informes</h4>

                                    {loading.reports && (
                                        <p className="loading-msg">🔄 Actualizando informes...</p>
                                    )}

                                    {filteredReports.length > 0 ? (
                                        <ul className={`reports-list ${loading.reports ? 'loading' : ''}`}>
                                            {filteredReports.map((r, i) => (
                                                <li key={i}>
                                                    <div className="report-item-header">
                                                        <div>
                                                            <a
                                                                href={`${import.meta.env.VITE_BACKEND_URL}${r.url}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="report-title"
                                                                style={{
                                                                    display: 'block',
                                                                    fontSize: '1.1rem',
                                                                    fontWeight: '600',
                                                                    color: '#111827',
                                                                    textDecoration: 'none',
                                                                    marginBottom: '0.25rem'
                                                                }}
                                                            >
                                                                📌 {r.title || 'Sin título'}
                                                            </a>

                                                            <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                                                                📄 {new Date(r.date).toLocaleDateString('es-ES')} - {r.file_name}
                                                            </p>

                                                            {r.description && (
                                                                <p className="report-description">📝 {r.description}</p>
                                                            )}
                                                        </div>

                                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                            <a
                                                                href={`${import.meta.env.VITE_BACKEND_URL}/download/${r.file_name}`}
                                                                className="download-report-button"
                                                                title="Descargar"
                                                            >
                                                                ⬇️ Descargar
                                                            </a>

                                                            <button
                                                                onClick={() => handleDeleteReport(r.id)}
                                                                className="delete-report-button"
                                                                title="Eliminar"
                                                            >
                                                                🗑️ Eliminar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : !loading.reports ? (
                                        <p>No hay informes disponibles</p>
                                    ) : null}
                                </div>

                                <button
                                    className="request-report-button"
                                    onClick={async () => {
                                        await handleSendEmail();   // 📧 Enviar correo con PDF antes
                                        navigate("/app/quote");    // 🚀 Luego redirigir
                                    }}
                                >
                                    SOLICITAR PRESUPUESTO
                                </button>



                                <button
                                    className="add-field-button"
                                    onClick={() => navigate("/app/plot_form")}
                                >
                                    ➕ AÑADIR NUEVO CULTIVO
                                </button>
                            </>
                        )}
                    </div>
                </div>


            </div>

        </>
    );
};

export default Dash_user;
