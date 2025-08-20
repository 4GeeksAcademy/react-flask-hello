import './Navbar.css'
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { LogOut } from 'lucide-react';
import { LogIn } from 'lucide-react';
import Logo from "../assets/img/logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function Navbar({ showDrowpdown, setShowDrowpdown }) {
  const { store, dispatch } = useGlobalReducer()
  const { all_games } = store;
  const navigate = useNavigate()
  const token_user = localStorage.getItem('jwt-token');
  const user = localStorage.getItem('user');
  const [view, setview] = useState(false);
  const [searchGame, setSearchGame] = useState()  /* Barra de buscar funcional*/
  const [gamesFilter, setGamesFilter] = useState([])  /* Barra de buscar funcional*/



  const handleSearch = () => {
    if (searchGame.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchGame)}`);
    }

  };

  const cerrarSesion = () => {
    localStorage.removeItem("jwt-token")
    localStorage.removeItem("user")
    dispatch({
      type: 'setUser',
      payload: null
    })
    console.log("Sin sesion")
    alert("Sesion finalizada")
    navigate("/")
  }

  useEffect(() => {
    if (user) {
      let parseUser = JSON.parse(user)
      if (parseUser.is_admin) {
        setview(true)
      }
    } else {
      setview(false)
    }
  }, [token_user]);


  const search = () => {
    const game = all_games.find(game => game.name === searchGame)
    if (!game) {
      alert("Juego no encontrado")
    } else {
      navigate(`/DetailsGames/${game.id}`)
    }
  }

  const filter = (text) => {
    let filterGames = all_games.filter((g) => {
      return g.name.toLowerCase().includes(text.toLowerCase())
    })
    setGamesFilter(filterGames)
  }

  console.log(gamesFilter)



  return (
    <nav className="bg-gray-900">
      <div className=" navbar-bg mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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

            </div>
            <div className="hidden sm:ml-6 sm:flex items-center space-x-4">
              <div className="flex space-x-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDrowpdown(!showDrowpdown)}
                    className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white"
                  >
                    Juegos
                  </button>
                  {showDrowpdown && (
                    <ul className="absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                      <li><Link to="/games/platform/PS5" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">PS5</Link></li>
                      <li><Link to="/games/platform/PS4" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">PS4</Link></li>
                      <li><Link to="/games/platform/Xbox One" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">Xbox One</Link></li>
                      <li><Link to="/games/platform/Nintendo Switch" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">Nintendo Switch</Link></li>
                      <li><Link to="/games/platform/Nintendo Switch 2" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">Nintendo Switch 2</Link></li>
                      <li><Link to="/games/platform/PC" className="block px-4 py-2 text-sm text-indigo-900 hover:bg-indigo-200">PC</Link></li>
                    </ul>
                  )}
                </div>

                {
                  view && (
                    <Link to="/addgame">
                      <p href="#" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">Añadir Juego</p>
                    </Link>
                  )}

                {/* Barra de buscar funcional*/}
                <div className='searchBar'>
                  <div className='bar'>
                    <input
                      type="text"
                      value={searchGame}
                      onChange={(e) => { setSearchGame(e.target.value), filter(e.target.value) }}
                      placeholder="Buscar..."
                      className="px-1 py-1 border rounded-md focus:outline-none inputhori focus:ring focus:border-gray-900"
                    />
                    <button onClick={search}>
                      Buscar
                    </button>
                  </div>
                  {
                    (gamesFilter.length > 0 && searchGame.length > 0) && (
                      <div className='results bg-gray-900'>

                        {
                          gamesFilter.map((g) => {
                            return (
                              <Link to={`/detailsgames/${g.id}`}>
                                <span>{g.name}, {g.price}</span>
                              </Link>
                            )
                          })
                        }
                      </div>
                    )
                  }



                </div>

              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* ---- carrito ---- */}
            <Link to="/Carro" className="relative mr-4">
              {

                token_user && (
                  <span className="text-white text-2xl">🛒</span>
                )}

              {store.carro && store.carro.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                  {store.carro.length}
                </span>
              )}
            </Link>
            {

              token_user && (
                <Link to="/historial" className="rounded-md px-3 py-2 text-lg font-bold text-gray-300 hover:text-white">
                  Historial
                </Link>
              )}



            <button type="button" className="relative rounded-full p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative ml-3">
              {
                token_user ? (
                  <button onClick={() => cerrarSesion()} class="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <LogOut />
                  </button>
                ) : (
                  <div className="relative ml-3 flex justify-between border-white">
                    <Link to="/Login">
                      <button class="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <LogIn />
                      </button>
                    </Link>


                  </div>
                )

              }


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