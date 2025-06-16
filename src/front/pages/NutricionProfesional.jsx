import React, { useState } from "react";
import "../../styles/nutricionProfesional.css";

const datosNutricionEjemplo = {
  Lunes: {
    Desayuno: "Tostada integral + aguacate",
    Almuerzo: "Fruta fresca",
    Comida: "Ensalada de pasta con pollo",
    Merienda: "Yogur + frutos secos",
    Cena: "Tortilla francesa + ensalada"
  },
  Martes: {
    Desayuno: "Avena con leche y plátano",
    Almuerzo: "Zumo natural",
    Comida: "Pescado al horno con patatas",
    Merienda: "Batido de proteínas",
    Cena: "Sopa de verduras"
  },
  // Puedes añadir más días...
};

const usuariosRegistrados = [
  { id: 1, nombre: "David Vivar" },
  { id: 2, nombre: "Sara González" },
  { id: 3, nombre: "Leo Martínez" }
];

const NutricionProfesional = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [diaActivo, setDiaActivo] = useState("Lunes");

  const handleEditarPlan = () => {
    alert(`Editar plan de ${usuarioSeleccionado.nombre}`);
    // Aquí puedes redirigir a un formulario de edición o abrir un modal
  };

  return (
    <div className="nutricion-profesional container mt-5">
      <section className="npHero text-center py-5">
        <h1 className="display-4 tittle">Nutrición Profesional</h1>
        <p className="lead">
          Gestiona los planes de alimentación de tus clientes fácilmente.
        </p>
      </section>

      <section className="text-center my-4">
        <h2 className="subtittle mb-3">Selecciona un usuario</h2>
        <select
          className="form-select w-50 mx-auto mb-3"
          onChange={(e) => {
            const user = usuariosRegistrados.find(u => u.id === parseInt(e.target.value));
            setUsuarioSeleccionado(user);
            setDiaActivo("Lunes"); // reinicia al lunes cada vez que cambias
          }}
          defaultValue=""
        >
          <option value="" disabled>Elige un usuario</option>
          {usuariosRegistrados.map(user => (
            <option key={user.id} value={user.id}>{user.nombre}</option>
          ))}
        </select>

        {usuarioSeleccionado && (
          <button className="btn btn-warning mb-4" onClick={handleEditarPlan}>
            Editar Plan Nutricional
          </button>
        )}
      </section>

      {usuarioSeleccionado && (
        <section className="tabla-nutricion my-5">
          <h2 className="text-center subtittle mb-4">Plan Semanal de {usuarioSeleccionado.nombre}</h2>

          <div className="button d-flex justify-content-center flex-wrap mb-4">
            {Object.keys(datosNutricionEjemplo).map((dia) => (
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
              {Object.entries(datosNutricionEjemplo[diaActivo]).map(
                ([comida, texto]) => (
                  <li key={comida} className="list-group-item text-white">
                    <strong>{comida}:</strong> {texto}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default NutricionProfesional;
