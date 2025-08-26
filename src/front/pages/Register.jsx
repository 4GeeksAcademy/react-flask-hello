import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../api/auth";
import { useStore } from "../hooks/useGlobalReducer";
import AuthCard from "../components/AuthCard.jsx";
import SocialButton from "../components/SocialButton.jsx";

export default function Register() {
  const nav = useNavigate();
  const { actions } = useStore();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Requerido";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // Rol implícito: backend permitirá publicar y ofertar; aquí no se elige.
    const user = await apiRegister({ ...form, role: "client" });
    actions.login(user);
    nav("/"); // a Home; desde ahí el usuario puede publicar u ofertar
  };

  return (
    <AuthCard title="Sign up to Tasky">
      <form onSubmit={submit} className="auth-form">
        <label className="auth-label">Full name*</label>
        <input
          className={`auth-input ${errors.name ? "has-error" : ""}`}
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <div className="auth-error">{errors.name}</div>}

        <label className="auth-label">Email*</label>
        <input
          type="email"
          className={`auth-input ${errors.email ? "has-error" : ""}`}
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <div className="auth-error">{errors.email}</div>}

        <label className="auth-label">Password*</label>
        <input
          type="password"
          className={`auth-input ${errors.password ? "has-error" : ""}`}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <div className="auth-error">{errors.password}</div>}

        <div className="captcha-mock">
          <div className="checkbox" />
          <span>I'm not a robot (placeholder)</span>
        </div>

        <button type="submit" className="auth-btn-primary">Sign up</button>

        <p className="auth-muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <div className="auth-or">OR</div>

        <SocialButton
          icon="🟡"
          label="Continue with Google"
          onClick={() => alert("Mock Google Sign-in")}
        />
        <SocialButton
          icon="⚫"
          label="Continue with Facebook"
          onClick={() => alert("Mock Facebook Login")}
        />
      </form>
    </AuthCard>
  );
}