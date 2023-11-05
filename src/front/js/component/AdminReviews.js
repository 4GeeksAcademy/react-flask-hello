import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const AdminReviews = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteReview = (reviewId) => {
    actions.deleteReview(reviewId);
    window.location.reload();
  };

  return (
    <div className='admin-review-content' >
      <h2 className='text-center'>Lista de reseñas:</h2>
      <div className="table-responsive" style={{ width: '100%', margin: '0 auto' }}>
        <table className='table'>
          <thead>
            <tr>
              <th className='th-id'>ID</th>
              <th className='th-title th-general'>Título de la reseña</th>
              <th className='th-comment th-general'>Comentario</th>
              <th className='th-actions' >Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.reviews.map((review) => (
              <tr className='infos-contain' key={review.id}>
                <td>{review.id}</td>
                <td>{review.title}</td>
                <td>{review.comment_text}</td>
                <td className='text-center'>
                  <button style={{ background: 'red', color: 'white', border: ' 2px solid white', padding: '2px 3px' }} onClick={() => handleDeleteReview(review.id)}>&#10008;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
