import { useEffect, useState } from "react";
import { backendUrl } from "../utils/Config";
import { useParams, useNavigate } from "react-router-dom";
import "./ActualizarUsuario.css"; // ⬅️ importa los estilos puros

export const ActualizarUsuario = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [datosActualizar, setDatosActualizar] = useState({
    nickname: "",
    telefono: "",
    avatar: "",
    nombre: "",
    apellido: "",
    email: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Progreso meramente visual
  const completion = (() => {
    const fields = ["nickname", "telefono", "avatar"];
    const filled = fields.filter((k) => (datosActualizar[k] || "").trim()).length;
    return Math.min(100, Math.round((filled / fields.length) * 100));
  })();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        const respuesta = await fetch(`${backendUrl}user/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await respuesta.json();

        if (respuesta.ok && data.resp) {
          setDatosActualizar({
            nickname: data.resp.nickname || "",
            telefono: data.resp.telefono || "",
            avatar: data.resp.avatar || "",
            nombre: data.resp.nombre || "",
            apellido: data.resp.apellido || "",
            email: data.resp.email || "",
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
      [e.target.name]: e.target.value,
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
      setSaving(true);
      const token = localStorage.getItem("token");
      const respuesta = await fetch(`${backendUrl}user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, telefono, avatar }),
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
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="perfil fondo_perfil">
      {/* brillo derecho opcional */}
      <div className="perfil__glow-right" />

      <div className="perfil__wrap">
        {/* Header */}
        <div className="perfil__header">
          <button onClick={() => navigate(-1)} className="btn btn--ghost">
            ← Volver
          </button>
          <span className="badge">Perfil</span>
        </div>

        {/* Card principal */}
        <div className="perfil__card">
          <div className="perfil__intro">
            <h3 className="perfil__title">Actualizar perfil</h3>
            <p className="perfil__subtitle">
              Personaliza tu cuenta y revisa que tus datos estén al día.
            </p>
          </div>

          <div className="perfil__grid">
            {/* Columna izquierda */}
            <div>
              <div className="avatar-card">
                <img
                  src={
                    datosActualizar.avatar?.trim()
                      ? datosActualizar.avatar
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          `${datosActualizar.nombre || ""} ${datosActualizar.apellido || ""}`.trim() ||
                            "U"
                        )}&background=1f2937&color=fff&size=256`
                  }
                  alt="Vista previa del avatar"
                  className="avatar-card__img"
                />
                <p className="avatar-card__hint">
                  Pega una URL en el campo para actualizar la imagen.
                </p>
              </div>

              {/* Progreso */}
              <div className="progress">
                <div className="progress__head">
                  <span>Completitud del perfil</span>
                  <span className="progress__val">{completion}%</span>
                </div>
                <div className="progress__track">
                  <div
                    className="progress__bar"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              {/* Datos actuales */}
              <div className="datos">
                <h4 className="datos__title">Datos del usuario</h4>
                <p>
                  <strong>Nombre:</strong> {datosActualizar.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {datosActualizar.apellido}
                </p>
                <p>
                  <strong>Email:</strong> {datosActualizar.email}
                </p>
              </div>
            </div>

            {/* Columna derecha: formulario (misma lógica) */}
            <form onSubmit={handleSubmit} className="perfil__form">
              <label className="label" htmlFor="nickname">
                Nombre de usuario
              </label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                placeholder="Nuevo nickname"
                value={datosActualizar.nickname}
                onChange={handleChange}
                autoComplete="username"
                className="input"
              />

              <label className="label" htmlFor="telefono">
                Teléfono
              </label>
              <input
                id="telefono"
                type="text"
                name="telefono"
                placeholder="Nuevo teléfono"
                value={datosActualizar.telefono}
                onChange={handleChange}
                autoComplete="tel"
                className="input"
              />

              <label className="label" htmlFor="avatar">
                URL del nuevo avatar
              </label>
              <input
                id="avatar"
                type="text"
                name="avatar"
                placeholder="https://imagen.com/avatar.png"
                value={datosActualizar.avatar}
                onChange={handleChange}
                autoComplete="off"
                className="input"
              />
              <p className="helper">
                Consejo: usa imágenes cuadradas (512×512 o más) para mejor
                calidad.
              </p>

              {mensaje && !error && (
                <p className="alert alert--ok">{mensaje}</p>
              )}
              {error && <p className="alert alert--error">{error}</p>}

              <div className="btns">
                <button
                  type="submit"
                  disabled={saving}
                  aria-busy={saving}
                  className="btn btn--primary"
                >
                  {saving ? "Guardando…" : "Guardar cambios"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/user/perfil")}
                  className="btn btn--secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ActualizarUsuario;
