import React from "react";
import { motion } from "framer-motion";
import "../styles/Landing.css";

const cards = [
  { 
    title: "Organiza tus tareas",
    desc: "Crea, asigna y sigue el progreso de tus tareas en tu equipo.",
    img: "https://img.freepik.com/foto-gratis/papeles-comerciales-naturaleza-muerta-varias-piezas-mecanismo_23-2149352652.jpg?semt=ais_hybrid&w=740&q=80"
  },
  { 
    title: "Comunicación centralizada",
    desc: "Muro interno para chatear y mantener todo en un solo lugar.",
    img: "https://media.istockphoto.com/id/1406124833/es/vector/problemas-en-el-concepto-de-vector-de-comunicaci%C3%B3n.jpg?s=612x612&w=0&k=20&c=5pkMR8J1QN8VWhnOBmEHk5n7ydB_9DfoBDf8khIEec4="
  },
  { 
    title: "Integración con Google Maps",
    desc: "Nunca te perderás: Google Maps te guía en cada tarea y en cada rincón.",
    img: "https://i.blogs.es/635f55/maps/1366_2000.jpg"
  },
  { 
    title: "Multiplataforma",
    desc: "Accede desde móvil, tablet o escritorio sin perder información.",
    img: "https://kinsta.com/es/wp-content/uploads/sites/8/2020/09/diseno-de-paginas-web-sensibles-1024x512.jpg"
  },
];

export default function LandingCards() {
  return (
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
          <motion.img
            src={card.img}
            alt={card.title}
            className="landing-card-img"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}