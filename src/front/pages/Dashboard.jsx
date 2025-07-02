import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";

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
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="container py-5">
      <h2>User Dashboard: Your Projects</h2>
      
      {/* Welcome message */}
      {store.user && (
        <div className="alert alert-info mb-4">
          Welcome, <strong>{store.user.full_name || store.user.email}</strong>! 👋
        </div>
      )}

      {loading && <p>Loading projects...</p>}

      {projects ? (
        <div>
          <h4>As admin:</h4>
          <ul>
            {(projects.admin && projects.admin.length > 0)
              ? projects.admin.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))
              : <li>You are not an admin of any project.</li>
            }
          </ul>
          <h4>As member:</h4>
          <ul>
            {(projects.member && projects.member.length > 0)
              ? projects.member.map(proj => (
                <ProjectCard key={proj.id} project={proj} />
              ))
              : <li>You are not a member of any project.</li>
            }
          </ul>
        </div>
      ) : !loading && <div>No projects found.</div>}
    </div>
  );
}





