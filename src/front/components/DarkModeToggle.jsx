import React, { useState, useEffect } from "react";

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
      onClick={() => setDarkMode(!darkMode)}
      className="cta-button"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        fontSize: "0.85rem"
      }}
    >
      {darkMode ? "Modo claro ☀️" : "Modo oscuro 🌙"}
    </button>
  );
};

export default DarkModeToggle;
