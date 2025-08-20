import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backendUrl } from '../utils/Config';
import { notifySuccess } from '../utils/Notifications';


export const Reset = () => {
  const [newPassword, setNewPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  let { resetPassword, email } = useParams();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    try {

      const res = await fetch(backendUrl + "user/reset", {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: resetPassword, new_password: newPassword, email: email }),
      });
      const data = await res.json();

      if (res.ok) {
        notifySuccess('Contraseña actualizada correctamente. Puedes iniciar sesión.');
        navigate('/login')
      } else {
        setMensaje(data.error || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      setMensaje('Error de red o servidor.');
    }
  };

  useEffect(() => {
    if (!resetPassword) setMensaje('Token no válido o no proporcionado en la URL.');
  }, [resetPassword]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Restablecer Contraseña</h2>
      {mensaje && <p>{mensaje}</p>}
      {resetPassword && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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