import React from "react";
import { FaHeart } from "react-icons/fa";

const PostCard = ({ post, onToggleFavorite, onJoin }) => {
    return (

        <div
            className="mb-4 p-4 rounded shadow"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "1rem"
            }}
        >
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0 text-black ">{post.title}</h5>
                <button
                    className="btn btn-link text-danger p-0"
                    onClick={onToggleFavorite}
                >
                    <FaHeart size={20} color={post.isFavorite ? "red" : "lightgray"} />
                </button>
            </div>

            <p className="mb-2 text-muted "><strong>Deporte:</strong> {post.sport}</p>
            <p className="mb-2 text-black "><strong>Descripción:</strong> {post.description}</p>

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
