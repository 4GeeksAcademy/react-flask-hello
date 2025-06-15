import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import CardPlan from "../components/CardPlan";

import "../../styles/sportUser.css";

const SportUser = () => {
  const [planSemanal, setPlanSemanal] = useState({});
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch("/api/plan"); // Se tendria que meter la URL de la bd
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setPlanSemanal(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos.");
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (loading) return <div className="text-center sport-header mt-5">Cargando plan semanal...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="sport-user container mt-5 ">
      <section className="sport-header text-center py-5">
        <h1 className="display-4">Deporte Personalizado</h1>
        <p className="lead">
          Mejora tu salud con planes de deporte adaptados a tus objetivos.
        </p>
      </section>

      <section className="tabla-sport my-5">
        <h1 className="plan text-center subtittle mb-4">Plan Semanal de Ejercicios</h1>

        <div className="button d-flex justify-content-center flex-wrap mb-4">
          {Object.keys(planSemanal).map((dia) => (
            <button
              key={dia}
              onClick={() => setDiaActivo(dia)}
              className={`btn mx-1 mb-2 ${dia === diaActivo ? "btn-primary" : "btn-outline-primary"
                }`}
            >
              {dia}
            </button>
          ))}
        </div>

        <div className="card p-2">
          <h2 className="mb-4 text-center">{diaActivo}</h2>
          <ul className="list-group">
            {Object.entries(planSemanal[diaActivo] || {}).map(
              ([ejercicio, texto]) => (
                <li key={ejercicio} className="list-group-item text-white">
                  <strong>{ejercicio}:</strong> {texto}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="beneficios my-5">
        <h2 className="text-center subtittle mb-4">¿Por qué elegirnos?</h2>
        <ul className="list-group list-group-flush caja-bot">
          <li className="list-group-item">🏋️ Asesoramiento personalizado</li>
          <li className="list-group-item">🏃 Rutinas adaptadas a tu nivel</li>
          <li className="list-group-item">📈 Progreso monitorizado</li>
        </ul>
      </section>
    </div>
  );
};

export default SportUser;
