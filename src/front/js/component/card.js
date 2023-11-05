import React, { useContext } from "react";
import Perfil from "../../img/avatar.jpg";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
const Card = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="col p-3">
      <div className="card">
        <img src={Perfil} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Alicia</h5>
          <p className="card-text">
            Soy profesional cuidador de mascotas desde hace 12 meses!
          </p>
        </div>
        <button
          type="button"
          className="btn btn-link"
          style={{ textDecoration: "none" }}>
          <Link
            to="/profile"
            style={{ color: "black", textDecoration: "none" }}>
            See more...
          </Link>
        </button>
      </div>
    </div>
  );
};
export default Card;








