import React, { useState } from "react";

const handleSearch = (searchItem) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchItem, {
        method: "GET",
        mode: "cors"          // fine to include (default is also "cors")
        // no custom headers → no CORS pre-flight → no 403/404
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);   // data.drinks is the array of results
        })
        .catch(err => console.error(err));
};
export const Search = () => {
    const [Search, setSearch] = useState("")

    return (
        <div className="search mt-auto py-3 text-center">
            <div className="cocktail">
                <input onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button onClick={() => handleSearch(Search)} className="Search">Search</button>
        </div>
    )
}
