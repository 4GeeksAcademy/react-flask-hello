import React, { useContext, useState, useCallback } from "react";
import { Context } from "../store/appContext";
import debounce from "lodash.debounce";

export const InsertLocationLiters = () => {
    const { store, actions } = useContext(Context);
    const [location, setLocation] = useState('');
    const [liters, setLiters] = useState('');

    const debouncedHandleSubmit = useCallback(
        debounce(() => {
            try {
                const response = actions.submitData(undefined, undefined, location, liters);
                
            } catch (error) {
                console.error(error);
            }
        },  500), 
        [location, liters] 
    );

    const handleBlur = () => {
        debouncedHandleSubmit();
    };

    return (
            <div className="insert-location-liters-container container-fluid d-flex justify-content-center">
            <form className="form-floating">
            <label className="label pr-" htmlFor="location"></label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            placeholder="location"
                            onChange={(e) => setLocation(e.target.value)}
                            onBlur={handleBlur}
                        />
            </form>
            <form className="form-floating">
            <label htmlFor="liters"></label>
                        <input
                            id="liters"
                            type="number"
                            value={liters}
                            onChange={(e) => setLiters(e.target.value)}
                            placeholder="liters"
                            onBlur={handleBlur}
                        />
            </form>
            </div>
            );
    
};
