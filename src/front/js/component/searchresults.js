import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const SearchResults = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            <h1>Search Results</h1>
            <div className="row">
                {store.filteredCoins && store.filteredCoins.length > 0 ? (
                    store.filteredCoins.map((coin) => (
                        <div key={coin.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{coin.name}</h5>
                                    <p className="card-text">Symbol: {coin.symbol}</p>
                                    <p className="card-text">Price: ${coin.current_price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};
