import React, { useState, useEffect, useContext } from 'react';
import "../../styles/privatePage.css";
import BasicInfo from "./PrivatePage/basicInfo.js";
import { Link } from 'react-router-dom';
import Password from './PrivatePage/password.js';
import { Context } from "../store/appContext";



const PrivatePage = () => {
    const [activeTab, setActiveTab] = useState('basic-info');
    const [savedItineraries, setSavedItineraries] = useState([]);
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = actions.getAccessToken();

                const response = await fetch(process.env.BACKEND_URL + '/api/privatePage', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                    actions.setIsLoggedIn(true);
                    console.log(userData);
                    
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchUserData();

        const fetchSavedItineraries = async () => {
            try {
                const accessToken = actions.getAccessToken();

                const response = await fetch(process.env.BACKEND_URL + '/api/getItineraries', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result)
                    setSavedItineraries(result.itineraries);
                } else {
                    console.error('Error fetching saved itineraries:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        if (activeTab === 'bookmarks') {
            fetchSavedItineraries();
        }
    }, [activeTab, setSavedItineraries]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const handleViewItinerary = (index) => {
        const selectedItinerary = savedItineraries[index];
        setSelectedItinerary(selectedItinerary);
        setShowModal(true);
    };

    return (
        <div className="container">
            <div className="card card-nav">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('basic-info');
                                }}
                                href="#basic-info"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                Basic Info
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'change-password' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('change-password');
                                }}
                                href="#change-password"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                                </svg>
                                Change Password
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'bookmarks' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('bookmarks');
                                }}
                                href="#bookmarks"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bookmarks" viewBox="0 0 16 16">
                                    <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1z" />
                                    <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1" />
                                </svg>
                                Bookmarks
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeTab === 'achievements' ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange('achievements');
                                }}
                                href="#achievements"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trophy" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z" />
                                </svg>
                                Achievements
                            </a>
                        </li>
                        <li className="nav-item" id="createIt" >
                            <Link className="" to="/createItinerary">
                                <button
                                    id='pixel'
                                    className="nav-link"

                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-airplane" viewBox="0 0 16 16">
                                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599" />
                                    </svg>
                                    Create Itinerary
                                </button >
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="card-body tab-content">
                    <div className={`tab-pane fade show ${activeTab === 'basic-info' ? 'active' : ''}`} id="basic-info">
                        <BasicInfo email={userData?.email} firstName={userData?.first_name} lastName={userData?.last_name} />
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'change-password' ? 'active' : ''}`} id="change-password">
                        <Password></Password>
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'bookmarks' ? 'active' : ''}`} id="bookmarks">
                        {console.log(savedItineraries)}
                        {savedItineraries && savedItineraries.length > 0 ? (
                            savedItineraries.map((itinerary, index) => (
                                <div key={index}>
                                    {itinerary.itinerary_name && <h2>{itinerary.itinerary_name}</h2>}
                                    <div>
                                        {itinerary.data.map((day, index) => (
                                            <div className="mapped" key={index}>
                                                <div className='days'> <h3>Day {index + 1}</h3> </div>
                                                <div className='itinerary'>
                                                    <div className='object'><strong>Accomodation</strong> {day.accomodation}</div> <br />
                                                    <div className='object'><strong>Activities</strong></div>
                                                    <ul>
                                                        {day.activities.map((activity, i) => (
                                                            <li key={i}>{activity}</li>
                                                        ))}
                                                    </ul>
                                                    <div className='object'> <strong>Lunch</strong> {day.lunch}</div> <br />
                                                    <div className='object'> <strong>Dinner</strong> {day.dinner}</div> <br />
                                                    <div className='object'> <strong>Transportation</strong> {day.transportation}</div>
                                                </div>
                                                {index < itinerary.data.length - 1 && <hr className='day-divider' />}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => handleViewItinerary(index)}>
                                        View Full Itinerary
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No saved itineraries yet</p>
                        )}
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'achievements' ? 'active' : ''}`} id="achievements">
                        <p>Achievements Content Goes Here</p>
                    </div>
                    <div className={`tab-pane fade show ${activeTab === 'itinerary' ? 'active' : ''}`} id="itinerary">
                        <p>Create Itinerary Content Goes Here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivatePage;
