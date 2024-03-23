import React from "react";
import heroImg from "../assets/heroImg.jpeg";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero" style={{ backgroundImage: { heroImg } }}>
      <h1>Welcome to Nutrition Central</h1>
      <p>Discover the power of balanced eating</p>
      <button>Learn More</button>
    </div>
  );
}

export default Hero;
