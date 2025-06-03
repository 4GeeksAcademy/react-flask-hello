import React from "react";
import { FaHeart } from "react-icons/fa";

const difficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
        case "Fácil":
            return "bg-success text-white";
        case "Medio":
            return "bg-warning text-dark";
        case "Difícil":
            return "bg-danger text-white";
        default:
            return "bg-secondary text-white";
    }
};

const PostCard = ({ post, onToggleFavorite, onJoin }) => {
    return (
        <div
            className="mb-4 p-4 rounded shadow"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "1rem"
            }}
        >
            <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                    <h5 className="mb-0 text-black">{post.title}</h5>
                    <span className={`badge mt-1 ${difficultyBadgeClass(post.difficulty)}`}>
                        {post.difficulty || "Sin dificultad"}
                    </span>
                </div>
                <button
                    className="btn btn-link text-danger p-0"
                    onClick={onToggleFavorite}
                >
                    <FaHeart size={20} color={post.isFavorite ? "red" : "lightgray"} />
                </button>
            </div>

            <p className="mb-2 text-muted"><strong>Deporte:</strong> {post.sport}</p>
            <p className="mb-2 text-black"><strong>Descripción:</strong> {post.description}</p>

            <div className="row mb-2 text-black">
                <div className="col-md-6">
                    <p className="mb-1"><strong>Fecha:</strong> {post.date}</p>
                </div>
                <div className="col-md-6">
                    <p className="mb-1"><strong>Hora:</strong> {post.time}</p>
                </div>
            </div>

            <p className="mb-2 text-black"><strong>Dirección:</strong> {post.address}</p>
            <p className="mb-2 text-black"><strong>Capacidad:</strong> {post.capacity} personas</p>

            {/* Parte de la API-Clima */}
            {post.weather && (
                <div className="mt-2 text-black">
                    <h6 className="fw-bold mb-2">🌤 Clima estimado</h6>
                    <ul className="list-unstyled mb-0">
                        <li>🌡️ <strong>Temperatura:</strong> {post.weather.temperatura}</li>
                        <li>🌧️ <strong>Precipitaciones:</strong> {post.weather.precipitaciones}</li>
                        <li>☁️ <strong>Cobertura nubosa:</strong> {post.weather.cobertura_nubosa}</li>
                    </ul>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-muted">{post.participants} participantes</span>
                <button
                    className="btn btn-success"
                    onClick={onJoin}
                    disabled={post.participants >= post.capacity}
                >
                    {post.participants >= post.capacity ? "Cupo lleno" : "Anotarme"}
                </button>
            </div>
        </div>
    );
};

export default PostCard;
