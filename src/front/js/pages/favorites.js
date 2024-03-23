import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export default function Favorites(props) {
  const { store, actions } = useContext(Context);

  const handleFavorites = () => {
    if (store.favorites.includes(props.item)) {
      actions.removeFavorites(props.item);
    } else {
      actions.addFavorites(props.item);
    }
  };

  return <button onClick={() => handleFavorites()}>💖</button>;
}
