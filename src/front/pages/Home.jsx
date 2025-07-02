import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

import BSicon from "../assets/img/SVG/Bootstrap.svg";
import GHicon from "../assets/img/SVG/GitHub.svg";
import JSicon from "../assets/img/SVG/JavaScript.svg";
import Reacticon from "../assets/img/SVG/React.svg";
import PYicon from "../assets/img/SVG/Python.svg";
import SQLAicon from "../assets/img/SVG/SQLA.svg";
import Flaskicon from "../assets/img/SVG/Flask.svg";
import Design1 from "../assets/img/SVG/Desing1.svg";
import Design2 from "../assets/img/SVG/Desing2.svg";
import Design3 from "../assets/img/SVG/Desing3.svg";

export const Home = () => {
  const { store } = useGlobalReducer();

  return (
    <>
      <div className="flex-center flex-column vh-50" id="home">
        <h1 className="mb-2 text-center">
          Create Projects and Organize your teams <br /> with
        </h1>
        <div className="rounded text-center p-2 mb-5">
          <h2 className="gradient-text ">
            <strong>Echo Board</strong>
          </h2>
        </div>

        {store.token ? (
          <h4 className="text-success">You're logged in and ready to go 🚀</h4>
        ) : (
          <h4 className="text-danger">Please log in to access your dashboard</h4>
        )}

        {/* Technologies Section */}
        <h2 className="text-center mb-5">Built with these Technologies</h2>

        <div className="container d-flex justify-content-center pt-3">
          {[BSicon, JSicon, Reacticon, PYicon, SQLAicon, Flaskicon].map((icon, index) => (
            <div key={index} className="home-tech-box rounded mx-3 p-2">
              <img src={icon} alt={`tech-${index}`} style={{ width: '3rem', height: '3rem' }} />
            </div>
          ))}
        </div>
      </div>

      {/* SVG ClipPath */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="curvedClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.1,1,0 L1,1 Q0.5,0.9,0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* How It Works Section */}
      <div className="curved-div text-dark">
        <div className="container-fluid text-center mt-5">
          <div className="mb-5">
            <h3 id="howitworks"><strong>How It Works</strong></h3>
            <p>Just follow these simple steps to connect with your team</p>
          </div>
          <div className="row justify-content-center pt-3 g-2 px-5">
            {[
              { img: Design2, title: "Setup Your Project", desc: "Start by creating your project, give it a name :D" },
              { img: Design3, title: "Invite Your Team", desc: "Add all your staff to get to work" },
              { img: Design1, title: "Feed Back The Progress", desc: "Post your developments, give and receive comments from co-workers" }
            ].map((step, idx) => (
              <div key={idx} className="col-12 col-md-4 mb-4">
                <img src={step.img} alt={step.title} style={{ width: '100%', height: '8rem' }} />
                <h5 className="my-2">
                  <span className='circle me-2'><span>{idx + 1}</span></span>
                  <strong>{step.title}</strong>
                </h5>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="container text-center home-b">
        <h3 className="mb-4" id="ourteam"><strong>Our Team</strong></h3>
        <div className="row justify-content-center pt-3 g-2 px-5">
          {[
            { name: "Luna", github: "https://github.com/LunaB28" },
            { name: "Roberta", github: "https://github.com/robertaval" },
            { name: "Abraham", github: "https://github.com/Ablandaeta" }
          ].map((member, idx) => (
            <div key={idx} className="col-12 col-md-auto">
              <div className="border-dash rounded p-2 m-1 teamcardHW flex-center flex-column">
                <div className="rounded-circle mb-5 mt-4 flex-center portrait" style={{ width: '150px' }}>
                  <img className='img-cover'
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name
                    )}&background=random`}
                    alt={`${member.name}'s portrait`}
                  />
                </div>
                <h5 className="mb-5">{member.name}</h5>
                <span className="flex-center mb-5">
                  <img src={GHicon} alt="GitHub icon" style={{ width: '2rem', height: '2rem' }} className="me-4" />
                  <a className="text-black" href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

