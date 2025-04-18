import { useEffect, useState } from "react";
import "./Styles/theme.css";


 function ThemeChange() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <nav className="px-6 py-4 shadow-md" style={{ backgroundColor: "var(--card)" }}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold" style={{ color: "var(--primary)" }}>AppMatch</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
          </button>
        </div>
      </nav>

      <main className="p-6 space-y-6">
        <button
          className="px-4 py-2 rounded-lg shadow transition"
          style={{ backgroundColor: "var(--primary)", color: "white" }}
        >
          Buscar Proyectos
        </button>

        <input
          type="text"
          placeholder="¿Qué buscas?"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 placeholder-primary"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)"
          }}
        />

        <div
          className="p-4 rounded-lg shadow"
          style={{ backgroundColor: "var(--card)", color: "var(--text)", borderColor: "var(--border)" }}
        >
          <h2 className="text-lg font-semibold">Recomendado para ti</h2>
          <p style={{ color: "var(--primary)" }}>Diseñador UX + Frontend</p>
        </div>
      </main>
    </div>
  );
}

export default ThemeChange;