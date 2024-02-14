import React from "react";
import { NavBar } from "../component/navbar";
import video2 from "../../assets/video2.mp4";


export const Completion = (props) => {
  return (
  		<div className="home">
			<NavBar />
			<div className="hero">
          <video className="hero__video" autoPlay muted loop src={video2} />
          <div className="ty-box">
            <h2><strong>YOU ARE NOW AN OCEAN GUARDIAN</strong></h2>
            <p>We are deeply grateful for your contribution and commitment to sustainability and environmental protection. Your support is invaluable and will make a difference to the life of our beaches and the quality of life of everyone who visits them.</p>
        </div>
      </div>
   
  </div>
  )
}



