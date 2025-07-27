import React from "react";

const Sphere = () => {
  const meridians = Array.from({ length: 36 }, (_, i) => (
     
    <div
      className="meridian"
      key={`meridian-${i}`}
      style={{ transform: `rotateX(${(i + 1) * 10}deg)`
    }}
    />
  ));

  const latitudes = [
    { size: 296, top: 2, left: 2, z: -25 },
    { size: 280, top: 10, left: 10, z: -50 },
    { size: 260, top: 20, left: 20, z: -75 },
    { size: 220, top: 40, left: 40, z: -100 },
    { size: 160, top: 70, left: 70, z: -125 },
    { size: 20, top: 140, left: 140, z: -150, border: true },
    { size: 296, top: 2, left: 2, z: 25 },
    { size: 280, top: 10, left: 10, z: 50 },
    { size: 260, top: 20, left: 20, z: 75 },
    { size: 220, top: 40, left: 40, z: 100 },
    { size: 160, top: 70, left: 70, z: 125 },
    { size: 20, top: 140, left: 140, z: 150, border: true },
  ];
  return (
    <div className="sphere" >{/* Se puede cambiar la imagen de fondo de la esfera por cualquier otra imagen que se desee. Alexis */}
      {meridians}
      {latitudes.map((lat, i) => (
        <div
          key={`latitude-${i}`}
          className="latitude"
          style={{
            width: `${lat.size}px`,
            height: `${lat.size}px`,
            top: `${lat.top}px`,
            left: `${lat.left}px`,
            transform: `rotateY(90deg) translateZ(${lat.z}px)`,
            border: lat.border ? "10px" : undefined,//He quitado los colores negro de la parte superior de la esfera. Alexis
          }}
        />
      ))}
      <div className="axis"></div>
      <div className="axis"></div>
    </div>
  );
};

export default Sphere;

