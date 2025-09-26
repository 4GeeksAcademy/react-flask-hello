import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import "./Landing.css";
import DashboardNavbar from "../components/DashboardNavbar";

//check if token is in local storage,
//if not redirect to login page

function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // const [password, setPassword] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    const [profilePhoto, setProfilePhoto] = useState("");

    const [location, setLocation] = useState("");
    const [language, setLanguage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        //check if token exists in local storage, if it does then fetch profile
        // if it doesnt, redirect to login
        const token = localStorage.getItem("token");
        // if (!token) {
        //     navigate("/login");
        //     return;
        // }

        const fetchProfile = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}` //needed to access protected route
                }
            });

            // Check for server errors (both # code and text)
            if (!response.ok) {
                console.error("Server error:", response.status, response.statusText);
                return;
            }

            try {
                // Parse JSON & update state only if server responded OK
                const data = await response.json();

                setFirstName(data.first_name || "");
                setLastName(data.last_name || "");
                setEmail(data.email || "");
                setProfilePhoto(data.profile_photo || "");

                // setPassword(data.password || "");
                // setNewPassword(data.new_pass_word || "");
                // setConfirmPassword(data.confirm_pass_word || "");

                setLocation(data.location || "");
                setLanguage(data.language || "");

            } catch (error) {
                // Handle parsing/network errors
                console.error("Network or parsing error:", error);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const payload = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                profile_photo: profilePhoto,
                // password: password,
                // new_pass_word: newPassword,
                // confirm_pass_word: confirmPassword,
                location: location,
                language: language
            };

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` //include token for save too
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                console.error("Server error:", response.status, response.statusText);
                return;
            }

            const data = await response.json();
            console.log("Profile saved successfully:", data);

        } catch (error) {
            console.error("Error saving profile:", error);
        }
    };

    return (
        <div className="profile-page">
            <h2 className="My-profile-title">My Profile</h2>
            <DashboardNavbar />
            <div className="container">
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Email: {email}</p>

                {/* <p>Password: {password}</p>
            <p>New Password: {newPassword}</p>
            <p>Confirm Password: {confirmPassword}</p> */}

                {profilePhoto && <img src={profilePhoto} alt="Profile" width="100" />}

                <p>Location: {location}</p>
                <p>Language: {language}</p>

                <div className="form-group"><div>
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </label>
                </div>
                    <div>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Profile Photo URL:
                            <input
                                type="text"
                                value={profilePhoto}
                                onChange={e => setProfilePhoto(e.target.value)}
                            />
                        </label>
                    </div>
                    {/* <div>
                <label>
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    New Password:
                    <input
                        type="text"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Confirm Password:
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
            </div> */}
                    <div>
                        <label>
                            Location:
                            <input
                                type="text"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Language:
                            <input
                                type="dropdown"
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <button className="save-button" onClick={handleSave}>Save Button</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;