import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "../api/auth";
import { useStore } from "../hooks/useGlobalReducer";
import AuthCard from "../components/AuthCard.jsx";
import SocialButton from "../components/SocialButton.jsx";

export default function Login() {
  const nav = useNavigate();
  const { actions } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!/\S+@\S+\.\S+/.test(email)) return setFormError("Email inválido");
    if (password.length < 6) return setFormError("Password mínimo 6 caracteres");
    const user = await apiLogin({ email, password });
    actions.login(user);
    nav("/"); // Home; desde nav podrá ir a Post a task / Browse / My tasks
  };

  return (
    <AuthCard title="Login to your account">
      <form onSubmit={submit} className="auth-form">
        <label className="auth-label">Email*</label>
        <input
          type="email"
          className="auth-input"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="auth-label">Password*</label>
        <input
          type="password"
          className="auth-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="captcha-mock">
          <div className="checkbox" />
          <span>I'm not a robot (placeholder)</span>
        </div>

        {formError && <div className="auth-error" style={{ marginTop: 4 }}>{formError}</div>}

        <button type="submit" className="auth-btn-primary">Continue</button>

        <p className="auth-muted">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>

        <div className="auth-or">OR</div>

        <SocialButton
          icon="🟡"
          label="Login with Google"
          onClick={() => alert("Mock Google Sign-in")}
        />
        <SocialButton
          icon="⚫"
          label="Login with Facebook"
          onClick={() => alert("Mock Facebook Login")}
        />
      </form>
    </AuthCard>
  );
}