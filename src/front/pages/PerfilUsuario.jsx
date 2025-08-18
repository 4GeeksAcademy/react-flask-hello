import { useEffect, useState } from "react";
import { backendUrl } from "../utils/Config";

export const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      const tokenUsuario = localStorage.getItem("token");

      try {
        const respuesta = await fetch(backendUrl + "user/perfil", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenUsuario}`,
            "Content-Type": "application/json",
          },
        });

        const contentType = respuesta.headers.get("content-type");

        if (respuesta.ok && contentType.includes("application/json")) {
          const data = await respuesta.json();
          setUsuario(data);
        } else {
          const texto = await respuesta.text();
          console.error("Respuesta inesperada:", texto);
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };

    cargarDatosUsuario();
  }, []);

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
      <h1>Perfil del Usuario</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(0,0,0,0.5)", padding: "2rem", borderRadius: "12px" }}>
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
        {usuario.avatar && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <img
              src={usuario.avatar}
              alt="Avatar"
              style={{ width: "120px", borderRadius: "50%", border: "2px solid #fff" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};