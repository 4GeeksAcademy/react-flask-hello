import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withRouter, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";


export const MeditationDetailsCard = props => {
    const [state, setState] = useState({
        //initialize state here
    });

    const { store, actions } = useContext(Context);

    // console.log(store.characterDetails);
    const params = useParams();

    return (
        <div className="card mb-3 d-flex justify-content-center mx-5 bg-light bg-opacity-75" >
            <div className="row g-0 mb-0">
                <img className="py-0 resize-card-details-img" src={`https://starwars-visualguide.com/assets/img/characters/${store.characterDetails.characterId}.jpg`} alt="..." onError={(e) => e.target.src = "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357"}/>
            </div>
            <div className="bg-dark">
                <h5 className="card-title fw-bold fs-1 text-center text-light align-self-center mb-0">{store.characterDetails?.name}</h5>
            </div>
            <hr className="mb-4 bg-secondary mt-0" />
            <div className="row d-flex flex-row justify-content-center align-items-center">
                <div className="col-6 d-flex flex-column align-items-center">
                    <h6 className="fw-bold">Name</h6>
                    <p className="text-center">{store.characterDetails?.name}</p>
                </div>
                <div className="col-6 d-flex flex-column align-items-center">
                    <h6 className="fw-bold">Birth
                        Year</h6>
                    <p>{store.characterDetails?.birth_year}</p>
                </div>
                <div className="col-6 d-flex flex-column align-items-center">
                    <h6 className="fw-bold">Gender</h6>
                    <p>{store.characterDetails?.gender}</p>
                </div>
                <div className="col-6 d-flex flex-column align-items-center">
                    <h6 className="fw-bold">Height</h6>
                    <p>{store.characterDetails?.height}</p>
                </div>
                <div className="col-6 d-flex flex-column align-items-center">
                    <h6 className="fw-bold">Skin Color</h6>
                    <p>{store.characterDetails?.skin_color}</p>
                </div>
                <div className="col-6 d-flex flex-column align-items-center">
                    <h6 className="fw-bold">Eye Color</h6>
                    <p>{store.characterDetails?.eye_color}</p>
                </div>
            </div>
        </div>
    );
};