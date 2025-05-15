import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";


export const FindSpots = () => {
  const [drinks, setDrinks] = useState([]); // it will hold the catalog of drinks.
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("");


  //1) function to load our Cocktails by category(fetching them from the api)
  // we use async/await to fetch the data
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list") // Browsers assume no protocol means “load from my own server.” Always include https:// (or http://) when calling an external API.
      const data = await res.json()
      const cocktailsName = data.drinks.map(drink => drink.strCategory); // Since this is an array of objects, we use map to extract the name of the drinks from the data object

      if (!res.ok) { // check if the response is ok
        // if the response is not ok, we log the error and set the error state to display the error message.       
        console.log("!!>>>Error feching the data from endpoint",res.message);
        setError(`There was a problem wiht the server, try again. ${res.status}`)
        return // we  do "return" to stop the execution of the function early, so you DON'T accidentally call setCategories(...)
      }
      else {
        setCategories(cocktailsName)
      }



    }
    catch (err) {
      console.error("!!>>>Error loading categories", err)
      setError("There was a problem wiht the server, try again.", err.message);
    }
  };

  //2) funtion to load the cocktails from each category
  const fetchDrinksFromCategories = async () => {
    try{
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c={category}`)    
      if(!res.ok){
        console.log("!!>>>Error getting the drinks", res.message);        
        setError("There was a problem wiht the server, try again.", res.message);
      }
      const data = await res.json()
      setDrinks(data.drinks || []); // if there are no drinks, we set the drinks state to an empty array  
    }
    catch(err){
      console.log("!!!>>Error in catch", err);
      setDrinks([]); // clear previous results 
      setError("There was a problem wiht the server, try again.", err.message);   

    }
    


  }

  //3) useEffect to call the getCocktails function when the component mounts it means that the function will be called when the component is first rendered.
  // we use an empty dependency array to ensure that the function is only called once
  useEffect(() => {
    fetchCategories()
  }, []);



  return (
    // since categories is now a string[] we can use map to iterate over it and display the name of the drinks in a list.
    // we use the key prop to give each element a unique key, which helps React identify which items have changed, are added, or are removed.    
    <div className="container">
      <ul className="list-group">
      {categories.map(
        (item, index) => (
          <li key={index} className="list-group-item">
            <button className={item === select}>
              {item}
            </button>            
          </li>

        ))}
        </ul>

    </div>
  );

};










