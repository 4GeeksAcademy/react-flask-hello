import React, { useState, useEffect } from "react";
import "../../styles/sportUser.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, Link } from "react-router-dom";

const SportUser = () => {
  const [planEntrenamiento, setPlanEntrenamiento] = useState({});
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { store } = useGlobalReducer();
  const navigate = useNavigate();
  const userId = store.user?.id;

  useEffect(() => {
    if (!store.user?.subscription?.length > 0) {
      navigate("/Tarifas");
      return;
    }

    if (!userId) return;

    const fetchPlan = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/user/training_entries`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 404) {
          setError("Todavía no tienes un plan de entrenamiento asignado.");
          setLoading(false);
          return;
        }

        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        data.sort((a, b) => a.id - b.id);

        const planPorDia = data.reduce((acc, entry) => {
          acc[entry.dia_semana] = {
            Grupo: entry.grupo,
            Nota: entry.nota,
          };
          return acc;
        }, {});

        setPlanEntrenamiento(planPorDia);
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
    return <div className="text-center np-hero mt-5">Cargando plan de entrenamiento...</div>;

  if (error)
    return <div className="text-center text-danger mt-5">{error}</div>;

  const gruposMusculares = [
    "Hombro",
    "Pecho",
    "Bíceps",
    "Tríceps",
    "Abdomen",
    "Espalda",
    "Cuádriceps",
    "Isquiotibiales",
    "Gemelos",
  ];

  return (
    <div className="sport-user container mt-5">
      <section className="np-hero text-center py-5">
        <h1 className="display-4 tittle">Plan Semanal de Ejercicios</h1>
      </section>

      <section className="tabla-nutricion my-4">
        <div className="button d-flex justify-content-center flex-wrap mb-4">
          {Object.keys(planEntrenamiento).map((dia) => (
            <button
              key={dia}
              onClick={() => setDiaActivo(dia)}
              className={`btn mx-2 mb-2 ${dia === diaActivo ? "btn-primary" : "btn-outline-light"}`}
            >
              {dia}
            </button>
          ))}
        </div>

        <div className="card p-3 text-light border-light">
          <h2 className="text-center mb-4">{diaActivo}</h2>
          <table className="table tablita table-bordered">
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(planEntrenamiento[diaActivo] || {}).map(
                ([actividad, detalle]) => (
                  <tr key={actividad}>
                    <td><strong>{actividad}</strong></td>
                    <td>{detalle}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Botón "Todos los entrenamientos" */}
        <div className="text-center mt-4">
          <button className="btn btn-outline-light" onClick={() => navigate("/EPersonalizado")}>
            Todos los entrenamientos
          </button>
        </div>


      </section>
    </div>
  );
};
export default SportUser;