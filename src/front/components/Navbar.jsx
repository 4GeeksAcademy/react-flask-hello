import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';


// --- Estilos CSS en línea para la Navbar ---
const navbarContainerStyles = {
  backgroundColor: '#8bc34a', // Verde oliva claro, evocando campos
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0, 70, 0, 0.2)', // Sombra sutil con tono verde
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px', // Bordes redondeados para un toque orgánico
  margin: '20px auto',
  maxWidth: '1200px',
  boxSizing: 'border-box',
};

const logoStyles = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none', // Elimina el subrayado del enlace
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.8em',
  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
  letterSpacing: '0.5px',
};

const logoSvgStyles = {
  marginRight: '10px',
  width: '35px',
  height: '35px',
  fill: '#ffeb3b', // Amarillo cereal
};

const navLinksStyles = {
  display: 'flex',
  gap: '25px',
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.1em',
  padding: '8px 15px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  fontWeight: 'bold',
  letterSpacing: '0.2px',
};

const linkHoverStyles = {
  backgroundColor: '#689f38', // Verde más oscuro al pasar el ratón
  transform: 'translateY(-2px)',
};
const buttonStyles = {
  ...linkStyles, // Inherit base link styles
  border: 'none',
  backgroundColor: 'transparent', // Make button background transparent by default
  // Specific styles for hover/active states if needed for buttons
};

const buttonHoverStyles = {
  backgroundColor: '#689f38', // Darker green on hover
  transform: 'translateY(-2px)',
};

// --- Componente NavbarAgricola ---
export const Navbar = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const handleLogout = () => {

    dispatch({ type: 'eliminar_user' }); // Dispatch the action
    localStorage.removeItem('jwt_token');
    // 3. Redirect to login page
    navigate('/registro');
    console.log('User logged out.'); // For debugging
  };

  return (
    <nav style={navbarContainerStyles}>
      {/* Logo y Nombre de la Empresa */}
      <Link to="/" style={logoStyles}>
        {/* SVG de Cereal (representación simple) */}
        <svg style={logoSvgStyles} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2zm-3-4h2v4H8zm0 6h2v2H8zm6-6h2v4h-2zm0 6h2v2h-2z" />
        </svg>
        AgroCereal
      </Link>
      {store.user ? (
        <>
          <span style={{ ...linkStyles, cursor: 'default' }}>
            Hola, {store.user.username || 'Agricultor'}!
          </span>
          <button
            onClick={handleLogout}
            style={{ ...buttonStyles, backgroundColor: '#c23b22' }} // Red for logout button
            onMouseOver={(e) => Object.assign(e.currentTarget.style, { ...buttonStyles, ...buttonHoverStyles })}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, { ...buttonStyles, backgroundColor: '#c23b22' })}
          >
            Cerrar Sesión
          </button>

        </>
      ) : (
        <div style={navLinksStyles}>
          <Link
            to="/registro"
            style={linkStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, linkStyles)}
          >
            Registro
          </Link>
          <Link
            to="/login"
            style={linkStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, linkStyles)}
          >
            Login
          </Link>
          <Link
            to="/ofertas"
            style={linkStyles}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, linkHoverStyles)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, linkStyles)}
          >
            Ver todas las ofertas
          </Link></div>
      )}

    </nav>
  );
};

export default Navbar;