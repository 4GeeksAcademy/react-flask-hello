import React from "react";
import { Link } from "react-router-dom";

function NoPrograms() {
  return (
    <>
      <div className="alert alert-info" role="alert">
        You have no programs or there is a problem with the backend. <br></br>
        <Link className="text-decoration-none" to="/input">
          {" "}
          Click here,{" "}
        </Link>
        to create revise your programs.
      </div>
    </>
  );
}

export default NoPrograms;