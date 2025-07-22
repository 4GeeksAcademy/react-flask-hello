import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "../login.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const BACKEND_URL = 'https://humble-disco-56p955jr77x37w76-3001.app.github.dev';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('rememberedEmail');
        const storedRememberMe = localStorage.getItem('rememberMeChecked');

        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storedRememberMe === 'true') {
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
        setIsLoading(true); // Muestra un indicador de carga


        try {
            // Realiza la llamada POST al endpoint de login del backend
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Envía las credenciales como JSON
            });

            const data = await response.json(); // Parsea la respuesta JSON

            if (response.ok) { // Si la respuesta es exitosa (código 2xx)
                localStorage.setItem('jwt_token', data.token); // Almacena el token JWT en localStorage
                console.log('✅ Verificación Exitosa: ¡Inicio de sesión correcto!'); // Mensaje de éxito en consola
                console.log('🔑 Token JWT recibido y almacenado:', data.token); // Muestra el token
                // Puedes añadir aquí lógica para mostrar un mensaje en la UI si lo deseas,
                // pero por ahora nos centramos en console.log.
            } else {
                // Si hay un error en la respuesta del backend
                console.error('❌ Verificación Fallida:', data.msg || 'Credenciales incorrectas.'); // Mensaje de error en consola
                // Puedes añadir aquí lógica para mostrar un mensaje de error en la UI si lo deseas.
            }
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberMeChecked', 'true');
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberMeChecked');
            }
        } catch (error) {
            // Captura errores de red o del servidor (ej. el backend no está corriendo)
            console.error('🚨 Error de Conexión:', 'No se pudo conectar con el servidor. Verifica que el backend esté funcionando.', error); // Mensaje de error de conexión
        } finally {
            setIsLoading(false); // Oculta el indicador de carga, independientemente del resultado
        }
    };

    return (
        <div className="login-page-container">
            <div className="container-fluid h-100">
                <div className="row h-100 g-0">
                    <div className="ps-2 pt-4">
                        <Link to="/" className="back-link">
                            <i className="fas fa-arrow-left"></i> Volver
                        </Link>
                    </div>
                    <div className="col-md-7 d-none d-md-flex left-panel">
                        <div className="d-flex flex-column justify-content-center align-items-center text-center w-100">
                            <img src="tu-ruta-al-logo.png" alt="AutoTekc Logo" className="img-fluid mb-4" />
                            <h1 className="logo-text fw-bold mb-3" style={{ fontSize: '2.8rem' }}>AutoTekc</h1>
                            <h4 className="text-dark-emphasis mb-0" style={{ maxWidth: '600px' }}>Conduciendo hacia el futuro del cuidado automotriz. Ingresa para gestionar tu experiencia.</h4>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center p-3">
                        <div className="login-card w-100">
                            <div className="flex-grow-1">
                                <h2 className="text-center fw-bold mb-2 welcome-text">Bienvenido</h2>
                                <p className="text-center">Inicia tu camino al cuidado de tu auto.</p>

                                <form onSubmit={handleSubmit}>
                                    <div className="my-5">
                                        <label htmlFor="email" className="form-label visually-hidden">Correo electrónico</label>
                                        <div className="input-wrapper">
                                            <i className="fas fa-envelope"></i>
                                            <input type="email" className="form-control password-input" id="email" placeholder="Correo electrónico"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="password" className="form-label visually-hidden">Contraseña</label>
                                        {/* Nuevo contenedor personalizado para el input de contraseña y sus íconos */}
                                        <div className="input-wrapper">
                                            {/* Ícono de candado a la izquierda */}
                                            <i className="fas fa-lock password-icon-left"></i>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="form-control password-input" // Clase personalizada para el input
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                autoComplete="new-password"
                                            />
                                            {/* Ícono de mostrar/ocultar contraseña a la derecha */}
                                            <i
                                                className={showPassword ? "fas fa-eye password-icon-right" : "fas fa-eye-slash password-icon-right"}
                                                onClick={togglePasswordVisibility}
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="mt-2 mb-5 form-check">
                                        <input type="checkbox" className="form-check-input" id="rememberMe"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)} />
                                        <label className="form-check-label text-white" htmlFor="rememberMe">Recordarme</label>
                                    </div>
                                    <div className="d-grid gap-2 my-5">
                                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                    </div>
                                    <div className="text-center mt-5">
                                        <a href="#" className="fw-bold"
                                            disabled={isLoading}
                                        >¿Has olvidado tu contraseña?</a>
                                    </div>
                                </form>
                            </div>

                            <div className="register-section mt-auto">
                                <p className="mb-0">¿Aún no tienes una cuenta? <a href="#" className="fw-bold">Regístrate acá</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;