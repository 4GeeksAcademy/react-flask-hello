import React, { useEffect, useState } from 'react';


export const AdminPage = () => {
 const [users, setUsers] = useState([]);
 const [selectedEmail, setSelectedEmail] = useState("");
 const [loading, setLoading] = useState(true);

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
    })
    .catch(error => {
      console.error(`Error promoting user: ${error}`);
    });
 };
 

 if (loading) {
    return <div>Loading...</div>;
 }

 return (
    <div>
      <select onChange={e => setSelectedEmail(e.target.value)}>
      {users.map(user => (
 <option key={user.email} value={user.email}>
    {user.email}
 </option>
        ))}
      </select>
      <button onClick={handlePromote}>Promote</button>
    </div>
 );
};
