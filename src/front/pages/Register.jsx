import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [datosRegistro, setDatosRegistro] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setDatosRegistro({
      ...datosRegistro,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('https://bookish-space-pancake-wrx9v5w7wv49c9vxw-3001.app.github.dev/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosRegistro)
      });

      const data = await respuesta.json();
      console.log('Respuesta backend:', data);

      if (respuesta.ok) {
        // Registro correcto, redirigir
        navigate('/home');
      } else {
        alert(data.error || 'Error al registrar, revisa tu email');
      }
    } catch (error) {
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
          REGISTRO EN <span style={{ color: '#facc15' }}>KNECT</span>
        </h2>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            value={datosRegistro.email}
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
            value={datosRegistro.password}
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
            Confirmar registro
          </button>
        </form>
      </div>
    </div>
  );
};
