import React, { useState } from "react";
import "../../styles/Paralax.css";

const ParallaxScroll = () => {
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("50% center");
  const [isMoving, setIsMoving] = useState(false);
  const [zoomTarget, setZoomTarget] = useState(null); // 'left', 'right', etc.

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
      <div className={`titulo-superior ${zoomTarget !== "center" && zoomTarget !== null ? "titulo-oculto" : ""}`}>
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
          }}
        />
      </div>

      {/* UI al hacer zoom a la izquierda */}
      {zoomTarget === "left" && (
        <div className="left-ui">
          <div className="mensaje-nutricion">
            🥗 Es tan importante una buena alimentación como el entrenamiento.
          </div>
          <div className="botones-nutricion">
            <button onClick={() => handleMove("right", 2.5)}>Más sobre entrenamiento</button>
            <button onClick={() => handleMove("center", 1)}>Volver al inicio</button>
          </div>
        </div>
      )}

      {/* UI al hacer zoom a la derecha */}
      {zoomTarget === "right" && (
        <div className="right-ui">
          <div className="mensaje-entrenamiento">
            💪 El esfuerzo constante marca la diferencia.
          </div>
          <div className="botones-entrenamiento">
            <button onClick={() => handleMove("left", 2.5)}>Más sobre nutrición</button>
            <button onClick={() => handleMove("center", 1)}>Volver al inicio</button>
          </div>
        </div>
      )}

      {/* Botones centrales */}
      <div className="camera-controls">
        <button onClick={() => handleMove("left", 2.5)}>Más sobre nutrición</button>
        <button onClick={() => handleMove("center", 1)}>Centro</button>
        <button onClick={() => handleMove("right", 2.5)}>Más sobre entrenamiento</button>
      </div>
    </div>
  );
};

export default ParallaxScroll;
