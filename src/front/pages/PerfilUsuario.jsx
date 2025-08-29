import { useEffect, useState } from "react";
import { backendUrl } from "../utils/Config";
import { Link, useNavigate } from "react-router-dom";
import { ActualizarUsuario } from "./ActualizarUsuario";

export const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const cargarDatosUsuario = async () => {
    const tokenUsuario = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const respuesta = await fetch(backendUrl + `user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenUsuario}`,
          "Content-Type": "application/json",
        },
      });

      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      const data = await respuesta.json();
      const datosUsuario = data.resp;

      if (datosUsuario && Object.keys(datosUsuario).length > 0) {
        setUsuario(datosUsuario);
      } else {
        setError("No se encontraron datos del usuario.");
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      setError("No se pudieron cargar los datos del usuario.");
    }
  };
  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  if (!usuario) {
    return <p style={{ padding: "2rem" }}>Cargando perfil del usuario...</p>;
  }

  const VIDEO_URL =
    "https://cdn.pixabay.com/video/2018/11/16/19368-301525727_large.mp4";
  const FALLBACK_POSTER =
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop";

  const avatar =
    usuario.avatar ||
    "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";

  return (
    <div className="perfil">
      {/* Background sexiiiiiii del video */}
      <div className="perfil-bg">
        <video
          className="perfil-video"
          autoPlay
          muted
          loop
          playsInline
          poster={FALLBACK_POSTER}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="perfil-overlay" />
      </div>

      <div className="perfil-container">
        <h1 className="perfil-title">Perfil de {usuario.nombre}</h1>

        <section className="perfil-card glass">
          <div className="perfil-avatar">
            <img src={avatar} alt="Avatar" />
          </div>

          <ul className="perfil-info">
            <li>
              <span className="label">Nombre</span>
              <span className="value">{usuario.nombre}</span>
            </li>
            <li>
              <span className="label">Apellido</span>
              <span className="value">{usuario.apellido}</span>
            </li>
            <li>
              <span className="label">Nickname</span>
              <span className="value value--chip">{usuario.nickname}</span>
            </li>
            <li>
              <span className="label">Teléfono</span>
              <span className="value">{usuario.telefono}</span>
            </li>
            <li className="perfil-info--full">
              <span className="label">Email</span>
              <span className="value">{usuario.email}</span>
            </li>
          </ul>
          <Link to={`/user/actualizar-perfil/${usuario.id}`}>
            <div className="form-actions">
              <button className="btn btn-primary">
                Editar informacion
              </button>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};