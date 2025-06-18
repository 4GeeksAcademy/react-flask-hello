import React, { useState, useEffect } from "react";
import "../../styles/nutricionProfesional.css";

const usuariosRegistrados = [
  { id: 1, nombre: "David Vivar" },
  { id: 2, nombre: "Sara González" },
  { id: 3, nombre: "Leo Martínez" }
];

const NutricionProfesional = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [planNutricion, setPlanNutricion] = useState({});
  const [diaActivo, setDiaActivo] = useState("Lunes");
  const [modoEdicion, setModoEdicion] = useState(false);

  // FETCH PLAN desde API
  useEffect(() => {
    if (usuarioSeleccionado) {
      fetch(`https://tudominio.com/api/nutricion/${usuarioSeleccionado.id}`)
        .then(res => res.json())
        .then(data => {
          setPlanNutricion(data);
          setModoEdicion(false);
        })
        .catch(err => {
          console.error("Error al cargar plan:", err);
          setPlanNutricion({});
        });
    }
  }, [usuarioSeleccionado]);

  const handleEditarPlan = () => setModoEdicion(true);

  const handleGuardarCambios = () => {
    fetch(`https://tudominio.com/api/nutricion/${usuarioSeleccionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planNutricion)
    })
      .then(res => res.json())
      .then(() => {
        alert("¡Plan guardado correctamente!");
        setModoEdicion(false);
      })
      .catch(err => alert("Error al guardar: " + err));
  };

  const handleCambioComida = (comida, nuevoTexto) => {
    setPlanNutricion(prev => ({
      ...prev,
      [diaActivo]: {
        ...prev[diaActivo],
        [comida]: nuevoTexto
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
            const user = usuariosRegistrados.find(u => u.id === parseInt(e.target.value));
            setUsuarioSeleccionado(user);
            setDiaActivo("Lunes");
          }}
          defaultValue=""
        >
          <option value="" disabled>Elige un usuario</option>
          {usuariosRegistrados.map(user => (
            <option key={user.id} value={user.id}>{user.nombre}</option>
          ))}
        </select>

        {usuarioSeleccionado && (
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

      {usuarioSeleccionado && (
        <section className="tabla-nutricion my-5">
          <h2 className="text-center subtittle mb-4">Plan Semanal de {usuarioSeleccionado.nombre}</h2>

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

          <div className="card p-3">
            <h3 className="mb-4 text-center">{diaActivo}</h3>
            <ul className="list-group">
              {planNutricion[diaActivo] &&
                Object.entries(planNutricion[diaActivo]).map(([comida, texto]) => (
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
