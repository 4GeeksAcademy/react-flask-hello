import React from "react";
import { useParams } from "react-router-dom";
import "./Spinner.css"

export const Spinner = () => {

    const { category } = useParams();

    return (
        <>
            <div className="spinner-container">
                <div className="spinner">
                    <div className="spinner-inner"></div>
                </div>
            </div>
        </>
    );
};