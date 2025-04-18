import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';


const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(null); // null = aún cargando
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Validar token al cargar
  useEffect(() => {
    fetch(`https://special-space-halibut-r4pxpqgvpw75fpjx7-3001.app.github.dev/user/validate-reset-token/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error('Token inválido o caducado');
        return res.json();
      })
      .then(() => setTokenValid(true))
      .catch((err) => {
        console.error(err);
        setTokenValid(false);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://special-space-halibut-r4pxpqgvpw75fpjx7-3001.app.github.dev/user/reset-password/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Contraseña actualizada con éxito');
        setError(null);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.error || '❌ Algo salió mal');
        setMessage(null);
      }
    } catch (err) {
      console.error(err);
      setError('❌ Error al conectar con el servidor');
    }
  };

  if (tokenValid === null) return <p>⏳ Verificando enlace...</p>;
  if (tokenValid === false) return <p style={{ color: 'red' }}>❌ El enlace no es válido o ha caducado</p>;

  return (
    <div className="reset-password-container" style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>🔐 Nueva contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Escribe tu nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Actualizar contraseña</button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
