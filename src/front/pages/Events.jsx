import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../api/supabaseClient.js";
import { Card } from "../components/Card";

export function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        // Ajusto los nombres de columnas si en tabla usan otros. Tipo location en vez de ubicacion por ejemplo.
        const { data, error } = await supabase
          .from("Evento")
          .select("id, titulo, definicion, fecha, portada, ubicacion")
          .order("fecha", { ascending: true });

        if (error) throw error;
        if (!alive) return;

        // Mapeamos a la forma que espera <Card d={...} eso es lo que dice el TikTok jajajajaj no se ni lo que significa>
        const mapped = (data || []).map(e => ({
          id: e.id,
          d: {
            img: e.portada,             // así el CreateEvent guarda la URL pública
            titulo: e.titulo,
            pais: e.ubicacion || ""     // con esto según el vídeo usamos 'ubicacion' como subtítulo
          }
        }));
        setEvents(mapped);
      } catch (e) {
        if (alive) setError(e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <div className="page"><p>Cargando eventos…</p></div>;
  if (error) return <div className="page"><p>⚠️ {error}</p></div>;

  return (
    <div className="page">
      <div className="section-head">
        <h2>Eventos</h2>
        <Link to="/crear-evento" className="btn">+ Crear evento</Link>
      </div>

      {events.length === 0 ? (
        <p>No hay eventos todavía. ¡Crea el primero! 🎉</p>
      ) : (
        <div className="grid-cards" style={{ marginTop: 16 }}>
          {events.map(ev => (
            <Card key={ev.id} d={ev.d} />
          ))}
        </div>
      )}
    </div>
  );
}
