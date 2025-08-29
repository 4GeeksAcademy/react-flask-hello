import { notifyError, notifySuccess } from "../../utils/Notifications";
import { backendUrl } from "../../utils/Config";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

// helpers visuales
const money = (v) =>
  Number(v) === 0
    ? "Gratis"
    : new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" })
        .format(Number(v || 0));
const fmtDate = (s) => {
  if (!s) return "—";
  const d = new Date(s);
  return isNaN(d)
    ? s
    : d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
};
const getTags = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean).map(String);
  if (typeof raw === "string") return raw.split(",").map(t => t.trim()).filter(Boolean);
  return [];
};

export const CardEvento = ({ item, isUser }) => {
  const { dispatch } = useGlobalReducer();

  const deleteEvent = async (event) => {
    const ok = window.confirm("¿Estás seguro de eliminar?");
    if (!ok) return;

    try {
      const respuesta = await fetch(backendUrl + `events/${event.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        notifySuccess(data.message);
        dispatch({ type: "deleteEvent", payload: event });
      } else {
        notifyError(data.message || "No tienes eventos disponibles");
      }
    } catch (error) {
      notifyError("Error al eliminar el evento");
    }
  };

  const tags = getTags(item?.etiquetas || item?.tags);

  return (
    // conservamos tu clase "dest-card" y añadimos "card-ev" para estilos nuevos
    <article className="dest-card card-ev" style={{ margin: "1rem" }}>
      {/* MEDIA + overlay */}
      <div className="img-container">
        {item?.portada ? (
          <img src={item.portada} alt={item.titulo} className="img-card" />
        ) : (
          <div className="img-card img-card--empty" />
        )}

        {item?.categoria && <span className="chip">{item.categoria}</span>}
        {/* Título sobre la imagen */}
        <h3 className="title">{item.titulo}</h3>
        <div className="img-gradient" />
      </div>

      {/* CUERPO */}
      <div className="card-ev__body">
        <ul className="meta-badges">
          <li>{fmtDate(item?.fecha)}</li>
          {"precio" in item && <li>{money(item?.precio)}</li>}
          {"max_asist" in item && <li>{item?.max_asist} plazas</li>}
        </ul>

        {tags.length > 0 && (
          <ul className="card-ev__tags">
            {tags.slice(0, 4).map((t) => (
              <li key={t}>#{t}</li>
            ))}
          </ul>
        )}

        {isUser && (
          <div className="container-btns">
            <Link to={`/crear-evento/${item.id}`}>
              <button className="btn btn-chip" style={{ marginBottom: "0.5rem" }}>
                Actualizar
              </button>
            </Link>
            <button onClick={() => deleteEvent(item)} className="btn btn-chip btn--danger">
              Eliminar
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
