import React from 'react';

function ErrorModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Error</h2>
        <p>Hubo un problema al crear el evento. Por favor, intenta de nuevo.</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ErrorModal;