import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../../styles/updateLink.css"

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const UpdateLink = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className={` text-center ${props.pt} pb-1 `}>
      <div
        className=" updateLink alert d-flex justify-content-center align-items-start ms-auto pt-2 pb-1"
        role="alert"
        style={{
          width: `${props.width}`,
          color: "#525252",
          backgroundColor: "rgb(129 229 127)",
        }}
      >
        <FontAwesomeIcon icon={props.icon} size="sm" className="me-3 mt-1" />
        <div className="d-flex align-items-center">
          <h5 className="me-3 ">{props.title}</h5>
          <Link to={props.link}>
            <FontAwesomeIcon
              onClick={() => actions.clearInputStatusMessage()}
              className="rounded-circle mb-1"
              icon={faArrowCircleRight}
              style={{
                border: "5px solid white",
                color: "#525252",
                rotate: `${props.rotate ? "180deg" : "0deg"}`,
              }}
              size="xl"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};