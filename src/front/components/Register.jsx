import React, { useState } from "react";
import './Styles/Register.css'

const Form = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        checked: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="register">

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-describedby="emailHelp"
                    />
                      
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="check"
                        name="checked"
                        checked={formData.checked}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="check">
                        Check me out
                    </label>
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
