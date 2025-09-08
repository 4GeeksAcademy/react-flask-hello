import React, { useState, useEffect } from 'react';

function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                }
                //above is needed to access env token for backend, DOUBLE CHECK
            });
            // Check for server errors
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
                setIsVerified(data.is_verified || false);
                setIsActive(data.is_active || true);

            } catch (error) {
                // Handle parsing/network errors
                console.error("Network or parsing error:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>My Profile</h2>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Verified: {isVerified ? "Yes" : "No"}</p>
            <p>Active: {isActive ? "Yes" : "No"}</p>
            {profilePhoto && <img src={profilePhoto} alt="Profile" width="100" />}

            <div>
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
        </div>
    );
}

export default Profile;
