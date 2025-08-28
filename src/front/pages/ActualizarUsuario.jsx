import { useEffect, useState } from "react";
import { backendUrl } from "../utils/Config";
import { useParams, useNavigate } from "react-router-dom";

export const ActualizarUsuario = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [datosActualizar, setDatosActualizar] = useState({
    nickname: '',
    telefono: '',
    avatar: '',
    nombre: '',
    apellido: '',
    email: ''
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  console.log("Enviando datos:", datosActualizar);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        const respuesta = await fetch(`${backendUrl}user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await respuesta.json();

        if (respuesta.ok && data.resp) {
          setDatosActualizar({
            nickname: data.resp.nickname || '',
            telefono: data.resp.telefono || '',
            avatar: data.resp.avatar || '',
            nombre: data.resp.nombre || '',
            apellido: data.resp.apellido || '',
            email: data.resp.email || ''
          });
        } else {
          throw new Error("No se pudieron cargar los datos");
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudieron cargar los datos del usuario.");
      }
    };

    cargarDatos();
  }, [userId]);

  const handleChange = (e) => {
    setDatosActualizar({
      ...datosActualizar,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nickname, telefono, avatar } = datosActualizar;

    if (!nickname && !telefono && !avatar) {
      setError("Debes modificar al menos uno de los campos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const respuesta = await fetch(`${backendUrl}user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nickname, telefono, avatar })
      });

      const data = await respuesta.json();
      console.log("Respuesta del servidor:", data);

      if (!respuesta.ok) {
        throw new Error(data.error || "Error al actualizar datos usuario");
      }

      setMensaje("Perfil actualizado correctamente.");
      setError("");

      setTimeout(() => {
        navigate("/user/perfil");
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError("Vuelve a intentarlo después, hemos tenido un error.");
      setMensaje("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem",
        color: "#ffffffff",
      }}
      className="fondo_perfil">
      <h3>Actualizar perfil</h3>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(66, 66, 66, 0.7)",
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <div style={{ marginTop: "2rem", }}>
          <div style={{ marginTop: "2rem" }}>
            <h4>Datos del usuario</h4>
            <p><strong>Nombre:</strong> {datosActualizar.nombre}</p>
            <p><strong>Apellido:</strong> {datosActualizar.apellido}</p>
            <p><strong>Email:</strong> {datosActualizar.email}</p>
          </div>
          <br />
          <h4>Datos a modificar</h4>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              name="nickname"
              placeholder="Nuevo nickname"
              value={datosActualizar.nickname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="telefono"
              placeholder="Nuevo teléfono"
              value={datosActualizar.telefono}
              onChange={handleChange}
            />
            <input
              type="text"
              name="avatar"
              placeholder="URL del nuevo avatar"
              value={datosActualizar.avatar}
              onChange={handleChange}
            />

            {datosActualizar.avatar && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <img
                  src={datosActualizar.avatar}
                  alt="Vista previa del avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ccc"
                  }}
                />
              </div>
            )}
            <button type="submit" style={{ padding: "0.5rem", background: "#4caf50", color: "#fff", border: "none", borderRadius: "4px" }}>
              Guardar cambios
            </button>
          </form>

          {mensaje && <p style={{ color: "lightgreen", marginTop: "1rem" }}>{mensaje}</p>}
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};