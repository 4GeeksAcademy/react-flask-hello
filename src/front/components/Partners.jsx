import React from "react";
import Mapa from "./Mapa";

function Partners() {
  const markers = [
    {
      id: 1,
      name: "Madrid",
      position: { lat: 40.411882, lng: -3.687112 },
    },
    {
      id: 2,
      name: "Barcelona",
      position: { lat: 41.387785, lng: 2.185822 },
    },
    {
      id: 3,
      name: "Talavera de la Reina",
      position: { lat: 39.959734, lng: -4.822666 },
    },
  ];

  return (
    <div className="d-flex justify-content-center">
      <Mapa markers={markers} />
    </div>
  );
}
export default Partners;