import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserRoleSelector = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (role) {
      navigate("/vistahome");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg-concierto.jpg')", // asegúrate de que esté en public/
      }}
    >
      <div className="bg-black/70 p-10 rounded-xl shadow-2xl w-full max-w-md text-center text-white">
        <h1 className="text-3xl font-bold mb-6 leading-tight">
          Bienvenido al <br />
          <span className="text-yellow-400">Panel de Usuario</span>
        </h1>

        <label htmlFor="role" className="block mb-2 text-lg">
          Selecciona tu rol:
        </label>

        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 rounded-md text-black focus:outline-none"
        >
          <option value="">-- Elige qué rol serás --</option>
          <option value="admin">Administrador/a</option>
          <option value="organizer">Organizador/a</option>
          <option value="user">Usuario/a</option>
        </select>

        <button
          onClick={handleNavigate}
          className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Ir a VistaHome
        </button>
      </div>
    </div>
  );
};
