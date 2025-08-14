// src/front/components/LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabaseClient";
import { notifySuccess, notifyError } from "../utils/Notifications";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        notifyError("Error cerrando sesión en Supabase");
        console.error("Error cerrando sesión:", error);
        return;
      }

      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      notifySuccess("Sesión cerrada, ¡hasta pronto!");
      navigate("/login");
    } catch (err) {
      notifyError("Error inesperado al cerrar sesión");
      console.error("Error inesperado:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#eab308",
        padding: "0.5rem 0.35rem",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b11717ff")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eab308")}
    >
      Cerrar sesión
    </button>
  );
};

