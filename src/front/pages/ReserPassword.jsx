import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://special-space-halibut-r4pxpqgvpw75fpjx7-3001.app.github.dev/user/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Contraseña actualizada con éxito');
        setError(null);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.error || '❌ Algo salió mal');
        setMessage(null);
      }
    } catch (err) {
      console.error(err);
      setError('❌ Error en la conexión');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>🔐 Nueva contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Escribe tu nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Actualizar contraseña</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
