import React, { useState, useEffect } from "react";
import "../../styles/nutricionProfesional.css";

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
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [plan, setPlan] = useState(null);
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [modoEdicion, setModoEdicion] = useState(false);

  // Cargar usuarios al montar
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users");
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  // Cargar plan nutricional cuando cambia el usuario
  useEffect(() => {
    if (!usuarioSeleccionado) return;

    const fetchPlan = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/nutrition_entries/${usuarioSeleccionado.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Este usuario no tiene plan");
        const data = await res.json();

        // Reconstruir el plan como objeto agrupado por día
        const planOrganizado = crearPlanVacio();
        data.forEach(entry => {
          planOrganizado[entry.dia_semana] = {
            Desayuno: entry.desayuno || "",
            Almuerzo: entry.media_mañana || "",
            Comida: entry.comida || "",
            Cena: entry.cena || "",
          };
        });

        setPlan(planOrganizado);
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
        `${import.meta.env.VITE_BACKEND_URL}/api/nutrition_entries/${usuarioSeleccionado.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ plan }),
        }
      );
      await res.json();
      alert("¡Plan actualizado correctamente!");
      setModoEdicion(false);
    } catch (err) {
      alert("Error al guardar el plan.");
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

      alert("¡Plan creado correctamente!");
      setPlan(nuevoPlan.plan);
      setModoEdicion(true);
    } catch (err) {
      alert("Error al crear nuevo plan: " + err.message);
    }
  };

  const handleCambioComida = (comida, texto) => {
    setPlan(prev => ({
      ...prev,
      [diaActivo]: {
        ...prev[diaActivo],
        [comida]: texto
      }
    }));
  };

  return (
    <div className="nutricion-profesional container mt-5">
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
            <option key={user.id} value={user.id}>{user.nombre}</option>
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
          <>
            {!modoEdicion ? (
              <button className="btn btn-warning mb-4" onClick={handleEditarPlan}>
                Editar Plan Nutricional
              </button>
            ) : (
              <button className="btn btn-success mb-4" onClick={handleGuardarCambios}>
                Guardar Cambios
              </button>
            )}
          </>
        )}
      </section>

      {usuarioSeleccionado && plan && (
        <section className="tabla-nutricion my-5">
          <h2 className="text-center subtittle mb-4">
            Plan Semanal de {usuarioSeleccionado.nombre}
          </h2>

          <div className="button d-flex justify-content-center flex-wrap mb-4">
            {diasSemana.map((dia) => (
              <button
                key={dia}
                onClick={() => setDiaActivo(dia)}
                className={`btn mx-1 mb-2 ${dia === diaActivo ? "btn-primary" : "btn-outline-primary"}`}
              >
                {dia}
              </button>
            ))}
          </div>

          <div className="card p-3">
            <h3 className="mb-4 text-center">{diaActivo}</h3>
            <ul className="list-group">
              {Object.entries(plan[diaActivo]).map(([comida, texto]) => (
                <li key={comida} className="list-group-item text-dark">
                  <strong>{comida}:</strong>
                  {modoEdicion ? (
                    <input
                      type="text"
                      value={texto}
                      className="form-control mt-2"
                      onChange={(e) => handleCambioComida(comida, e.target.value)}
                    />
                  ) : (
                    <span className="ms-2">{texto}</span>
                  )}
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
