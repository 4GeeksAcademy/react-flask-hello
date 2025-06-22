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
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userServices.getUserInfo().then((user) => {
      let datos = {
        id: user.id,
        nombre: user.nombre || "",
        imagen: user.imagen ?? "/logoCrema1.png",
        especialidad: user.profession_type || "",
        email: user.email || "",
        telefono: user.telefono || "",
        experiencia: user.experiencia !== null ? String(user.experiencia) : "",
        descripcion: user.descripcion || "",
        direccion: user.direccion || "",
        sexo: user.sexo || "",
        horario: [
          "Lunes a Viernes: 9:00 - 13:00",
          "Martes y Jueves: 17:00 - 20:00"
        ],
        miembrosAsignados: (user.usuarios_contratantes || []).reverse()
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

      try {
        new URL(profesor.imagen);
      } catch (err) {
        alert("La URL de la imagen no es válida.");
        return;
      }

      const payload = {
        nombre: profesor.nombre || null,
        email: profesor.email || null,
        telefono: profesor.telefono || null,
        direccion: profesor.direccion || null,
        sexo: profesor.sexo || null,
        experiencia: profesor.experiencia !== "" ? parseInt(profesor.experiencia) : null,
        profession_type: profesor.especialidad !== "" ? profesor.especialidad : null,
        descripcion: profesor.descripcion || null,
        imagen: profesor.imagen?.trim() || null
      };

      const url = `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api/users/${profesor.id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      const updated = JSON.parse(text);
      setProfesor({
        ...profesor,
        ...updated,
        experiencia: updated.experiencia !== null ? String(updated.experiencia) : "",
      });
      dispatch({ type: "ACTUALIZAR_USUARIO", payload: updated });
      setIsEditing(false);
      setMensaje("Perfil del profesor actualizado correctamente");
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
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

  const miembrosFiltrados = profesor.miembrosAsignados.filter((u) => {
    const valor = `${u.nombre} ${u.apellido}`.toLowerCase();
    return valor.includes(filtro.toLowerCase());
  });

  return (
    <div className="prof-container">
      {mensaje && <div className="prof-toast">{mensaje}</div>}

      <h1 className="prof-titulo">Perfil del Profesor</h1>

      <div className="prof-card">
        {isEditing ? (
          <>
            <div className="prof-columna">
              {["nombre", "email", "telefono", "direccion"].map((campo) => (
                <p key={campo}><strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>
                  <input name={campo} value={profesor[campo]} onChange={handleProfesorChange} /></p>
              ))}
            </div>
            <div className="prof-columna">
              {["sexo", "experiencia", "especialidad"].map((campo) => (
                <p key={campo}>
                  <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>
                  {campo === "sexo" ? (
                    <select
                      name="sexo"
                      value={profesor.sexo}
                      onChange={handleProfesorChange}
                      className="prof-input"
                    >
                      <option value="">Selecciona...</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Indefinido">Indefinido</option>
                    </select>
                  ) : (
                    <input
                      name={campo}
                      value={profesor[campo]}
                      onChange={handleProfesorChange}
                      className="prof-input"
                    />
                  )}
                </p>
              ))}
            </div>
            <div className="prof-columna-centro">
              <p><strong>Imagen:</strong></p>
              <input name="imagen" value={profesor.imagen} onChange={handleProfesorChange} />
              <img src={profesor.imagen} className="prof-imagen-profesor" onError={(e) => (e.target.src = "/logoCrema1.png")} />
              <div className="prof-botones">
                <button className="prof-btn-guardar" onClick={handleSave}>Guardar</button>
                <button className="prof-btn-cancelar" onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="prof-columna">
              <p><strong>Nombre:</strong> {profesor.nombre}</p>
              <p><strong>Email:</strong> {profesor.email}</p>
              <p><strong>Teléfono:</strong> {profesor.telefono}</p>
            </div>
            <div className="prof-columna-centro">
              <img src={profesor.imagen} alt="Foto del profesor" className="prof-imagen-profesor" onError={(e) => (e.target.src = "/logoCrema1.png")} />
              <div className="prof-botones">
                <button className="prof-btn-editar" onClick={() => setIsEditing(true)}>Editar</button>
                <button className="prof-btn-borrar" onClick={handleDelete}>Borrar</button>
              </div>
            </div>
            <div className="prof-columna">
              <p><strong>Dirección:</strong> {profesor.direccion}</p>
              <p><strong>Sexo:</strong> {profesor.sexo}</p>
              <p><strong>Especialidad:</strong> {profesor.especialidad}</p>
              <p><strong>Experiencia:</strong> {profesor.experiencia} años</p>

            </div>
          </>
        )}
      </div>

      <div className="prof-secciones">
        <div className="prof-fila">
          <div className="prof-seccion no-hover sin-hover">
            <h2>Miembros asignados</h2>
            <input
              type="text"
              placeholder="Buscar por nombre o apellido"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="prof-input-filtro"
            />
            <div className="prof-scroll-miembros">
              <ul className="prof-miembros-lista">
                {miembrosFiltrados.length > 0 ? (
                  miembrosFiltrados.map((u, i) => (
                    <li key={i} className="prof-miembro">
                      <span className="prof-nombre">{u.nombre} {u.apellido}</span>
                      <button onClick={() => navigate(`/usuario/${u.id}`)} className="prof-btn-ver">Ver</button>
                    </li>
                  ))
                ) : (
                  <li>No hay usuarios asignados.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="prof-seccion no-hover sin-hover">
            <h2>Calendario de sesiones</h2>
            <p>Próximamente se integrará el calendario con reservas.</p>
          </div>

          <div className="prof-seccion no-hover sin-hover">
            <h2>Notas del profesor</h2>
            <p>“David está progresando genial en el plan de hipertrofia 💪”</p>
          </div>
        </div>

        <div className="prof-fila">
          <div className="prof-seccion">
            <h2>Plan Nutrición</h2>
            <p>Accede al seguimiento del plan alimenticio de los miembros.</p>
            <Link to="/nutricionProfesional" className="prof-btn-editar">Ver Plan</Link>
          </div>

          <div className="prof-seccion">
            <h2>Plan Deporte</h2>
            <p>Consulta y ajusta los entrenamientos asignados a cada usuario.</p>
            <Link to="/sportProfesional" className="prof-btn-editar">Ver Plan</Link>
          </div>

          <div className="prof-seccion">
            <h2>Eventos</h2>
            <p>Organiza o consulta eventos y actividades disponibles.</p>
            <Link to="/Eventos" className="prof-btn-editar">Ver Eventos</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesoresPage;