import React, { useState } from 'react';
import './Register.css';

// ideas para Register: Formulario (buscar en Google), al final un Button "Submit o Registrarse con la funcionalidad de que lo clickea que lo mande a API" y luego que te devuelva a la pagina de Login (idea).


function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

  
    const handleRegistration = (event) => {
        event.preventDefault(); 

        setMessage(''); 

       
        if (username.length < 3) {
            setMessage({ text: 'El usuario debe tener al menos 3 caracteres.', type: 'error' });
            return;
        }
        if (password.length < 6) {
            setMessage({ text: 'La contraseña debe tener al menos 6 caracteres.', type: 'error' });
            return;
        }

        // 2. Backend (BACKEND_URL)
        /*
        fetch(`${BACKEND_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            setMessage({ text: `¡Registro exitoso para ${username}!`, type: 'success' });
            setUsername('');
            setPassword('');
        })
        .catch(error => {
            setMessage({ text: 'Error al conectar con el servidor.', type: 'error' });
        });
        */

        // SIMULACIÓN 
        setMessage({ text: `¡Registro exitoso para ${username}! Redirigiendo...`, type: 'success' });
        setUsername('');
        setPassword('');
    };


    return (
        <div className="register-container">
            <h2>Registro de Nuevo Usuario</h2>
            
            <form onSubmit={handleRegistration}>
                <table className="register-table">
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'center', color: '#5c67f2' }}>
                                ¡Únete a la comunidad!
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
                                    placeholder="Elige un nombre de usuario"
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
                                    placeholder="Crea una contraseña segura"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required
                                />
                            </td>
                        </tr>
                      
                        <tr>
                            <td colSpan="2" className="submit-cell">
                                <button type="submit" className="register-button">
                                    REGISTRARME
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


export default Register;