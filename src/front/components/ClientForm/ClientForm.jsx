import React from "react";
import "./ClientForm.css";
import logo from "../../assets/images/flow-logo.svg"

export const ClientForm = () => {
    return (
        <>
            <div className="formBox container">
                <div className="divTitleLogo">
                    <img src={logo} className="logoFor"/>
                    <h1 className="formTitle">New Client</h1>
                </div>
                <div>
                    <form>
                        <div className="row p-2">
                            <div className="col-6">
                                <label className="labelStyle">Name:</label>
                                <input type="text" className="w-100 border-black" required />
                            </div>
                            <div className="col-6">
                                <label className="labelStyle">Last Name:</label>
                                <input type="text" className="w-100 border-black" required />
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-6">
                                <label className="labelStyle">Address:</label>
                                <input type="text" className="w-100 border-black" required />
                            </div>
                            <div className="col-6">
                                <label className="labelStyle">Phone:</label>
                                <input type="text" className="w-100 border-black" required />
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-6">
                                <label className="labelStyle">DNI:</label>
                                <input type="text" className="w-100 border-black" required />
                            </div>
                            <div className="col-6">
                                <label className="labelStyle">Email:</label>
                                <input type="text" className="w-100 border-black" required />
                            </div>
                        </div>
                        <div className="divButton">
                            <button type="submit" className="buttonStyle">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};