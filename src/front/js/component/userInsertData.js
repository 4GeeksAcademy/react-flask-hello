import React, { useState } from "react";

export const UserInsertData = () => {
    const [newDateTime, setNewDateTime] = useState('');
    const [newLocation, setNewLocation] = useState({ latitude: '', longitude: '' });
    const [liters, setLiters] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setNewDateTime([...newDateTime, { label: newDateTime, done: false }]);
        setNewDateTime("");
        setNewLocation([...newLocation, { label: newLocation, done: false }]);
        setNewLocation("");
        setLiters([...liters, { label: liters, done: false }]);
        setLiters("");
    };

    const handleChange = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        } else {
            setNewDateTime(e.target.value);
            setLiters(e.target.value);
        }
    };

    return (
        <div className="userInsertData container-fluid">
            <div className="input-group input-group-sm mb-3 ol-sm-10">
                <input
                    type="datetime-local"
                    id="collecting_time"
                    className="form-control"
                    placeholder="Date & Time"
                    aria-describedby="button-addon2"
                    value={newDateTime}
                    onChange={(e) => setNewDateTime(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                    Add
                </button>
            </div>
            <div className="input-group input-group-sm mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    aria-label="Location"
                    aria-describedby="button-addon2"
                    onChange={(e) => setNewLocation({ ...newLocation, newLocation: e.target.value })}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                    Add
                </button>
            </div>
            <div className="input-group input-group-sm mb-3">

                <input
                    type="number"
                    className="form-control"
                    placeholder="Liters"
                    aria-label="Liters"
                    step="0.1" min="0"
                    aria-describedby="button-addon2"
                    value={liters}
                    onChange={(e) => setLiters(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmit}>
                    Add
                </button>
            </div>

        </div>
    )
}; 