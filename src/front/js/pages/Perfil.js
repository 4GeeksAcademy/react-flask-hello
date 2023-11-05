import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/perfil.css";
import { Link } from "react-router-dom";

const Perfil = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card-perfil">
        <div className="upper">
          <img
            src="https://cdn.pixabay.com/photo/2023/03/06/17/02/ship-7833921_1280.jpg"
            className=" backimage img-fluid"
          />
        </div>

        <div className="user text-center">
          <div className="profile">
            <img src="https://eauston.com//assets/user.jpg" />
          </div>
        </div>

        <div className="mt-5 text-center">
          <h4 className="mb-0">{store.current_user.name} {store.current_user.last_name}</h4>
          <span className="text-muted d-block mb-2">
            Usuario activo Bexplora
          </span>

          <div className="d-flex justify-content-between align-items-center mt-3 px-4">
            <div className="mb-3">
              <label for="exampleInputPassword1" className="correo form-label">
                Correo
              </label>
              <input
                type="email"
                className="input form-control mb-3 text-center"
                id="exampleInputPassword1"
                placeholder="carlossainz@gmail.com"
                value={store.current_user.email}
              />
              <Link to="/tracker">
                <button className="btn btn-primary btn-sm follow mb-3" onClick={() => actions.getMyTracker()}>
                  Ver mis aplicaciones
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
