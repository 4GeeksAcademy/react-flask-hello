import React, { useState, useEffect } from 'react';
//check if token is in local storage,
//if not redirect to login page


function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const [passWord, setPassWord] = useState("");
    const [newPassWord, setNewPassWord] = useState("");
    const [confirmPassword, setConfirmPassWord] = useState("");

    const [profilePic, setProfilePic] = useState("");

    const [location, setLocation] = useState("");
    const [language, setLanguage] = useState("");

    useEffect(() => {
        //check if token exists in local storage, if it does then fetch profile
        // if it doesnt, return nothing

        // token storage
        const token = localStorage.getItem(token);
        if (token == null) {
            return <Redirect to={"/LOGIN"} />;
        }


        const fetchProfile = async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
                //above is needed to access env token for backend
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
                setIsVerified(data.is_verified || false);
                setIsActive(data.is_active || true);

                setPassword(data.password || "");
                setNewPassWord(data.new_pass_word || "");
                setConfirmPassWord(data.confirm_pass_word || "");

                setProfilePic(data.profile_pic || "");

                setLocation(data.location || "");
                setLanguage(data.language || "");

            } catch (error) {
                // Handle parsing/network errors
                console.error("Network or parsing error:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try { 
            const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            profile_photo: profilePhoto,
            is_verified: isVerified,
            is_active: isActive,
            password: passWord,
            new_pass_word: newPassWord,
            confirm_pass_word: confirmPassword,
            profile_pic: profilePic,
            location: location,
            language: language

            }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            console.error("Server error:", response.status, response.statusText);
            return;
        }
            const data = await response.json();
            console.log("Profile saved successfully:", data
        );
        } catch (error) {
            console.error("Error saving profile:", error);
        }
            
        };

        
            

    return (
        <div>
            <h2>My Profile</h2>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Verified: {isVerified ? "Yes" : "No"}</p>
            <p>Active: {isActive ? "Yes" : "No"}</p>

            <p>Password: {passWord}</p>
            <p>New Password: {newPassWord}</p>
            <p>Confirm Password: {confirmPassword}</p>

            {profilePhoto && <img src={profilePhoto} alt="Profile" width="100" />}

            <p>Location: {location}</p>
            <p>Language: {language}</p>

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
            <div>
                <label>
                    Password:
                    <input
                        type="text"
                        value={passWord}
                        onChange={e => setPassWord(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    New Password:
                    <input
                        type="text"
                        value={newPassWord}
                        onChange={e => setNewPassWord(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Confirm Password:
                    <input
                        type="text"
                        value={confirmPassword}
                        onChange={e => setConfirmPassWord(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Profile Pic:
                    <input
                        type="text" //update to file upload later
                        value={profilePic}
                        onChange={e => setProfilePic(e.target.value)}
                    />
                </label>
            </div>
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
                        type="text"
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                    />
                </label>
            </div>
            <div>   
                <button onClick={handleSave}>Save Button</button>
            </div>
        </div>
    );
}

export default Profile;
