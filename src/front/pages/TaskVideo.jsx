import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/styles/TaskVideo.module.css";
import Navbar2 from "../components/Navbar2";
import Particles from "../components/Particles";
import CloudinaryPlayer from "../components/CloudinaryPlayer";

const TaskVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mediaType, url, title } = location.state || {};
  const [error, setError] = useState(null);

  if (!url) {
    navigate("/content");
    return null;
  }

  // Extraer el public_id de la URL de Cloudinary
  const getPublicId = (url) => {
    try {
      // Patrones comunes de URLs de Cloudinary
      const patterns = [
        /v\d+\/(.+?)\.(mp4|mp3)$/, // Formato estándar
        /upload\/(.+?)\.(mp4|mp3)$/, // Sin versión
        /dgknhbs4e\/(?:video|audio)\/upload\/(.+?)\.(mp4|mp3)$/ // URL completa
      ];

      for (const pattern of patterns) {
        const matches = url.match(pattern);
        if (matches && matches[1]) {
          return matches[1];
        }
      }

      // Si no coincide con ningún patrón, intentar extraer la última parte de la URL
      const urlParts = url.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      if (lastPart) {
        return lastPart.split('.')[0]; // Eliminar la extensión
      }

      throw new Error('Invalid Cloudinary URL format');
    } catch (err) {
      console.error('Error extracting publicId:', err);
      setError('Error processing media URL');
      return null;
    }
  };

  const publicId = getPublicId(url);

  if (error) {
    return (
      <div className={styles.taskVideoContainer}>
        <Navbar2 />
        <div className={styles.errorMessage}>
          {error}
          <button
            className={styles.taskVideoButton}
            onClick={() => navigate("/content")}
          >
            Return to Content
          </button>
        </div>
      </div>
    );
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
            {publicId && (
              <CloudinaryPlayer 
                publicId={publicId}
                mediaType={mediaType}
              />
            )}
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