import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import '@fontsource/bebas-neue';




export const Main = () => {
    return (
        <div className="bg-light vh-100 position-relative">

            {/* Botón de perfil (círculo en la derecha) */}
            <button
                className="btn btn-primary rounded-circle position-absolute shadow"
                style={{
                    top: "20px",
                    right: "20px",
                    width: "80px",
                    height: "80px",
                    border: "4px solid #b7ff00",
                }}
            />

            {/* Contenedor de rectángulos en columna */}
            <div
                className="d-flex justify-content-between position-absolute w-100"
                style={{ top: "150px" }}
            >
                {/* Rectángulo izquierdo */}
                <div
                    className="bg-success rounded shadow"
                    style={{
                        width: "220px",
                        height: "120px",
                        border: "4px solid #b7ff00",
                        borderRadius: "220px",
                    }}
                />

                {/* Rectángulo derecho */}
                <div
                    className="bg-danger rounded shadow"
                    style={{
                        width: "220px",
                        height: "120px",
                        border: "4px solid #b7ff00",                        
                        borderRadius: "220px",
                    }}
                />
            </div>
        </div>
    );
};