import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const AdminBusiness = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteBusiness = (businessId) => {
    actions.deleteBusiness(businessId);
    window.location.reload();
  };

  return (
    <div className='admin-business-content' >
      <h2 className='text-center'>Lista de empresas:</h2>
      <div className="table-responsive" style={{ width: '100%', margin: '0 auto' }}>
        <table className='table'>
          <thead>
            <tr>
              <th className='th-id'>ID</th>
              <th className='th-business-name th-general'>Nombre de empresa</th>
              <th className='th-email th-general'>Correo electrónico</th>
              <th className='th-actions'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.business_users.map((business) => (
              <tr className='infos-contain' key={business.id}>
                <td>{business.id}</td>
                <td>{business.business_name}</td>
                <td>{business.email}</td>
                <td className='text-center'>
                  <button style={{ background: 'red', color: 'white', border: ' 2px solid white', padding: '2px 3px' }} onClick={() => handleDeleteBusiness(business.id)}>&#10008;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBusiness;
