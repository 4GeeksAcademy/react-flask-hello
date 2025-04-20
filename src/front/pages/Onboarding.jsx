import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/onboarding.css";
import { div } from "framer-motion/client";

export const Onboarding = () => {
    const navigate = useNavigate();

    return(
        <div className="onboarding-page">
            <div className="onboarding-first">
                <div>
                    <h2>Achieve your goals and</h2>
                    <h1>LEVEL UP</h1>
                </div>
                <div className="text-onboarding-first">
                    <p>Level Up is your companion on the journey to a healthier, more balanced life. Through personalized missions and challenges, </p>
                    <p>you’ll improve your physical and mental well-being overcoming goals and reaching new levels in your health.</p>
                    <button className="register-button" onClick={() => navigate("/register")}>Register</button>
                </div>

            </div>
            <div>

            </div>
        </div>
    )
    
}