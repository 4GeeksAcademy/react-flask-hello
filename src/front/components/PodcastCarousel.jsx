import React, { useState } from 'react';
import '../assets/styles/podcastcarousel.css';

const podcasts = [
  "/example-podcast.jpg",
  "/example-podcast.jpg",
  "/example-podcast.jpg",
  "/example-podcast.jpg",
  "/example-podcast.jpg",
  "/example-podcast.jpg",
  "/example-podcast.jpg",
  "/example-podcast.jpg",
];

const PodcastCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4;
  const itemWidth = 240;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < podcasts.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="carousel-section">
      <h2>Podcasts</h2>
      <div className="carousel-container">
        <button onClick={handlePrev} className="scroll-button">←</button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {podcasts.map((src, index) => (
              <div key={index} className="carousel-item">
                <img src={src} alt={`Podcast ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleNext} className="scroll-button">→</button>
      </div>
    </div>
  );
};

export default PodcastCarousel;
