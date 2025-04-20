import React, { useState, useEffect } from "react";
import "./DarkModeToggle.css"; // ✅ Importa el CSS separado

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const landing = document.querySelector(".landing-container");
    if (!landing) return;

    if (darkMode) {
      landing.classList.add("dark-mode");
    } else {
      landing.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      className={`dark-mode-toggle ${darkMode ? "dark" : "light"}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Modo claro ☀️" : "Modo oscuro 🌙"}
    </button>
  );
};

export default DarkModeToggle;
