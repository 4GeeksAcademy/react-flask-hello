import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TimeCounter } from '../component/timeCounter';
import { UserInsertData } from '../component/userInsertData';


export const Userdata = () => {  

  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect (() => {
      const userToken = localStorage.getItem("userToken");
      if(!userToken){
          navigate("/login");
          return;
      }
      setUserToken(userToken)
      
  })

  const logout = async () => {
    localStorage.removeItem("userToken");
    window.location.reload(true);
  };

  return (
    <>
    <div className="text-center mt-5">
      {userToken && <p>User loged in!</p>}
      <TimeCounter /> 
      <UserInsertData />
      <button onClick={logout}>Logout</button>
    </div>
    </>
    
  )
}