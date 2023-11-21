import React, { useContext} from "react";
import { Context } from "../store/appContext";

import "../../styles/CardBeca.css";


const CardBeca = () => {
  const { store, actions } = useContext(Context);

  const handleGuardarBeca = (scholarshipId) => {
    // Llama a la acción setSelectedScholarshipId con el ID de la beca que deseas guardar
    actions.setSelectedScholarshipId(scholarshipId);
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

                {/* En este apartado aseguraremos que para aplicar y guardar su beca el usuario inicie sesión, sino recibirá alert. Si es institucional solo podrá ingresar a los links */}
                <div className="button-container d-flex">
                  {store.isloged ? (
                    <a href={value.url_to} target="_blank"><button className="button-aplicar"
                      onClick={() => handleGuardarBeca(value.id)}>
                      Aplicar <i className="fa-solid fa-arrow-right" /></button>
                    </a>

                  ) : store.insLoged ? (
                    <a href={value.url_to} target="_blank" className="button-aplicar">
                      Ver sitio web <i className="fa-solid fa-arrow-right" />
                    </a>
                  ) : !store.isloged && !store.insLoged ? (<button className="button-aplicar"
                  onClick={() => handleGuardarBeca(value.id)}>
                  Aplicar <i className="fa-solid fa-arrow-right" /></button>): null}
                    

                </div>
              </div>
            </div>
          </div>)
      })}
    </>
  );
};

export default CardBeca;
