import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import PublicNavbar from "../components/PublicNavbar";
import "../styles/Login.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("token", response.token); // ✅ token
            localStorage.setItem("userData", JSON.stringify(response.user)); // ✅ info usuario

            navigate("/profile");
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            alert("Credenciales inválidas o error en el servidor.");
        }
    };



    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            <PublicNavbar />

            <div className="container-fluid vh-100 d-flex flex-column flex-md-row p-0">
                <div className="col-md-6 order-2 order-md-1 d-none d-md-block p-0">
                    <img
                        src="/portada.png"
                        className="img-fluid w-100 vh-100 object-fit-cover"
                        alt="Login visual"
                    />
                </div>

                <div className="col-md-6 order-1 order-md-2 d-flex flex-column justify-content-center align-items-center text-white">
                    <div className="w-75">
                        <div className="d-flex align-items-center justify-content-center mb-4 gap-2">
                            <img src="/logo_sin_fondo.png" alt="Logo" style={{ width: "400px" }} />
                        </div>
                        <h4 className="mb-3 text-black">Log in</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-black">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="ejemplo@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-black">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-light w-100 text-white bg-success">
                                Log in
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <a href="/register" className="text-success">Create account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
