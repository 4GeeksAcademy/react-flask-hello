import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Te añado unos cuantos imports para que puedas usar el history y redirigir al usuario después de iniciar sesión.

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);

    }; */
    //Te añado unas cuantas variables de estado para manejar el mensaje de error y su visibilidad.
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        /* console.log("Email:", email);
        console.log("Password:", password); */
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Si la respuesta es 200, redirigimos al usuario
                localStorage.setItem('token', data.token); // Guardamos el token en localStorage
                navigate("/");//window.location.href = '/'; // Redirigimos a la página principal
            } else if (response.status >= 400) {
                // Si la respuesta es 401, mostramos el mensaje
                setMessage("⛔ "+ data.msg);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 10000); // Oculta el mensaje después de 10 segundos
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div
            style={{
                backgroundColor: "white",
                color: "#000000",
                height: "93.36vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                onSubmit={handleLogin}
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
                            borderRadius: "4px",
                        }}
                    />
                </div>
                <div>{/* Te he añadido un enlace para recuperar la contraseña en caso de que la hayas olvidado. Y queria ver como quedaba. Alexis */}
                    <p style={{ color: "#95cf00ff" }}>
                    ¿Olvidaste tu contraseña? <Link to="/forgotpassword" style={{ color: "#95cf00ff", 
                    textDecoration: "underline", ":hover": { color: "#B7FF00" } }}>Recuperar</Link></p>
                    <p style={{ color: "#95cf00ff" }}>
                    ¿Todavía no tienes un usuario? <Link to="/form" style={{ color: "#95cf00ff", 
                    textDecoration: "underline", ":hover": { color: "#B7FF00" } }}>Logeate</Link></p>
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
        {showMessage && (
            <div
                style={{
                    position: "fixed",
                    bottom: "20vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "2.5vh 5vh",
                    borderRadius: "5px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                {message}
            </div>
        )}
        {showMessage && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          
        </div>
      )}
        </div >
    );
};