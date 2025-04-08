import React from 'react';
import './Styles/MessageBox.css'
import { useNavigate } from 'react-router-dom';


const ErrorMessage1 = ({ text }) => {

    const navigate = useNavigate();

    //FUNCION DEL BOTON DEL MENSAJE ERROR PARA REDIRIGIR A LOGIN
    const handleRedirectToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="overlay">
            <div className="message-box error">
                <p>{text}</p>
                <button type="submit" className="box-btn" onClick={handleRedirectToLogin}> Login </button>
            </div>
        </div>
    )

};


export default ErrorMessage1;