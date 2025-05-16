
// src/front/components/ImageCarousel.jsx
import React, { useState, useEffect } from "react";
import slide1 from "../assets/img/drink-1.png";
import slide2 from "../assets/img/drink-2.png";
import slide3 from "../assets/img/drink-3.png";
import slide4 from "../assets/img/drink-4.png";
import slide5 from "../assets/img/drink-5.png";


const slides = [slide1, slide2, slide3, slide4, slide5];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  // auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex(i => (i + 1) % slides.length);

  return (
    <div
      style={{
        position: "relative",
        width: "900px",
        height: "400px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <img
        src={slides[index]}
        alt={`Slide ${index + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Prev/Next */}
      <button onClick={prev} style={navButtonStyle("left")}>&lsaquo;</button>
      <button onClick={next} style={navButtonStyle("right")}>&rsaquo;</button>

      {/* Dots indicators */}
      <div style={dotsContainer}>
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...dotStyle,
              background: i === index ? "white" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// shared styles
const navButtonStyle = position => ({
  position: "absolute",
  top: "50%",
  [position]: "1rem",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.3)",
  border: "none",
  color: "white",
  fontSize: "2rem",
  padding: "0.2rem 0.5rem",
  cursor: "pointer",
});

const dotsContainer = {
  position: "absolute",
  bottom: "1rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "0.5rem",
};

const dotStyle = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  cursor: "pointer",
};
