import React, { useState } from "react";
import "../../styles/Paralax.css";
import { Link } from 'react-router-dom';

const ParallaxScroll = () => {
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("50% center");
  const [isMoving, setIsMoving] = useState(false);
  const [zoomTarget, setZoomTarget] = useState("center"); // empieza en el centro

  const handleMove = (target, targetZoom) => {
    if (isMoving) return;
    setIsMoving(true);

    switch (target) {
      case "left":
        setTransformOrigin("5% center");
        break;
      case "right":
        setTransformOrigin("90% center");
        break;
      default:
        setTransformOrigin("50% center");
    }

    setZoom(targetZoom);
    setZoomTarget(target);

    setTimeout(() => {
      setIsMoving(false);
    }, 1000);
  };

  return (
    <div className="parallax-camera">
      <div className={`titulo-superior ${zoomTarget !== "center" ? "titulo-oculto" : ""}`}>
        DMPC
      </div>

      <div className="parallax-scene">
        <img
          src="paralax.png"
          alt="Panorámica"
          className="parallax-image"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: transformOrigin,
            transition: "transform 1s ease-in-out, transform-origin 1s ease-in-out"
          }}
        />
      </div>

      {zoomTarget === "left" && (
        <>
          <div className="mensaje-nutricion">
            <p>Es tan importante una buena alimentación como el entrenamiento.</p>
            <Link to="/nutricion" className="linkparallax">Más Información</Link>
          </div>
          <div className="left-ui">
            <div className="botones-nutricion">
              <button onClick={() => handleMove("right", 2.5)}>Más sobre entrenamiento</button>
              <button onClick={() => handleMove("center", 1)}>Volver al inicio</button>
            </div>
          </div>
        </>
      )}

      {zoomTarget === "right" && (
        <>
          <div className="mensaje-nutricion">
            <p>Es tan importante una buena alimentación como el entrenamiento.</p>
            <Link to="/sport" className="linkparallax">Más Información</Link>
          </div>
          <div className="right-ui">
            <div className="botones-entrenamiento">
              <button onClick={() => handleMove("left", 2.5)}>Más sobre nutrición</button>
              <button onClick={() => handleMove("center", 1)}>Volver al inicio</button>
            </div>
          </div>
        </>
      )}

      {zoomTarget === "center" && (
        <div className="camera-controls">
          <button onClick={() => handleMove("left", 2.5)}>Más sobre nutrición</button>
          <button onClick={() => handleMove("center", 1)}>Centro</button>
          <button onClick={() => handleMove("right", 2.5)}>Más sobre entrenamiento</button>
        </div>
      )}
    </div>
  );
};

export default ParallaxScroll;
