import React from 'react';
import { motion } from 'framer-motion';
import './Landing.css';
import heroImage from '../../assets/img/Login1.jpg';
import Logo from '../../assets/img/Logo_DronFarm2.png';


const Landing = () => {
  const features = [
    { title: "Análisis Multiespectral", desc: "Mapas detallados de salud vegetal" },
    { title: "Detección Temprana", desc: "Identificación de plagas antes de su propagación" },
    { title: "Riego Inteligente", desc: "Optimización del uso de agua en tiempo real" },
    { title: "Informes Personalizados", desc: "Dashboard interactivo con métricas clave" }
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <motion.section className="hero-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
        <div className="hero-content">
          <h1>Agricultura de Precisión con Tecnología Drone</h1>
          <p>Maximiza tu producción con análisis de cultivos en tiempo real</p>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Monitoreo agrícola con drones" className="hero-image" />
        </div>
      </motion.section>

      {/* Features Grid con fondo verde */}
      <section className="features-section" id="features">
        <h2 className="section-title">Nuestra Tecnología</h2>
        <div className="bento-grid">
          {features.map((feature, index) => (
            <motion.div key={index} className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="card-number">0{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;