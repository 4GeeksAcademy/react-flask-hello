import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form.jsx";

const Register = () => {
  const navigate = useNavigate();

  const handleSignup = async ({ email, password, setErrorMsn }) => {
    setErrorMsn(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsn(data.msg || "Error en el registro");
        console.error(data.msg || "Error en el registro");
        return;
      }

      navigate("/login", {
        state: { successMessage: "Registro exitoso. Ahora puedes iniciar sesión." },
      });
    } catch (error) {
      setErrorMsn("Error al conectar con el servidor");
      console.error("Error al conectar con el servidor", error);
    }
  };

  return (
    <div className="register-page">
      <Form mode="register" onSubmit={handleSignup} />
    </div>
  );
};

export default Register;