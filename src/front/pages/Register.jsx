import { useState } from "react"
import "../../styles/register.css";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices";

const Register = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        userServices.register(formData).then(data => data.success && navigate('/login'))
    };

    return (
        <div className="container_register">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="mt-5">Register</h2>
                    <input type="email" name="email" onChange={handleChange} placeholder="Correo" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                    <input type="submit" className="button_login" />
                </form>
                <div className="options-row">
                    <label className="remember-label">
                        <input type="checkbox" className="me-4"/>
                        Recuérdame
                    </label>
                </div>
                <div className="form-footer">
                    <div className="options-row1">
                        <label className="remember-label">
                            <input type="checkbox" className="checkbox1 me-4" />
                            Soy mayor de 16 años y acepto los &nbsp;<a href="#">Términos y condiciones</a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
} 
 
export default Register;