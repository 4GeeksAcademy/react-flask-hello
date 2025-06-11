import { useState } from "react"
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    <h1 className="mt-5">Register</h1>
                    <input type="email" name="email" onChange={handleChange} placeholder="Correo" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required />

                    {/* Checkbox de profesional */}
                    <div className="checkbox-row">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="isProfessional"
                                checked={formData.isProfessional}
                                onChange={(e) =>
                                    setFormData({ ...formData, isProfessional: e.target.checked })
                                }
                            /> Soy Profesional
                        </label>
                    </div>
                    <input type="submit" className="button_login" />
                </form>
            </div>
        </div>
    );
};

export default Register;
