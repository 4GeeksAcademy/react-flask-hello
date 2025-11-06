import React from "react";
import { FaUser, FaBookmark, FaCog, FaArrowLeft, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{
        backgroundColor: "#1f2630",
        height: "100vh",
        color: "white",
        position: "relative",
      }}
    >
      {/* Header */}
      <div className="text-center pt-4 position-relative">
        {/* Botón volver */}
        <button
          className="btn btn-link position-absolute start-0 mt-3 ms-3 text-light"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Botón editar */}
        <button
          className="btn btn-link position-absolute end-0 mt-3 me-3 text-light"
          onClick={() => alert("Editar perfil")}
        >
          <FaPen size={18} />
        </button>

        {/* Avatar */}
        <div className="d-flex justify-content-center align-items-center flex-column mt-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="rounded-circle mb-3 border border-secondary"
            width="90"
            height="90"
          />
          <h5 className="mb-0">Leonardo</h5>
          <p className="text-muted small">leonardo@gmail.com</p>
        </div>

        {/* Card de opciones */}
        <div
          className="card bg-dark mt-4 mx-auto"
          style={{ width: "85%", border: "none" }}
        >
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
              onClick={() => alert("Ir a perfil")}
              style={{ cursor: "pointer" }}
            >
              <span><FaUser className="me-2" /> Profile</span>
              <i className="bi bi-chevron-right"></i>
            </li>
            <li
              className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
              onClick={() => alert("Ir a favoritos")}
              style={{ cursor: "pointer" }}
            >
              <span><FaBookmark className="me-2" /> Bookmarked</span>
              <i className="bi bi-chevron-right"></i>
            </li>
            <li
              className="list-group-item bg-dark text-light d-flex justify-content-between align-items-center"
              onClick={() => alert("Ir a configuración")}
              style={{ cursor: "pointer" }}
            >
              <span><FaCog className="me-2" /> Settings</span>
              <i className="bi bi-chevron-right"></i>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer tipo app */}
      <div
        className="d-flex justify-content-around align-items-center py-2"
        style={{
          backgroundColor: "#151b23",
          borderTop: "1px solid #2a2f38",
        }}
      >
        <button className="btn btn-link text-light" onClick={() => navigate("/")}>
          <i className="bi bi-house"></i>
        </button>
        <button className="btn btn-link text-light" onClick={() => navigate("/demo")}>
          <i className="bi bi-calendar-event"></i>
        </button>
        <button className="btn btn-link text-light" onClick={() => alert("Mensajes")}>
          <i className="bi bi-chat"></i>
        </button>
        <button className="btn btn-link text-light" onClick={() => navigate("/profile")}>
          <i className="bi bi-person"></i>
        </button>
      </div>
    </div>
  );
};
