import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient.js';
import { backendUrl } from '../utils/Config';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { notifyError, notifySuccess } from '../utils/Notifications';

export const Login = () => {
  const navigate = useNavigate();
  const [datosLogin, setDatosLogin] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setDatosLogin({
      ...datosLogin,
      [e.target.name]: e.target.value
    });
  };

  // Redirección automática si ya hay sesión iniciada o token guardado
  useEffect(() => {
    // Caso 1: Token de tu backend en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
      return;
    }

    // Caso 2: Sesión activa en Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/home');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/home');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(backendUrl + "user/signin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLogin)
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        // Guardar userId y token en localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("token", data.token || "");

        notifySuccess("Bienvenido de nuevo!");
        navigate('/home');
      } else {
        notifyError(data.error || 'Error en el inicio de sesión, revisa tus datos');
      }
    } catch (error) {
      notifyError('Error de red o servidor');
      console.error('Error en fetch:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/fondo_login.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          LOGIN EN <span style={{ color: '#facc15' }}>KNECT</span>
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={datosLogin.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem'
            }}
          />

          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={datosLogin.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem'
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={e => e.preventDefault()}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: '#000'
              }}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <EyeSlashIcon style={{ width: 20, height: 20 }} />
              ) : (
                <EyeIcon style={{ width: 20, height: 20 }} />
              )}
            </button>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#facc15',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#097a1cff')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#facc15')}
          >
            Iniciar sesión
          </button>

          <div style={{ marginTop: '1rem' }}>
            <Link to="/forgot" style={{ color: '#fa3715ff', textDecoration: 'underline' }}>
              ¿Olvidaste tu contraseña? Pincha aqui!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

