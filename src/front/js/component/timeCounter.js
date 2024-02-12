import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { SubmitButton } from "./submitButton";

export const TimeCounter = () => {
  const [timer, setTime] = useState(0)
  const [active, setActive] = useState(false)
  const [buttonText, setButtonText] = useState("Begin tracking")
  const {store, actions} = useContext (Context)
  const [pending, setPending] = useState (false)
  useEffect(() => {
    let intervalId;

    if (active) {
      intervalId = setInterval(() => {
        setTime((value) => value + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, active, setTime]);

  const startStop = () => {
    setActive((prevActive) => !prevActive);
    setButtonText((prevText) => (prevText === "Begin tracking" ? "Stop tracking" : "Begin tracking")) 
    if (!pending) actions.start_time() 
    setPending (true)
  };

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor(timer % 3600 / 60);
  const seconds = timer % 60;

  return (
    <div className="card container-fluid col-sm-8 col-md-8 col-lg-8 bg-body-tertiary text-center p-1">
      <div className="card-header">count  seconds that do matter, when we collect the waste </div>
      <div className="card-body d-flex flex-row justify-content-center fs-1 text-light" style={{ height: "8rem" }}>
        <div className="Watcher col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-6 ">
          <i className="fa-brands fa-watchman-monitoring fa-flip-horizontal fa-spin" style={{ color: "#4cddbf4" }}></i>
        </div>
        <div className="digitThree col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {Math.floor(hours % 10)}
        </div>
        <div className="digitThree col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          :
        </div>
        <div className="digitTwo col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {Math.floor((minutes / 10) % 10)}
        </div>
        <div className="digitOne col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {Math.floor(minutes % 10)}
        </div>
        <div className="digitThree col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          :
        </div>
        <div className="digitFour col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {Math.floor((seconds / 10) % 10)}
        </div>
        <div className="digitFive col-sm-1 col-md-1 col-lg-1 bg-dark rounded border border-info-subtle position-relative py-3 px-3 ">
          {seconds % 10}
        </div>
      </div>
      <div className="card-footer text-light-emphasis fw-lighter">
        <div className="buttons text-light-emphasis fw-lighter">
          <button type="buttonStart" className="btn btn-info btn-sm me-2" onClick={startStop}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};