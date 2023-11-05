import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const SobreNosotros = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="text-center m-3 mb-5">
                <h1>NUESTRO TEAM</h1>
            </div>
            <div className="d-flex m-5 justify-content-evenly ">
                <div className="w-50 d-flex align-items-center">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
                <div className="mx-2">
                    <img className="rounded"
                        src="https://static01.nyt.com/images/2022/01/16/fashion/VIRAL-LIBRARY/VIRAL-LIBRARY-jumbo.jpg?quality=75&auto=webp"
                        alt="..."
                        style={{ width: "px", height: "400px" }} />
                </div>
            </div>
            <div className="text-center d-flex justify-content-evenly ">
                <div className="card" style={{ width: "211px", height: "361px" }}>
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/child_boy_man_people_avatar_icon_131265.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">José</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
                <div className="card" style={{ width: "211px", height: "361px" }}>
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/avatar_boy_man_child_person_people_icon_131284.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Alejandro</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
                <div className="card" style={{ width: "211px", height: "361px" }}>
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/moustache_man_boy_avatar_people_male_icon_131273.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Ignacio</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
                <div className="card" style={{ width: "211px", height: "361px" }}>
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/boy_man_avatar_people_knob_icon_131279.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Juan</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};