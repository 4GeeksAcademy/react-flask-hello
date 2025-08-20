import { useEffect, useState } from "react";
import { backendUrl } from "../utils/Config";

export const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      const tokenUsuario = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const respuesta = await fetch(backendUrl+`user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenUsuario}`,
            "Content-Type": "application/json",
          },
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }

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

    cargarDatosUsuario();
  }, []);

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  if (!usuario) {
    return <p style={{ padding: "2rem" }}>Cargando perfil del usuario...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/fondo_login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <h1>Perfil de {usuario.nombre}</h1>

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(0,0,0,0.5)",
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <strong>Nombre:</strong> {usuario.nombre}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Apellido:</strong> {usuario.apellido}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Nickname:</strong> {usuario.nickname}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Teléfono:</strong> {usuario.telefono}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Email:</strong> {usuario.email}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Rol:</strong> {usuario.rol}
        </div>
        {usuario.avatar && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <img
              src={usuario.avatar}
              alt="Avatar"
              style={{
                width: "120px",
                borderRadius: "50%",
                border: "2px solid #fff",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}