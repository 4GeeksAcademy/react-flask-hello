import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ daily, loading }) => {
    if (loading) return <p className="loading">Cargando clima...</p>;
    if (!daily || daily.length === 0) return <p>No hay datos disponibles</p>;

    return (
        <div className="weather-forecast-container">
            {daily.map((day, index) => {
                const fecha = new Date(day.dt * 1000);
                const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'short' });

                return (
                    <div key={index} className={`forecast-day ${index === 0 ? 'today-highlight' : ''}`}>
                        <p className="day-name">{index === 0 ? 'Hoy' : nombreDia}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                        />
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
