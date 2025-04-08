/* 👇 ❇️ Riki for the group success 👊 Lunes8Abril*/

import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'; // Navbar original
import Footer from '../components/Footer/Footer'; // Footer original

const PublicLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Si estamos en la página de inicio (Landing), no mostramos el navbar y footer adicionales
  if (isLandingPage) {
    return <Outlet />; // Solo muestra el Landing con su propio navbar y footer
  }

  // Para otras páginas públicas, mostramos el layout completo
  return (
    <div className="public-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;