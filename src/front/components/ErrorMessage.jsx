import React from 'react';
import './Styles/MessageBox.css'
import { useNavigate } from 'react-router-dom';


const ErrorMessage = ({ text }) => {

    const navigate = useNavigate();
    
    //FUNCION DEL BOTON DEL MENSAJE ERROR PARA REDIRIGIR A LOGIN
    const handleRedirectToLogin = () => {
        navigate("/login");  
    };

    return (
        <div className="message-box error">
            <p>{text}</p>
            <button type="submit" className="box-btn" onClick={handleRedirectToLogin}> Atras </button>
        </div>
    )

};


export default ErrorMessage;