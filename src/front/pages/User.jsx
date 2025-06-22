import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/User.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import userServices from "../../services/userServices.js";

const User = () => {
  const { store, dispatch } = useGlobalReducer();
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState(store.user || null);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const limpiarDatos = (datos) => {
    datos.peso = typeof datos.peso === "number" ? datos.peso.toString() : datos.peso;
    datos.altura = typeof datos.altura === "number" ? datos.altura.toString() : datos.altura;
    datos.experiencia = typeof datos.experiencia === "number" ? datos.experiencia.toString() : datos.experiencia;
    return {
      ...datos,
      peso: datos.peso ? parseFloat(datos.peso.replace(",", ".").replace("'", ".")) : null,
      altura: datos.altura ? parseFloat(datos.altura.replace(",", ".").replace("'", ".")) : null,
      experiencia: datos.experiencia ? parseInt(datos.experiencia) : 0
    };
  };

  const historial = [
    "Se apuntó al evento 'Yoga al aire libre'",
    "Entrenó fuerza en el gimnasio",
    "Asistió a clase de Boxeo"
  ];

  useEffect(() => {
    userServices.getUserInfo()
      .then((user) => {
        let aux = { ...user };
        user.peso = user.peso !== null ? String(user.peso) : "";
        user.altura = user.altura !== null ? String(user.altura) : "";
        user.experiencia = user.experiencia !== null ? String(user.experiencia) : "";
        dispatch({ type: "get_user_info", payload: aux });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, []);

  useEffect(() => {
    store.user && setUsuario(store.user || null);
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${usuario.id}`, {
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

      setMensaje("Perfil actualizado correctamente");
      setTimeout(() => setMensaje(null), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmacion = window.confirm("¿Estás seguro que deseas borrar tu perfil?");
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

  const entrenador = store.user?.profesionales_contratados?.[0];

  return (
    <div className="perfil-container">
      {mensaje && <div className="mensaje-toast">{mensaje}</div>}
      <h1 className="perfil-titulo">Perfil del Usuario</h1>

      <div className="perfil-card">
        <div className="columna columna-izquierda">
          {["nombre", "apellido", "email", "telefono", "direccion", "sexo"].map((campo) => (
            <p className="mt-3" key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>{" "}
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
            <img src={usuario.imagen || "/logoCrema1.png"} alt="foto del usuario" />
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
          {["objetivo", "altura", "peso"].map((campo) => (
            <p key={campo}>
              <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>{" "}
              {isEditing ? (
                <input
                  type={campo === "objetivo" ? "text" : "number"}
                  name={campo}
                  value={usuario[campo] || ""}
                  onChange={handleChange}
                />
              ) : (
                `${usuario[campo] || "Falta"}${campo !== "objetivo" ? campo === "peso" ? " kg" : " cm" : ""}`
              )}
            </p>
          ))}
          <div className="logo-columna-derecha mt-3 text-center p-2 rounded">
            <img src="/logoCrema1.png" alt="Logo salud" className="logo-gris" />
          </div>
        </div>
      </div>

      <div className="secciones-inferiores">
        <div className="seccion text-center">
          <h2>Tu entrenador</h2>
          {entrenador ? (
            <>
              <img
                src={entrenador.imagen || "/logoCrema1.png"}
                alt="Entrenador"
                className="entrenador-img mx-auto d-block"
              />
              <div className="d-flex justify-content-center mt-2 gap-2 flex-wrap">
                <Link
                  to={`/entrenadores/${entrenador.nombre?.toLowerCase().replace(/ /g, "-")}`}
                  className="btn-entrenador-link"
                >
                  {entrenador.nombre}
                </Link>

                <Link to="/profesionales" className="btn btn-outline-secondary">
                  Ver más entrenadores
                </Link>
              </div>
            </>
          ) : (
            <Link to="/profesionales" className="btn btn-primary mt-3">Ver entrenadores</Link>
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
          {store.user?.subscription?.length > 0 ? (
            <>
              <p className="mb-0"><strong>Nivel</strong></p>
              <p className="fs-3 fw-bold">{store.user.subscription[0].plan.name}</p>
              <p><strong>Finaliza:</strong> {store.user.subscription[0].end_date.split("-").reverse().join("/")}</p>
            </>
          ) : (
            <Link to="/Tarifas" className="border border-danger text-danger">No tienes una membresía activa.</Link>
          )}
        </div>
      </div>

      <div className="secciones-inferiores">
        <div className="seccion">
          <h2>Plan Nutrición</h2>
          <p>Consulta tu avance nutricional y recomendaciones dietéticas.</p>
          <Link to="/nutricionUser" className="btn-editar">Ver Plan</Link>
        </div>
        <div className="seccion">
          <h2>Plan Deporte</h2>
          <p>Visualiza tus rutinas asignadas y objetivos físicos.</p>
          <Link to="/sportUser" className="btn-editar">Ver Plan</Link>
        </div>
        <div className="seccion">
          <h2>Eventos</h2>
          <p>Accede a actividades especiales y eventos del centro.</p>
          <Link to="/Eventos" className="btn-editar">Ver Eventos</Link>
        </div>
      </div>
    </div>
  );
};

export default User;
