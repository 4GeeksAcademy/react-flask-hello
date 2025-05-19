import React, { useState } from 'react';
import '../assets/styles/taskscarousel.css';

const tasks = [
  "/example-task.jpg",
  "/example-task.jpg",
  "/example-task.jpg",
  "/example-task.jpg",
  "/example-task.jpg",
  "/example-task.jpg",
  "/example-task.jpg",
  "/example-task.jpg",
];

const TasksCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 4;
  const itemWidth = 240;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="carousel-section">
      <h2>Tasks</h2>
      <div className="carousel-container">
        <button onClick={handlePrev} className="scroll-button">←</button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {tasks.map((src, index) => (
              <div key={index} className="carousel-item">
                <img src={src} alt={`Task ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleNext} className="scroll-button">→</button>
      </div>
    </div>
  );
};

export default TasksCarousel;
