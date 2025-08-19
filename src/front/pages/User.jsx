// src/front/pages/User.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient.js";

export function User() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Supabase v2 y v1
        let u = null;
        if (supabase.auth?.getUser) {
          const { data, error } = await supabase.auth.getUser();
          if (error) throw error;
          u = data?.user ?? null;
        } else {
          u = supabase.auth.user();
        }
        if (!mounted) return;

        if (!u) {
          setLoading(false);
          navigate("/login");
          return;
        }

        setMe(u);

        // Tus tablas/campos: Evento, creador_evento, fecha, hora, location, portada, definicion
        const { data: rows, error: qErr } = await supabase
          .from("Evento")
          .select("id, titulo, fecha, hora, location, portada, definicion")
          .eq("creador_evento", u.id)
          .order("fecha", { ascending: true });

        if (qErr) throw qErr;
        if (!mounted) return;
        setEvents(rows || []);
      } catch (e) {
        setErr(e.message || "No se pudo cargar el perfil.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const displayName = useMemo(() => {
    const md = me?.user_metadata || {};
    return md.full_name || md.name || md.username || (me?.email || "").split("@")[0];
  }, [me]);

  const avatarUrl = useMemo(() => {
    const md = me?.user_metadata || {};
    return (
      md.avatar_url ||
      md.picture ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName || "K")}`
    );
  }, [me, displayName]);

  if (loading) {
    return (
      <main className="profile">
        <section className="profile__card">
          <div className="skeleton" style={{ height: 120, borderRadius: 16 }} />
          <div className="skeleton" style={{ height: 18, marginTop: 12, borderRadius: 8 }} />
        </section>
      </main>
    );
  }

  if (err) {
    return (
      <main className="profile">
        <section className="profile__card">
          <p className="help is-error">{err}</p>
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Volver</button>
        </section>
      </main>
    );
  }

  if (!me) {
    return (
      <main className="profile">
        <section className="profile__card">
          <p>No has iniciado sesión.</p>
          <div className="form-actions">
            <Link className="btn btn-primary" to="/login">Iniciar sesión</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="profile">
      <section className="profile__card">
        <div className="profile__topbar">
          <button className="btn btn-ghost" type="button" onClick={() => navigate("/home")}>
            ← Volver a home
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/crear-evento")}>
            Crear evento
          </button>
        </div>

        <div className="profile__header">
          <div className="profile__avatar">
            <img src={avatarUrl} alt="" />
          </div>
          <div>
            <h1 className="profile__title">{displayName}</h1>
            <p className="profile__subtitle">{me.email}</p>
          </div>
        </div>

        <div className="profile__block">
          <div className="section-head" style={{ margin: 0 }}>
            <h2>Mis eventos</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to="/eventos" className="pill">Ver todos</Link>
            </div>
          </div>

          {events.length === 0 ? (
            <p className="copy" style={{ marginTop: 8 }}>No tienes eventos creados aún.</p>
          ) : (
            <div className="grid-cards" style={{ marginTop: 12 }}>
              {events.map(ev => (
                <Link key={ev.id} to={`/eventos`} className="destinos__card">
                  <div className="destinos__thumb">
                    <img src={ev.portada} alt="" loading="lazy" />
                  </div>
                  <div className="destinos__info">
                    <strong className="destinos__name">{ev.titulo}</strong>
                    <span className="destinos__meta">
                      {ev.fecha}{ev.hora ? ` · ${ev.hora}` : ""}{ev.location ? ` · ${ev.location}` : ""}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="profile__actions">
          <button
            className="btn btn-ghost"
            onClick={async () => { await supabase.auth.signOut?.(); navigate("/home"); }}
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
}
