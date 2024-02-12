import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const TotalImpact = () => {
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const handleTotalImpact = async () => {
            try {
                const totalImpactData = await actions.getTotalImpact();
             
                if (totalImpactData) {
                    setIsLoading(false); 
                }
            } catch (error) {
                console.error("Error fetching total impact data", error);
            }
        }

        handleTotalImpact();
    }, []);

    return isLoading ? (
        <p>Smile.. total impact is uploading</p>
    ) : (
        <div>
            <p>Total Users: {store.total_users}</p>
            <p>Total Time Spent: {store.total_impact_time}</p>
            <p>Total Liters: {store.total_impact_liters}</p>
        </div>
    );
};