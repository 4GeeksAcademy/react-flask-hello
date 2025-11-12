import React from "react";
import { motion } from "framer-motion";
import "../styles/Landing.css";

const cards = [
  { title: "Organiza tus tareas", desc: "Crea, asigna y sigue el progreso de tus tareas en tu equipo." },
  { title: "Comunicación centralizada", desc: "Muro interno para chatear y mantener todo en un solo lugar." },
  { title: "Integración con Google Calendar", desc: "Visualiza tus eventos y tareas importantes directamente en tu calendario." },
  { title: "Multiplataforma", desc: "Accede desde móvil, tablet o escritorio sin perder información." },
];

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

      <section className="landing-cards">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            className="landing-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="landing-why">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          ¿Por qué TaskFlow?
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
          TaskFlow te permite organizar tus tareas, comunicarte con tu equipo y mantener un flujo de trabajo eficiente. 
          Todo en un solo lugar, accesible desde cualquier dispositivo. Ideal para equipos, familias o grupos de trabajo.
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