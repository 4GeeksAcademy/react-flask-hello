/* 👇 ❇️ Riki for the group success 👊 Lunes9Abril*/

import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer'; // Importa tu Footer si existe

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <PublicNavbar />
      <main className="public-content">
        <Outlet />
      </main>
      {/* Usa tu Footer si lo tienes implementado */}
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;