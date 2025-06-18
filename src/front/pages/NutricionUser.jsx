import React, { useState, useEffect } from "react";
import "../../styles/nutricionUser.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

const NutricionUser = () => {
  const [planNutricion, setPlanNutricion] = useState({});
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { store } = useGlobalReducer();

  const userId = store.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchPlan = async () => {
      try {
        const response = await fetch(
          `https://shiny-potato-q7pwpgqg69vpfxgq9-3001.app.github.dev/api/nutrition_entries/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 404) {
          setError("Todavía no tienes un plan nutricional asignado.");
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        setPlanNutricion(data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los datos.");
        setLoading(false);
      }
    };

    fetchPlan();
  }, [userId]);

  if (loading)
    return <div className="text-center np-hero mt-5">Cargando plan nutricional...</div>;

  if (error)
    return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="nutricion-user container mt-5">
      <section className="np-hero text-center py-5">
        <h1 className="display-4 tittle">Plan Semanal de Comidas</h1>
      </section>

      <section className="tabla-nutricion my-4">
        <div className="button d-flex justify-content-center flex-wrap mb-4">
          {Object.keys(planNutricion)
            .filter((dia) => dia !== "id" && dia !== "userId")
            .map((dia) => (
              <button
                key={dia}
                onClick={() => setDiaActivo(dia)}
                className={`btn mx-2 mb-2 ${
                  dia === diaActivo ? "btn-primary" : "btn-outline-light"
                }`}
              >
                {dia}
              </button>
            ))}
        </div>

        <div className="card p-3">
          <h2 className="text-center mb-4">{diaActivo}</h2>
          <ul className="list-group">
            {Object.entries(planNutricion[diaActivo] || {}).map(
              ([comida, detalle]) => (
                <li
                  key={comida}
                  className="list-group-item bg-dark text-light border-light"
                >
                  <strong>{comida}:</strong> {detalle}
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NutricionUser;
