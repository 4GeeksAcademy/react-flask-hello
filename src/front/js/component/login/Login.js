import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

const Login = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-center text-black mb-5 ">Books Market</h1>
      <div className="border rounded shadow mb-5 p-4" style={{ width: "400px" }}>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            actions.handleSubmitLogin(e, navigate)
          }}
        >
          <div className="mb-3">
            <label htmlFor="correo" className="form-label text-dark">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="Email"
              name="email"
              value={store.email}
              onChange={(e) => actions.handleChangeLogin(e)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword2" className="form-label text-dark">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              placeholder="Password"
              name="password"
              value={store.password}
              onChange={(e) => actions.handleChangeLogin(e)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Iniciar Sesión
            </button>
          </div>
          <div className="text-center mt-2">
            <Link to="/register">Registrarse</Link>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login