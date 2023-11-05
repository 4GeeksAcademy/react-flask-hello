import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const DonacionesRealizadas = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="text-center text-dark m-3 mt-5 mb-5">
                <h1>DONACIONES REALIZADAS</h1>
            </div>
            <div className="shadow-sm d-flex m-3 justify-content-between border rounded ">
                <div className="ms-0">
                    <img className="rounded" src="https://www.elquintopoder.cl/wp-content/uploads/2020/06/WhatsApp-Image-2019-04-03-at-15.16.24-723x364.jpeg"
                        alt="..."
                        style={{ width: "px", height: "400px" }} />
                </div>
                <div className="w-50 d-flex align-items-center me-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
            </div>
            <div className="shadow-sm d-flex m-3 justify-content-between border rounded ">
                <div className="w-50 d-flex align-items-center ms-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
                <div className="me-0">
                    <img className="rounded" src="https://pbs.twimg.com/media/D4XJrAHWsAAgp4A.jpg"
                        alt="..."
                        style={{ width: "px", height: "400px" }} />
                </div>

            </div>
            <div className="shadow-sm d-flex m-3 justify-content-between border rounded ">
                <div className="ms-0">
                    <img className="rounded" src="https://i0.wp.com/www.sanjoseahora.com.uy/wp-content/uploads/2020/04/escuela-2-rinc%C3%B3n-del-pino.png?resize=750%2C452&ssl=1"
                        alt="..."
                        style={{ width: "px", height: "400px" }} />
                </div>
                <div className="w-50 d-flex align-items-center me-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-dark" type="button">Realizar Donaciones</button>

            </div>
        </div>
    );
};