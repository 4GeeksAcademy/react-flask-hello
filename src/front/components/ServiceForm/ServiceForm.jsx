import React, { useState } from "react";
import "./ServiceForm.css"
import Logo from "../../assets/images/flow-logo.svg"
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const ServiceForm = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const { dispatch } = useGlobalReducer();

    const handleSubmit = async(e) => {
        e.preventDefault();
        alert("Add Service");

        const addService = {
            name,
            description,
            category,
            price,
            id: Date.now(),
            business_id,
        };

        dispatch({ type: "add_service", payload: addService});

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

            const response = await fetch(`${backendUrl}api/services`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(addService)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }
            alert("Service Created");

        } catch (err) {
            console.error("Error", err);
        }

    };

    return (
        <>
            <div className="formBox container">
                <div className="divTitleLogo">
                    <img src={Logo} className="logoFor" />
                    <h1 className="formTitle">New Service</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row col-4 p-2">
                        <label className="labelStyle">Name:</label>
                        <input type="text" className="w-100 border-black" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="row col-12 p-2">
                        <label className="labelStyle">Description:</label>
                        <textarea className="w-100 h-100 p-5 border-black" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>

                    <div className="row">
                    <div className="col-3 p-2">
                        <label className="labelStyle">Category:</label>
                        <select className="w-100 border-black" value={category} onChange={(e) => setCategory(e.target.value)} required>
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
                        <input type="number" className="w-100 border-black" value={price} onChange={(e) => setPrice(e.target.value)} required />
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