import React, { Component } from "react";
import { Link } from "react-router-dom";

const BasicInfo = ({ email, firstName, lastName }) => {


    return (
        <div className="container">
            <div className="mb-3 d-flex flex-column">
                <span className="title">Email:</span>
                <span className="email">{email}</span>
            </div>
            <div className="mb-3 d-flex flex-column">
                <span className="title">Name:</span>
                <span className="name">{firstName} {lastName}</span>
            </div>
        </div>
    );
}
export default BasicInfo;