import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        alert("Usuario registrado");
        navigate("/login");

    };

    const sendRegister = async () => {
        try {
            const resp = await axios.post("https://friendly-lamp-x5v79p56j7xxf4gw-3001.app.github.dev/api/signup", {
                email, password, first_name, last_name, address
            })
            console.log('user created successfully')
        }
        catch (error) {
            console.error("Error en el registro:", error);
            alert("No se pudo conectar con el servidor.");
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4 text-center">Crear Cuenta</h2>
            <form onSubmit={handleRegister}>

                <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="registerEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="registerFirst_name" className="form-label">
                        Nombres
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerFirst_name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="registerLast_name" className="form-label">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerLast_name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="registerAddress" className="form-label">
                        Direccion
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerAddress"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>


                <button type="submit" className="btn btn-success w-100 mb-5" onClick={sendRegister}>
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
