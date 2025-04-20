import React from 'react';
import './WeOffer.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const services = [
  {
    title: 'Vuelo técnico con drones',
    description:
      'Captura aérea de imágenes en diferentes bandas espectrales para analizar el estado fisiológico de las plantas.',
  },
  {
    title: 'Procesamiento y análisis',
    description:
      'Interpretación avanzada de los datos mediante inteligencia artificial y técnicas de teledetección.',
  },
  {
    title: 'Informe personalizado',
    description:
      'Entregamos mapas NDVI, análisis zonales y recomendaciones específicas adaptadas a cada cultivo.',
  },
  {
    title: 'Planes de seguimiento',
    description:
      'Ofrecemos control periódico del estado de los cultivos durante todo el ciclo agrícola (opcional).',
  },
];

const WeOffer = () => {
  const navigate = useNavigate();

  const handleQuoteClick = () => {
    navigate('/quote');
  };

  return (
    <>

      <section className="weoffer-container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Servicios
        </motion.h1>

        <motion.p
          className="weoffer-text"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          En <strong>DronFarm</strong> ofrecemos soluciones de monitoreo agrícola mediante drones equipados con cámaras multiespectrales de alta precisión.
          Este servicio está diseñado para optimizar la gestión de cultivos, anticipar problemas y mejorar la toma de decisiones basadas en datos reales del terreno.
        </motion.p>

        <div className="weoffer-grid">
          {services.map((service, index) => (
            <motion.div
              className="weoffer-card"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="quote-button-container">
          <motion.button
            className="quote-button"
            onClick={handleQuoteClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar presupuesto
          </motion.button>
        </div>
      </section>


    </>
  );
};

export default WeOffer;
