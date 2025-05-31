import React from 'react';

export const BackendURL = () => {
  return (
    <div style={{
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '600px',
      border: '2px solid red',
      borderRadius: '8px',
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#ffeeee'
    }}>
      ⚠️ Por favor configura la variable <code>VITE_BACKEND_URL</code> en tu archivo <code>.env</code> para que la aplicación funcione correctamente.
    </div>
  );
};
