import React from 'react';
import {
    WiDaySunny,
    WiNightClear,
    WiCloud,
    WiCloudy,
    WiShowers,
    WiRain,
    WiThunderstorm,
    WiSnow,
    WiFog,
} from 'react-icons/wi';
import './WeatherForecast.css';

const iconMap = {
    '01d': <WiDaySunny size={42} color="#facc15" />,
    '01n': <WiNightClear size={42} color="#0ea5e9" />,
    '02d': <WiCloud size={42} color="#60a5fa" />,
    '02n': <WiCloud size={42} color="#3b82f6" />,
    '03d': <WiCloudy size={42} color="#64748b" />,
    '03n': <WiCloudy size={42} color="#475569" />,
    '04d': <WiCloudy size={42} color="#4b5563" />,
    '04n': <WiCloudy size={42} color="#374151" />,
    '09d': <WiShowers size={42} color="#38bdf8" />,
    '09n': <WiShowers size={42} color="#0ea5e9" />,
    '10d': <WiRain size={42} color="#0284c7" />,
    '10n': <WiRain size={42} color="#0369a1" />,
    '11d': <WiThunderstorm size={42} color="#f87171" />,
    '11n': <WiThunderstorm size={42} color="#dc2626" />,
    '13d': <WiSnow size={42} color="#bae6fd" />,
    '13n': <WiSnow size={42} color="#e0f2fe" />,
    '50d': <WiFog size={42} color="#9ca3af" />,
    '50n': <WiFog size={42} color="#6b7280" />,
};

const WeatherForecast = ({ daily, loading }) => {
    if (loading) return <p className="loading">Cargando clima...</p>;
    if (!daily || daily.length === 0) return <p>No hay datos disponibles</p>;

    return (
        <div className="weather-forecast-container">
            {daily.map((day, index) => {
                const fecha = new Date(day.dt * 1000);
                const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'short' });
                const iconCode = day.weather[0].icon;
                const icono = iconMap[iconCode];

                return (
                    <div
                        key={index}
                        className={`forecast-day ${index === 0 ? 'today-highlight' : ''} weather-${iconCode}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <p className="day-name">{index === 0 ? 'Hoy' : nombreDia}</p>
                        <div className="weather-icon">{icono}</div>
                        <p className="temp-range">
                            {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
                        </p>
                        <p className="desc">{day.weather[0].description}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherForecast;
