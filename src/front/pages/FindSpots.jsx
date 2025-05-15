import { useEffect, useState } from "react";

// !!use encodeURIComponent() to encode the category name and to make it safe to use in a URL e.g "Seafood & Fish" becomes "Seafood%20%26%20Fish" not spaces and special characters.
// You don't need to import it, it's a built-in function in JavaScript.

export const FindSpots = () => {
  const [drinks, setDrinks] = useState([]); // it will hold the catalog of drinks.
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);



  //1) function to load our Cocktails by category(fetching them from the api)
  // we use async/await to fetch the data
  const fetchCategories = async () => {
    setError(""); // clear any previous error message as soon as the user clicks again.
    setLoading(true) // set loading to true to show the loading spinner
    try {

      const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list") // Browsers assume no protocol means “load from my own server.” Always include https:// (or http://) when calling an external API.
      const data = await res.json()
      const cocktailsName = data.drinks.map(drink => drink.strCategory); // Since this is an array of objects, we use map to extract the name of the drinks from the data object

      if (!res.ok) { // check if the response is ok
        // if the response is not ok, we log the error and set the error state to display the error message.       
        console.log("!!>>>Error feching the data from endpoint", res.message);
        setError(`There was a problem wiht the server, try again. ${res.status}`)
        return // we  do "return" to stop the execution of the function early, so you DON'T accidentally call setCategories(...)
      }
      else {
        setCategories(cocktailsName)
      }
    }
    catch (err) {
      console.error("!!>>>Error loading categories", err)
      setError(`Server error: ${err.message}`);
    }
    finally {
      setLoading(false) // set loading to false since we are done loading. 

    }
  };

  //2) funtion to load the cocktails from each category
  const fetchDrinksFromCategories = async (category) => {
    setError(""); // clear any previous error messag  as soon as the user clicks again.
    setDrinks([]);  // clear previous results  
    setLoading(true)  // set loading to true since we are loading new data.
    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`) // we use encodeURIComponent to encode the category name.

      if (!res.ok) {
        console.log("!!>>>Error feching the data from endpoint", res.message);
        setError("There was a problem wiht the server, try again.", res.message);
        setDrinks([]); // clear previous results        
        return // we  do "return" to stop the execution of the function early.
      }
      const data = await res.json()
      setDrinks(data.drinks || []); // if there are no drinks, we set the drinks state to an empty array  
      console.log("!!>>>Drinks from category", data.drinks);

    }
    catch (err) {
      console.log("!!!>>Error in catch", err);
      setDrinks([]); // clear previous results 
      setError(`Server error: ${err.message}`);
    }
    finally {
      setLoading(false)  // set loading to false since we are done loading.
    }
  }

  //3) function to load the full data of the drinks
  // we use async/await to fetch the data
  // we use encodeURIComponent to encode the category name.
  // we use Promise.all to fetch all the drinks at once.
  // we use map to iterate over the drinks and fetch the data for each drink.
  // we use Promise.all to wait for all the promises to resolve before setting the drinks state.
  // we use setDrinks to set the drinks state to the full data of the drinks.
  // we use setLoading to set the loading state to false since we are done loading.  
  const getFullDataFromDrinks = async (idDrink) => {

    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      if (!res.ok) {
        console.log("Failed to fetch data from endpoint", res.message);
        setError("There was a problem wiht the server, try again.", res.message)
        return;
      }
      const data = await dataFromDrinks.json()
      console.log("Details for", id, data.drinks[0]);
      return data.drinks[0]

    }
    catch (err) {
      console.log(`Error in catch: ${err.message}`);
      setError(`Server error: ${err.message}`);
    }




  }
  console.log("Id drinkss", getFullDataFromDrinks);
  

  //4) useEffect to call the getCocktails function when the component mounts it means that the function will be called when the component is first rendered.
  // we use an empty dependency array to ensure that the function is only called once
  useEffect(() => {
    fetchCategories()
    getFullDataFromDrinks(11007)
  }, []);



  return (
    // since categories is now a string[] we can use map to iterate over it and display the name of the drinks in a list.
    // we use the key prop to give each element a unique key, which helps React identify which items have changed, are added, or are removed.    
    <div
      className="page-wrapper"
      style={{
        position: "relative",   //establishes the coordinate system for any absolutely positioned children, lets the overlay fill its parent.
        minHeight: "100vh"      // ensures it’s at least the screen height
      }}
    >
      {loading && (
        // 2) This overlay is ABSOLUTE inside the wrapper  
        <div
          className="loader-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.8)",
            zIndex: 999
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}
      {/* CATEGORY BUTTONS */}
      <div className="d-flex flex-wrap gap-2 mb-4 mt-4 justify-content-center">
        {categories.map(item => (
          <button
            key={item}
            className={
              "btn btn-lg " +
              (item === selectedCategory
                ? "btn-primary"
                : "btn-outline-primary") +
              " px-4 py-2"
            }
            onClick={() => {
              setSelectedCategory(item);
              fetchDrinksFromCategories(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* “No drinks” message */}
      {!loading && drinks.length === 0 && selectedCategory && (
        <p>No drinks found in {selectedCategory}.</p>
      )}
      {!loading && drinks.length > 0 && (
        <div id="container-find-spot" className="container ">
          <div className="row gx-3 gy-4">
            {
              drinks.map(d => (
                <div key={d.idDrink} className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="card cocktail-find-spot">
                    <img src={d.strDrinkThumb} className="card-img-top" alt={d.strDrink} />
                    <div className="card-body">
                      <h5 className="card-title">{d.strDrink}</h5>
                      <button className="btn btn-primary" onClick={() => { }}>
                        Find spots by location
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

}













