import { useState } from "react"
import { backendUrl } from "../utils/Config";



export const ActualizarUsuario = ({userId}) => {
    const[datosActualizar, setDatosActualizar] = useState ({
        nickname: '',
        telefono: '',
        avatar: ''
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setDatosActualizar({
            ...datosActualizar,
            [e.target.name]: e.taget.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const respuesta = await fetch(`${backendUrl}user/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosActualizar)
            });

            const data = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(data.error || "Error en la actualización");
            }

            setMensaje(data.message);
            setError("");
        } catch (error) {
            console.error("Error al actualizar:", error);
            setError("Vuelve a intentarlo después, hemos tenido un error");
            setMensaje("");
        }
};
  return (
    <div style={{ marginTop: "2rem", padding: "1rem", background: "#333", borderRadius: "8px" }}>
      <h3 style={{ color: "#fff" }}>Actualizar perfil</h3>
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
        <button type="submit" style={{ padding: "0.5rem", background: "#4caf50", color: "#fff", border: "none", borderRadius: "4px" }}>
          Guardar cambios
        </button>
      </form>
      {mensaje && <p style={{ color: "lightgreen", marginTop: "1rem" }}>{mensaje}</p>}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};