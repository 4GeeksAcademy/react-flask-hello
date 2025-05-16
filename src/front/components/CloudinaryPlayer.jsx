import { useEffect, useState } from "react";
import "cloudinary-video-player/dist/cld-video-player.min.css";

const CloudinaryPlayer = ({ publicId, mediaType }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let player = null;
    const initializePlayer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Esperar a que Cloudinary esté disponible
        if (!window.cloudinary) {
          throw new Error("Cloudinary library not loaded");
        }

        const cld = window.cloudinary.Cloudinary.new({ 
          cloud_name: "dgknhbs4e",
          secure: true
        });

        const playerOptions = {
          controls: true,
          autoplay: false,
          muted: false,
          width: mediaType === 'video' ? 640 : 400,
          height: mediaType === 'video' ? 360 : 100,
          posterOptions: {
            transformation: { quality: 'auto' }
          },
          sourceTypes: ['mp4', 'mp3', 'webm', 'ogg'],
          playbackRates: [0.5, 1, 1.5, 2]
        };

        // Crear el elemento adecuado según el tipo de medio
        const elementId = `cld-${mediaType}-${publicId}`;
        const container = document.querySelector('[data-player-container]');
        
        if (!container) {
          throw new Error("Player container not found");
        }

        const existingElement = document.getElementById(elementId);
        if (!existingElement) {
          const mediaElement = document.createElement(mediaType === 'video' ? 'video' : 'audio');
          mediaElement.id = elementId;
          container.appendChild(mediaElement);
        }

        // Inicializar el reproductor según el tipo de medio
        player = mediaType === 'video' 
          ? cld.videoPlayer(elementId, playerOptions)
          : cld.audioPlayer(elementId, playerOptions);

        player.source(publicId);

        // Manejar eventos del reproductor
        player.on('error', (error) => {
          console.error('Cloudinary player error:', error);
          setError('Error loading media');
        });

        player.on('loadedmetadata', () => {
          setIsLoading(false);
        });

      } catch (err) {
        console.error('Error initializing Cloudinary player:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializePlayer();

    return () => {
      if (player) {
        try {
          player.dispose();
          const elementId = `cld-${mediaType}-${publicId}`;
          const element = document.getElementById(elementId);
          if (element) {
            element.remove();
          }
        } catch (err) {
          console.error('Error disposing player:', err);
        }
      }
    };
  }, [publicId, mediaType]);

  if (error) {
    return (
      <div className="player-error" style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: 'red' 
      }}>
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="player-loading" style={{ 
        padding: '20px', 
        textAlign: 'center' 
      }}>
        Loading player...
      </div>
    );
  }

  return <div data-player-container style={{ width: '100%', height: '100%' }} />;
};

export default CloudinaryPlayer;
