import React from 'react';
import './WeOffer.css';
import { useNavigate } from 'react-router-dom';

const WeOffer = () => {
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    navigate('/quote');
  };

  return (
    <div className="weoffer-container">
      <h1 className="section-title">Servicios</h1>

      <p className="weoffer-text">
        En <strong>DronFarm</strong> ofrecemos soluciones de monitoreo agrícola mediante drones equipados con cámaras multiespectrales de alta precisión.
        Este servicio está diseñado para optimizar la gestión de cultivos, anticipar problemas y mejorar la toma de decisiones basadas en datos reales del terreno.
      </p>

      <ul className="weoffer-list">
        <li><strong>Vuelo técnico con drones multiespectrales:</strong> Captura aérea de imágenes en diferentes bandas espectrales para analizar el estado fisiológico de las plantas.</li>
        <li><strong>Procesamiento de datos y análisis agronómico:</strong> Interpretación avanzada de los datos mediante IA y teledetección.</li>
        <li><strong>Informe técnico personalizado:</strong> Mapas NDVI, análisis zonales y recomendaciones específicas.</li>
        <li><strong>Planes de seguimiento periódico (opcional):</strong> Control continuo a lo largo del ciclo agrícola.</li>
      </ul>

      <div className="quote-button-container">
        <button className="quote-button" onClick={handleQuoteClick}>
          Solicitar presupuesto
        </button>
      </div>
    </div>
  );
};

export default WeOffer;
