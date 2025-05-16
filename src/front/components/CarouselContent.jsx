import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from "../assets/styles/CarouselContent.module.css";

const CarouselContent = ({ items, onItemClick }) => {
  const containerRef = useRef(null);
  const scrollAmount = 350;

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      containerRef.current.scrollTo({
        left: scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.carousel}>
      <button 
        className={`${styles.button} ${styles.prevButton}`}
        onClick={() => handleScroll('prev')}
        aria-label="Previous items"
      >
        ←
      </button>
      <div className={styles.container} ref={containerRef}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={styles.card}
            onClick={() => onItemClick && onItemClick(item)}
          >
            <img 
              src={item.thumbnail} 
              alt={item.title || 'Content thumbnail'} 
              className={styles.thumbnail}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && (
                <p className={styles.cardDescription}>{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <button 
        className={`${styles.button} ${styles.nextButton}`}
        onClick={() => handleScroll('next')}
        aria-label="Next items"
      >
        →
      </button>
    </div>
  );
};

CarouselContent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string,
      type: PropTypes.oneOf(['video', 'audio', 'task']).isRequired,
      missionId: PropTypes.number
    })
  ).isRequired,
  onItemClick: PropTypes.func
};

export default CarouselContent;