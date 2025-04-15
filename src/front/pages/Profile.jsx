import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
        headers: { Authorization: "Bearer " + token }
      });
      const data = await resp.json();
      if (resp.ok) {
        dispatch({ type: "set_user", payload: data.user });
      } else {
        alert("Token inválido o expirado");
      }
    };

    getUserData();
  }, []);

  return (
    <div className="container">
      <h1>Bienvenido, {store.user?.email}</h1>
      <p>¡Has iniciado sesión correctamente!</p>
    </div>
  );
};