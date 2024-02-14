import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const InsertData = () => {
    const { store, actions } = useContext(Context);

    if (store.start_time === null) {
        actions.setStartTime([]);
    }
    if (store.finish_time === null) {
        actions.setFinishTime([]);
    };

    const handleStartTimeChange = (e) => {
        actions.setStartTime(e.target.value);
    };

    const handleFinishTimeChange = (e) => {
        actions.setFinishTime(e.target.value);
    };

    const handleNewLocation = (e) => {
        actions.setNewLocation(e.target.value);
    };
    
    const handleNewLiters = (e) => {
        actions.setNewLiters (e.target.value); 
    };

    return (
        <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
            <div className="dropdown">
                <p className="title mt-4"> Did you go to the Sandsmiler's mission without the Timecounter?
                    Don't worry! </p>
                <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add your off-site collection data here:
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <input
                            type="datetime-local"
                            id="start_time"
                            className="form-control"
                            aria-describedby="button-addon2"
                            onChange={e=>handleStartTimeChange(e)}
                          
                        />
                    </li>
                    <li>
                        <input
                            type="datetime-local"
                            id="finish_time"
                            className="form-control"
                            aria-describedby="button-addon2"
                            onChange={e=>handleFinishTimeChange(e)}
                            
                        />
                    </li>
                </ul>
            </div>

        </div>
    );
};