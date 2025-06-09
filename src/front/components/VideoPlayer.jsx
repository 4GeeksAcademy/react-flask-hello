import React from "react";
import ReactPlayer from "react-player/youtube";
import "../../styles/VideoPlayer.css";

const VideoPlayer = () => {
  return (
    <div className="video-wrapper">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=RJ1izzADlzY"
        playing
        loop
        muted
        controls={false}
        width="100%"
        height="100%"
        style={{ pointerEvents: "none" }}
      />
      <div className="video-overlay"></div>
      <div className="about-overlay-text">
        <h2>Tu cuerpo. Tu energía. Tu cambio.</h2>
        <p>Comienza tu viaje hacia una mejor versión de ti mismo.</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
