import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Make sure to import your context

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-full nav-container">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom d-flex justify-content-between px-5">

        {/* Site Logo */}
        <div className="site-logo">
          <Link to="/" className="navbar-brand">
            Our Logo
          </Link>
        </div>

        {/* Nav Links */}

        <div className="nav-items">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">

              {/* Home Link */}
              
              <li className="nav-item active mx-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              {/* Events Link */}

              <li className="nav-item mx-3">
                <Link to="/events" className="nav-link">
                  Events
                </Link>
              </li>

              {/* Contact Link */}

              <li className="nav-item mx-3">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>

              {/* Event Single Link */}
              <li className="nav-item mx-3">
                <Link to="/single" className="nav-link">
                  Single Event
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Nav Buttons */}
        <div className="nav-buttons d-flex">
          <div>

          {/* Create Event Button */}
          { !store.token ? 
          <div></div>

          :
          <Link to="/create-event">
            <button className="btn btn-primary custom-btn" id="signUpBtn">
              Create Event
            </button>
          </Link> 
          }
          </div>


          {/* Log In Button */}

          <div>
            { !store.token ? 
              <Link to="/login">
                <button className="btn btn-secondary custom-btn-dark ml-3" id="logInBtn">
                  Log In
                </button>
              </Link>
              :
              <Link to="/">
                <button onClick={() => actions.logout() } className="btn btn-secondary custom-btn-dark ml-3" id="logInBtn">
                  Log Out
                </button>
              </Link>
            }
          </div>

        </div>
      </nav>
    </div>
  );
};
