import React, { useState, useEffect } from "react";
import "../../styles/sportProfesional.css";

const SportProfesional = () => {
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [planEntrenamiento, setPlanEntrenamiento] = useState(null);
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [planNutricion, setPlanNutricion] = useState(null);
  const planBase = {
    // Lunes: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" },
    // Martes: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" },
    // Miércoles: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" },
    // Jueves: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" },
    // Viernes: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" },
    // Sábado: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" }, 
    // Domingo: { Parte superior: "", Parte inferior: "", Cardio: "", ABS: "" },
  };

  // Cargar usuarios
  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/professionals_user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setUsuariosRegistrados(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  // Cargar plan Entrenamiento
  useEffect(() => {
    if (usuarioSeleccionado) {
      fetch(import.meta.env.VITE_BACKEND_URL + `/api/nutrition_entries/${usuarioSeleccionado.id}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }})
        .then(res => {
          if (!res.ok) throw new Error("No existe plan");
          return res.json();
        })
        .then(data => {
          setPlanEntrenamiento(data);
          setModoEdicion(false);
        })
        .catch(err => {
          console.warn("Usuario sin plan:", err);
          setPlanNutricion(null);
        });
    }
  }, [usuarioSeleccionado]);

  const handleEditarPlan = () => setModoEdicion(true);

  const handleGuardarCambios = () => {
    fetch(import.meta.env.VITE_BACKEND_URL + `/api/training_entries/${usuarioSeleccionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(planEntrenamiento)
    })
      .then(res => res.json())
      .then(() => {
        alert("¡Plan guardado correctamente!");
        setModoEdicion(false);
      })
      .catch(err => alert("Error al guardar: " + err));
  };

  const handleCrearNuevoPlan = () => {
    const nuevoPlan = {
      userId: usuarioSeleccionado.id,
      ...planBase
    };

    fetch(import.meta.env.VITE_BACKEND_URL + `/api/training_entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(nuevoPlan)
    })
      .then(res => res.json())
      .then(() => {
        alert("Plan creado correctamente");
        setPlanNutricion(nuevoPlan);
        setModoEdicion(true);
      })
      .catch(err => alert("Error al crear el plan: " + err));
  };

  const handleCambioComida = (entrenamiento, nuevoTexto) => {
    setPlanNutricion(prev => ({
      ...prev,
      [diaActivo]: {
        ...prev[diaActivo],
        [entrenamiento]: nuevoTexto
      }
    }));
  };

  return (
    <div className="sport-profesional container mt-5 ">
      <section className="sport-header text-center py-5">
        <h1 className="display-4">Deporte Personalizado</h1>
        <p className="lead">
          Mejora tu salud con planes de deporte adaptados a tus objetivos.
        </p>
      </section>

      <section className="text-center my-4">
        <h2 className="subtittle mb-3">Selecciona un usuario</h2>
        <select
          className="form-select w-50 mx-auto mb-3"
          onChange={(e) => {
            const user = usuariosRegistrados.find(u => u.id === parseInt(e.target.value));
            
            setUsuarioSeleccionado(user.user);
            setDiaActivo("Lunes");
          }}
          defaultValue=""
        >
          <option value="" disabled>Elige un usuario</option>

          {usuariosRegistrados.map(user => {

            return (
              <option key={user.id} value={user.id}>{`${user.user?.nombre} ${user.user?.apellido}`}</option>
            )
          })}
        </select>
      </section>

      {/* Botón de Editar fuera del bloque del plan */}
      {usuarioSeleccionado && !modoEdicion && (
        <div className="text-center mb-4">
          <button className="btn btn-warning" onClick={handleEditarPlan}>
            Editar Plan de Entrenamiento
          </button>
        </div>
      )}

      {usuarioSeleccionado && (
        <section className="tabla-Entrenamiento my-5">
          <h2 className="text-center subtittle mb-4">
            Plan Semanal de {usuarioSeleccionado.nombre}
          </h2>

          <div className="button d-flex justify-content-center flex-wrap mb-4">

            {planEntrenamiento != null && Object.keys(planEntrenamiento)?.map((dia) => (
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
              {planEntrenamiento != null && Object.entries(planEntrenamiento[diaActivo])?.map(([Entrenamiento, texto]) => (
                  <li key={Entrenamiento} className="list-group-item text-dark">
                    <strong>{Entrenamiento}:</strong>
                    {modoEdicion ? (
                      <input
                        type="text"
                        value={texto}
                        className="form-control mt-2"
                        onChange={(e) => handleCambioEntrenamiento(Entrenamiento, e.target.value)}
                      />
                    ) : (
                      <span className="ms-2">{texto}</span>
                    )}
                  </li>
                ))}
            </ul>

            {/* Botón de Guardar separado visualmente */}
            {modoEdicion && (
              <div className="text-center mt-4">
                <button className="btn btn-success" onClick={handleGuardarCambios}>
                  Guardar Cambios
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default SportProfesional;



