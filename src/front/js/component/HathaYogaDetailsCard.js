import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withRouter, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";


export const HathaYogaDetailsCard = props => {
    const [state, setState] = useState({
        //initialize state here
    });

    const { store, actions } = useContext(Context);

    // console.log(store.characterDetails);
    const params = useParams();

    return (
        <div className="my-3 d-flex justify-content-center m-5 py-2" >
            <div className="row g-0 ">
                {/* <hr className="mb-4 bg-secondary mt-0" /> */}
                <div className="col-md-5 d-flex flex-column justify-content-center align-items-start py-2 ms-5">
                    <div className="col-md-6 d-flex align-items-center">
                        <h6 className="fs-1 mb-1 poiret-one-regular text-wrap">Jivamutki Open</h6>
                    </div>
                    <div className="col-12 align-items-start mt-2">
                        <h6 className="fw-bold fs-6 fst-italic">A mix of vinyasa, hatha and asthanga yoga. </h6>
                        <p></p>
                    </div>
                    <div className="col-11 d-flex mb-3">
                        <h6 className="lh-base">This class is fluid, challenging, complete and deep. So you can deepen your practice and learn to be focus and still. You can practice it at any time during your day. It also include some spiritual talk, chanting and short meditation.</h6>
                        <p></p>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Teacher : </h6>
                        <h6 className="ms-2"> Jackeline Vivian</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Duration : </h6>
                        <h6 className="ms-2"> 1h</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Asana Focus : </h6>
                        <h6 className="ms-2"> Arm Balances</h6>
                    </div>
                    <div className="col-12 d-flex flex-row">
                        <h6 className="">Level : </h6>
                        <h6 className="ms-2"> intermediate</h6>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-end">
                    <img className="col-11 img-fluid w-75" src="https://www.shutterstock.com/image-photo/caucasian-woman-practicing-yoga-seashore-260nw-142334290.jpg"></img>
                </div>

            </div>
        </div>
    );
};