import React, { useState } from 'react';

export const MovieReviewForm = ({ onCancel, onConfirm }) => {
  const [review, setReview] = useState('');

  //funcion q despliegue una alerta
  const handleCancel = () => {
    if (window.confirm('¿Estás seguro que deseas cancelar la reseña?'))
      onCancel();
  };

  //enviar el formulario
  const handleConfirm = () => {
    onConfirm(review);
    setReview('');
  };

  return (
    <div className="container-md">
      <form className="detailsBio">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="form-control"
          placeholder="Escribe tu reseña aquí..."
        />
        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
          <button type="button" className="btn btn-custom-purple border border-0 m-2" onClick={handleConfirm}>Confirmar</button>
        </div>
      </form>
    </div>
  );
};