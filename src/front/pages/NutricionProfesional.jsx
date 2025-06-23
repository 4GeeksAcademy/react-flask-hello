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
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + `api/nutrition_entries/${usuarioSeleccionado.id}`,
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
      const data = await res.json();
      console.log(data);
      alert("¡Plan creado correctamente!");
      setPlan(data.Nutrition_entry_list);
      setModoEdicion(true);
    } catch (err) {
      alert("Error al crear nuevo plan: " + err.message);
    }
  };
  console.log("Plan:", plan);
  const handleCambioComida = (comida, texto) => {
    setPlan(prev => ({
      ...prev,
      [diaActivo]: {
        ...prev[diaActivo],
        [comida]: texto
      }
    }));
  };
  console.log({ diaActivo: diaActivo });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setDiaActivo({ ...diaActivo, [name]: value });
  }
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
          {usuarios.map(user => {
            if (!user.is_professional) {
              return (
                <option key={user.id} value={user.id}>{user.nombre}</option>
              )
            }
          })}
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
            {plan && plan.map((dia) => (
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
                <label htmlFor="" className="form-label text-light">Desayuno:</label>
                <input
                  type="text"
                  value={diaActivo.desayuno}
                  name="desayuno"
                  onChange={handleInputChange}
                  disabled={!modoEdicion}
                />
              </li>
              <li>
                <label htmlFor="" className="form-label text-light">Media Mañana:</label>
                <input
                  type="text"
                  value={diaActivo.media_mañana}
                  name="media_mañana"
                  onChange={handleInputChange}
                  disabled={!modoEdicion}
                />
              </li>
              <li>
                <label htmlFor="" className="form-label text-light">Comida:</label>
                <input
                  type="text"
                  value={diaActivo.comida}
                  name="comida"
                  onChange={handleInputChange}
                  disabled={!modoEdicion}
                />
              </li>
              <li>
                <label htmlFor="" className="form-label text-light">Cena:</label>
                <input
                  type="text"
                  value={diaActivo.cena}
                  name="cena"
                  onChange={handleInputChange}
                  disabled={!modoEdicion}
                />
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default NutricionProfesional;
