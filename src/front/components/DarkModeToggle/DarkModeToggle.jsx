import React, { useState, useEffect } from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const root = document.body;

    if (darkMode) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      className={`dark-mode-toggle ${darkMode ? "dark" : "light"}`}
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? "Modo claro ☀️" : "Modo oscuro 🌙"}
    </button>
  );
};

export default DarkModeToggle;
