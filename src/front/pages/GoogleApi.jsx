import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
export const GoogleApi = () => {
  const { store, dispatch } = useGlobalReducer();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSearch = () => { // Function to handle the search button click 
    if (!navigator.geolocation) { // Check if geolocation is supported on browser // Function to handle the search button click--object is provided by the browser's JavaScript engine 
      setError("Geolocation is not supported by this browser."); // If geolocation is not supported, set an error message
      return; // Exit the function if geolocation is not supported
    }

    navigator.geolocation.getCurrentPosition( // Get the current position of the user  JavaScript feature for web development.
      async (position) => { // Callback function to handle the position received from geolocation
        const { latitude, longitude } = position.coords; // Extract latitude and longitude from the position object
        const payload = { latitude, longitude, cocktail: "mojito" };
        console.log("▶️  Using coords:", latitude, longitude);
        console.log("!!!!This is the object of the geolocation!!! :", position);


        try { // Try to fetch places from the backend API using the coordinates and cocktail type
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/places`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Fixed header key
            body: JSON.stringify(payload),
          });
          console.log("▶️ Fetch returned status:", res.status);
          const data = await res.json();
          console.log("▶️  Data received:", data);

          if (data.error) { // Check if there is an error in the response
            console.error("!!!Backend error:", data.error);
            setError(data.error); // Set the error state with the error message from the backend
            setPlaces([]);
          } else {
            setError(""); // Clear any previous error messages
            console.log("▶️  Places found:", data.places);
            setPlaces(data.places);
          }
        } catch (err) { // Catch any errors that occur during the fetch operation
          console.error("!!!Error fetching places:", err);
          setError(err.message);
        }
      },
      (geoErr) => {
        console.error("!!!Geolocation error:", geoErr);
        setError("Unable to retrieve your location. Please try again later.");
      }
    );
  };

  return (
    <div className="container-fluid min-vh-100" style={{ height: "100vh" }}>
      <div className="row px-md-5" style={{ height: "70%" }}>
        <div className="col-9 h-100 bg-primary">
          <button onClick={handleSearch} className="btn btn-success mb-3">Search drinks</button>
        </div>
        <div className="col-3 h-100  d-flex flex-column">
          <div className="flex-grow-1 overflow-auto">

            {error && <div className="alert alert-danger">{error}</div>}
            {places.length > 0 ? (
              <ul className="list-group">
                {places.map((place, index) => (
                  <li key={index} className="list-group-item">
                    <h5>{place.name}</h5>
                    <p>{place.address}</p>
                    <p><strong>Rating:</strong> {place.rating}</p>
                    <p><strong>Opinions:</strong> {place.user_ratings_total}</p>
                    <button onClick={()=> handleSelect(place.place_id)} className="btn btn-success">More info</button>
                  </li>
                ))}

              </ul>
            ) : (<p>No places found.</p>)}


          </div>
        </div>
      </div>
      <div className="row px-md-5" style={{ height: "30%" }}>
        <div className="col-12 h-100 bg-danger">bbb</div>
      </div>
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>

    </div>
  );
};











// {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if exists */}
// {places.length > 0 ? (
//   <ul className="list-group">
//     {places.map((place, index) => (
//       <li key={index} className="list-group-item">
//         <h5>{place.name}</h5>
//         <p>{place.address}</p>
//         <p>Rating: {place.rating}</p>
//         <a href="#" className="btn btn-primary">Go somewhere</a>
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p>No places found.</p>
// )}
// {/* Display the list of places if available */}
