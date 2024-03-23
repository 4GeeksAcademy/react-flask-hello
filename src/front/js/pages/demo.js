import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../component/modal";
import { Context } from "../store/appContext";
import Favorites from "./favorites";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <Modal />
      <Favorites item={"whatever"} />
    </div>
  );

};
