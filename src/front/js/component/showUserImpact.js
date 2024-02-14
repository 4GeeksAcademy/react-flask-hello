import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const ShowUserImpact = () => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleUserImpactData = async () => {
            console.log("handleUserImpactData");
            await actions.getUserImpact();
        }

        handleUserImpactData();
    }, []);

    const { total_time, total_liters, total_days, average_time, average_liters } = store;
    console.log(store.total_time)
    return isLoading ?
        (
            <p> Smile.. your impact is upgrading </p>
        ) : (

            <div className="user-impact-text text-start">
            <h3 className="user-impact"> Your &nbsp; <span className="impact"> IMPACT</span> : </h3>
            <div className="user-total-impact-data">
            <p><span className="total"> TOTAL</span>
            <div> Time <strong> {store.total_time}</strong> & Amount of <strong>{store.total_liters}</strong>L</div> </p> 
            <p><span className="average"> AVERAGE</span> 
            <div> Time <strong>{store.average_time}</strong> & <strong>{store.average_liters}</strong>L per session </div> </p>
            </div>
        </div>
        
     );
}; 