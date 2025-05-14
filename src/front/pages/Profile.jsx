import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  
    dispatch({ type: "SET_TOKEN", payload: null });  
    navigate("/logout");  
  };

  return (
    <>
      {store.token ? (
        <div className="container mt-5 text-center">
          <h1>👋 Welcome!</h1>
          <p>This is your private profile. You are logged in correctly ✅</p>
       
          <button onClick={handleLogout} className="btn btn-primary">Logout</button>
        </div>
      ) : (
        <Navigate to="/signin" />  
      )}
    </>
  );
};

export default Profile;
