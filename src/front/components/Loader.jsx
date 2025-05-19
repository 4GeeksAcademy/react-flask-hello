import React from 'react';
import styles from '../assets/styles/Loader.module.css';
import genieImg from "../assets/styles/images/Moti_Feliz.png";
import Particles from "./Particles";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Particles
        particleColors={['#6725D8', '#6725D8']}
        particleCount={300}
        particleSpread={5}
        speed={0.2}
        particleBaseSize={50}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <div className={styles.loaderContent}>
        <img src={genieImg} alt="Loading" className={styles.loaderImage} />
        <p className={styles.loaderText}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;