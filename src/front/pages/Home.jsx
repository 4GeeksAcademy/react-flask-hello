import React from "react";
import { Navbar } from "../components/Navbar";
import { Carousel } from "../components/Carousel";
import { Servicios } from "../components/Servicios";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
	    <Carousel />
      <div>
      <Servicios />
      </div>
      <Footer />
    </div>
  );
};
