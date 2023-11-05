import React, { useContext, useEffect } from 'react';
import AdminUsers from '../component/AdminUsers';
import { Context } from '../store/appContext';
import AdminBusiness from '../component/AdminBusiness';
import AdminReviews from '../component/AdminReviews';
import AdminOffers from '../component/AdminOffers';

const AdminView = () => {
  const { store, actions } = useContext(Context)

  useEffect(() => {
    actions.getAllUsers();
    actions.getAllBusinessUsers()
    actions.getReviews()
    actions.getAllOffers()
  }, []);

  return (
    <div>
      {store.user.is_admin ? (
        <>
          <AdminUsers />
          <AdminBusiness />
          <AdminReviews />
          <AdminOffers />
        </>

      ) : (<h1>Espacio resevado a los administradores!</h1>)}

    </div>
  );
};

export default AdminView;