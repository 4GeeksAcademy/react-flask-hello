import React, { useState } from 'react';
import { backendUrl } from '../utils/Config';


export const Forgot = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch( backendUrl + "user/forgot", {

     
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setMensaje(`Email enviado a ${email}. Revisa tu bandeja de entrada.`);
      } else {
        setMensaje(data.error || 'Error enviando el email.');
      }
    } catch (error) {
      setMensaje('Error de red o servidor.');
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
       }}>
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
      <h2
      style={{
      fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 'bold' 
      }}>
      Recupera tu contraseña
      </h2>


      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1rem',
            marginBottom: '1rem',

          }}
        />
        <button
         type="submit"
         style={{ 
            padding: '8px 16px',
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

         }}>
          Enviar email
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
    </div>
  );
};
