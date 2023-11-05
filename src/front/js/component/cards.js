import React from "react";
import { Link } from "react-router-dom";

const Cards = (props) => {
  return (
    <div id="in" className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <div style={{ position: "absolute", width: "9%", height: "40%", top: "3%", left: "2%", backgroundColor: "black", opacity: "0.5" }} className={props.day}>
            <div className="row">
              <div className="col">
                <h1 style={{ color: "white", marginTop: "4%" }}> 25</h1>
                <h2 style={{ color: "white" }}> Dec</h2>
              </div>
            </div>
          </div>
          <img src={props.src} className="img-fluid rounded-start" alt="photo the basket" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p> <i className="bi bi-clock"></i>{props.time}<i className="bi bi-geo-alt-fill"></i>  {props.location}</p>
            <p className="ca rd-text">{props.description}</p>
            <p className="card-text"><small className="text-body-secondary">{props.lastUpdated}</small></p>
            <Link to="/registrarse">
              <button id="click" className="btn btn-primary btn-lg m-2">REGISTRO</button>

            </Link>
          </div>
        </div>
      </div>
    </div>



  );
}
export default Cards;