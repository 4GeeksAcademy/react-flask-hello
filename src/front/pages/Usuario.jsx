import { useNavigate } from "react-router-dom";
import { UserRoleSelector } from "../components/UserRoleSelector"; // ✅ Importamos el selector de rol
import { User } from "../components/User"

export const Usuario = () => {
  const navigate = useNavigate();

  const rutaVistaHome = () => {
    navigate("/vistahome");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Panel de Usuario</h1>

      {/* El rolesito */}
      <div className="w-full max-w-xs">
        <User />
      </div>

      {/* Botón para ir a la VistaHome */}
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow"
        onClick={rutaVistaHome}
      >
        Ir a Home
      </button>
    </div>
  );
};