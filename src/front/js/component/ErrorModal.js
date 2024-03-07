import React from 'react';

function ErrorModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Error</h2>
        <p>There was a problem creating the event. Please try again.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ErrorModal;