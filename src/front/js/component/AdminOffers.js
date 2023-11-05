import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const AdminOffers = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteOffer = (offerId) => {
    actions.deleteOfferById(offerId);
    window.location.reload();
  };

  return (
    <div className='admin-business-content'>
      <h2 className='text-center'>Lista de ofertas:</h2>
      <div className="table-responsive" style={{ width: '100%', margin: '0 auto' }}>
        <table className='table'>
          <thead>
            <tr>
              <th className='th-id'>ID</th>
              <th className='th-general'>Título de la oferta</th>
              <th className='th-general'>Descripción</th>
              <th className='th-general'>País</th>
              <th className='th-general'>Ciudad</th>
              <th className='th-general'>Precio</th>
              <th className='th-actions'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.offers.map((offer) => (
              <tr className='infos-contain' key={offer.id}>
                <td>{offer.id}</td>
                <td>{offer.offer_title}</td>
                <td className='td-desc'>{offer.offer_description}</td>
                <td>{offer.country}</td>
                <td>{offer.city}</td>
                <td>{offer.price}</td>
                <td className='text-center'>
                  <button style={{ background: 'red', color: 'white', border: ' 2px solid white', padding: '2px 3px' }} onClick={() => handleDeleteOffer(offer.id)}>&#10008;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOffers;
