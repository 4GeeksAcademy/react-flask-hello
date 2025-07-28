import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Login = () => {
  const { store,dispatch } = useGlobalReducer();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setSending(true);

    const resp = await fetch("https://animated-pancake-x5pjxq9vv4gj2ppgx-3001.app.github.dev/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await resp.json();
    localStorage.setItem("jwt_token", data.token);
    dispatch({
      type:"add_user",
      payload:data.user_serialize
    })

    if (resp.ok) {
      setMessage("¡Ingreso al campo exitoso!");
      
      setTimeout(() => navigate("/"), 2000); // o la ruta a tu "granja" principal

    } else {
      setError(data.msg || "¡Terreno resbaladizo! Error al iniciar sesión.");
      dispatch({
      type:"eliminar_user",
    })
      localStorage.removeItem('jwt_token');
    }

    setSending(false);

  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Siembra tu Acceso al Cereal</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Correo del sembrador"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña del arado"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={sending}>
          {sending ? "Arando..." : "¡Cosecha tu Acceso!"}
        </button>
      </form>

      <p style={styles.registerText}>
        ¿No tienes tu parcela?{" "}
        <Link to="/register" style={styles.link}>
          <button type="button" style={styles.registerButton}>
            ¡Registra tu Semilla!
          </button>
        </Link>
      </p>

      {message && <p style={{ ...styles.message, color: "#6d9f71" }}>{message}</p>} {/* Verde hoja */}
      {error && <p style={{ ...styles.message, color: "#c23b22" }}>{error}</p>} {/* Rojo tierra */}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
    backgroundColor: '#f8f8f0', // Crema suave como el cereal
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    color: '#a0522d', // Marrón tierra
    marginBottom: '30px',
    fontSize: '2.5em',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  form: {
    backgroundColor: '#fffbe6', // Blanco hueso, como grano recién cosechado
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #dcdcdc', // Borde suave
  },
  input: {
    padding: '12px 15px',
    border: '1px solid #b8a68c', // Borde de color paja
    borderRadius: '8px',
    fontSize: '1em',
    backgroundColor: '#ffffff',
    color: '#4a4a4a',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    backgroundColor: '#ffeb3b', // Amarillo brillante, como el sol o el cereal
    color: '#6b4e2f', // Marrón oscuro para el texto
    padding: '14px 25px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  registerText: {
    marginTop: '25px',
    color: '#555', // Gris neutro
    fontSize: '1em',
  },
  link: {
    textDecoration: 'none',
  },
  registerButton: {
    backgroundColor: '#8bc34a', // Verde campo
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginLeft: '10px',
  },
  message: {
    marginTop: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
};