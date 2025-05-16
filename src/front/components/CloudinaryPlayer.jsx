import React from 'react';

const CloudinaryPlayer = ({ url, mediaType }) => {
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000'
    },
    media: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  };

  return (
    <div style={styles.container}>
      {mediaType === 'video' ? (
        <video 
          controls
          style={styles.media}
          playsInline
          autoPlay
        >
          <source src={url} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <audio 
          controls
          style={{width: '100%', margin: '20px 0'}}
          autoPlay
        >
          <source src={url} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      )}
    </div>
  );
};

export default CloudinaryPlayer;
