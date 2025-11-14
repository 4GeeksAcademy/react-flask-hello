import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../components/Form.jsx";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const handleLogin = async ({ email, password, setErrorMsn }) => {
    setErrorMsn(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsn(data.msg || "Error en el inicio de sesión");
        console.error(data.msg || "Error en el inicio de sesión");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/dashboard", {
        state: { successMessage: "Inicio de sesión exitoso" },
      });
    } catch (error) {
      setErrorMsn("Error al conectar con el servidor");
      console.error("Error al conectar con el servidor", error);
    }
  };

  return <Form mode="login" onSubmit={handleLogin} successMessage={successMessage} />;
};

export default Login;