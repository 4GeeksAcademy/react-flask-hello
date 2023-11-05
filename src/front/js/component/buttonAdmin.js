import React from "react";
import { useNavigate } from "react-router-dom";

export const ButtonAdmin = () => {
  const navigate = useNavigate();

  function handleButtonAdmin(event){
    navigate("/admin")
  }

    return (
      <button type="button" className="btn btn-dark" onClick={handleButtonAdmin}> ADMIN ** </button>
    )
  };

