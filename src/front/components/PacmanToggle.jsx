// src/front/components/PacmanToggle.jsx
import React, { useId } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import "./pacman-toggle.css";

export const PacmanToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const checked = theme === "light";
  const inputId = useId(); // ← genera un id único por instancia

  return (
    <div className="pacman-toggle" title={checked ? "Modo claro" : "Modo oscuro"}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={toggleTheme}
        aria-label="Cambiar tema"
      />
      <label htmlFor={inputId}>
        <span className="thumb"><span className="shine"></span></span>
      </label>
    </div>
  );
};
