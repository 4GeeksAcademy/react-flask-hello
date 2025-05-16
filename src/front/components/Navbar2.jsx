import React, { useEffect, useState } from 'react';
import styles from '../assets/styles/Navbar2.module.css';
import { Link, useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, [userId]);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setOpenProfileDropdown(!openProfileDropdown);

  const xp = user?.xp_total || 0;
  const level = user?.level || 1;
  const xpForNextLevel = 1000;
  const xpProgress = Math.min((xp % xpForNextLevel) / xpForNextLevel * 100, 100);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <nav className={`${styles.navbar2} ${isMobileMenuOpen ? styles.navbar2Open : ''}`}>
      {!isMobileMenuOpen && (
        <div className={styles.navbar2Logo}>
          <Link to="/profilemainpage">
            <h2>Level <span className={styles.navbar2Up}>Up</span></h2>
          </Link>
        </div>
      )}

      <div className={styles.navbar2Text}>
        <Link to="/profilemainpage"><p>Home</p></Link>
        <Link to="/content"><p>Content</p></Link>
        <Link to="/journey"><p>Journey</p></Link>
      </div>

      {!isMobileMenuOpen && user && (
        <div className={styles.navbar2Profile}>
          <img
            src={user.avatar_url || "src/front/assets/styles/images/Moti_Feliz.png"}
            alt="Avatar"
            className={styles.navbar2Image}
            onClick={toggleProfileDropdown}
          />
          <div className={styles.navbar2ProfileContent}>
            <p className={styles.navbar2LevelText}>Lvl {level}</p>
            <div className={styles.navbar2LevelBar}>
              <div className={styles.navbar2LevelFill} style={{ width: `${xpProgress}%` }}></div>
            </div>
            <p className={styles.navbar2XP}>{xp % xpForNextLevel} / {xpForNextLevel}</p>
          </div>
        </div>
      )}

      <div className={styles.navbar2HamburgerMenu} onClick={toggleMobileMenu}>
        <div className={styles.navbar2HamburgerIcon}></div>
        <div className={styles.navbar2HamburgerIcon}></div>
        <div className={styles.navbar2HamburgerIcon}></div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.navbar2MobileMenu}>
          <div className={styles.navbar2CloseButton} onClick={toggleMobileMenu}>X</div>
          <div className={styles.navbar2Profile}>
            <img 
              src={user?.avatar_url || "src/front/assets/styles/images/Moti_Feliz.png"} 
              alt="Avatar" 
              className={styles.navbar2Image} 
            />
            <div className={styles.navbar2ProfileContent}>
              <p className={styles.navbar2LevelText}>Lvl {level}</p>
              <div className={styles.navbar2LevelBar}>
                <div className={styles.navbar2LevelFill} style={{ width: `${xpProgress}%` }}></div>
              </div>
              <p className={styles.navbar2XP}>{xp % xpForNextLevel} / {xpForNextLevel}</p>
            </div>
          </div>
          <div className={styles.navbar2MobileLinks}>
            <Link to="/profilemainpage"><p>Home</p></Link>
            <Link to="/content"><p>Content</p></Link>
            <Link to="/journey"><p>Journey</p></Link>
          </div>
        </div>
      )}

      {openProfileDropdown && (
        <div className={styles.navbar2ProfileDropdown}>
          <Link to="/edit-profile"><p>{profileIcon} Edit Profile</p></Link>
          <Link to="/achievements"><p>{trophy} Achievements</p></Link>
          <button className={styles.navbar2LogoutButton} onClick={handleLogout}>
            {logout} Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
