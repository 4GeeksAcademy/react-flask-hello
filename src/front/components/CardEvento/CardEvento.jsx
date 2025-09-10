import { notifyError, notifySuccess } from "../../utils/Notifications";
import { backendUrl } from "../../utils/Config";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { CalendarIcon, UsersIcon, CurrencyEuroIcon, MapPinIcon, SparklesIcon } from "@heroicons/react/24/outline";
// helpers visuales mejorados
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
    : d.toLocaleDateString("es-ES", { 
        day: "2-digit", 
        month: "short", 
        year: "numeric" 
      });
};
const getTags = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean).map(String);
  if (typeof raw === "string") return raw.split(",").map(t => t.trim()).filter(Boolean);
  return [];
};
// Función para determinar si es un evento "especial"
const isSpecialEvent = (item) => {
  const price = Number(item?.precio || 0);
  const isExpensive = price > 50;
  const hasLimitedSeats = item?.max_asist && item.max_asist < 20;
  const isToday = new Date(item?.fecha).toDateString() === new Date().toDateString();
  
  return isExpensive || hasLimitedSeats || isToday;
};
export const CardEvento = ({ item, isUser }) => {
  const { dispatch } = useGlobalReducer();
  const deleteEvent = async (event) => {
    const ok = window.confirm("¿Estás seguro de eliminar este evento?");
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
        notifyError(data.message || "Error al eliminar el evento");
      }
    } catch (error) {
      notifyError("Error al eliminar el evento");
    }
  };
  const tags = getTags(item?.etiquetas || item?.tags || item?.categoria);
  const isSpecial = isSpecialEvent(item);
  return (
    <article className={`dest-card card-ev magic-hover ${isSpecial ? 'event-special' : ''}`}>
      {/* MEDIA CONTAINER con efectos avanzados */}
      <div className="event-media-container">
        {item?.portada ? (
          <img 
            src={item.portada} 
            alt={item.titulo} 
            className="event-image"
            loading="lazy"
          />
        ) : (
          <div className="event-image-placeholder">
            <SparklesIcon className="placeholder-icon" />
            <span>Imagen del evento</span>
          </div>
        )}
        {/* Overlay con gradiente dinámico */}
        <div className="event-overlay-gradient" />
        
        {/* Badge de categoría flotante */}
        {item?.categoria && (
          <div className="event-category-badge">
            <SparklesIcon className="category-icon" />
            {item.categoria}
          </div>
        )}
        {/* Título sobre la imagen con efectos */}
        <div className="event-title-overlay">
          <h3 className="event-title">{item.titulo}</h3>
          
          {/* Badges de información rápida */}
          <div className="event-quick-info">
            <div className="quick-info-item">
              <CalendarIcon className="info-icon" />
              <span>{fmtDate(item?.fecha)}</span>
            </div>
            
            {"precio" in item && (
              <div className="quick-info-item price-badge">
                <CurrencyEuroIcon className="info-icon" />
                <span>{money(item?.precio)}</span>
              </div>
            )}
          </div>
        </div>
        {/* Indicador de evento especial */}
        {isSpecial && (
          <div className="special-indicator">
            <SparklesIcon className="special-icon" />
            <span>Destacado</span>
          </div>
        )}
      </div>
      {/* CUERPO DE LA CARD */}
      <div className="event-card-body">
        {/* Meta información con iconos */}
        <div className="event-meta-grid">
          {"max_asist" in item && item.max_asist && (
            <div className="meta-item">
              <UsersIcon className="meta-icon" />
              <span>{item.max_asist} plazas</span>
            </div>
          )}
          
          {item?.ubicacion && (
            <div className="meta-item">
              <MapPinIcon className="meta-icon" />
              <span>{item.ubicacion}</span>
            </div>
          )}
        </div>
        {/* Tags/Etiquetas con animaciones */}
        {tags.length > 0 && (
          <div className="event-tags-container">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={tag} 
                className="event-tag"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="event-tag more-tags">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        {/* Descripción preview si existe */}
        {item?.definicion && (
          <p className="event-description-preview">
            {item.definicion.length > 80 
              ? `${item.definicion.substring(0, 80)}...`
              : item.definicion
            }
          </p>
        )}
        {/* Botones de acción para usuarios */}
        {isUser && (
          <div className="event-action-buttons">
            <Link to={`/crear-evento/${item.id}`} className="btn-link">
              <button className="btn btn-ghost btn-sm">
                ✏️ Editar
              </button>
            </Link>
            
            <button 
              onClick={() => deleteEvent(item)} 
              className="btn btn-danger btn-sm"
            >
              🗑️ Eliminar
            </button>
          </div>
        )}
        {/* Acción principal */}
        {!isUser && (
          <div className="event-main-action">
            <button className="btn btn-primary btn-full">
              🎫 Ver Detalles
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .event-media-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }
        .event-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .event-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--glass-bg);
          color: var(--muted);
          font-size: 0.9rem;
          gap: 8px;
        }
        .placeholder-icon {
          width: 48px;
          height: 48px;
          opacity: 0.5;
        }
        .event-overlay-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70%;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            transparent 100%
          );
          transition: all 0.3s ease;
        }
        .dest-card:hover .event-overlay-gradient {
          background: linear-gradient(
            to top,
            var(--event-overlay) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            transparent 100%
          );
        }
        .event-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text);
          transition: all 0.3s ease;
        }
        .category-icon {
          width: 14px;
          height: 14px;
        }
        .special-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 20px;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          animation: specialPulse 2s ease-in-out infinite;
        }
        .special-icon {
          width: 12px;
          height: 12px;
        }
        @keyframes specialPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .event-title-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          z-index: 2;
        }
        .event-title {
          color: #ffffff !important;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          text-shadow: 0 2px 8px rgba(0,0,0,0.7);
          transition: all 0.3s ease;
        }
        .dest-card:hover .event-title {
          transform: translateY(-2px);
          text-shadow: 0 4px 16px rgba(0,0,0,0.8);
        }
        .event-quick-info {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .quick-info-item {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 12px;
          padding: 4px 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .quick-info-item.price-badge {
          background: var(--glow-primary);
        }
        .info-icon {
          width: 12px;
          height: 12px;
        }
        .event-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .event-meta-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-size: 0.85rem;
          font-weight: 500;
        }
        .meta-icon {
          width: 16px;
          height: 16px;
          color: var(--accent);
        }
        .event-tags-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .event-tag {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--accent);
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.3s ease;
          animation: tagSlideIn 0.4s ease forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        @keyframes tagSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .event-tag:hover {
          background: var(--glass-hover);
          transform: translateY(-1px) scale(1.05);
        }
        .event-tag.more-tags {
          background: var(--accent);
          color: #ffffff;
          border-color: var(--accent);
        }
        .event-description-preview {
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }
        .event-action-buttons {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .btn-link {
          text-decoration: none;
          flex: 1;
        }
        .btn-sm {
          padding: 8px 16px !important;
          font-size: 0.85rem !important;
          border-radius: 12px !important;
        }
        .btn-danger {
          background: linear-gradient(135deg, #ef4444, #dc2626) !important;
          color: #ffffff !important;
        }
        .btn-danger:hover {
          background: linear-gradient(135deg, #dc2626, #b91c1c) !important;
        }
        .event-main-action {
          margin-top: auto;
        }
        .btn-full {
          width: 100%;
          padding: 12px 20px !important;
          font-weight: 700 !important;
        }
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .event-media-container {
            height: 180px;
          }
          
          .event-card-body {
            padding: 16px;
            gap: 12px;
          }
          
          .event-quick-info {
            flex-direction: column;
            gap: 8px;
          }
          
          .event-action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </article>
  );
};