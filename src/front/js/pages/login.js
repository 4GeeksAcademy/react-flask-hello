import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (await actions.login(email, password)) {
        navigate("/profile");
        // Limpiar inputs
        setEmail("");
        setPassword("");
      } else {
        alert("Data doesn't match");
        setEmail("");
        setPassword("");
      }

      // Accede al mensaje del estado global y muestra el mensaje si existe
      if (store.message) {
        console.log("Mensaje del estado global:", store.message);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="container-fluid CrearCuenta vh-100">
      <h1 className="mb-3">Ingresar</h1>
      <a>
        Bienvenido de nuevo! Ingresa tus datos y vuelve a disfrutar de tus películas y series{" "}
      </a>
      <form onSubmit={handleSubmit}>
        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon" onClick={() => setShowPassword(!showPassword)}>
              <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"} // Show/hide password based on state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <br />

        <button
          type="submit"
          className="btn btnCrearCuenta"
          onClick={handleSubmit}
        >
          {" "}
          Ingresar{" "}
        </button>
      </form>

      <div className="link">
        <p>
          <a>Aun no tienes una cuenta?</a>
          <a className="linkIngresar" href="/signUp">
            {" "}
            Registrate{" "}
          </a>
        </p>
      </div>
    </div>
  );
};
