import React from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';
import DarkModeToggle from '../../components/DarkModeToggle/DarkModeToggle';

const AboutUs = () => {
  return (
    <div className="landing-container fade-in">
      <DarkModeToggle />

      <div className="aboutus-container">
        {/* HERO PRINCIPAL */}
        <motion.section
          className="aboutus-card aboutus-hero-card"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1>Sobre nosotros</h1>
          <p>
            Somos un equipo de expertos en IT y científicos de datos con experiencia en procesamiento de big data desde 2014.
            Esta trayectoria nos ha permitido lanzar este potente proyecto de análisis satelital y meteorológico orientado a la agricultura.
          </p>
        </motion.section>

        {/* MISIÓN */}
        <motion.section
          className="aboutus-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2>Nuestra misión</h2>
          <p>
            Nuestro objetivo es proporcionar datos climáticos históricos, actuales y futuros para cualquier punto del planeta,
            así como acceso a la API Agro para desarrolladores y empresas agrícolas.
          </p>
        </motion.section>

        {/* COLABORADORES EN FILA */}
        <div className="team-row">
          <motion.section
            className="team-member-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>Yenesey</h3>
            <p>
              Especialista en inteligencia artificial aplicada a la agricultura. Su experiencia en visión por computadora y sistemas de análisis multiespectral permite interpretar datos desde el dron hasta el agricultor.
            </p>
          </motion.section>

          <motion.section
            className="team-member-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Ricardo</h3>
            <p>
              Ingeniero de datos con más de 10 años de experiencia en big data y visualización geoespacial. Diseña la infraestructura que hace posible DronFarm.
            </p>
          </motion.section>

          <motion.section
            className="team-member-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>Javier</h3>
            <p>
              Desarrollador full stack con pasión por el campo y la tecnología. Se encarga de transformar la información en soluciones prácticas para el usuario.
            </p>
          </motion.section>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
