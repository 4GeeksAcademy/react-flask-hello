import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackArrow.css";

const BackArrow = ({ overrideClick, className = "" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (overrideClick) {
            overrideClick();
        } else {
            navigate(-1);
        }
    };

    return (
        <button className={`back-arrow ${className}`} onClick={handleClick} title="Volver">
            ←
        </button>
    );
};

export default BackArrow;
