import React from "react";
import "./WeOffer.css";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";

const WeOffer = () => {
  return (
    <section className="landing-container">
      {/* Mismo botón que Landing */}
      <DarkModeToggle />

      <div className="weoffer-content">
        <div className="weoffer-header-box">
          <h2 className="section-title">Servicios</h2>
          <p className="weoffer-text">
            En <strong>DronFarm</strong> ofrecemos soluciones de monitoreo agrícola mediante drones equipados con cámaras multiespectrales de alta precisión. Este servicio está diseñado para optimizar la gestión de cultivos, anticipar problemas y mejorar la toma de decisiones basadas en datos reales del terreno.
          </p>
        </div>

        <div className="weoffer-grid">
          <div className="weoffer-card">
            <h3>Vuelo técnico con drones</h3>
            <p>Captura aérea de imágenes en diferentes bandas espectrales para analizar el estado fisiológico de las plantas.</p>
          </div>
          <div className="weoffer-card">
            <h3>Procesamiento y análisis</h3>
            <p>Interpretación avanzada de los datos mediante inteligencia artificial y técnicas de teledetección.</p>
            <button className="quote-button">Solicitar presupuesto</button>
          </div>
          <div className="weoffer-card">
            <h3>Informe personalizado</h3>
            <p>Entregamos mapas NDVI, análisis zonales y recomendaciones específicas adaptadas a cada cultivo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeOffer;
