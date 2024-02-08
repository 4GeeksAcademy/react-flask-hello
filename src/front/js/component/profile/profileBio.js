import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const ProfileBio = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  //   const joinedDate = format(new Date(user.created_at), 'MMMM RRRR')

  useEffect(() => {

    const userId = "123"; // reemplazar por el token

    // Fetch user data by ID
    actions.getUserById(userId);

    // Fetch the list of followed and followers
    actions.getFollowedList();
    actions.getFollowersList();
  }, []);

  const user = store.users.length > 0 ? store.users[0] : {};

  return (
    <div>

      <div className="detailsBio">
        <span className="user-name">{user.data?.name}Stefix</span>
        <span className="user-id">@{user.id}Stefi123</span>

        {/* Estaría bueno agregar este dato en el perfil */}
        {/* <div className="user__joined">
          <i class="fa-regular fa-calendar" color="#777" size={20}></i>
          <span className="user__joined--text">Joined {joinedDate}</span>
        </div> */}

        <div className="user-follows">
          <span className="user-follows-following">
            <b>{store.followed.length || 0}</b> Following
          </span>
          <span className="user-follows-followers">
            <b>{store.followers.length || 0}</b> Followers
          </span>
        </div>
        <div className="user-followed-by">
          Not followed by anyone you are following
        </div>
      </div>
    </div>
  );
};


