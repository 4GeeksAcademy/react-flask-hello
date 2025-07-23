import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export const Register = () => {
    const navigate = useNavigate(); // Hook para la navegación programática
    const BACKEND_URL="https://reimagined-guacamole-7q4xww65qqwfpqqr-3001.app.github.dev/"

    const [formData, setFormData] = useState({
        nombre: '',
        identificacion: '',
        password: '',
        telefono: '',
        email: '',
        foto_usuario: '',
        acceptTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null); // Para mostrar mensajes al usuario

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        // Limpiar mensaje al empezar a escribir de nuevo
        if (message) setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); // Limpiar mensajes previos

        if (formData.password !== formData.confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        // Preparar los datos para enviar al backend, mapeando los nombres
        const dataToSend = {
            nombre: formData.nombre,
            identificacion: formData.identificacion,
            password: formData.password,
            telefono: formData.telefono,
            email: formData.email,
            foto_usuario: formData.foto_usuario, // Asegúrate de que este campo tenga un valor válido, quizás una URL predeterminada o si planeas una carga de archivos
        };

        try {
            const response = await fetch(`${BACKEND_URL}/register`, { // Asume que tienes BACKEND_URL en tus variables de entorno
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('¡Registro exitoso! Redirigiendo al login...');
                setTimeout(() => {
                    navigate('/login'); // Redirige al usuario a la página de login
                }, 2000); // Espera 2 segundos antes de redirigir
            } else {
                // Si la respuesta no es OK (ej. 400 Bad Request)
                setMessage(`Error al registrar: ${result.msg || 'Ha ocurrido un error inesperado.'}`);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de registro:', error);
            setMessage('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="login-page-container d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8 col-sm-10">
                        <div className="login-card register-card d-flex flex-column justify-content-between">
                            <div>
                                <div className="text-center mb-4">
                                    <img src="https://via.placeholder.com/100x40?text=AutoTekc" alt="AutoTekc Logo" className="img-fluid mb-3" /> {/* Reemplaza con tu logo */}
                                    <h2 className="welcome-text">Regístrate</h2>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Mensajes de feedback */}
                                    {message && (
                                        <div className={`alert ${message.includes('exitoso') ? 'alert-success' : 'alert-danger'}`} role="alert">
                                            {message}
                                        </div>
                                    )}

                                    {/* Nombre y Apellido */}
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre y Apellido"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Identificación (DNI/Cédula) - Nuevo campo */}
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Identificación"
                                            name="identificacion"
                                            value={formData.identificacion}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Correo electrónico */}
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Correo electrónico"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Número de Teléfono - Nuevo campo */}
                                    <div className="input-group mb-3">
                                        <input
                                            type="tel" // Usa type="tel" para números de teléfono
                                            className="form-control"
                                            placeholder="Número de Teléfono"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Contraseña */}
                                    <div className="input-wrapper mb-3">
                                        <i className="fas fa-lock password-icon-left"></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control password-input"
                                            placeholder="Contraseña"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <i
                                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon-right`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        ></i>
                                    </div>

                                    {/* Repite la Contraseña */}
                                    <div className="input-wrapper mb-3">
                                        <i className="fas fa-lock password-icon-left"></i>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="form-control password-input"
                                            placeholder="Repite la Contraseña"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        <i
                                            className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} password-icon-right`}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        ></i>
                                    </div>

                                    {/* Checkbox de Términos y Condiciones */}
                                    <div className="form-check text-white mb-4 custom-control-register">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="acceptTerms">
                                            He leído y acepto los <a href="#!">Términos de servicio</a> y la <a href="#!">Política de privacidad</a>, incluida la política de Uso de Cookies.
                                        </label>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="register-section mt-4 pt-3 pb-3">
                                <Link to="/" className="text-white fw-bold text-decoration-none d-block mb-2">
                                    Volver a Página de Inicio
                                </Link>
                                <p className="mb-0">
                                    ¿Ya posees cuenta? <Link to="/login" className="text-white fw-bold text-decoration-none">Ingresa acá</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};