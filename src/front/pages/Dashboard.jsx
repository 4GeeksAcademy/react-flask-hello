import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      // Clean any old error (optional, you can remove this if you want to persist previous errors)
      dispatch({ type: "error", payload: null });

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

        // Token expired/invalid: 401 or 422 => force logout
        if (res.status === 401 || res.status === 422) {
          dispatch({ type: "LOGOUT" });
          dispatch({ type: "error", payload: "Session expired. Please log in again." });
          navigate("/login");
          return;
        }

        if (!res.ok) {
          dispatch({ type: "error", payload: data.msg || "Error fetching projects." });
          setProjects(null);
        } else {
          setProjects(data.user_projects);
        }
      } catch (err) {
        dispatch({ type: "error", payload: "Could not connect to backend." });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [store.token, dispatch, navigate]);

  if (!store.token) {
    return <p>Redirigiendo a login...</p>;
  }

  return (
    <div className="container py-5">
      <h2>Panel de usuario: Tus Proyectos</h2>
      {loading && <p>Cargando proyectos...</p>}

      {projects ? (
        <div>
          <h4>Como admin:</h4>
          <ul>
            {(projects.admin && projects.admin.length > 0)
              ? projects.admin.map(proj => (
                <li key={proj.id}>{proj.title}</li>
              ))
              : <li>No eres admin de ningún proyecto.</li>
            }
          </ul>
          <h4>Como miembro:</h4>
          <ul>
            {(projects.member && projects.member.length > 0)
              ? projects.member.map(proj => (
                <li key={proj.id}>{proj.title}</li>
              ))
              : <li>No eres miembro de ningún proyecto.</li>
            }
          </ul>
        </div>
      ) : !loading && <div>No se encontraron proyectos.</div>}
    </div>
  );
}




