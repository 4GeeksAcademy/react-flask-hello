import './Navbar.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import { LogOut } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import Logo from "../assets/img/logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Navbar() {
  const [view, setview] = useState(false)
  const [juegosDropdown, setJuegosDropdown] = useState(false)

  const { store } = useGlobalReducer();

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" aria-controls="mobile-menu" aria-expanded="false" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Abrir menu principal</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="block size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="hidden size-6">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/">
                <img src={Logo} alt="logo" className="h-16 w-auto mix-blend-darken logoempresa" />
              </Link>
              <h1 href="#" className="rounded-md px-3 py-2 text-2xl font-bold text-gray-300">Game Store</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center space-x-4">
              <div className="flex space-x-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setJuegosDropdown(!juegosDropdown)}
                    className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white"
                  >
                    Juegos
                  </button>
                  {juegosDropdown && (
                    <div className="absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                      <a href="#" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">Play Station</a>
                      <a href="#" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">Nintendo</a>
                      <a href="#" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">XboX</a>
                    </div>
                  )}
                </div>
                <Link to="/register">
                  <p href="#" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">Regístrate</p>
                </Link>
                <Link to="/addgame">
                  <p href="#" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">Añadir Juego</p>
                </Link>
                <a href="/Soporte" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">Soporte</a>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="px-1 py-1 border rounded-md focus:outline-none focus:ring focus:border-indigo-900"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* ---- carrito ---- */}
            <Link to="/Carro" className="relative mr-4">
              <span className="text-white text-2xl">🛒</span>
              {store.carro && store.carro.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                  {store.carro.length}
                </span>
              )}
            </Link>
            <Link to="/historial" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">
              Historial
            </Link>


            <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative ml-3">
              <div>
                <button id="user-menu-button" type="button" aria-expanded="false" aria-haspopup="true" className="relative flex rounded-full bg-white text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Menu de usuario</span>
                  <img onClick={() => setview(!view)} src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" alt="" className="size-8 w-12 rounded-full" />
                </button>
              </div>
              <div role="menu" tabIndex="-1" aria-labelledby="user-menu-button" aria-orientation="vertical" className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                {view && (
                  <>
                    <a id="user-menu-item-0" role="menuitem" href="/login" tabIndex="-1" className="block px-4 py-2 text-sm text-purple-900 hover:bg-orange-200">Login</a>
                    <a id="user-menu-item-1" role="menuitem" href="#" tabIndex="-1" className="block px-4 py-2 text-sm text-purple-900 hover:bg-orange-200">Ajustes</a>
                    <a id="user-menu-item-2" role="menuitem" href="#" tabIndex="-1" className="block px-4 py-2 text-sm text-purple-900 hover:bg-orange-200">Cerrar sesión</a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="mobile-menu" className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-indigo-300 hover:text-white">Juegos</a>
          <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-indigo-300 hover:text-white">Regístrate</a>
          <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-indigo-300 hover:text-white">Contacto</a>
          <input
            type="text"
            placeholder="Buscar..."
            className="px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>
    </nav>
  )
}
