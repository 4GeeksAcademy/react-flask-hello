import React from "react";




export default function LoginPage() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
                <h3 className="text-center mb-3">Bienvenido</h3>

                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email o Usuario
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="tuemail@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-danger w-100">
                        Login
                    </button>
                    <p className="text-center mt-3 mb-0">
                        
                        <a href="/register" className="text-decoration-none">
                            ¿Olvidaste la contraseña?
                        </a>
                    </p>

                </form>



                <p className="text-center mt-3 mb-0">
                    
                    <button type="submit" className="btn btn-danger w-100">
                        Crear Cuenta
                    </button>
                </p>
            </div>
        </div>
    );
}
