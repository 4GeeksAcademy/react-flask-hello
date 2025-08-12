import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { backendUrl } from '../utils/Config';


export const Reset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token') || ''; // token que viene en la URL
  const [newPassword, setNewPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {

      const res = await fetch( backendUrl + "user/reset", {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: token, new_password: newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje('Contraseña actualizada correctamente. Puedes iniciar sesión.');
      } else {
        setMensaje(data.error || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      setMensaje('Error de red o servidor.');
    }
  };

  useEffect(() => {
    if (!token) setMensaje('Token no válido o no proporcionado en la URL.');
  }, [token]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Restablecer Contraseña</h2>
      {mensaje && <p>{mensaje}</p>}
      {token && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>
            Cambiar contraseña
          </button>
        </form>
      )}
    </div>
  );
};
