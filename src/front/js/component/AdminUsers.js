import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const AdminUsers = () => {
  const { store, actions } = useContext(Context);

  const handleDeleteUser = (userId) => {
    actions.deleteUser(userId);
    window.location.reload();
  };

  return (
    <div className='admin-user-content'>
      <h2 className='text-center'>Lista de usuarios:</h2>
      <div className="table-responsive" style={{ width: '100%', margin: '0 auto' }}>
        <table className='table'>
          <thead>
            <tr>
              <th className='th-id'>ID</th>
              <th className='th-general'>Nombre de usuario</th>
              <th className='th-general'>Nombre</th>
              <th className='th-general'>Apellido</th>
              <th className='th-general'>Correo electrónico</th>
              <th className='th-actions'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.users.map((user) => (
              <tr className='infos-contain' key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td className='btn-delete-admin'>
                  <button className=' mx-auto' style={{ background: 'red', color: 'white', border: ' 2px solid white', padding: '2px 3px' }} onClick={() => handleDeleteUser(user.id)}>&#10008;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
