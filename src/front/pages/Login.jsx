import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient.js';

export const Login = () => {
  const navigate = useNavigate();
  const [datosLogin, setDatosLogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setDatosLogin({
      ...datosLogin,
      [e.target.name]: e.target.value
    });
  };

  // Redirección automática si ya hay sesión iniciada a /vistahome
  useEffect(() => {
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
      const respuesta = await fetch('https://bookish-space-pancake-wrx9v5w7wv49c9vxw-3001.app.github.dev/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLogin)
      });
      const data = await respuesta.json();
      if (respuesta.ok) {
        navigate('/home');
      } else {
        alert(data.error || 'Error en el inicio de sesión, revisa tus datos');
      }
    } catch (error) {
      console.error('Error en fetch:', error);
      alert('Error de red o servidor');
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

          <input
            type="password"
            name="password"
            value={datosLogin.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem'
            }}
          />

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
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eab308')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#facc15')}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
