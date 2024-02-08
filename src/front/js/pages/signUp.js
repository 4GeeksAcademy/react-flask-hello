import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { actions, store } = useContext(Context);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); // State to track repeatPassword visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password === repeatPassword) {
        await actions.signup(email, username, name, age, password);

        // Limpiar inputs
        setEmail("");
        setUsername("");
        setName("");
        setAge("");
        setPassword("");
        setRepeatPassword("");
      } else {
        alert("Password doesn't match");
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
    <div className="CrearCuenta container m-5">
      <h1 className="mb-3">Crear Cuenta</h1>
      <a>
        Bienvenido! Ingresa tus datos y comienza a disfrutar de increíbles
        películas y series{" "}
      </a>
      <form onSubmit={handleSubmit}>
        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-user"></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-user"></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Nombre de usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-id-card"></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Edad"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>

        <br />

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
            <span id="icon">
              <i
                className={
                  showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                }
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon">
              <i
                className={
                  showRepeatPassword
                    ? "fa-regular fa-eye-slash"
                    : "fa-regular fa-eye"
                }
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              ></i>
            </span>
            <input
              className="form-control inputCuenta"
              placeholder="Repetir contraseña"
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </label>
        </div>

        <br />

        <button type="submit" className="btn btnCrearCuenta">
          {" "}
          Crear Cuenta{" "}
        </button>
      </form>

      {store.message && <p className="error">{store.message}</p>}

      <div className="link">
        <a>
          Ya tienes una cuenta?{" "}
          <a className="linkIngresar" href="/login">
            Ingresa Aquí
          </a>{" "}
        </a>
      </div>
    </div>
  );
};
