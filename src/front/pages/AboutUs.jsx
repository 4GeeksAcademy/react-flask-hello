import React from "react";
import ReactPlayer from 'react-player'
import { Navbar } from "../components/Navbar";
import "../../styles/aboutus.css";

const AboutUs = () => {
    const selectedTrainer = {
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        name: "Pepe",
        datos: "Estoy especializado en Crossfit.",
        titulos: "Ciencias del deporte",
        selected: true,
    };

    return (
        <>
            <Navbar />
            <header>
                <div className="row">
                    <div className="col-md-12">
                        <div className="video-wrapper">
                            <ReactPlayer url='https://www.youtube.com/watch?v=4-zjQvTDnbw' playing='true' volume='0' />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default AboutUs;
