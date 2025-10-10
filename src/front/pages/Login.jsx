import React, { useState } from 'react';
import './Login.css'; 


// PREGUNTAR SI YA ESTA REGISTRADO, Y SI NO ESTÁ QUE SE PASE A LA VENTA DE REGISTER !!!!  


function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

   
    const handleLogin = (event) => {
        event.preventDefault(); 
        setMessage('');

      
        if (username.length < 3 || password.length < 6) {
            setMessage({ text: 'Por favor, introduce credenciales válidas.', type: 'error' });
            return;
        }

        // SIMULACIÓN:
        setMessage({ text: `Inicio de sesión exitoso para ${username}. ¡Bienvenido!`, type: 'success' });
        
       
        setUsername('');
        setPassword('');
    };

   
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
                            <th><label htmlFor="username">Usuario:</label></th>
                            <td>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Tu nombre de usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                    style={{ color: message.type === 'error' ? 'red' : 'green' }}
                >
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default Login;