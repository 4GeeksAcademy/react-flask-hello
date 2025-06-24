import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import CardSubcompactCar from "../components/CardSubcompactCar.jsx";
import CardMediumCar from "../components/CardMediumCar.jsx";
import CardPremiumCar from "../components/CardPremiumCar.jsx";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(backendUrl+"/api/cars?type=subcompact", { headers })
      .then(r => r.json())
      .then(data => dispatch({ type: "set_cars", category: "subcompact", payload: data }))
      .catch(console.error);

    fetch(backendUrl+"/api/cars?type=medium", { headers })
      .then(r => r.json())
      .then(data => dispatch({ type: "set_cars", category: "medium", payload: data }))
      .catch(console.error);

    fetch(backendUrl+"/api/cars?type=premium", { headers })
      .then(r => r.json())
      .then(data => dispatch({ type: "set_cars", category: "premium", payload: data }))
      .catch(console.error);
  }, []);

  // validaciones

  return (
    <div className="container my-4">
      <h2>Favorites</h2>
      {store.favorites.length === 0 ? <p>No favorites yet.</p> :
        <div className="d-flex flex-wrap">
          {store.favorites.map(v => (
            <CardSubcompactCar key={v.license_plate} vehicle={v} />
          ))}
        </div>
      }

      <h2>Subcompact Cars</h2>
      {store.subcompact.length === 0 ? <p>No cars available in this category.</p> :
        <div className="d-flex flex-wrap">
          {store.subcompact.map(v => <CardSubcompactCar key={v.license_plate} vehicle={v} />)}
        </div>
      }

      <h2>Medium Cars</h2>
      {store.medium.length === 0 ? <p>No cars available in this category.</p> :
        <div className="d-flex flex-wrap">
          {store.medium.map(v => <CardMediumCar key={v.license_plate} vehicle={v} />)}
        </div>
      }

      <h2>Premium Cars</h2>
      {store.premium.length === 0 ? <p>No cars available in this category.</p> :
        <div className="d-flex flex-wrap">
          {store.premium.map(v => <CardPremiumCar key={v.license_plate} vehicle={v} />)}
        </div>
      }
    </div>
  );
}

