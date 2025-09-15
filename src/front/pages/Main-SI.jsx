import React, {useState} from 'react';


// Profile field
function Profile(){
const [name, setName] = useState ("Intial Name");
const [password, setPassword] = useState ("");
const [email, setEmail] = useState ("example.com")
const [profilePic, setProfilePic] = useState("");
const [bio, setBio] = useState ("This is my bio...");


return(
    <div>
        <h2>My Profile</h2>

        <p>Name:{name}</p>
        <p>Email:{email}</p>
        <p>Password:{password ? "********" : "Not set"}</p>
        <p>Bio: {bio}</p>
        {profilePic && <img src={profilePic} alt="Profile" width="100" />}
        
        {/* makes it so that img shows if url exists, if not it wont render */}

        
    {/* Inputs */}

      <div>
        <label>
            Name:
            <input
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
        </label>
      </div>

      <div>
        <label>
            Email:
            <input
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
      </div>

      <div>
        <label>
            Password:
            <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </label>
      </div>

      <div>
        <label>
            Bio:
            <textarea
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
            />
        </label>
      </div>

      <div>
        <label>
            Profile Picture:
            <input
            type="text" 
            value={profilePic} 
            onChange={(e) => setProfilePic(e.target.value)}
            />
        </label>
      </div>
    </div>
    );
}

export default Profile;

//logout ASK TEAM




