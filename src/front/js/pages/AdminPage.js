import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom'
import { NavBar } from "../component/navbar";



export const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState("");
  const [location, setLocation] = useState("");
  const [meetingPoint, setMeetingPoint] = useState("");
  const [hour, setHour] = useState("");
  const [link, setLink] = useState("");
  const [userLevel, setUserLevel] = useState(null)
  const [userToken, setUserToken] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        navigate("/login");
        return;
      }
      setUserToken(userToken);
      fetch(`${process.env.BACKEND_URL}/api/userslevel`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserLevel(data.level);
      })
      .catch(error => {
        console.error('Error fetching user level:', error);
        navigate("/login");
      });
   }, [navigate]);
   useEffect(() => {
      const routeRequirement = "/api/users";
      const url = `${process.env.BACKEND_URL}${routeRequirement}`;
      fetch(url)
   .then(response => response.json())
   .then(data => {
      setUsers(data.results);
      setLoading(false);
   })
        .catch(error => {
          console.error(`Error fetching users: ${error}`);
          setLoading(false);
        });
   }, []);
   const handlePromote = () => {
    const adminRouteRequirement = "/api/admin";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: selectedEmail
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message || data.error);
      alert('User updated successfully!');
      return fetch(`${process.env.BACKEND_URL}/api/stripelink`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: selectedEmail,
          stripe_link_integration: link
        }),
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message || data.error);
      alert('Stripe link updated successfully!');
    })
    .catch(error => {
      console.error(`Error updating user or Stripe link: ${error}`);
    });
   };
   if (loading) {
      return <div>Loading...</div>;
   }
   const handleSubmit = (event) => {
    event.preventDefault();
    const adminRouteRequirement = "/api/event";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
    const eventData = {
         day: day,
         hour: hour,
         location: location,
         meeting_point: meetingPoint,
    };
    fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(eventData),
    })
         .then(response => {
             if (!response.ok) {
               throw new Error('Network response was not ok');
             }
             return response.json();
         })
         .then(data => {
           console.log('Success:', data);
           alert("Event created successfully");
         })
         .catch((error) => {
           console.error('Error:', error);
         });
   };
   if (loading) {
    return <div>Loading...</div>;
  }
  if (userLevel !== 3) {
    return <div>Access denied. Only users with level 3 can access this page.</div>;
  }
   return (
    <div className="admin-page">
      <NavBar />
      <div className="admin-container">
        <h3 className="upgrade mt-4 ms-4 text-left">Upgrade user level</h3>

        <div className="infoblock row align-items-start pt-4 px-2">
          <p className="mb-1 text-muted">Select a user email to promote for the next level</p>
          <div className="col">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedEmail ? selectedEmail : "Select email"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {users.map(user => (
                  <li key={user.email}>
                    <a className="dropdown-item" href="#" onClick={() => setSelectedEmail(user.email)}>
                      {user.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="input-group ms-2 pt-3">
              <span className="input-group-text" id="inputGroup-sizing-default span-size">Level</span>
              <input type="text" className="form-control input-size" value={link} onChange={e => setLink(e.target.value)} />
            </div>
          </div>

          <div className="col ms-5 ">
            <button onClick={handlePromote} className="btn btn-primary px-4 py-2">Promote</button>
          </div>
        </div>

        <h3 className="event mt-4 ms-4 text-left">Create the next event</h3>

        <div className="infoblock pt-4">
          <form onSubmit={handleSubmit}>
            <div className="input-group row justify-content-center pt-4 px-2">
              <div className="input-section col-6 grid gap-1">
                <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Day:</span>
                <input className="border m-0 p-1 input-size" type="date" value={day} onChange={e => setDay(e.target.value)} />
              </div>
              <div className="input-section col-6 grid gap-1">
                <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Hour:</span>
                <input className="border m-0 p-1 input-size" type="time" value={hour} onChange={e => setHour(e.target.value)} />
              </div>
              <div className="input-section col-6 grid gap-1">
                <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Location:</span>
                <input className="border m-0 p-1 input-size" type="text" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div className="input-section col-6">
                <span className="input-group-text bg-transparent m-0 p-1 d-inline-flex align-items-center span-size" id="inputGroup-sizing-default"> Meeting Point:</span>
                <input className="border m-0 p-1 input-size" type="text" value={meetingPoint} onChange={e => setMeetingPoint(e.target.value)} />
              </div>
            </div>
            <div className="event-form-submit d-flex justify-content-end mt-3">
              <button onClick={handleSubmit} className="btn btn-success px-4 py-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
      
      <Link to="/userdata">
        <button className="btn btn-success px-4 py-2"  >
          Return to User Page
        </button>
      </Link> 
    </div>
  );
};




