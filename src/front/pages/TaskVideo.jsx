import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/styles/TaskVideo.module.css";
import Navbar2 from "../components/Navbar2";
import Particles from "../components/Particles";
import CloudinaryPlayer from "../components/CloudinaryPlayer";

const TaskVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mediaType, url, title } = location.state || {};

  if (!url) {
    navigate("/content");
    return null;
  }

  return (
    <div className={styles.taskVideoContainer}>
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
      <Navbar2 />
      <div className={styles.taskVideoLayoutGrid}>
        <div className={styles.taskVideoMainPanel}>
          <div className={styles.taskVideoPlayerContainer}>
            <CloudinaryPlayer 
              url={url}
              mediaType={mediaType}
            />
          </div>
          <div className={styles.taskVideoInfo}>
            <h2>{title}</h2>
            <button
              className={styles.taskVideoButton}
              onClick={() => navigate("/content")}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskVideo; 