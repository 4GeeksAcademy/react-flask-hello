import React from "react";
import BSicon from "../assets/img/SVG/Bootstrap.svg";
import GHicon from "../assets/img/SVG/GitHub.svg";
import JSicon from "../assets/img/SVG/JavaScript.svg";
import Reacticon from "../assets/img/SVG/React.svg";
import PYicon from "../assets/img/SVG/Python.svg";
import SQLAicon from "../assets/img/SVG/SQLA.svg"
import Flaskicon from "../assets/img/SVG/Flask.svg"
import Design1 from "../assets/img/SVG/Desing1.svg"
import Design2 from "../assets/img/SVG/Desing2.svg"
import Design3 from "../assets/img/SVG/Desing3.svg"

export const Home = () => {
  return (
    <>
      <div className="flex-center flex-column vh-50" id="home">
        <h1 className="mb-2">Create Projects and Organize your teams</h1>
        <h2 className="gradient-text mb-5">
          <strong>The Best App</strong>
        </h2>
               
            <h2 className="rounded home-tech text-center p-2 mb-5" style={{ width: '13em'}}>Buid with this Technologies</h2>
          
          <div className="container d-flex justify-content-center pt-3 ">

            <div className="home-tech-box rounded mx-3 p-2">
              <img src={BSicon} style={{ width: '3rem', height: '3rem' }} ></img>
            </div>
            <div className="home-tech-box rounded mx-3 p-2">
              <img src={JSicon} style={{ width: '3rem', height: '3rem' }} ></img>
            </div>
            <div className="home-tech-box rounded mx-3 p-2">
              <img src={Reacticon} style={{ width: '3rem', height: '3rem' }} ></img>
            </div>
            <div className="home-tech-box rounded mx-3 p-2">
              <img src={PYicon} style={{ width: '3rem', height: '3rem' }} ></img>
            </div>
            <div className="home-tech-box rounded mx-3 p-2">
              <img src={SQLAicon} style={{ width: '3rem', height: '3rem' }} ></img>
            </div>
            <div className="home-tech-box rounded mx-3 p-2">
              <img src={Flaskicon} style={{ width: '3rem', height: '3rem' }} ></img>
            </div>              
                      

          </div>
        </div>
      
      <svg width="0" height="0">
        <defs>
          <clipPath id="curvedClip" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.1,1,0 L1,1 Q0.5,0.9,0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="curved-div text-dark">
        <div class="container-fluid text-center mt-5">
          <div className="mb-5">
            <h3 id="howitworks">
              <strong> How It Works</strong>
            </h3>
            <p> Just follow this simple steps to conect with your team</p>
          </div>

          <div class="row justify-content-center pt-3 g-2 px-5">

            <div className="col-4">
              <img src={Design2} style={{ width: '100%', height: '8rem' }} ></img>
              <h5 className="my-2">
                <span className='circle me-2 '> <span>1</span> </span>
                <strong>Setup Your Project</strong>
              </h5>
              <p>Start by creating your project, give a name :D</p>
            </div>

            <div className="col-4">
              <img src={Design3} style={{ width: '100%', height: '8rem' }} ></img>
              <h5 className="my-2">
                <span className='circle me-2 '> <span>2</span> </span>
                <strong>Invite Your Team</strong>
              </h5>
              <p>Add all your staff to get to work</p>
            </div>

            <div className="col-4">
              <img src={Design1} style={{ width: '100%', height: '8rem' }} ></img>
              <h5 className="my-2">
                <span className='circle me-2 '> <span>3</span> </span>
                <strong>Feed Back The Progress</strong>
              </h5>
              <p>Post your developments, give and receive comments from your co-workers</p>
            </div>

          </div>
        </div>
      </div>
      <div className="home flex-center mb-4">
        <span className="border border-2 rounded shadow-lg">

        </span>
      </div>

      <div className="container text-center home-b ">
        <h3 className="mb-4" id="ourteam">
          <strong> Our Team</strong>
        </h3>

        <div class="row justify-content-center ali pt-3 g-2 px-5">
          <div className=" col-12 col-md-auto">

            <div className="border-dash rounded p-2 m-1 teamcardHW flex-center flex-column ">
              <div className="rounded-circle mb-5 mt-4 flex-center portrait" style={{ width: '150px', }}>
                <img src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg" />
              </div>
              <h5 className="mb-5">
                Luna
              </h5>
              <span className="flex-center mb-5">
                <img src={GHicon} style={{ width: '2rem', height: '2rem' }} className="me-4"></img>
                <a href="https://github.com/LunaB28">Github</a>
              </span>
            </div>
          </div>
          <div className=" col-12 col-md-auto">

            <div className="border-dash rounded p-2 m-1 teamcardHW flex-center flex-column ">
              <div className="rounded-circle mb-5 mt-4 flex-center portrait" style={{ width: '150px', }}>
                <img src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg" />
              </div>
              <h5 className="mb-5">
                Roberta
              </h5>
              <span className="flex-center mb-5">
                <img src={GHicon} style={{ width: '2rem', height: '2rem' }} className="me-4"></img>
                <a href="https://github.com/robertaval">Github</a>
              </span>
            </div>
          </div>
          <div className=" col-12 col-md-auto">

            <div className="border-dash rounded p-2 m-1 teamcardHW flex-center flex-column ">
              <div className="rounded-circle mb-5 mt-4 flex-center portrait" style={{ width: '150px', }}>
                <img src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg" />
              </div>
              <h5 className="mb-5">
                Abraham
              </h5>
              <span className="flex-center mb-5">
                <img src={GHicon} style={{ width: '2rem', height: '2rem' }} className="me-4"></img>
                <a href="https://github.com/Ablandaeta">Github</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
