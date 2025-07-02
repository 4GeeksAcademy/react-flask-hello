import React from "react";
import logo from "../assets/img/SVG/logo_v4.svg";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";


export const AppNavbar = () => {
  const { store, dispatch } = useGlobalReducer(); // verificar si tiene token de acceso
  console.log(store.user);
  const navigate = useNavigate();

  let profileColor = (store.user && store.user.random_profile_color)
    ? store.profile_colors[store.user.random_profile_color]
    : "green";

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };


  return (
    <div className="container-fluid mx-5 py-1">
      <a className="navbar-brand d-flex align-items-center text-white" href="/">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "7rem", height: "7rem" }}
          className="d-inline-block mx-2 "
        />
        EchoBoard
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!store.token && (
          <Link to="login" className="shadow-lg ms-auto ">
            <button
              className="btn text-white"
              style={{ background: "var(--green-500)" }}
            >
              LogIn
            </button>
          </Link>
        )}

        {store.token && (
          <div className="dropdown-center ms-auto me-2">
            <button
              className="ms-auto text-white rounded-circle portrait flex-center"
              type="button"
              data-bs-toggle="dropdown"
              style={{
                height: "5vh",
                position: "relative",
                backgroundColor: `var(--${profileColor}-500)`,
              }}
            >
              {" "}
              {store.user.full_name[0]}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item text-danger text-end "
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
