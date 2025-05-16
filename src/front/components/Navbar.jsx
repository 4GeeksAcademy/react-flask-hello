import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoNavbar from "../assets/img/icono.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, dispatch } = useGlobalReducer();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "SET_TOKEN", payload: null });
    navigate("/signin");
  };

  return (
    <nav
      className="py-3"
      style={{
        background: "linear-gradient(to right, #1a0033, #330033)",
        color: "#ccc",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        fontFamily: "'Orbitron', sans-serif",
        boxShadow: "0 -2px 10px rgba(255, 0, 204, 0.3)",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo */}
        {location.pathname === "/" ? (
          <span
            style={{
              fontSize: "1.5rem",
              color: "#FF00FF",
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 8px #FF00FF",
            }}
          >
            Sip & Search
          </span>
        ) : (
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src={logoNavbar}
              alt="Logo"
              width="70"
              height="70"
              className="rounded-circle shadow-sm"
              style={{
                border: "2px solid #FF00FF",
                boxShadow: "0 0 10px #FF00FF",
                transition: "box-shadow 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px #FF00FF, 0 0 30px #FF00FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 10px #FF00FF";
              }}
            />
          </Link>
        )}

        {/* Controls */}
        <div className="d-flex align-items-center">
          {/* Back */}
          {location.pathname !== "/" && (
            <button
              onClick={() => navigate(-1)}
              className="bg-transparent border-0 me-3"
              style={{
                fontSize: "1.8rem",
                color: "#FF00FF",
                textShadow: "0 0 10px #FF00FF",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.target.style.textShadow = "0 0 20px #FF00FF, 0 0 30px #FF00FF")
              }
              onMouseLeave={(e) =>
                (e.target.style.textShadow = "0 0 10px #FF00FF")
              }
            >
              <i className="bi bi-arrow-left-circle-fill"></i>
            </button>
          )}

          {/* Sign In */}
          {!store.token && location.pathname !== "/signin" && (
            <Link
              to="/signin"
              className="btn me-2"
              style={{
                background: "#FF00FF",
                borderColor: "#FF00FF",
                color: "#fff",
                boxShadow: "0 0 8px #FF00FF",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow =
                  "0 0 12px #FF00FF, 0 0 24px #FF00FF, 0 0 36px #FF00FF")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 0 8px #FF00FF")
              }
            >
              Sign In
            </Link>
          )}

          {/* Sign Up */}
          {!store.token && location.pathname !== "/signup" && (
            <Link
              to="/signup"
              className="btn"
              style={{
                background: "#00AFFF",
                borderColor: "#00AFFF",
                color: "#fff",
                boxShadow: "0 0 8px #00AFFF",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow =
                  "0 0 12px #00AFFF, 0 0 24px #00AFFF, 0 0 36px #00AFFF")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 0 8px #00AFFF")
              }
            >
              Sign Up
            </Link>
          )}

          {/* Logout */}
          {store.token && (
            <button
              onClick={handleLogout}
              className="btn ms-2"
              style={{
                background: "#8800FF",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 0 8px #8800FF",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 0 16px #8800FF, 0 0 24px #8800FF")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 0 8px #8800FF")
              }
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
