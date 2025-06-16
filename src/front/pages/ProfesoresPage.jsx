import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/ProfesoresPage.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const ProfesoresPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profesor, setProfesor] = useState({
    nombre: "Pepe Strong",
    imagen: "https://randomuser.me/api/portraits/men/75.jpg",
    especialidad: "Fuerza / Hipertrofia",
    email: "pepe.strong@gympro.com",
    telefono: "+34 678 456 123",
    experiencia: "5 años",
    direccion: "Calle del Hierro, 21, Valencia",
    sexo: "Masculino",
    horario: [
      "Lunes a Viernes: 9:00 - 13:00",
      "Martes y Jueves: 17:00 - 20:00"
    ],
    miembrosAsignados: ["David Vivar", "Sara González", "Leo Martínez"]
  });

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleProfesorChange = (e) => {
    setProfesor({ ...profesor, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    const confirmacion = window.confirm("¿Estás seguro que deseas borrar este perfil?");
    if (!confirmacion) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://automatic-space-orbit-pjwr5pp79rgpfrvj7-3001.app.github.dev/api/users", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al borrar el perfil");
      localStorage.removeItem("token");
      dispatch({ type: "BORRAR_USUARIO" });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el perfil");
    }
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-titulo">Perfil del Profesor</h1>

      <div className="perfil-card">
        <div className="columna columna-izquierda">
          {["nombre", "email", "telefono", "direccion", "sexo", "experiencia"].map((campo) => (
            <p key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name={campo}
                  value={profesor[campo]}
                  onChange={handleProfesorChange}
                />
              ) : (
                profesor[campo] || "Falta"
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
                <button className="btn-guardar" onClick={() => setIsEditing(false)}>Guardar</button>
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
              profesor.especialidad
            )}
          </p>
          <p><strong>Horario:</strong></p>
          <ul>
            {profesor.horario.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
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
