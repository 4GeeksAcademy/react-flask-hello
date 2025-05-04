import React, { useState } from 'react';
import styles from '../assets/styles/Navbar2.module.css';
import profilePic from '../assets/styles/images/Moti_Feliz.png';

const Navbar2 = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className={styles.navbar2}>
      <div className={styles.navbarLeft}>
        <img src={profilePic} alt="Profile" className={styles.motiIcon} />
      </div>

      <div className={styles.navbarCenterBlock}>
        <div className={styles.levelUpContainer}>
          <span className={styles.levelUpText}>LEVEL </span>
          <span className={styles.levelUpTextUp}>UP</span>
        </div>

        <div className={styles.dropdown1}>
          <button className={styles.navButton} onClick={() => toggleDropdown('content')}>
            Content
          </button>
          {openDropdown === 'content' && (
            <div className={styles.dropdownMenu}>
              <a href="#">Videos</a>
              <a href="#">Podcasts</a>
              <a href="#">Tasks</a>
            </div>
          )}
        </div>

        <div className={styles.dropdown2}>
          <button className={styles.navButton} onClick={() => toggleDropdown('journey')}>
            My Journey
          </button>
          {openDropdown === 'journey' && (
            <div className={styles.dropdownMenu}>
              <a href="#">Week 1</a>
              <a href="#">Week 2</a>
              <a href="#">Week 3</a>
              <a href="#">Week 4</a>
            </div>
          )}
        </div>
      </div>

      <div className={styles.navbarRight}>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: '60%' }}></div>
          </div>
        </div>
        <img src={profilePic} alt="Profile" className={styles.profilePic} />
      </div>
    </nav>
  );
};

export default Navbar2;
