import React from 'react';
import './Styles/SuccessMessage.css';

const SuccessMessage = ({ text, onClose }) => {

    //FUNCION DEL BOTON DEL MENSAJE ERROR PARA CERRAR LA VENTANA

    const handleCloseMessage = () => {
        onClose();  
    };

    return (
        <div className="overlay">
            <div className="message-box error">
                <p>{text}</p>
                <button type="button" className="box-btn" onClick={handleCloseMessage}>close</button>
            </div>
        </div>
    );
};

export default SuccessMessage;
