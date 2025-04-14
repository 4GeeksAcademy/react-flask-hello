import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Dash_user.css';
import MapboxParcel from '../../components/MapboxParcel/MapboxParcel';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import Report from '../../components/Reports/Reports'; // o ajusta la ruta según tu estructura
import { useGlobalReducer } from "../../hooks/useGlobalReducer";



const Dash_user = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { store } = useGlobalReducer();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [fieldData, setFieldData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        user: true,
        weather: true,
        reports: true
    });

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
                setFieldData(fieldRes.data);

                const [lat, lon] = fieldRes.data.coordinates.split(',').map(coord => parseFloat(coord.trim()));

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

    const pointsClave = fieldData ? [
        {
            lat: parseFloat(fieldData.coordinates.split(',')[0]) + 0.0003,
            lon: parseFloat(fieldData.coordinates.split(',')[1]) + 0.0002,
            name: "Sensor 1",
            description: "Humedad: 68%",
            color: "blue"
        },
        {
            lat: parseFloat(fieldData.coordinates.split(',')[0]) - 0.0004,
            lon: parseFloat(fieldData.coordinates.split(',')[1]) - 0.0001,
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

    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-container">
            <div className="top-section">
                <div className="map-container">
                    {fieldData ? (
                        <MapboxParcel
                            latitude={parseFloat(fieldData.coordinates.split(',')[0])}
                            longitude={parseFloat(fieldData.coordinates.split(',')[1])}
                            points={pointsClave}
                        />
                    ) : (
                        <div className="map-placeholder">Cargando mapa...</div>
                    )}
                </div>

                <div className="info-panel">
                    {userData && fieldData && (
                        <>
                            <div className="user-info">
                                <h2>{userData.name?.toUpperCase()}</h2>
                                <p>{fieldData.street}, {fieldData.number}</p>
                                <p>{fieldData.city}</p>
                                <p><strong>{fieldData.area} HCT</strong></p>
                                <p>{fieldData.crop.toUpperCase()}</p>
                            </div>

                            <div className="reports-section">
                                <h4>Mis Informes</h4>

                                {/* Mostramos mensaje de carga sin esconder la lista */}
                                {loading.reports && (
                                    <p className="loading-msg">🔄 Actualizando informes...</p>
                                )}

                                {reports.length > 0 ? (
                                    <ul className={`reports-list ${loading.reports ? 'loading' : ''}`}>
                                        {reports.map((r, i) => (
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
                                onClick={() => navigate("/app/quote")}
                            >
                                SOLICITAR PRESUPUESTO
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bottom-section">

                <div className="bottom-section">
                    <div className="weather-horizontal-section">
                        <WeatherForecast daily={forecast} loading={loading.weather} />
                    </div>
                </div>



            </div>

            <button
                className="upload-report-button"
                onClick={() => setModalVisible(true)}
            >
                SUBIR INFORME MANUALMENTE
            </button>

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Report
                            fieldId={fieldData?.id}
                            onClose={() => setModalVisible(false)}
                            onUploaded={() => {
                                setModalVisible(false);
                                setLoading(prev => ({ ...prev, reports: true }));

                                axios.get(`${import.meta.env.VITE_BACKEND_URL}/report_routes/user_reports/${store.auth.userId}`, {
                                    headers: { Authorization: `Bearer ${store.auth.token}` },
                                })
                                    .then((res) => {
                                        const data = Array.isArray(res.data) ? res.data : [];
                                        setReports(data);
                                    })
                                    .catch(() => {
                                        setReports([]);
                                    })
                                    .finally(() => {
                                        setLoading(prev => ({ ...prev, reports: false }));
                                    });
                            }}

                        />
                    </div>

                </div>
            )}

        </div>
    );
};

export default Dash_user;
