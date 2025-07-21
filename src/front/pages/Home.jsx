import React from "react";
import { Navbar } from "../components/Navbar";
import { Carousel } from "../components/Carousel";
import { Servicios } from "../components/Servicios";

export const Home = () => {
  return (
    <div>
      <Navbar />
	    <Carousel />
      <Servicios />
    </div>
  );
};
