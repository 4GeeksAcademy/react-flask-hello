import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import LoginHeroImage from "../../img/pitch/overlay/login-hero-overlay.png";

const BACKEND_URL = process.env.BACKEND_URL;

export const LoginForm = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  console.log("This is your token " + store.token);

  const handleLogin = () => {
    actions.login(email, password);
  };

  if (store.token && store.token !== "" && store.token !== undefined) navigate("/");

  return (
    <div className="container-fluid py-5 h-100" style={{ backgroundImage: `url(${LoginHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card login-card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            {/* Conditional rendering based on token */}
            <div>
              {store.token && store.token !== "" & store.token !== undefined ? (
                // If logged in
                "You are already logged in with this token " + store.token
              ) : (
                // If not logged in
                <div className="card-body p-5 text-center">
                  <h2 className="mb-5">Sign In To Your Account</h2>

                  {/* Email Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* Remember Password Checkbox */}
                  <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label mx-3" htmlFor="form1Example3">
                      Remember password
                    </label>
                  </div>

                  {/* Login Button */}
                  <button
                    className="btn btn-primary custom-btn btn-lg btn-block"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <hr className="my-4" />

                  {/* Registration Link */}
                  <div>
                    <p>Don't have an account? Sign up now!</p>

                    {/* Register Button */}
                    <Link to="/sign-up" className="btn btn-primary custom-btn btn-lg btn-block mt-2">
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
