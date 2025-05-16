import React from 'react';

const CloudinaryPlayer = ({ url, mediaType }) => {
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    media: {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  };

  return (
    <div style={styles.container}>
      {mediaType === 'video' ? (
        <video 
          controls
          style={styles.media}
          playsInline
        >
          <source src={url} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <audio 
          controls
          style={styles.media}
        >
          <source src={url} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      )}
    </div>
  );
};

export default CloudinaryPlayer;
