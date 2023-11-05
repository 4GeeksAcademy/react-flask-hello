import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const SignupKeeper = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  async function signupKeeper(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const password = data.get("password");
    const hourly_pay = data.get("hourly_pay");
    const { signupKeeper } = actions;
    let resp = await signupKeeper(
      first_name,
      last_name,
      email,
      password,
      hourly_pay
    );
    console.log(resp);
    navigate("/login");
  }
  return (
    <div id="signup-page" className="text-center">
      <div className="container wrap-loginSignup">
        <i id="cat-suit" className="fa-solid fa-cat"></i>
        <h1>Bienvenido Cuidador</h1>
        <form className="pe-3" onSubmit={signupKeeper}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="inputName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="inputLastName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="inputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="inputPassword1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPayment" className="form-label">
              Hourly Pay
            </label>
            <input
              type="text"
              className="form-control"
              name="hourly_pay"
              id="inputPayment"
            />
          </div>
          <button id="btn-signup" type="submit" className="btn">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
SignupKeeper.propTypes = {
  match: PropTypes.object,
};
