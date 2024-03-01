import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withRouter, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/singleDetails.css";


export const JivamutkiYogaDetailsCard = props => {
    const [state, setState] = useState({
        //initialize state here
    });

    const { store, actions } = useContext(Context);

    // console.log(store.characterDetails);
    const params = useParams();

    return (
        <div className=" d-flex justify-content-center mt-5 pt-md-5 pt-sm-2 ms-md-4 me-md-4 me-sm-2 " >
            <div className="row g-0">
                <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center align-items-start py-2 ms-md-5 ms-sm-4 ps-md-3">
                    <div className="col-md-6 col-sm-6 d-flex align-items-center">
                        <h6 className="fs-1 mb-1 poiret-one-regular text-wrap">{store.jivamuktiSessionInfo.name}</h6>
                    </div>
                    <div className="col-12 align-items-start mt-2">
                        <h6 className="fw-bold fs-6 fst-italic">{store.jivamuktiSessionInfo.subtitle}</h6>
                    </div>
                <hr className="mb-3 bg-secondary mt-0" />
                    <div className="col-md-12 col-sm-12 d-flex mb-3">
                        <h6 className="lh-base text-wrap">{store.jivamuktiSessionInfo.description}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Teacher : </h6>
                        <h6 className="ms-2"> {store.jivamuktiSessionInfo.instructor}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Duration : </h6>
                        <h6 className="ms-2">{store.jivamuktiSessionInfo.duration}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Asana Focus : </h6>
                        <h6 className="ms-2">{store.jivamuktiSessionInfo.asana_focus}</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Level : </h6>
                        <h6 className="ms-2">{store.jivamuktiSessionInfo.level}</h6>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-md-center justify-content-sm-center align-items-md-end align-items-sm-center">
                    <img className="col-11 img-fluid w-75" src="https://www.shutterstock.com/image-photo/caucasian-woman-practicing-yoga-seashore-260nw-142334290.jpg"></img>
                </div>

            </div>
        </div>
    );
};