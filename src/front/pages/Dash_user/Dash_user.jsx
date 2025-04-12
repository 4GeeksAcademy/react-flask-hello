import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Dash_user.css';
import MapboxParcel from '../../components/MapboxParcel/MapboxParcel';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';

const Dash_user = () => {
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
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

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
                const reportsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reports/user/${userId}`, {
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
                                {reports.length > 0 ? (
                                    <ul>
                                        {reports.map((r, i) => (
                                            <li key={i}>
                                                <a
                                                    href={`${import.meta.env.VITE_BACKEND_URL}/reports/file/${r.filename}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    📄 {new Date(r.created_at).toLocaleDateString('es-ES')} - {r.filename}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No hay informes disponibles</p>
                                )}
                            </div>

                            <button
                                className="request-report-button"
                                onClick={() => navigate("/app/quote")}
                            >
                                SOLICITAR NUEVO INFORME
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bottom-section">

                <div className="weather-horizontal-section">
                    <WeatherForecast daily={forecast} loading={loading.weather} />
                </div>


            </div>
        </div>
    );
};

export default Dash_user;
