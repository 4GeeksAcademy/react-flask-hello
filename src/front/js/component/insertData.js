import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const InsertData = () => {
    const { store, actions } = useContext(Context);

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
                            id="collecting_time"
                            className="form-control"
                            aria-describedby="button-addon2"
                            value={store.start_time}
                            onChange={(e) => actions.setStartTime(e.target.value)}
                        />
                    </li>
                    <li>
                        <input
                            type="datetime-local"
                            id="complete_collecting_time"
                            className="form-control"
                            aria-describedby="button-addon2"
                            value={store.finish_time}
                            onChange={(e) => actions.setFinishTime(e.target.value)}
                        />
                    </li>
                
            
                </ul>
            </div>

        </div>
    );
};
