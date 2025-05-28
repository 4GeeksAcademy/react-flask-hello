import React from "react";
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
            <h1>EJJE</h1>

            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&controls=0&loop=1&playlist=ScMzIvxBSi4"
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AboutUs;
