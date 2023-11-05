import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

const Login = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();




  return (
    <div className="container my-5">
      {
        !!store.currentUser ? (
          <>
            <h1><strong>Bienvenido:</strong></h1>
            <h1>{store.currentUser?.user?.email}</h1>
          </>
        ) : (
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              actions.handleSubmitLogin(e, navigate)
            }}
          >
            <div className="container">
              <label htmlFor="logForm" className="text-dark">
                Email
              </label>
              <input
                type="email"
                className="form-control m-3"
                id="correo"
                placeholder="Email"
                name="email"
                value={store.email}
                onChange={(e) => actions.handleChangeLogin(e)}
                autoComplete="off"
              />
            </div>
            <div className="container">
              <label htmlFor="inputPassword2" className=" text-dark">
                Password
              </label>
              <input
                type="password"
                className="form-control m-3"
                id="inputPassword2"
                placeholder="Password"
                name="password"
                value={store.password}
                onChange={(e) => actions.handleChangeLogin(e)}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary ">
                Iniciar Sesión
              </button>
            </div>
          </form>
        )
      }
    </div>

  )
}

export default Login