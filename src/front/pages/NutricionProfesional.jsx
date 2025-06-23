import React, { useState, useEffect } from "react";
import "../../styles/nutricionProfesional.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const crearPlanVacio = () => {
  return diasSemana.reduce((acc, dia) => {
    acc[dia] = {
      Desayuno: "",
      Almuerzo: "",
      Comida: "",
      Cena: ""
    };
    return acc;
  }, {});
};

const NutricionProfesional = () => {
  const { store } = useGlobalReducer();
  const profesionalId = store.user?.id;

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [plan, setPlan] = useState(null);
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const mostrarAlerta = (mensaje) => {
    setAlerta(mensaje);
    setTimeout(() => setAlerta(null), 3000);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${profesionalId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setUsuarios(data.usuarios_contratantes || []);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    if (profesionalId) fetchUsuarios();
  }, [profesionalId]);

  useEffect(() => {
    if (!usuarioSeleccionado) return;
    const fetchPlan = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/nutrition_entries/${usuarioSeleccionado.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Este usuario no tiene plan");
        const data = await res.json();
        setPlan(data);
        setModoEdicion(false);
      } catch (error) {
        setPlan(null);
      }
    };
    fetchPlan();
  }, [usuarioSeleccionado]);

  const handleEditarPlan = () => setModoEdicion(true);

  const handleGuardarCambios = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/nutrition_entries/${diaActivo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(diaActivo),
        }
      );
      await res.json();
      mostrarAlerta("¡Plan actualizado correctamente!");
      setModoEdicion(false);
    } catch (err) {
      mostrarAlerta("Error al guardar el plan.");
    }
  };

  const handleCrearNuevoPlan = async () => {
    try {
      const nuevoPlan = {
        userId: usuarioSeleccionado.id,
        plan: crearPlanVacio()
      };
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/nutrition_entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(nuevoPlan),
      });
      if (!res.ok) throw new Error("Error al crear el plan");
      const data = await res.json();
      mostrarAlerta("¡Plan creado correctamente!");
      const planComoArray = diasSemana.map((dia) => ({
        dia_semana: dia,
        ...nuevoPlan.plan[dia],
      }));
      setPlan(planComoArray);

      setModoEdicion(true);
    } catch (err) {
      mostrarAlerta("Error al crear nuevo plan: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setDiaActivo({ ...diaActivo, [name]: value });
  };

  return (
    <div className="nutricion-profesional container mt-5">
      {alerta && <div className="alerta-flotante">{alerta}</div>}

      <section className="npHero text-center py-5">
        <h1 className="display-4 tittle">Nutrición Profesional</h1>
        <p className="lead">Gestiona los planes de alimentación de tus clientes fácilmente.</p>
      </section>

      <section className="text-center my-4">
        <h2 className="subtittle mb-3">Selecciona un usuario</h2>
        <select
          className="form-select w-50 mx-auto mb-3"
          onChange={(e) => {
            const selected = usuarios.find(u => u.id === parseInt(e.target.value));
            setUsuarioSeleccionado(selected);
            setDiaActivo("Lunes");
          }}
          defaultValue=""
        >
          <option value="" disabled>Elige un usuario</option>
          {usuarios.map(user => (
            <option key={user.id} value={user.id}>{user.nombre} {user.apellido}</option>
          ))}
        </select>

        {usuarioSeleccionado && plan === null && (
          <div>
            <p>Este usuario no tiene plan nutricional.</p>
            <button className="btn btn-primary" onClick={handleCrearNuevoPlan}>
              Crear nuevo plan
            </button>
          </div>
        )}

        {usuarioSeleccionado && plan && (
          <div className="d-flex justify-content-center gap-3 mb-4">
            {!modoEdicion && (
              <button className="btn btn-warning" onClick={handleEditarPlan}>
                Editar Plan Nutricional
              </button>
            )}
            {modoEdicion && (
              <button className="btn btn-success" onClick={handleGuardarCambios}>
                Guardar Cambios
              </button>
            )}
          </div>
        )}
      </section>

      {usuarioSeleccionado && plan && (
        <section className="tabla-nutricion my-5">
          <h2 className="text-center subtittle mb-4">
            Plan Semanal de {usuarioSeleccionado.nombre}
          </h2>
          <div className="button d-flex justify-content-center flex-wrap mb-4">
            {diasSemana.map((nombreDia) => {
              const dia = plan.find((d) => d.dia_semana === nombreDia);
              if (!dia) return null;

              return (
                <button
                  key={dia.id ?? nombreDia}
                  onClick={() => setDiaActivo(dia)}
                  className={`btn mx-1 mb-2 ${dia.dia_semana === diaActivo?.dia_semana ? "btn-primary" : "btn-outline-primary"}`}
                >
                  {dia.dia_semana}
                </button>
              );
            })}
          </div>

          <div className={`card p-3 ${!modoEdicion ? "bloqueado" : ""}`}>
            <h3 className="mb-4 text-center">{diaActivo.dia_semana}</h3>
            <ul className="list-group no-bullets">
              {["desayuno", "media_mañana", "comida", "cena"].map((comida) => (
                <li key={comida} className="mb-2">
                  <label className="form-label text-light text-capitalize">
                    {comida.replace("_", " ")}:
                  </label>
                  <input
                    type="text"
                    name={comida}
                    value={diaActivo[comida] || ""}
                    onChange={handleInputChange}
                    disabled={!modoEdicion}
                    className="form-control"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default NutricionProfesional;