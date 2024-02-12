import React, { useEffect, useState } from 'react'
import { EventInfoBox } from '../component/eventInfoBox';
import { useNavigate } from 'react-router-dom'
import { TimeCounter } from '../component/timeCounter';
import { UserInsertData } from '../component/userInsertData';
import { UserLevelConnectLink} from '../component/userLevelConectLink';
import { InsertData } from '../component/insertData';
import { InsertLocationLiters } from '../component/inserLocationLiters';
import { SubmitButton } from '../component/submitButton';
import { ShowUserImpact } from '../component/showUserImpact';

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
      <UserLevelConnectLink />
      <TimeCounter /> 
      <InsertData /> 
      <InsertLocationLiters />
      <SubmitButton /> 
      <ShowUserImpact />
      <EventInfoBox />
      <button onClick={logout}>Logout</button>
    </div>
    </>
    
  )
}