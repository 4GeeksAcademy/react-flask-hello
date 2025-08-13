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
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Enviar email
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};
