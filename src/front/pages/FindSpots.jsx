import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useNavigate} from "react-router-dom";

export const FindSpots = () => {
  const { dispatch } = useGlobalReducer(); 
  const navigate = useNavigate();


  return (
    <div>
        heeeey!!!
    </div>


  );
};
