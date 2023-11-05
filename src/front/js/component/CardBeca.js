import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/CardBeca.css";


const CardBeca = () => {
  const { store, actions } = useContext(Context);
  const handleGuardarBeca = (scholarshipId) => {
    // Llama a la acción setSelectedScholarshipId con el ID de la beca que deseas guardar
    actions.setSelectedScholarshipId(scholarshipId);

    // Luego, llama a la acción addToMyTracker para guardar la beca en el tracker del usuario logueado
    actions.addToMyTracker();
  };

  return (
    <>
      {store.allScholarships.map((value, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="container">
                <button className="button-area">{value.professional_field}</button>
                <h5 className="card-title">{value.scholarship_name}</h5>
                <p className="card-text"><i className="fa-regular fa-circle-check" />
                  {value.modality}
                </p>

                <p className="card-text"><i className="fa-solid fa-location-dot" />
                  {value.institution}
                </p>

                {/* En este apartado aseguraremos que para aplicar y guardar su beca el usuario inicie sesión, sino recibirá alert */}
                <div className="button-container d-flex" >
                  {store.isloged ? (
                    <a href={value.url_to} target="_blank"><button className="button-aplicar"
                      onClick={() => handleGuardarBeca(value.id)} hidden={store.hideApply}>
                      Aplicar <i className="fa-solid fa-arrow-right" /></button>
                    </a>

                  ) : <button className="button-aplicar" onClick={() => handleGuardarBeca(value.id)}>Aplicar <i class="fa-solid fa-arrow-right" /></button>}

                </div>
              </div>
            </div>
          </div>)
      })}
    </>
  );
};

export default CardBeca;
