import React from 'react';

function SuccessModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content bg-light p-4 rounded">
        <h2 className="text-success mb-3">Success!</h2>
        <p className="mb-3">The event has been created successfully.</p>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SuccessModal;
