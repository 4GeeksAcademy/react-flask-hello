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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
    const token = JSON.parse(localStorage.getItem("token"));
    const { date } = formData;
    const lat = 40.4168;
    const lng = -3.7038;

    // Obtener clima real desde el backend
    const weatherResponse = await fetch(`${BASE_URL}/api/weather?lat=${lat}&lng=${lng}&date=${date}`);
    if (!weatherResponse.ok) throw new Error("Error al obtener clima");

    const weatherData = await weatherResponse.json();
    setWeatherInfo(weatherData.weather); // mostrar en formulario

    const newPost = {
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        participants: 0,
        weather: weatherData.weather || null // guardar en backend
    };

    const response = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
