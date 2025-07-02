import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";

export default function Dashboard() {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      // Si no hay token, redirige inmediatamente
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/projects`,
          {
            headers: {
              Authorization: "Bearer " + store.token,
              "Content-Type": "application/json"
            }
          }
        );
        const data = await res.json();
        // Token expirado/inválido: 401 o 422 => fuerza logout
        if (res.status === 401 || res.status === 422) {
          dispatch({ type: "LOGOUT" });
          navigate("/login");
          return;
        }
        if (!res.ok) {
          setError(data.msg || "Error fetching projects.");
          setProjects(null);
        } else {
          setProjects(data.user_projects);
        }
      } catch (err) {
        setError("No se pudo conectar con el backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [store.token, dispatch, navigate]);

  if (!store.token) {
    // Esto se verá solo por un microsegundo si no hay token.
    return <p>Redirigiendo a login...</p>;
  }

  return (
    <div className="container py-5">
      <h2>Panel de usuario: Tus Proyectos</h2>
      {loading && <p>Cargando proyectos...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {projects ? (
        <div>
          <h4>Como admin:</h4>
          <ul>
            {(projects.admin && projects.admin.length > 0)
              ? projects.admin.map(proj => (
                console.log(proj),

                <ProjectCard key={proj.id} project={proj} />
              ))
              : <li>No eres admin de ningún proyecto.</li>
            }
          </ul>
          <h4>Como miembro:</h4>
          <ul>
            {(projects.member && projects.member.length > 0)
              ? projects.member.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))
              : <li>No eres miembro de ningún proyecto.</li>
            }
          </ul>
        </div>
      ) : !loading && <div>No se encontraron proyectos.</div>}
    </div>
  );
}



