import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const NuestraHistoria = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <div className="text-center m-3 mt-5 mb-5">
                <h1>NUESTRA HISTORIA</h1>
            </div>
            <div className="d-flex m-3 justify-content-evenly ">
                <div className="mx-2">
                    <img className="rounded" src="https://www.nationalgeographic.com.es/medio/2022/04/23/libros_b2d310d5_1280x852.jpg"
                        alt="..."
                        style={{ width: "px", height: "400px" }} />
                </div>
                <div className="w-50 d-flex align-items-center">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
            </div>
            <div className="text-center d-flex justify-content-evenly">
                <div className="w-50 m-5  border border-black ">
                    <h3 className="border solid 2px bg-dark text-light">Vision</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
                <div className="w-50 m-5 border border-black ">
                    <h3 className="border solid 2px bg-dark text-light">Mission</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
            </div>
        </div>
    );
};
