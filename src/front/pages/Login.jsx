import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

async function apiLogin({ email, password }) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.msg || "Login failed");
  }
  return res.json();
}

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const justSignedUp = location.state?.justSignedUp;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const data = await apiLogin({ email, password });
      const jwt = data?.token || "";
      dispatch({ type: "set_jwt", payload: { jwt, user: data?.user } });
      const dest = location.state?.from ?? "/account";
      navigate(dest, { replace: true });
    } catch (error) {
      setErr(error?.message || "Unable to sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <main className="container flex-grow-1 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-5">
                  <img
                    src="https://picsum.photos/id/1069/800/600"
                    alt="Welcome"
                    className="img-fluid h-100 w-100 object-fit-cover rounded-start"
                    style={{ minHeight: 280 }}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <h1 className="h4 mb-2">Log in to your account</h1>
                    <p className="text-muted mb-3">
                      Access your listings, messages, and settings.
                    </p>
                    {justSignedUp && (
                      <div className="alert alert-success" role="alert">
                        Account created. Please log in.
                      </div>
                    )}
                    {err && (
                      <div className="alert alert-danger" role="alert">
                        {err}
                      </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">
                          Email
                        </label>
                        <input
                          id="loginEmail"
                          className="form-control"
                          type="email"
                          value={email}
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="loginPassword" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            id="loginPassword"
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                          />
                          <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                        <Link to="/forgot-password" className="small">
                          Forgot password?
                        </Link>
                      </div>
                      <button className="btn btn-primary w-100" type="submit" disabled={busy}>
                        {busy ? "Signing in..." : "Log in"}
                      </button>
                    </form>
                    <hr className="my-4" />
                    <div className="text-center">
                      New here? <Link to="/signup">Create an account</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
