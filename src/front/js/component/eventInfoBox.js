import React from "react";
import { useState, useEffect } from "react";


const getInitialCheckboxState = () => false;

export const EventInfoBox = () => {
    const [eventDetails, setEventDetails] = useState({});
    const [clicksCount, setClicksCount] = useState(0);
    const [isChecked, setIsChecked] = useState(getInitialCheckboxState());
    const [checkboxState, setCheckboxState] = useState(localStorage.getItem('checkboxState'));
    const adminRouteRequirement = "/api/events";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;

    useEffect(() => {
        setIsChecked(checkboxState === 'on');
    }, [checkboxState]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setEventDetails(data));
    }, []);

    useEffect(() => {
        const clicksApiUrl = `${process.env.BACKEND_URL}/api/clicks`;
        fetch(clicksApiUrl)
            .then(response => response.json())
            .then(newData => setClicksCount(newData))
            .catch(error => console.error('Error:', error));
    }, [checkboxState]);

    const handleCheckboxChange = () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            alert("Please log in to use the checkbox");
            return;
        }
        const adminRouteRequirement = "/api/clickupdate";
        const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
        const checkboxState = document.querySelector('#myCheckbox').checked ? 'on' : 'off';

        localStorage.setItem('checkboxState', checkboxState);
        setCheckboxState(checkboxState);

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkbox_state: checkboxState })
        })
            .then(response => response.json())
            .then(() => {
                const clicksApiUrl = `${process.env.BACKEND_URL}/api/clicks`;
                fetch(clicksApiUrl)
                    .then(response => response.json())
                    .then(newData => setClicksCount(newData))
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        const storedCheckboxState = localStorage.getItem('checkboxState');
        setIsChecked(storedCheckboxState === 'on');
    }, []);

    return (
        <div className="EventCard">
            <h3> Upcoming <span className="events"> EVENTS:</span></h3>
            <p>
                <i className="fa-sharp fa-regular fa-calendar-days"></i> &nbsp;
                <span className="event-day">DAY:</span> {eventDetails.day}</p>
            <p>
                <i className="fa-sharp fa-regular fa-clock"></i> &nbsp;
                <span className="event-time">TIME:</span>{eventDetails.hour}</p>
            <p>
                <i className="fa-sharp fa-solid fa-location-dot"></i> &nbsp;
                <span className="event-location">LOCATION: </span>{eventDetails.location}</p>
            <p>
                <i className="fa-sharp fa-solid fa-down-left-and-up-right-to-center"></i>&nbsp;
                <span className="event-meeting-point">MEETING POINT:</span> {eventDetails.meeting_point}</p>
            <label className="checkbox-container">
                <input type="checkbox" id="myCheckbox" name="myCheckbox" onChange={handleCheckboxChange} checked={isChecked} />
                <span className="label-text">Count me in</span>
                <p className="clicks-count ms-4">Smilers in: {clicksCount}</p>
            </label>
        </div>
    );
};