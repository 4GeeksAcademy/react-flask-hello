import React from 'react';

function SuccessModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content bg-light p-4 rounded">
        <h2 className="text-success mb-3">¡Éxito!</h2>
        <p className="mb-3">El evento ha sido creado exitosamente.</p>
        <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default SuccessModal;
