import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pet, setPet] = useState(""); // Add this missing state variable
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          favorite_pet: pet // Add this to match your backend
        })
      });

      if (response.ok) {
        navigate("/login", { state: { justSignedUp: true } });
      } else {
        const data = await response.json().catch(() => ({}));
        setErr(data.msg || "Signup failed");
      }
    } catch (error) {
      setErr("Unable to create account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Main */}
      <main className="container flex-grow-1 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card shadow-sm border-0">
              <div className="row g-0">
                {/* Left image */}
                <div className="col-md-5">
                  <img
                    src="https://picsum.photos/id/1070/800/600"
                    alt="Welcome"
                    className="img-fluid h-100 w-100 object-fit-cover rounded-start"
                    style={{ minHeight: 280 }}
                  />
                </div>
                {/* Right: form */}
                <div className="col-md-7">
                  <div className="card-body">
                    <h1 className="h4 mb-2">Create your account</h1>
                    <p className="text-muted mb-3">
                      Join us to manage your listings and bookings.
                    </p>

                    {err && (
                      <div className="alert alert-danger" role="alert">
                        {err}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">
                          Email
                        </label>
                        <input
                          id="signupEmail"
                          className="form-control"
                          type="email"
                          value={email}
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            id="signupPassword"
                            className="form-control"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            autoComplete="new-password"
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

                      <div className="mb-3">
                        <label htmlFor="signupPet" className="form-label">
                          Favorite Pet (for password recovery)
                        </label>
                        <input
                          id="signupPet"
                          className="form-control"
                          type="text"
                          value={pet}
                          onChange={(e) => setPet(e.target.value)}
                          required
                          placeholder="Enter your favorite pet"
                        />
                      </div>

                      <button
                        className="btn btn-primary w-100 mb-3"
                        type="submit"
                        disabled={busy}
                      >
                        {busy ? "Creating account..." : "Create account"}
                      </button>

                      <Link to="/" className="btn btn-outline-secondary w-100">
                        Go Back
                      </Link>
                    </form>

                    <hr className="my-4" />
                    <div className="text-center">
                      Already have an account? <Link to="/login">Log in</Link>
                    </div>
                  </div>
                </div>
                {/* /right */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};