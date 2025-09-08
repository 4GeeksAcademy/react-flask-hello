// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

const Home = () => {
    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                backgroundImage: `url("/Deportistas.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <PublicNavbar />

            <div className="container my-auto text-end">
                <div className="bg-white p-5 rounded shadow" style={{ maxWidth: "400px", marginLeft: "auto", opacity: 0.95 }}>
                    <h2 className="text-dark mb-4">Únete a la comunidad</h2>
                    <p className="text-muted">Regístrate y conecta con personas apasionadas por el deporte.</p>
                    <Link to="/login" className="btn btn-success w-100">
                        Ir al Login / Registro
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
