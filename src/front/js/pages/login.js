import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    //Si hay una sesion iniciada andate a la pagina demo
    if (store.accessToken) {
      navigate("/home");
    }
  }, [store.accessToken]);

  async function login(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const { login } = actions;
    let resp = await login(email, password);
    console.log(resp);
  }
  return (
    <div id="login-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h2>Login</h2>
        <form className="pe-3" onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="inputPassword"
            />
          </div>
          <button id="btn-login" type="submit" className="btn">
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
};
