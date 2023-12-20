import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Cambiado a `useNavigate`

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  // Utiliza `useNavigate` en lugar de `useHistory`
  const navigate = useNavigate();

  const handleLogin = () => {
    setUsuario("");
    setContraseña("");
    setError("");

    console.log("Usuario:", usuario, "Contraseña:", contraseña);

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: usuario,
        password: contraseña,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email y/o contraseña son incorrectos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        if (data.access_token) {
          console.log("Usuario encontrado");

          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.access_token))
          // Utiliza `navigate` para redirigir a la página principal después del inicio de sesión
          navigate("/");
        }
      })
      .catch((error) => {
        setError("Email y/o contraseña son incorrectos");
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div
        className="col-md-5 offset-md-3 max-width-form text-center"
        style={{
          border: "1px solid #616161",
          borderRadius: "10px",
          background: "#D1EFEA",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#CCCCCC", // Agregado para establecer el fondo gris
          boxShadow: "0 0 70px #000",
        }}
      >
        <h2
          style={{
            fontFamily: "fantasy",
            color: "#001F3F",
            marginTop: "5px",
            boxShadow: "initial",
          }}
        >
          Iniciar sesión
        </h2>
        <form>
          <div className="mb-6 mt-3">
            <label htmlFor="usuario mt-5" className="form-label">
              <strong>Correo:</strong>
            </label>
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={{ border: "1px solid #000000" }}
            />
          </div>
          <div className="mb-6 mt-3">
            <label htmlFor="contraseña mt-5" className="form-label">
              <strong>Contraseña:</strong>
            </label>
            <input
              type="password"
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              style={{ border: "1px solid #000000" }}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>

            <button
              type="button"
              className="btn btn-primary mt-5"
              style={{ width: "40%" }}
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>

            <Link to="/Home">
              <button
                type="button"
                className="btn btn-danger mt-5"
                onClick={() => window.close()}
              >
                Cerrar
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Login };
