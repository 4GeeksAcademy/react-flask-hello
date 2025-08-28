// src/front/pages/Home.jsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useStore } from "../hooks/useGlobalReducer"
import { listTasks } from "../api/tasks"         // ya existe
import "./home.css"                              // estilos nuevos y ligeros

export default function Home() {
  const { store } = useStore()
  const [msg, setMsg] = useState("Cargando…")
  const [tasks, setTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(true)

  const BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "")

  useEffect(() => {
    // ping de salud (tu diagnóstico)
    ;(async () => {
      try {
        const r = await fetch(`${BASE}/api/health`)
        const data = await r.json()
        setMsg(data.msg || JSON.stringify(data))
      } catch (err) {
        setMsg(`Error: ${err.message}`)
      }
    })()

    // preview de tareas (opcional, no rompe si falla)
    ;(async () => {
      try {
        const data = await listTasks()
        setTasks((data || []).slice(0, 6))
      } catch {
        // silencioso: si no hay backend para tasks, no pasa nada
      } finally {
        setLoadingTasks(false)
      }
    })()
  }, [])

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <h1>
            Consigue ayuda para <span className="text-gradient">todo</span> lo que necesitas
          </h1>
          <p className="hero__subtitle">
            Publica una tarea en minutos y recibe ofertas de taskers verificados.
          </p>
          <div className="hero__cta">
            <Link to="/post" className="btn btn--primary">Post a task</Link>
            <Link to="/browse" className="btn btn--ghost">Browse tasks</Link>
          </div>

          {/* mini-stats (mock seguros) */}
          <div className="stats">
            <div className="stat">
              <span className="stat__num">+120</span>
              <span className="stat__label">Taskers activos</span>
            </div>
            <div className="stat">
              <span className="stat__num">~15min</span>
              <span className="stat__label">Promedio de respuesta</span>
            </div>
            <div className="stat">
              <span className="stat__num">4.8★</span>
              <span className="stat__label">Satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="how">
        <h2>¿Cómo funciona?</h2>
        <div className="how__grid">
          <Step emoji="📝" title="Publica">
            Describe tu tarea con precio, fecha y ubicación.
          </Step>
          <Step emoji="💬" title="Recibe ofertas">
            Taskers cercanos te envían propuestas y dudas.
          </Step>
          <Step emoji="✅" title="Contrata">
            Elige la mejor opción y califica el resultado.
          </Step>
        </div>
      </section>

      {/* TAREAS RECIENTES (si hay) */}
      <section className="recent">
        <div className="recent__head">
          <h2>Tareas recientes</h2>
          <Link to="/browse" className="link">Ver todas →</Link>
        </div>

        {loadingTasks ? (
          <div className="skeleton-row" />
        ) : tasks.length ? (
          <div className="cards">
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No hay tareas para mostrar aún.</p>
            <Link to="/post" className="btn btn--primary btn--sm">Crea la primera</Link>
          </div>
        )}
      </section>

      {/* DIAGNÓSTICO (tu tarjeta original, ahora plegable) */}
      <section className="diagnostic">
        <details>
          <summary>Diagnóstico (API / entorno)</summary>
          <div className="diag__card">
            <h3>Tasky – Home</h3>
            <p>Backend dice: <b>{msg}</b></p>
            <p>VITE_BACKEND_URL: {import.meta.env.VITE_BACKEND_URL}</p>
            {store.user && (
              <p>Sesión: {store.user.email} (rol: {store.user.role})</p>
            )}
          </div>
        </details>
      </section>
    </div>
  )
}

function Step({ emoji, title, children }) {
  return (
    <div className="step">
      <div className="step__emoji">{emoji}</div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  )
}

function TaskCard({ task }) {
  return (
    <article className="card">
      <div className="card__head">
        <h3 className="card__title">{task.title}</h3>
        {task.price != null && <span className="chip">${task.price}</span>}
      </div>
      <p className="card__desc">{task.description}</p>
      <div className="card__meta">
        <span>📍 {task.location || "Remoto"}</span>
        <span className={`status status--${task.status || "pending"}`}>
          {task.status || "pending"}
        </span>
      </div>
    </article>
  )
}