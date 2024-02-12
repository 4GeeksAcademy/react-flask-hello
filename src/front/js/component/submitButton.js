import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
export const SubmitButton = () => {

    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(true)
    const [pending, setPending] = useState(false);
  

    const handleSubmitData = async () => {

        try {
            setPending(true);
            await actions.submitData();
           
        } catch (error) {
            console.error("An error occurred while submitting data: ", error);
        } finally {
            setPending(false);
        }
    };

    return (
        <button type="button" className="btn btn-info btn-sm me-2" disabled={!active} onClick={handleSubmitData}>
            Submit tracking
        </button>
    );
   
}; 
