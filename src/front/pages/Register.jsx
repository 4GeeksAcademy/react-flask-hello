import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        identificacion: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        email: '',
        foto_usuario: '',
        acceptTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null); // Para mostrar mensajes al usuario
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const { nombre, identificacion, password, confirmPassword, telefono, email, acceptTerms } = formData;

        const allFieldsFilled = nombre.trim() !== '' &&
            identificacion.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            telefono.trim() !== '' &&
            email.trim() !== '';


        const passwordsMatch = password === confirmPassword && password !== '';

        const termsAccepted = acceptTerms;

        setIsFormValid(allFieldsFilled && passwordsMatch && termsAccepted);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => {
            const newFormData = {
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            };

            if (name === 'password' || name === 'confirmPassword') {
                if (newFormData.password && newFormData.confirmPassword) {
                    setPasswordMatchError(newFormData.password !== newFormData.confirmPassword);
                } else {
                    setPasswordMatchError(false);
                }
            }
            return newFormData;
        });


        if (message) setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        const dataToSend = {
            nombre: formData.nombre,
            identificacion: formData.identificacion,
            password: formData.password,
            telefono: formData.telefono,
            email: formData.email,
            foto_usuario: formData.foto_usuario,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}register`, { // Asume que tienes BACKEND_URL en tus variables de entorno
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('¡Tu usuario ha sido Registrado correctamente!...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(`Error al registrar: ${result.msg || 'Ha ocurrido un error inesperado.'}`);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de registro:', error);
            setMessage('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div className="login-page-container d-flex justify-content-center align-items-center">
            {message && (
                                        <div className={`alert ${message.includes('correctamente') ? 'alert-success' : 'alert-danger'} d-flex align-items-center alert-dismissible fade show text-center`} role="alert"
                                            style={{
                                                position: 'fixed',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: 1050,
                                                maxWidth: '500px',
                                                width: '90%'
                                            }}>
                                            {message}
                                        </div>
                                    )}
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

                                    {/* Identificación */}
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

                                    {/* Número de Teléfono */}
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
                                    <div className="input-wrapper mb-0">
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
                                    {passwordMatchError && (
                                        <div className="invalid-feedback d-block mb-3 text-start">
                                            Las contraseñas no coinciden.
                                        </div>
                                    )}

                                    {/* Checkbox de Términos y Condiciones */}
                                    <div className="form-check text-white my-4 custom-control-register">
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
                                        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
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