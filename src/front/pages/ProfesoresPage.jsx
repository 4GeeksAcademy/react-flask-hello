import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/ProfesoresPage.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import userServices from "../../services/userServices.js";

const ProfesoresPage = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isEditing, setIsEditing] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [profesor, setProfesor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    userServices.getUserInfo().then((user) => {
      let datos = {
        id: user.id,
        nombre: user.nombre || "",
        imagen: user.imagen || "/logoCrema1.png",
        especialidad: user.profession_type || "",
        email: user.email || "",
        telefono: user.telefono || "",
        experiencia: user.experiencia !== null ? String(user.experiencia) : "",
        direccion: user.direccion || "",
        sexo: user.sexo || "",
        horario: [
          "Lunes a Viernes: 9:00 - 13:00",
          "Martes y Jueves: 17:00 - 20:00"
        ],
        miembrosAsignados: user.usuarios_asignados?.map(u => u.nombre) || []
      };
      setProfesor(datos);
      dispatch({ type: "get_user_info", payload: user });
    }).catch((error) => {
      console.error("Error al cargar datos del profesor:", error);
    });
  }, []);

  const handleProfesorChange = (e) => {
    setProfesor({ ...profesor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        nombre: profesor.nombre,
        email: profesor.email,
        telefono: profesor.telefono,
        direccion: profesor.direccion,
        sexo: profesor.sexo,
        imagen: profesor.imagen,
        experiencia: profesor.experiencia !== "" ? parseInt(profesor.experiencia) : null,
        profession_type: profesor.especialidad,
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${profesor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al guardar el perfil");

      const updated = await res.json();
      setProfesor({
        ...profesor,
        ...updated,
        experiencia: updated.experiencia !== null ? String(updated.experiencia) : "",
      });
      dispatch({ type: "ACTUALIZAR_USUARIO", payload: updated });
      setIsEditing(false);
      setMensaje("✅ Perfil del profesor actualizado correctamente");
      setTimeout(() => setMensaje(null), 4000);
    } catch (error) {
      console.error("Error al guardar el perfil del profesor:", error);
    }
  };

  const handleDelete = async () => {
    const confirmacion = window.confirm("¿Estás seguro que deseas borrar este perfil?");
    if (!confirmacion) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al borrar el perfil");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el perfil");
    }
  };

  if (!profesor) return <p className="text-center mt-5">Cargando datos del profesor...</p>;

  return (
    <div className="perfil-container">
      {mensaje && <div className="mensaje-toast">{mensaje}</div>}

      <h1 className="perfil-titulo">Perfil del Profesor</h1>

      <div className="perfil-card">
        <div className="columna columna-izquierda">
          {["nombre", "email", "telefono", "direccion", "sexo"].map((campo) => (
            <p className="mt-2" key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>{" "}
              {isEditing ? (
                <input
                  type={campo === "experiencia" ? "number" : "text"}
                  name={campo}
                  value={profesor[campo] || ""}
                  onChange={handleProfesorChange}
                />
              ) : (
                profesor[campo] || "Faltante"
              )}
            </p>
          ))}
        </div>

        <div className="columna columna-centro">
          {isEditing ? (
            <input
              type="text"
              name="imagen"
              value={profesor.imagen}
              onChange={handleProfesorChange}
              placeholder="URL de la imagen"
            />
          ) : (
            <img src={profesor.imagen} alt="Foto del profesor" />
          )}

          <div className="botones-perfil">
            {isEditing ? (
              <>
                <button className="btn-guardar" onClick={handleSave}>Guardar</button>
                <button className="btn-cancelar" onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            ) : (
              <>
                <button className="btn-editar" onClick={() => setIsEditing(true)}>Editar perfil</button>
                <button className="btn-borrar" onClick={handleDelete}>Borrar profesor</button>
              </>
            )}
          </div>
        </div>

        <div className="columna columna-derecha">
          <p><strong>Especialidad:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="especialidad"
                value={profesor.especialidad}
                onChange={handleProfesorChange}
              />
            ) : (
              profesor.especialidad || "Faltante"
            )}
          </p>
          <div className="logo-columna-derecha mt-3 text-center p-2 rounded">
            <img
              src="/logoCrema1.png"
              alt="Logo salud"
              className="logo-gris"
            />
          </div>
        </div>
      </div>

      <div className="secciones-inferiores">
        <div className="secciones-fila">
          <div className="seccion">
            <h2>Miembros asignados</h2>
            <ul>
              {profesor.miembrosAsignados.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>

          <div className="seccion">
            <h2>Calendario de sesiones</h2>
            <p>Próximamente se integrará el calendario con reservas.</p>
          </div>

          <div className="seccion">
            <h2>Notas del profesor</h2>
            <p>“David está progresando genial en el plan de hipertrofia 💪”</p>
          </div>
        </div>

        <div className="secciones-fila">
          <div className="seccion">
            <h2>Plan Nutrición</h2>
            <p>Accede al seguimiento del plan alimenticio de los miembros.</p>
            <Link to="/nutricionProfesional" className="btn-editar">Ver Plan</Link>
          </div>

          <div className="seccion">
            <h2>Plan Deporte</h2>
            <p>Consulta y ajusta los entrenamientos asignados a cada usuario.</p>
            <Link to="/sportProfesional" className="btn-editar">Ver Plan</Link>
          </div>

          <div className="seccion">
            <h2>Eventos</h2>
            <p>Organiza o consulta eventos y actividades disponibles.</p>
            <Link to="/Eventos" className="btn-editar">Ver Eventos</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesoresPage;
