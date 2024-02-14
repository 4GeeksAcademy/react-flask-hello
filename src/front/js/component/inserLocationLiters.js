import React, { useContext, useState, useCallback } from "react";
import { Context } from "../store/appContext";
import debounce from "lodash.debounce";

export const InsertLocationLiters = () => {
    const { store, actions } = useContext(Context);
       
    const handleLocation = (e) => {
        actions.setLocation(e.target.value);
    };
    
    const handleLiters = (e) => {
        actions.setLiters (e.target.value); 
    };

    return (
            <div className="insert-location-liters-container container-fluid d-flex justify-content-center">
            <form className="form-floating">
            <label className="label pr-" htmlFor="location"></label>
                        <input
                            id="location"
                            type="text"
                            value={store.location}
                            onChange={(e) => handleLocation(e)}
                            placeholder="location"
                     
                        />
            </form>
            <form className="form-floating">
            <label htmlFor="liters"></label>
                        <input
                            id="liters"
                            type="number"
                            value={store.liters}
                            onChange={(e) => handleLiters(e)} 
                            placeholder="liters"

                        />
            </form>
            </div>
            );
    
};
