import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import { Context } from "../store/appContext";

export const Footer = () => {
  const { store, actions } = useContext(Context);

  return (
    <div id="whole-wheat-footer" className="d-flex flex-column">
      <div id="newsletter">
        <div className="row">
          <div className="col-md-12">
            <div className="bg-transparent p-3">
              <h3 className="text-center mb-4">Join Our Newsletter</h3>
              <p className="text-center">
                Stay updated with our latest recipes, nutrition tips, and
                special offers.
              </p>
              <form className="row g-2">
                <div className="col-md-5">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Your Email Address"
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="name"
                    className="form-control"
                    id="nameInput"
                    placeholder="Your Name Please"
                  />
                </div>
                <div className="col-md-3">
                  {/* LINK */}
                  <button type="submit" className="btn btn-success w-100">
                    Join Here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer id="footer" className="mt-auto py-3 text-center">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to={store.user ? "/profile" : "/"}>
              NourishNav
            </Link>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/features">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Recipe">
                    Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">
                    Menu
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/favorites">
                        Favorites
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/metrics">
                        Metrics
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Log-in
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </footer>
    </div>
  );
};
