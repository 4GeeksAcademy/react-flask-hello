import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/User.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState({});
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const limpiarDatos = (datos) => {
    return {
      ...datos,
      peso: datos.peso ? parseFloat(datos.peso.replace(", ", ".").replace("'", ".")) : null,
      altura: datos.altura ? parseFloat(datos.altura.replace(", ", ".").replace("'", ".")) : null,
      experiencia: datos.experiencia ? parseInt(datos.experiencia) : 0
    };
  };

  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState(null); // ✅ Hook bien colocado

  const historial = [
    "se apunto al evennto 'yoga al aire libre'",
    "Entreno fuerza en el gimnasio",
    "Asistió a clase de Boxeo"
  ];

  const membresia = {
    tipo: "premium",
    duracion: "6 meses",
    inicio: "1 de mayo del 2025"
  };

  useEffect(() => {
    if (store.user) {
      const user = store.user;
      setUsuario({
        ...user,
        peso: user.peso !== null ? String(user.peso) : "",
        altura: user.altura !== null ? String(user.altura) : "",
        experiencia: user.experiencia !== null ? String(user.experiencia) : ""
      });
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

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const camposValidos = [
        "nombre", "apellido", "email", "telefono", "direccion", "sexo",
        "imagen", "objetivo", "peso", "altura", "experiencia", "is_active"
      ];
      const datosLimpios = limpiarDatos(usuario);
      const payload = {};
      for (const campo of camposValidos) {
        if (datosLimpios[campo] !== undefined) {
          payload[campo] = datosLimpios[campo];
        }
      }
      const res = await fetch("https://automatic-space-orbit-pjwr5pp79rgpfrvj7-3001.app.github.dev//api/users/", {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al guardar");
      const updateUser = await res.json();
      setUsuario(updateUser);
      dispatch({ type: "ACTUALIZAR_USUARIO", payload: updateUser });
      setIsEditing(false);
      alert("Perfil actualizado");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al guardar los cambios");
    }
  };

  const handleDelete = async () => {
    const confirmacion = window.confirm("¿Estás seguro que deseas borrar tu perfil?");
    if (!confirmacion) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://shiny-potato-q7pwpgqg69vpfxgq9-3000.app.github.dev/api/users", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al borrar el perfil");
      localStorage.removeItem("token");
      dispatch({ type: "BORRAR_USUARIO" });
      setUsuario(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el perfil");
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
          {["nombre", "apellido", "email", "telefono", "direccion", "sexo"].map((campo) => (
            <p className="mt-3" key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name={campo}
                  value={usuario[campo] || ""}
                  onChange={handleChange}
                />
              ) : (
                usuario[campo] || "Falta"
              )}
            </p>
          ))}
        </div>
        <div className="columna columna-centro">
          {isEditing ? (
            <input
              type="text"
              name="imagen"
              value={usuario.imagen || ""}
              onChange={handleChange}
              placeholder="URL imagen"
            />
          ) : (
            <img src={usuario.imagen || "https://i.pravatar.cc/200"} alt="foto del usuario" />
          )}
          <div className="botones-perfil">
            {isEditing ? (
              <>
                <button className="btn-guardar" onClick={handleSave}>Guardar</button>
                <button className="btn-cancelar" onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            ) : (
              <>
                <button className="btn-editar" onClick={() => setIsEditing(true)}>Editar datos</button>
                <button className="btn-borrar" onClick={handleDelete}>Borrar perfil</button>
              </>
            )}
          </div>
        </div>
        <div className="columna columna-derecha">
          {["objetivo"].map((campo) => (
            <p key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name={campo}
                  value={usuario[campo] || ""}
                  onChange={handleChange}
                />
              ) : (
                `${usuario[campo] || "Falta"}`
              )}
            </p>
          ))}
          {["altura", "peso"].map((campo) => (
            <p key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>{" "}
              {isEditing ? (
                <input
                  type="number"
                  name={campo}
                  value={usuario[campo] || ""}
                  onChange={handleChange}
                />
              ) : (
                `${usuario[campo] || "Falta"}${campo === "altura" ? "cm" : campo === "peso" ? "kg" : ""}`
              )}
            </p>
          ))}

          <div className="logo-columna-derecha mt-3 text-center p-2 rounded">
            <img
              src="/logoCrema1.png"
              alt="Logo salud"
              className="logo-gris"
            />
          </div>
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
