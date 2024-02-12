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
        

            <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
            <form className="form-floating">
            <label htmlFor="location">Location:</label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onBlur={handleBlur}
                        />
            </form>
            <form className="form-floating">
            <label htmlFor="liters">Liters:</label>
                        <input
                            id="liters"
                            type="number"
                            value={liters}
                            onChange={(e) => setLiters(e.target.value)}
                            onBlur={handleBlur}
                        />
            </form>
            </div>
            );
    
};
