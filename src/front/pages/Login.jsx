import { useState, useEffect } from "react";
import "../../styles/login.css";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../../services/userServices";

const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        userServices.login(formData).then(data => {
            if (data.success) {
                dispatch({ type: "login_register", payload: data })
                if (data.user.is_professional) {
                    navigate("/pUser")
                    return
                }
                navigate('/user');
            } else {
                setError("Correo o contraseña incorrectos.");
            }
        }).catch(() => {
            setError("Email o Contraseña estan incorrectos.");
        });
    };

    useEffect(() => {
        store.user && navigate("/user");
    }, [store.user, navigate]); // Redirigir si ya hay un usuario logueado

    return (
        <div className="container_login">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="mt-5">Iniciar sesión</h1>
                    {error && <p className="error-message">{error}</p>} {/* Mostrar error */}
                    <input type="email" name="email" onChange={handleChange} placeholder="Correo" required />
                    <input type="password" name="password" onChange={handleChange} placeholder="Contraseña" required />
                    <button className="button_login">Login</button>
                    <div className="form-footer">
                        <div className="options-row">
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
