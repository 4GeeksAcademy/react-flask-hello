import React, { useState } from 'react';
import '../css/Login.css'; 


function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    
    const handleLogin = (event) => {
        event.preventDefault(); 
        setMessage('');

        
        if (email.length < 3 || password.length < 6) {
            setMessage({ text: 'Por favor, introduce credenciales válidas.', type: 'error' });
            return;
        }

        setMessage({ text: `Inicio de sesión exitoso para ${email}. ¡Bienvenido!`, type: 'success' });
        
        
        setEmail('');
        setPassword('');
    };

    // ---  FUNCIÓN PARA REDIRECCIONAR AL REGISTRO ---
    const handleRedirectToRegister = () => {
        console.log('--- Redirigiendo a la página de Registro ---');
        setMessage({ text: 'Te estamos llevando a la página de Registro.', type: 'info' }); 
        // Esta línea es solo una simulación. 
    };
    // ---------------------------------------------------

    
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            
            <form onSubmit={handleLogin}>
                <table className="login-table">
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'center', color: '#5c67f2' }}>
                                Accede a tu cuenta
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <th><label htmlFor="email">Usuario:</label></th>
                            <td>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                    
                        <tr>
                            <th><label htmlFor="password">Contraseña:</label></th>
                            <td>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </td>
                        </tr>
                    
                        <tr>
                            <td colSpan="2" className="register-link-cell" style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                                ¿Todavía no estás Registrado?
                                
                                <button 
                                    type="button" 
                                    className="register-link-button" 
                                    onClick={handleRedirectToRegister}
                                >
                                    Pulsa aquí
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" className="submit-cell">
                                <button type="submit" className="login-button">
                                    ACCEDER
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            
            
            {message.text && (
                <div 
                    className="message" 
                    style={{ color: message.type === 'error' ? 'red' : (message.type === 'info' ? 'blue' : 'green') }}
                >
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default Login;