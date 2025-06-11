import { useState } from "react"
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"
import userServices from "../../services/userServices"

const Login = () => {

    const { store, dispatch } = useGlobalReducer()
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
        userServices.login(formData).then(data => data.success && navigate('/private'))
    };


    return (
        <div className="container_login">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="mt-5">Iniciar sesión</h2>
                    <span>Usa tu email para iniciar sesión</span>
                    <input type="email" name="email" onChange={handleChange} placeholder="Correo" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Contraseña" required />
                    <button className="button_login">Login</button>
                    <div className="form-footer">
                        <div className="options-row">
                            <label className="remember-label">
                                <input type="checkbox" className="me-4" />
                                Recuérdame
                            </label>
                            <Link to="/register" className="forgot-password me-3">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
