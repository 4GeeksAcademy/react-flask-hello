import React from "react";
import ContactForm from "../component/contactform.js";
import "../../styles/contacto.css";
import Location from "../component/location.js";

function ContactPage(){
    return(
        <div>
            <div className="contSuperior text-center">
                <h1>Contacto</h1>
                <div className="divider divider-default m-3"></div>
            </div>
            <div className="body-container">
                <div className="ubication">
                    <p >Manhattan, New York, NY, United States</p>
                    <p className="ubii">999-7777-000</p>
                    <p className="ubii">contact@TechSports.com</p>
                    <p>mon-fri 8:00-19:00</p>
                </div>
                <div>
                    <ContactForm />
                </div>
            </div>
            <div className="ubication-container">
                <Location />
            </div>
        </div>
        
    )
}

export default ContactPage;