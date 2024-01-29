import React from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <div className="container-full py-5 h-100 grey-background">
      <div className="login row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card custom-card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5">

              {/* Header */}
              <h2 className="mb-5">Welcome Back!</h2>

              {/* Email Input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="typeEmailX-2"
                  className="form-control form-control-lg"
                  placeholder="Email"
                />
              </div>

              {/* Password Input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="typePasswordX-2"
                  className="form-control form-control-lg"
                  placeholder="Password"
                />
              </div>

              {/* Remember Password and Login Button */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    Remember password
                  </label>
                </div>

                {/* Login Button (centered) */}
                <button
                  className="btn btn-primary custom-btn"
                  type="submit"
                >
                  Login
                </button>
              </div>

              {/* Spacer */}
              <hr className="my-4" />

              {/* Sign Up Button */}
              <div className="text-center">
                <p>Don't have an account? <Link to="/sign-up">Sign up now!</Link></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
