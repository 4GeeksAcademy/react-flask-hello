import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "error", payload: null }); // clear errors

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: "error", payload: data.msg });
        return;
      }

      // Save token in localStorage (for persistence)
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update store
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: data.user, token: data.access_token } });
      navigate("/dashboard");
    } catch (err) {
      dispatch({ type: "error", payload: "Error de conexión con el servidor" });
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
        >
          Ingresar
        </button>
      </form>
      {store.error && <p className="text-red-500 mt-3">{store.error}</p>}
    </div>
  );
}

