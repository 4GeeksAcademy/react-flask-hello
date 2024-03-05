import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";
import Logo from "../../img/logo.png";
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {

  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    showModal: false,
    showModalUpdate: false,
  });
  const [userInfo, setUserInfo] = useState(null)

  async function handleClickHome() {
    await actions.obtenerEventos()
    navigate('/');
  }

  async function handleClickProfile() {
    await actions.obtenerInfoUsuario();
    navigate('/profile');
  }

  function updateModalState() {
    setModalState({ showModal: true });
  }

  function updateModalRegistrerState() {
    setModalState({ showModalUpdate: true });
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    store.auth = false;
    store.infoUser = []
    navigate("/")
  }

  useEffect(() => {
    actions.validate_token();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white">
      <div className="container d-flex justify-content-between">
        <div className="navbar-brand col-xl-3 col-lg-3 col-md-12 col-12">
          <img className="img-thumbnail border-0" src={Logo} alt="" onClick={handleClickHome} />
        </div>

        {/*Esta parte son los botones de la derecha */}
        {store.auth ?
          (
            <div className="dropdown d-flex justify-content-end mt-2 col-xl-3 col-lg-3 col-md-12 col-12">
              <button className="btn bg-transparent d-flex flex-row dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-3x fa-user me-1 icono-300"></i>
                <div className="d-flex align-self-end">
                  <h4 className="icono-400">{localStorage.getItem("user")}</h4>
                </div>
              </button>
              <ul className="dropdown-menu border-0 dropdown-menu-end dropdown-menu-start">
                <li><button className="dropdown-item btn-400 mb-2 rounded" onClick={handleClickProfile}>Usuario</button></li>
                <li><button className="dropdown-item btn-400 rounded" onClick={logOut}>Cerrar sesión</button></li>
              </ul>
            </div>
          ) :
          (
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link fs-5 text-white btn bg-400 p-2 me-2 mb-2" href="#" onClick={updateModalState}>Log in</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-5 text-white btn bg-300 p-2 me-2" href="#" onClick={updateModalRegistrerState}>Sign up</a>
                </li>
              </ul>
            </div>
          )
        }
      </div>
      <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })} />
      <SignUpModal show={modalState.showModalUpdate} onClose={() => setModalState({ showModalUpdate: false })} />
    </nav>

  )
}