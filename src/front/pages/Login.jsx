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
    <div className="container mx-auto vh-70 px-4 md:px-8">
      <div className="bg-white p-3">
        <h2 className="text-xl font-bold mb-5 text-dark">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col row gap-3">
          <div className="col-12">
            <label className="form-label text-dark">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="form-control border py-2 rounded"
            />
          </div>
          <div className="col-12">
            <label className="form-label text-dark">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="form-control border py-2 rounded"
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button
              type="submit"
              className="bg-blue-500 text-white mt-5 py-2 px-5 rounded"
              style={{ minWidth: "200px" }}
            >
              Ingresar
            </button>
          </div>
        </form>
        {store.error && <p className="text-red-500 mt-3">{store.error}</p>}
      </div>
    </div>
  );
}

