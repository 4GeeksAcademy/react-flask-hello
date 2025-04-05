import React from 'react';
import './Styles/MessageBox.css'

const SuccessMessage = ({ text }) => {
    return (
     
            <div className="message-box success">
                <p>{text}</p>
               
            </div>
    );
};

export default SuccessMessage;