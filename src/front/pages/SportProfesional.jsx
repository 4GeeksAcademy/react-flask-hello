import React, { useState, useEffect } from "react";
import "../../styles/sportProfesional.css";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const crearPlanVacio = () => {
  return diasSemana.reduce((acc, dia) => {
    acc[dia] = {
      grupo: "",
      nota: "",
    };
    return acc;
  }, {});
};

const SportProfesional = () => {
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
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/training_entries/${usuarioSeleccionado.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Este usuario no tiene plan");
        const data = await res.json();
        console.log(data);

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
        `${import.meta.env.VITE_BACKEND_URL}/api/training_entries/${diaActivo.id}`,
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

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/training_entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(nuevoPlan),
    });

    if (!res.ok) throw new Error("Error al crear el plan");

    const data = await res.json();
 
    alert("¡Plan creado correctamente!");
    setPlan(data.Training_entry_list); 
    setDiaActivo(data.Training_entry_list[0]); 
    setModoEdicion(true);
  } catch (err) {
    alert("Error al crear nuevo plan: " + err.message);
  }
};

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setDiaActivo({...diaActivo, [name]: value});
  }
  return (
    <div className="sport-profesional container mt-5">
      <section className="npHero text-center py-5">
        <h1 className="display-4 tittle">Sport Profesional</h1>
        <p className="lead">Gestiona los planes de entrenamiento de tus clientes fácilmente.</p>
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
          {usuarios.map(user =>{ 
            if (!user.is_professional) {
               return (
            <option key={user.id} value={user.id}>{user.nombre}</option>
          )
            }
          })}
        </select>

        {usuarioSeleccionado && plan === null && (
          <div>
            <p>Este usuario no tiene plan entrenamiento.</p>
            <button className="btn btn-primary" onClick={handleCrearNuevoPlan}>
              Crear nuevo plan
            </button>
          </div>
        )}

        {usuarioSeleccionado && plan && (
          <>
            {!modoEdicion ? (
              <button className="btn btn-warning mb-4" onClick={handleEditarPlan}>
                Editar Plan Entrenamiento
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
        <section className="tabla-sport my-5">
          <h2 className="text-center subtittle mb-4">
            Plan Semanal de {usuarioSeleccionado.nombre}
          </h2>

          <div className="button d-flex justify-content-center flex-wrap mb-4">
            {plan.map((dia) => (
              <button
                key={dia.id}
                onClick={() => setDiaActivo(dia)}
                className={`btn mx-1 mb-2 ${dia === diaActivo ? "btn-primary" : "btn-outline-primary"}`}
              >
                {dia.dia_semana}
              </button>
            ))}
          </div>

          <div className="card p-3">
            <h3 className="mb-4 text-center">{diaActivo.dia_semana}</h3>
            <ul className="list-group">
              <li>
                <label className="form-label text-light">Grupo :</label>
                <input type="text" value={diaActivo.grupo} name="grupo" onChange={handleInputChange}/>
              </li>
              <li>
                <label className="form-label text-light">Nota :</label>
                <input type="text" value={diaActivo.nota} name="nota" onChange={handleInputChange}/>
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default SportProfesional;
