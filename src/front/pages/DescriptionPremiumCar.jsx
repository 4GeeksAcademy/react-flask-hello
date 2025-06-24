import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function DescriptionPremiumCar() {
  const { license_plate } = useParams();
  const [car, setCar] = useState(null);
  useEffect(() => fetch(`${backendUrl}/api/cars/${license_plate}`).then(r=>r.json()).then(setCar), [license_plate]);
  if (!car) return <div>Loading...</div>;
  return (
    <div>
      <h2>{car.make} {car.model} {car.year}</h2>
      <ul>
        <li>Plate: {car.license_plate}</li>
        <li>Fuel: {car.fuel_type}</li>
        <li>Transmission: {car.transmission}</li>
        <li>Cylinders: {car.cylinders}</li>
        <li>Displacement: {car.displacement}</li>
        <li>Drive: {car.drive}</li>
        <li>Pieces: {car.pieces}</li>
        <li>Price: ${car.price}/day</li>
      </ul>
    </div>
  );
}

