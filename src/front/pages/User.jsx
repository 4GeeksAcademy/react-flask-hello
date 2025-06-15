import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/User.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const User = () => {
  const [usuario, setUsuario] = useState({
    nombre: "Susana",
    apellidos: "Susanita",
    email: "susanita98@example.com",
    telefono: "+34 600 123 456",
    direccion: "Calle Ficticia 123, Madrid",
    sexo: "Femenino",
    objetivo: "Ganar masa muscular",
    altura: 170,
    peso: 73,
    imagen: "https://i.pravatar.cc/200?u=david"
  });

  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState(null); // ✅ Hook bien colocado

  const historial = [
    "Se apuntó al evento 'Yoga al aire libre' - 1 junio",
    "Entrenó fuerza en gimnasio - 30 mayo",
    "Asistió a clase de boxeo - 28 mayo"
  ];

  const membresia = {
    tipo: "Premium",
    duracion: "6 meses",
    inicio: "1 de mayo de 2025"
  };

  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.user) {
      setUsuario(store.user);
    }

    // Fetch del entrenador seleccionado
    const fetchEntrenador = async () => {
      try {
        const res = await fetch("https://shiny-potato-q7pwpgqg69vpfxgq9-3001.app.github.dev/api/user/entrenador");
        const data = await res.json();
        setEntrenadorSeleccionado(data);
      } catch (error) {
        console.error("Error al obtener entrenador:", error);
      }
    };

    fetchEntrenador();
  }, [store.user]);

  const handleDelete = () => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres borrar tu perfil?");
    if (confirmacion) {
      dispatch({ type: "BORRAR_USUARIO" });
      setUsuario(null);
      navigate("/"); // Redirigir a la página principal
    }
  };

  if (!usuario) {
    return (
      <div className="perfil-container">
        <h1 className="perfil-titulo">Usuario eliminado</h1>
        <p className="text-muted">Has sido redirigido a la página principal.</p>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <h1 className="perfil-titulo">Perfil del Usuario</h1>

      <div className="perfil-card">
        <div className="columna columna-izquierda">
          <p><strong>Nombre:</strong> {usuario.nombre || "Falta"}</p>
          <p><strong>Apellidos:</strong> {usuario.apellidos || "Falta"}</p>
          <p><strong>Email:</strong> {usuario.email || "Falta"}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono || "Falta"}</p>
          <p><strong>Dirección:</strong> {usuario.direccion || "Falta"}</p>
          <p><strong>Sexo:</strong> {usuario.sexo || "Falta"}</p>
        </div>

        <div className="columna columna-centro">
          <img src={usuario.imagen} alt="Foto del usuario" />
          <div className="botones-perfil">
            <button className="btn-editar">Editar datos</button>
            <button className="btn-borrar" onClick={handleDelete}>Borrar perfil</button>
          </div>
        </div>

        <div className="columna columna-derecha">
          <p><strong>Objetivo:</strong> {usuario.objetivo}</p>
          <p><strong>Altura:</strong> {usuario.altura} cm</p>
          <p><strong>Peso:</strong> {usuario.peso} kg</p>
        </div>
      </div>

      {/* Secciones inferiores */}
      <div className="secciones-inferiores">
        <div className="seccion">
          <h2>
            {entrenadorSeleccionado
              ? entrenadorSeleccionado.nombre
              : "Entrenador"}
          </h2>
          {entrenadorSeleccionado ? (
            <>
              <img
                src={entrenadorSeleccionado.image}
                alt="Entrenador"
                className="entrenador-img"
              />
              <div className="btn-entrenador-wrapper">
                <Link
                  to={`/entrenadores/${entrenadorSeleccionado.nombre
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="btn-entrenador-link"
                >
                  {entrenadorSeleccionado.nombre}
                </Link>
              </div>
            </>
          ) : (
            <div className="btn-entrenador-wrapper">
              <Link to="/profesionales" className="btn-entrenador-link">
                Ver entrenadores
              </Link>
            </div>
          )}
        </div>

        <div className="seccion">
          <h2>Historial de Actividad</h2>
          <ul>
            {historial.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="seccion">
          <h2>Membresía</h2>
          <p><strong>Tipo:</strong> {membresia.tipo}</p>
          <p><strong>Duración:</strong> {membresia.duracion}</p>
          <p><strong>Inicio:</strong> {membresia.inicio}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
