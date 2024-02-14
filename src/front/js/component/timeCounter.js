import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { SubmitButton } from "./submitButton";

export const TimeCounter = () => {
  const [timer, setTime] = useState(0)
  const [active, setActive] = useState(false)
  const [buttonText, setButtonText] = useState("BEGIN")
  const { store, actions } = useContext(Context)
  const [pending, setPending] = useState(false)
  const clockHandRef = useRef(null);

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

    if (clockHandRef.current) {
      clockHandRef.current.classList.toggle('blinking');
    }
    setActive(prevActive => !prevActive);
    setButtonText(prevText => (prevText === "BEGIN" ? "STOP" : "BEGIN"));
    if (!pending) {
      actions.start_time();
      setPending(true);
    } else {
      setPending(false);
    }
  };
  console.log(clockHandRef.current);


  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor(timer % 3600 / 60);
  const seconds = timer % 60;

  return (
    <div className="time-counter-container container-fluid">
      <h4 className="time-counter-header"> Impact &nbsp; <span className="tracker"> TRACKER</span> </h4>
      <div className="counter-body d-flex flex-row  fs-1 text-light" style={{ height: "5rem", justifyContent: "center"}}>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor(hours / 10) % 10}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor(hours % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          <span ref={clockHandRef} className="clock-hand">:</span>
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor((minutes / 10) % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor(minutes % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          <span ref={clockHandRef} className="clock-hand">:</span>
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {Math.floor((seconds / 10) % 10)}
        </div>
        <div className="digit col-sm-1 col-md-1 col-lg-1">
          {seconds % 10}
        </div>
      </div>
      <div className="counter-footer">
        <div className="typing-animation mt-4">
          <span>Every second you spent collecting the waste, does matter...</span>
        </div>
        <div className="counter-button">
          <button type="buttonStart" className="counter_button" id="clockHand" onClick={startStop}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};