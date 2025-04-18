import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/Login.css';

// URL del logo por defecto
const DEFAULT_LOGO = "https://raw.githubusercontent.com/4GeeksAcademy/Spain_Coho_94_First_Proyect_Da_Da_Ja/refs/heads/main/src/front/assets/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BACKEND_URL || '';

    // Verificar si ya hay sesión activa
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            const response = await axios.post(`${baseUrl}api/login`, formData);
            
            // Guardar token
            localStorage.setItem('access_token', response.data.access_token);
            
            // Preservar el tema actual si existe
            const currentTheme = localStorage.getItem('userTheme');
            console.log("Tema actual antes de login:", currentTheme);
            
            // Obtener datos existentes del usuario (puede contener el logo personalizado)
            const existingUserData = JSON.parse(localStorage.getItem("userData") || "{}");
            const existingLogo = existingUserData.logo_url !== DEFAULT_LOGO ? existingUserData.logo_url : null;
            
            // Inicializar userData con los datos de usuario de la respuesta
            let userData = response.data.user || {};
            console.log("Datos de usuario de la respuesta:", userData);
            
            // PRESERVAR EL LOGO PERSONALIZADO SI EXISTE
            if (existingLogo) {
                console.log("Conservando logo personalizado existente");
                userData.logo_url = existingLogo;
            } 
            // Si no hay logo, usar el de la respuesta o el predeterminado
            else if (!userData.logo_url) {
                console.log("Usando logo predeterminado");
                userData.logo_url = DEFAULT_LOGO;
            }
            
            // PRESERVAR EL TEMA
            // Primero intentar usar el tema existente en localStorage
            if (currentTheme) {
                console.log("Restaurando tema guardado:", currentTheme);
                userData.theme = currentTheme;
            } 
            // Luego intentar preservar el tema de datos existentes
            else if (existingUserData.theme) {
                console.log("Usando tema de userData existente:", existingUserData.theme);
                userData.theme = existingUserData.theme;
            }
            
            // Intentar extraer más información del token
            try {
                const token = response.data.access_token;
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                
                const tokenData = JSON.parse(jsonPayload);
                console.log("Token data en Login:", tokenData);
                
                // Si se encuentran claves adicionales en el token, guardarlas
                if (tokenData) {
                    // No sobrescribir datos que ya están en userData
                    if (!userData.email && tokenData.email) userData.email = tokenData.email;
                    if (!userData.name && tokenData.name) userData.name = tokenData.name;
                    if (!userData.username && tokenData.username) userData.username = tokenData.username;
                    
                    // Preservar el logo_object_key si existe en el token
                    if (tokenData.logo_object_key) {
                        userData.logo_object_key = tokenData.logo_object_key;
                    }
                }
            } catch (error) {
                console.error("Error decodificando token:", error);
            }
            
            console.log("userData preparado para guardar:", userData);
            
            // Guardar en localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Asegurarse de que el tema también se guarde en userTheme
            if (userData.theme) {
                localStorage.setItem('userTheme', userData.theme);
            }
            
            // Disparar eventos para actualizar la UI
            setTimeout(() => {
                // Usar setTimeout para asegurarnos que localStorage se ha actualizado
                console.log("Disparando eventos de login");
                window.dispatchEvent(new Event('userLoggedIn'));
                
                // Disparar evento específico para el logo
                if (userData.logo_url) {
                    window.dispatchEvent(new CustomEvent('logoChanged', {
                        detail: { logo_url: userData.logo_url }
                    }));
                }
                
                // Disparar evento de storage para notificar cambios
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'userData',
                    newValue: JSON.stringify(userData)
                }));
                
                // Evento específico para forzar carga del logo
                window.dispatchEvent(new Event('forceLogoLoad'));
                
                // Redirigir al home
                setTimeout(() => {
                    navigate('/home');
                }, 100);
            }, 100);
        } catch (error) {
            console.error('Error de login:', error);
            
            // Mostrar mensaje de error adecuado
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else if (error.message === 'Network Error') {
                setError('Error de conexión con el servidor. Verifica tu conexión e inténtalo de nuevo.');
            } else {
                setError('Error al iniciar sesión. Inténtalo de nuevo.');
            }
            
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Iniciar Sesión</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
                
                <div className="register-link">
                    <p>
                        ¿No tienes cuenta? <a href="/">Regístrate aquí</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;