import React from 'react'
import { HomeNavbar } from './HomeNavbar'
import { AppNavbar } from './AppNavbar';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className='navbar navbar-expand-lg mb-1 p-0'>
      {path === '/' && <HomeNavbar />}
      {path !== '/' && <AppNavbar />}


    </nav>
  )
}
