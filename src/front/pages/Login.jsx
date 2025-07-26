import React, { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);

    };

    return (
        <div
            style={{
                backgroundColor: "white",
                color: "#000",
                height: "93.4vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    border: "2px solid #B7FF00",
                    padding: "2rem",
                    borderRadius: "10px",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Iniciar Sesión</h2>

                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #B7FF00",
                            backgroundColor: "white",
                            color: "white",
                            borderRadius: "4px",
                        }}
                    />
                </div>

                <div>
                    <label>Contraseña:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #B7FF00",
                            backgroundColor: "white",
                            color: "white",
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>{/* Te he añadido un enlace para recuperar la contraseña en caso de que la hayas olvidado. Y queria ver como quedaba. Alexis */}
                    <p style={{ color: "#95cf00ff" }}>
                    ¿Olvidaste tu contraseña? <a href="/forgotpassword" style={{ color: "#95cf00ff", 
                    textDecoration: "underline", ":hover": { color: "#B7FF00" } }}>Recuperar</a></p>
                </div>
                <button
                type="submit"
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                style={{
                backgroundColor: "#B7FF00",
                color: "#000",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
                    }}
                >
                Iniciar Sesión
            </button>
        </form>
        </div >
    );
};