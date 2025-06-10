import React, { useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CreatePost = ({ show, onClose, setPosts }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        address: "",
        sport: "",
        capacity: "",
        difficulty: ""
    });

    const [weatherInfo, setWeatherInfo] = useState(null); // nuevo estado para mostrar datos del clima

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔍 FUNCIONALIDAD NOMINATIM: convierte dirección en coordenadas (lat/lon)
    const getCoordinatesFromAddress = async (address) => {
        try {
            console.log("📍 Buscando coordenadas para:", address);
            const query = encodeURIComponent(address);
            const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

            const response = await fetch(url, {
                headers: {
                    "User-Agent": "SportConnect-App" // Nominatim lo requiere
                }
            });

            if (!response.ok) throw new Error("Error al obtener coordenadas");

            const data = await response.json();
            console.log("📦 Coordenadas devueltas por Nominatim:", data);

            if (data.length === 0) return null;

            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        } catch (error) {
            console.error("❌ Error al geolocalizar dirección:", error);
            return null;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        const token = localStorage.getItem("token");

        try {
            // const token = JSON.parse(localStorage.getItem("token"));
            // const token = localStorage.getItem("token");
            // const { date } = formData;
            // const lat = 40.4168;
            // const lng = -3.7038;

            console.log("📅 Valor recibido de fecha:", formData.date);
            // 🔍 Paso 1: Obtener coordenadas desde dirección escrita
            const coords = await getCoordinatesFromAddress(formData.address);
            if (!coords) {
                alert("No se pudo obtener la ubicación a partir de la dirección.");
                return;
            }

            const { lat, lon } = coords;

            // Obtener clima real desde el backend
            // Anterior API: const weatherResponse = await fetch(`${BASE_URL}/api/weather?lat=${lat}&lng=${lng}&date=${date}`);
            // Aseguramos que la fecha esté en formato YYYY-MM-DD
            // Paso 2 - formatear la fecha
            const [year, month, day] = formData.date.split("-");
            const formattedDate = `${year}-${month}-${day}`;

            console.log("✅ Fecha formateada:", formattedDate);


            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,cloudcover_mean,precipitation_sum&start_date=${formattedDate}&end_date=${formattedDate}&timezone=Europe/Madrid`;

            console.log("🌍 URL final de clima:", weatherUrl); // debug útil

            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) throw new Error("Error al obtener clima");

            const weatherData = await weatherResponse.json(); // ✅ solo una vez
            console.log("🌦️ Datos completos del clima:", weatherData);

            const weatherSummary = {
                temperatura: weatherData.daily.temperature_2m_max[0] + "°C",
                cobertura_nubosa: weatherData.daily.cloudcover_mean[0] + "%",
                precipitaciones: weatherData.daily.precipitation_sum[0] + " mm"
            };

            console.log("🌦️ Datos del clima (resumen):", weatherSummary);
            setWeatherInfo(weatherSummary);

            // VALIDAR QUE NO ESTÉ VACÍO ANTES DE USARLO -- Anterior API
            //if (!weatherData.weather || !weatherData.weather.temperatura) {
            //console.warn("❗Datos incompletos del clima:", weatherData);
            //return alert("No se pudo obtener el clima correctamente.");
            //}
            if (!weatherSummary.temperatura || !weatherSummary.cobertura_nubosa) {
                console.warn("❗Datos incompletos del clima:", weatherSummary);
                return alert("No se pudo obtener el clima correctamente.");
            }


            const newPost = {
                title: formData.title,
                description: `${formData.address} - ${formData.sport}`, // forma de no perder esos datos
                date: formData.date,
                time: formData.time,
                difficulty: formData.difficulty,
                capacity: parseInt(formData.capacity, 10),
                // weather: `🌡️ ${weatherData.weather.temperatura}, ☁️ ${weatherData.weather.cobertura_nubosa}, 🌧️ ${weatherData.weather.precipitaciones}`, -- Anterior API
                weather: `🌡️ ${weatherSummary.temperatura}, ☁️ ${weatherSummary.cobertura_nubosa}, 🌧️ ${weatherSummary.precipitaciones}`,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
            };

            // Para ver qué JSON se está enviando
            console.log("newPost a enviar:", newPost);
            console.log("📤 Enviando POST con headers:");
            console.log({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/"/g, "")}`,
            });
            console.log("🧾 Payload (newPost):", newPost);
=======

        const newPost = {
            ...formData,
            capacity: parseInt(formData.capacity, 10),
            participants: 0
        };
        console.log("📤 Datos enviados al backend:", newPost);
        
        try {
            const token = localStorage.getItem("token");
>>>>>>> 5912055cd1abaf902bb773db1d7e2560e9d0254f

            const response = await fetch(`${BASE_URL}/api/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) throw new Error("Error al crear el evento");

            const createdPost = await response.json();
            setPosts(prev => [createdPost, ...prev]);

            // Limpiar formulario pero mantener clima
            setFormData({
                title: "", description: "", date: "", time: "", address: "",
                sport: "", capacity: "", difficulty: ""
            });

        } catch (error) {
            console.error("Error al crear el evento:", error);
            alert("Ocurrió un error al crear el evento.");
        }

    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear nueva publicación</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control text-black"
                                        placeholder="Título"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <select
                                        name="sport"
                                        className="form-select text-black"
                                        value={formData.sport}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona un deporte</option>
                                        <option value="Escalada">Escalada</option>
                                        <option value="Running">Running</option>
                                        <option value="Ciclismo">Ciclismo</option>
                                        <option value="Fitness">Fitness</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control text-black"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="time"
                                        name="time"
                                        className="form-control text-black"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control text-black"
                                        placeholder="Dirección"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        name="capacity"
                                        className="form-control text-black"
                                        placeholder="Capacidad"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <select
                                        name="difficulty"
                                        className="form-select text-black"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona dificultad</option>
                                        <option value="Fácil">Fácil</option>
                                        <option value="Medio">Medio</option>
                                        <option value="Difícil">Difícil</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <textarea
                                        name="description"
                                        className="form-control text-black"
                                        placeholder="Descripción"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success mt-3 w-100">Publicar</button>
                        </form>
                        {/* CLIMA DESPUÉS DEL FORMULARIO */}
                        {weatherInfo && (
                            <div className="alert alert-info mt-3">
                                <h6>Clima estimado para el evento:</h6>
                                <p>🌡️ Temperatura: {weatherInfo.temperatura}</p>
                                <p>☁️ Cobertura nubosa: {weatherInfo.cobertura_nubosa}</p>
                                <p>🌧️ Precipitaciones: {weatherInfo.precipitaciones}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
