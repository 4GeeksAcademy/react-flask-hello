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

    return (
        <div className="insert-data-container container-fluid d-flex justify-content-center">
            <div className="dropdown">
                <h4 className="insert-data-title "> Did you go to the Sandsmiler's mission without the Timecounter? </h4>  
                    <p className="inser-data-text"> Don't worry! Add <span class="arrow-down">&#9660;</span>  </p> 
                <button className="calendar-dropdown btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Off-site time:
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <input
                            type="datetime-local"
                            id="start_time"
                            className="form-control"
                            aria-describedby="button-addon2"
                            onChange={e => handleStartTimeChange(e)}

                        />
                    </li>
                    <li>
                        <input
                            type="datetime-local"
                            id="finish_time"
                            className="form-control"
                            aria-describedby="button-addon2"
                            onChange={e => handleFinishTimeChange(e)}

                        />
                    </li>
                </ul>
            </div>

        </div>
    );
};