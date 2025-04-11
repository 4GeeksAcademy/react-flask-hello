import React from "react";
import "./ServiceForm.css"
import Logo from "../../assets/images/flow-logo.svg"

export const ServiceForm = () => {
    return (
        <>
            <div className="formBox container">
                <div className="divTitleLogo">
                    <img src={Logo} className="logoFor" />
                    <h1 className="formTitle">New Service</h1>
                </div>
                <form>
                    <div className="row col-4 p-2">
                        <label className="labelStyle">Name:</label>
                        <input type="text" className="w-100 border-black" name="Nombre" />
                    </div>

                    <div className="row col-12 p-2">
                        <label className="labelStyle">Description:</label>
                        <textarea name="Description" className="w-100 h-100 p-5 border-black" />
                    </div>

                    <div className="row">
                    <div className="col-3 p-2">
                        <label className="labelStyle">Category:</label>
                        <select name="Category" className="w-100 border-black">
                            <option value="" disabled>Select a Category</option>
                            <option value="Category 1">Category 1</option>
                            <option value="Category 2">Category 2</option>
                            <option value="Category 3">Category 3</option>
                            <option value="Category 4">Category 4</option>
                        </select>
                    </div>
                    <div className="col-2">

                    </div>

                    <div className="row col-2 p-2">
                        <label className="labelStyle">ServicePrice:</label>
                        <input name="ServicePrice" type="number" className="w-100 border-black" />
                    </div>
                    </div>

                    <div className="divButton">
                        <button className="buttonStyle mt-4" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </>
    );
};