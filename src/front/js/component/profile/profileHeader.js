import React, { useContext, useState,useEffect } from "react";

import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

export const ProfileHeader = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(() => {

    const userId = "123"; // reemplazar por el token

    // Fetch user data by ID
    actions.getUserById(userId);

  }, []);

  const user = store.users.length > 0 ? store.users[0] : {};

    return (
      <div>
        <div className="coverHeader">
          <img src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=1555&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          
        </div>
        <div className="topBio">
        <div className="image">
          {/* {' '} */}
          <img src="https://images.unsplash.com/photo-1640379878948-72b9db349e17?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt="" />
        </div>
      </div>
      </div>
    )
  }