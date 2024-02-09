// Navbar.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import "../../styles/navbar.css";
import logoOrange from "../../img/logoOrange.png";
import Login from "./login";
import { Context } from "../store/appContext";

export const Navbar = () => {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const offcanvasRef = useRef(null);
  const location = useLocation();
  const openLogin = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (searchParams.get("openLogin"))
      openLoginModal();
  }, [searchParams]);

  const openLoginModal = () => {
    setTimeout(() => {
      setIsLoginOpen(true);
    }, 1);
  };

  const closeLoginModal = () => setIsLoginOpen(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL +'/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${store.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
        console.log(response)
        actions.setIsLoggedIn(false)
        window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar fixed-top p-0">
        <div className="container-fluid p-1">
          <a className="navbar-brand" href="/">
            <img src={logoOrange} alt="Logo" />
          </a>

          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <div
            className="offcanvas offcanvas-end "
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            ref={offcanvasRef}
          >
            <div className="offcanvas-header ">
              <h5 className="offcanvas-title " id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-black"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body bg-dark">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={() => {
                    const offcanvas = offcanvasRef.current;
                    if (offcanvas) {
                      offcanvas.classList.remove("show");
                      const backdrop = document.querySelector(".offcanvas-backdrop");
                      if (backdrop) {
                        backdrop.classList.remove("show");
                      }
                      const overlay = document.querySelector(".modal-overlay");
                      if (overlay) {
                        overlay.remove()
                      }
                    }
                  }}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {store.isLoggedIn ? (
                    <Link className="nav-link" to="#" onClick={() => {
                      handleLogout();
                      const offcanvas = offcanvasRef.current;
                      if (offcanvas) {
                        offcanvas.classList.remove("show");
                        const backdrop = document.querySelector(".offcanvas-backdrop");
                        if (backdrop) {
                          backdrop.classList.remove("show");
                        }
                        const overlay = document.querySelector(".modal-overlay");
                        if (overlay) {
                          overlay.remove()
                        }
                      }
                    }}>
                      Logout
                    </Link>
                  ) : (
                    <Link className="nav-link" to="#" onClick={() => {
                      openLoginModal();
                      const offcanvas = offcanvasRef.current;
                      if (offcanvas) {
                        offcanvas.classList.remove("show");
                        const backdrop = document.querySelector(".offcanvas-backdrop");
                        if (backdrop) {
                          backdrop.classList.remove("show");
                        }
                        const overlay = document.querySelector(".modal-overlay");
                        if (overlay) {
                          overlay.remove()
                        }
                      }
                    }}>
                      Login
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={() => {
                    const offcanvas = offcanvasRef.current;
                    if (offcanvas) {
                      offcanvas.classList.remove("show");
                      const backdrop = document.querySelector(".offcanvas-backdrop");
                      if (backdrop) {
                        backdrop.classList.remove("show");
                      }
                      const overlay = document.querySelector(".modal-overlay");
                      if (overlay) {
                        overlay.remove()
                      }
                    }
                  }}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Login show={isLoginOpen} handleClose={closeLoginModal} />
      </nav>
    </>
  );
};
