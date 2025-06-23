import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const CardPremiumCar = ({ vehicle }) => {
  const nav = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const fav = store.favorites.some(f => f.license_plate === vehicle.license_plate);
  return (
    <div className="card m-2" style={{width: '240px'}}>
      <img src={vehicle.image_url} style={{height:'140px',objectFit:'cover'}} alt={vehicle.name} /> {/* El admin debe subir la foto */}
      <div className="card-body">
        <h5>{vehicle.make} {vehicle.model} {vehicle.year}</h5>
        <ul>
          <li>Fuel: {vehicle.fuel_type}</li>
          <li>Transmission: {vehicle.transmission}</li>
          <li>Cylinders: {vehicle.cylinders}</li>
          <li>Pieces: {vehicle.pieces}</li>
          <li>Price: ${vehicle.price}/day</li>
        </ul>
        <button onClick={()=>nav(`/premium/${vehicle.license_plate}`)}>Details</button>
        <button onClick={() => dispatch({ type: fav ? "removeFavorite" : "newFavorite", payload: vehicle })}>
          {fav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};
export default CardPremiumCar;