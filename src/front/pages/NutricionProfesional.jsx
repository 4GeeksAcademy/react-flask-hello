import React, { useState, useEffect } from "react";
import "../../styles/nutricionProfesional.css";


const diasSemana = [
  "Lunes", "Martes", "Miércoles", "Jueves",
  "Viernes", "Sábado", "Domingo"
];


const crearPlanVacio = () => 
  diasSemana.map(dia => ({
    id: null,
    dia_semana: dia,
    desayuno: "",
    media_mañana: "",
    comida: "",
    cena: ""
  }));

const NutricionProfesional = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [plan, setPlan] = useState([]);           // sera siempre array
  const [diaActivo, setDiaActivo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
        const data = await res.json();
        setUsuarios(data.filter(u => !u.is_professional));
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };
    fetchUsuarios();
  }, []);

  
  useEffect(() => {
    if (!usuarioSeleccionado) return;

    const fetchPlan = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/nutrition_entries/${usuarioSeleccionado.id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (!res.ok) {
          // si 404 o similar, montamos un plan vacío
          const vacio = crearPlanVacio();
          setPlan(vacio);
          setDiaActivo(vacio[0]);
          setModoEdicion(true);
          return;
        }
        const data = await res.json();

        // 2.a) Ordena por id ascendente
        data.sort((a, b) => a.id - b.id);

        // 2.b) Inicializa plan y día activo
        setPlan(data);
        setDiaActivo(data[0]);
        setModoEdicion(false);
      } catch (err) {
        console.error("Error al cargar plan:", err);
      }
    };

    fetchPlan();
  }, [usuarioSeleccionado]);


  const handleEditarPlan = () => setModoEdicion(true);

  const handleGuardarCambios = async () => {
    try {
      
      if (diaActivo.id === null) {
        // Creamos el plan completo
        const body = {
          userId: usuarioSeleccionado.id,
          plan: plan.reduce((acc, entry) => {
            acc[entry.dia_semana] = {
              Desayuno: entry.desayuno,
              "Media Mañana": entry.media_mañana,
              Comida: entry.comida,
              Cena: entry.cena
            };
            return acc;
          }, {})
        };
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/nutrition_entries`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
          }
        );
      } else {
        // Editamos un día concreto con PUT
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/nutrition_entries/${diaActivo.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(diaActivo)
          }
        );
      }
      alert("¡Plan guardado correctamente!");
      setModoEdicion(false);
    } catch (err) {
      console.error(err);
      alert("Error al guardar el plan");
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiaActivo(prev => ({ ...prev, [name]: value }));
    // actualizar también en el array de plan
    setPlan(prev =>
      prev.map(entry =>
        entry.dia_semana === diaActivo.dia_semana
          ? { ...entry, [name]: value }
          : entry
      )
    );
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
          defaultValue=""
          onChange={e => {
            const sel = usuarios.find(u => u.id === +e.target.value);
            setUsuarioSeleccionado(sel);
          }}
        >
          <option value="" disabled>Elige un usuario</option>

          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nombre}</option>
          ))}

          {usuarios.map(user => {
            if (!user.is_professional) {
              return (
                <option key={user.id} value={user.id}>{user.nombre}</option>
              )
            }
          })}
        </select>

        {usuarioSeleccionado && !plan.length && (
          <p>Este usuario no tiene plan nutricional.</p>
        )}


        {usuarioSeleccionado && plan.length > 0 && !modoEdicion && (
          <button className="btn btn-warning mb-4" onClick={handleEditarPlan}>
            Editar Plan Nutricional
          </button>
        )}
        {usuarioSeleccionado && modoEdicion && (
          <button className="btn btn-success mb-4" onClick={handleGuardarCambios}>
            Guardar Cambios
          </button>


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

      {usuarioSeleccionado && plan.length > 0 && (
        <section className="tabla-nutricion my-5">
          <h2 className="text-center subtittle mb-4">
            Plan Semanal de {usuarioSeleccionado.nombre}
          </h2>

          <div className="button d-flex justify-content-center flex-wrap mb-4">

            {plan && plan.map((dia) => (

            {plan.map((entry) => (

              <button
                key={entry.id ?? entry.dia_semana}
                onClick={() => setDiaActivo(entry)}
                className={`btn mx-1 mb-2 ${
                  entry.dia_semana === diaActivo?.dia_semana
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
              >
                {entry.dia_semana}
              </button>
            ))}
          </div>

          <div className="card p-3">
            <h3 className="mb-4 text-center">{diaActivo.dia_semana}</h3>
            <ul className="list-group">

              {["desayuno", "media_mañana", "comida", "cena"].map(field => (
                <li key={field} className="mb-2">
                  <label className="form-label text-light text-capitalize">
                    {field.replace("_", " ")}:
                  </label>
                  <input 
                    type="text"
                    className="form-control"
                    name={field}
                    value={diaActivo[field]||""}
                    onChange={handleInputChange}
                    disabled={!modoEdicion}
                  />
                </li>
              ))}

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
