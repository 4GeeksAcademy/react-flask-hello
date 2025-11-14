import React from "react";
import { motion } from "framer-motion";
import LandingCards from "../components/LandingCards";
import "../styles/Landing.css";

export default function Home() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          Bienvenido a TaskFlow
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
          Tu herramienta para gestionar tareas y comunicación de equipos de manera simple y eficiente.
        </motion.p>
      </header>

      <LandingCards />

      <section className="landing-why">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          ¿Por qué TaskFlow?
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
          TaskFlow te permite organizar tus tareas, comunicarte con tu equipo y mantener un flujo de trabajo eficiente.
          Todo en un solo lugar, accesible desde cualquier dispositivo.
        </motion.p>
      </section>

      <section className="landing-cta">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.href = "/register"}>
          ¡Empieza ahora!
        </motion.button>
      </section>
    </div>
  );
}