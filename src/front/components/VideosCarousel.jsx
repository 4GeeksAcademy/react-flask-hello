import React, { useState } from 'react';
import '../assets/styles/videoscarousel.css';

const videos = [
  "/example-video.jpg",
  "/example-video.jpg",
  "/example-video.jpg",
  "/example-video.jpg",
  "/example-video.jpg",
  "/example-video.jpg",
  "/example-video.jpg",
  "/example-video.jpg",
];

const VideosCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 4;
    const itemWidth = 240; // Ancho de cada item + margen (puedes ajustar)
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    const handleNext = () => {
      if (currentIndex < videos.length - visibleItems) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    return (
      <div className="carousel-section">
        <h2>Videos</h2>
        <div className="carousel-container">
          <button onClick={handlePrev} className="scroll-button">←</button>
  
          <div className="carousel-viewport">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
            >
              {videos.map((src, index) => (
                <div key={index} className="carousel-item">
                  <img src={src} alt={`Video ${index}`} />
                </div>
              ))}
            </div>
          </div>
  
          <button onClick={handleNext} className="scroll-button">→</button>
        </div>
      </div>
    );
  };

export default VideosCarousel;
