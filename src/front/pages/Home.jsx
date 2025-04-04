import React from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"

const home = () => {
  return (
    <>
    <div style={{ backgroundColor: "#CAD2C5", minHeight: "100vh" }}>
        <Navbar />
    </div>

    <div style={{ backgroundColor: "#CAD2C5"}}>
      <Footer />
    </div>
    </>
  );
};

export default home;