import { useState } from "react";
import "../../styles/register.css";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isProfessional: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        userServices.register(formData).then(data => data.success && navigate('/login'));
    };

    return (
        <div className="container_register">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="mt-5">Register</h2>
                    <input type="email" name="email" onChange={handleChange} placeholder="Correo" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                    <input type="submit" className="button_login" />
                    <div className="toggle-row">
                        <label className="switch">
                            <input
                                type="checkbox"
                                name="isProfessional"
                                checked={formData.isProfessional}
                                onChange={handleChange}
                            />
                            <span className="slider round"></span>
                        </label>
                        <span className="toggle-text ms-3">¿Eres profesional?</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
