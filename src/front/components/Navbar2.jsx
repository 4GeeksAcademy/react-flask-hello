import React, { useState } from 'react';
import styles from '../assets/styles/Navbar2.module.css';
import { Link } from 'react-router-dom';

const podcast = <i className="fas fa-microphone"></i>;
const video = <i className="fas fa-video"></i>;
const task = <i className="fas fa-clipboard-list"></i>;
const logout = <i className="fas fa-right-from-bracket"></i>;
const trophy = <i className="fas fa-trophy"></i>;
const profileIcon = <i className="fas fa-user"></i>;

const Navbar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setOpenProfileDropdown(!openProfileDropdown);
  };

  return (
    <nav className={`${styles.navbar2} ${isMobileMenuOpen ? styles.navbar2Open : ''}`}>
      {/* Mostrar solo en modo normal */}
      {!isMobileMenuOpen && (
        <div className={styles.navbar2Logo}>
          <Link to="/profilemainpage">
            <h2>Level <span className={styles.navbar2Up}>Up</span></h2>
          </Link>
        </div>
      )}

      {/* Menú Texto */}
      <div className={styles.navbar2Text}>
        <Link to="/profilemainpage">
          <p>Home</p>
        </Link>

        {/* Content con menú desplegable */}
        <div className={styles.navbar2Dropdown}>
          <p onClick={toggleDropdown}>Content</p>
          {openDropdown && (
            <div className={styles.navbar2DropdownMenu}>
              <Link to="/videos">
                <p style={{ gap: "0.5rem" }}>{video} Videos</p>
              </Link>
              <Link to="/podcasts">
                <p style={{ gap: "0.5rem" }}>{podcast} Podcasts</p>
              </Link>
              <Link to="/tasks">
                <p style={{ gap: "0.5rem" }}>{task} Tasks</p>
              </Link>
            </div>
          )}
        </div>

        <Link to="/journey">
          <p>Journey</p>
        </Link>
      </div>

      {/* Mostrar solo en modo normal */}
      {!isMobileMenuOpen && (
        <div className={styles.navbar2Profile}>
          <img
            src="src/front/assets/styles/images/loulogio.webp"
            alt="Avatar"
            className={styles.navbar2Image}
            onClick={toggleProfileDropdown} // Solo activar dropdown al hacer clic en la imagen
          />
          <div className={styles.navbar2ProfileContent}>
            <p className={styles.navbar2LevelText}>Lvl 6</p>
            <div className={styles.navbar2LevelBar}>
              <div className={styles.navbar2LevelFill}></div>
            </div>
            <p className={styles.navbar2XP}>200 / 1000</p>
          </div>
        </div>
      )}

      {/* Menú hamburguesa para móviles */}
      <div className={styles.navbar2HamburgerMenu} onClick={toggleMobileMenu}>
        <div className={styles.navbar2HamburgerIcon}></div>
        <div className={styles.navbar2HamburgerIcon}></div>
        <div className={styles.navbar2HamburgerIcon}></div>
      </div>

      {/* Menú desplegable en móvil */}
      {isMobileMenuOpen && (
        <div className={styles.navbar2MobileMenu}>
          <div className={styles.navbar2CloseButton} onClick={toggleMobileMenu}>
            X
          </div>
          <div className={styles.navbar2Profile}>
            <img
              src="src/front/assets/styles/images/ProfilePhoto.jpg"
              alt="Avatar"
              className={styles.navbar2Image}
            />
            <div className={styles.navbar2ProfileContent}>
              <p className={styles.navbar2LevelText}>Lvl 6</p>
              <div className={styles.navbar2LevelBar}>
                <div className={styles.navbar2LevelFill}></div>
              </div>
              <p className={styles.navbar2XP}>200 / 1000</p>
            </div>
          </div>
          <div className={styles.navbar2MobileLinks}>
            <Link to="/profile2">
              <p>Home</p>
            </Link>
            <Link to="/journey">
              <p>Journey</p>
            </Link>
            <div onClick={toggleDropdown}>
              <p>Content</p>
              {openDropdown && (
                <div className={styles.navbar2DropdownMenu}>
                  <Link to="/videos">
                    <p>Videos</p>
                  </Link>
                  <Link to="/podcasts">
                    <p>Podcasts</p>
                  </Link>
                  <Link to="/tasks">
                    <p>Tasks</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dropdown del perfil en modo normal */}
      {openProfileDropdown && (
        <div className={styles.navbar2ProfileDropdown}>
          <Link to="/profilemainpage">
            <p>{profileIcon} Profile</p>
          </Link>
          <Link to="/achievements">
            <p>{trophy} Achievements</p>
          </Link>
          <button className={styles.navbar2LogoutButton}>
            {logout} Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;