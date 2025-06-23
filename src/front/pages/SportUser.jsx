import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import "../../styles/sportUser.css";

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
          `${import.meta.env.VITE_BACKEND_URL}api/training_entries/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();

        const planPorDia = data.reduce((acc, entry) => {
          if (!acc[entry.dia_semana]) acc[entry.dia_semana] = {};
          acc[entry.dia_semana][entry.ejercicio] = entry.detalle;
          return acc;
        }, {});
        setPlanEntrenamiento(planPorDia);
        setLoading(false);
      } catch (err) {
        console.error(err);
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
  
  return (
    <div className="sport-user container mt-5">
      <section className="sport-header text-center py-5">
        <h1 className="display-4">Deporte Personalizado</h1>
      </section>
      <section className="tabla-sport my-5">
        <h1 className="plan text-center subtittle mb-4">Plan Semanal de Ejercicios</h1>
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
              {Object.entries(planEntrenamiento[diaActivo] || {}).map(([ejercicio, detalle]) => (
                <tr key={ejercicio}>
                  <td><strong>{ejercicio}</strong></td>
                  <td>{detalle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
export default SportUser;