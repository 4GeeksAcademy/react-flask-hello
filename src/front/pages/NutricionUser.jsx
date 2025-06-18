import React, { useState, useEffect } from "react";
import "../../styles/nutricionUser.css";

const NutricionUser = () => {
  const [planNutricion, setPlanNutricion] = useState({});
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch("https://tudominio.com/api/nutricion"); // Reemplaza con la URL real de tu API
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();
        setPlanNutricion(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos.");
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (loading)
    return (
      <div className="text-center np-hero mt-5">Cargando plan nutricional...</div>
    );
  if (error)
    return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="nutricion-user container mt-5">
      <section className="np-hero text-center py-5">
        <h1 className="display-4 tittle">Nutrición Personalizada</h1>
        <p className="lead">
          Mejora tu salud con planes de alimentación adaptados a tus objetivos.
        </p>
      </section>

      <section className="tabla-nutricion my-5">
        <h1 className="text-center subtittle mb-4">Plan Semanal de Comidas</h1>

        <div className="button d-flex justify-content-center flex-wrap mb-4">
          {Object.keys(planNutricion).map((dia) => (
            <button
              key={dia}
              onClick={() => setDiaActivo(dia)}
              className={`btn mx-1 mb-2 ${
                dia === diaActivo ? "btn-primary" : "btn-outline-primary"
              }`}
            >
              {dia}
            </button>
          ))}
        </div>

        <div className="card p-2">
          <h2 className="mb-4 text-center">{diaActivo}</h2>
          <ul className="list-group">
            {Object.entries(planNutricion[diaActivo] || {}).map(
              ([comida, texto]) => (
                <li key={comida} className="list-group-item text-white">
                  <strong>{comida}:</strong> {texto}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="beneficios my-5">
        <h2 className="text-center subtittle mb-4">¿Por qué elegirnos?</h2>
        <ul className="list-group list-group-flush caja-bot">
          <li className="list-group-item">🥗 Planes de comida equilibrados</li>
          <li className="list-group-item">🍎 Adaptado a tus objetivos nutricionales</li>
          <li className="list-group-item">🧠 Mejora tu bienestar general</li>
        </ul>
      </section>
    </div>
  );
};

export default NutricionUser;
