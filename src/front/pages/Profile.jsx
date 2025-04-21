import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No hay token disponible. Por favor, inicia sesión.");
        return;
      }

      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/perfil", {
          headers: { Authorization: "Bearer " + token },
        });

        const data = await resp.json();

        if (resp.ok) {
          dispatch({ type: "set_user", payload: data });
        } else {
          alert(data.msg || "Token inválido o expirado");
        }
      } catch (err) {
        console.error("Error obteniendo el perfil:", err);
      }
    };

    getUserData();
  }, []);

  if (!store.user) return <p>Cargando perfil...</p>;

  return (
    <div className="container">
      <h1>Bienvenido, {store.user.username}</h1>
      <p>Email: {store.user.email}</p>
    </div>
  );
};
