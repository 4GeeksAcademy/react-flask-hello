import React from 'react';
import './Styles/MessageBox.css'


const ErrorMessage2 = ({ text, onClose }) => {

  
    return (
        <div className="message-box error">
            <p>{text}</p>
            <button type="submit" className="box-btn" onClick={onClose}> Back </button>
        </div>
    )

};


export default ErrorMessage2;