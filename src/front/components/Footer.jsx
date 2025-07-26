import React from "react";

export const Footer = () => {
  /*const handleGoBack = () => {
    window.history.back();
  };*/ /*Es un efecto rallante y lo guardo por si acaso. Alexis*/
  return (
    <footer
      style={{
        /*Un pequeño efecto de fondo y un ajuste en el tamaño. Alexis*/
        background: "linear-gradient(to left, #22b455, #1dd1a1, #22b455)",
        backgroundSize: "200%",
        transition: "0.3s linear",
        minHeight: "6.6vh",
        color: "#B7FF00",
        /*Los Cambios finalizan aqui*/
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
        fontWeight: "500",
        border: "2px solid #B7FF00"
      }}
    >
      <p style={{ margin: 0, fontSize: "1rem" }}>
        Ahorra tu dinero fácilmente
      </p>
    </footer>
  );
};


