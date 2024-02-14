import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
export const SubmitButton = () => {

    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(true)
    const [pending, setPending] = useState(false);
  

    const handleSubmit = async () => {

        try {
            actions.setLiters;
            actions.setLocation;

            if (store.start_time && store.finish_time &&  store.location && store.liters){
                actions.submit_manual_data();
                
            } else { 
                await actions.submitData(

                );
            }
            
           
        } catch (error) {
            console.error("An error occurred while submitting data: ", error);
        } finally {
            setPending(false);
        }
    };

    return (
        <button type="button" className="counter-submit-button" disabled={!active} onClick={handleSubmit}>
            SUBMIT 
        </button>
    );
   
}; 