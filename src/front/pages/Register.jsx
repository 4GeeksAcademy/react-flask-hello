import React, { useState } from 'react';
import './Register.css';

function Register() {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(''); 
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); 
    
    const [role, setRole] = useState(''); 
    const [licenseNumber, setLicenseNumber] = useState(''); 
   

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [message, setMessage] = useState('');

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole !== 'medico') {
            setLicenseNumber('');
        }
    };

    const handleRegistration = (event) => {
        event.preventDefault(); 
        setMessage('');


        if (!name || !lastName || !dob || !email || !phoneNumber || !password || !confirmPassword) {
            setMessage({ text: 'Todos los campos básicos son obligatorios. 📝', type: 'error' });
            return;
        }

       
        if (!role) {
            setMessage({ text: 'Debes seleccionar si eres Médico o Paciente. 🧑‍⚕️/🧍', type: 'error' });
            return;
        }

        
        if (role === 'medico') {
            const licenseRegex = /^\d{9}$/; 
            if (!licenseNumber || !licenseRegex.test(licenseNumber)) {
                setMessage({ text: 'El Número de Matrícula debe tener exactamente 9 dígitos. 🔢', type: 'error' });
                return;
            }
        }

        
        if (!isValidEmail(email)) {
            setMessage({ text: 'Por favor, introduce un correo electrónico válido. 📧', type: 'error' });
            return;
        }
        
        const phoneRegex = /^\d{9,}$/; 
        if (!phoneRegex.test(phoneNumber)) {
            setMessage({ text: 'Por favor, introduce un número de teléfono válido (mín. 9 dígitos). 📞', type: 'error' });
            return;
        }

        if (password.length < 6) {
            setMessage({ text: 'La contraseña debe tener al menos 6 caracteres. 🔑', type: 'error' });
            return;
        }
        
        if (password !== confirmPassword) {
            setMessage({ text: 'Las contraseñas no coinciden. Por favor, revísalas. ❌', type: 'error' });
            return;
        }

       
        
        setMessage({ 
            text: `¡Registro exitoso como ${role.toUpperCase()} para ${name}! Redirigiendo... 🎉`, 
            type: 'success' 
        });
        
       
        setName('');
        setLastName('');
        setDob('');
        setEmail('');
        setPhoneNumber('');
        setRole('');
        setLicenseNumber(''); 
        setPassword('');
        setConfirmPassword('');
        
       
        /*
        const registrationData = { name, lastName, dob, email, phoneNumber, password, role };
        if (role === 'medico') {
            registrationData.licenseNumber = licenseNumber;
        }
        
        fetch(`${BACKEND_URL}/api/register`, {
            // ...
            body: JSON.stringify(registrationData) 
        })
        */
    };


    return (
        <div className="register-container">
            <h2>Crear una Cuenta Nueva</h2>
            
            <form onSubmit={handleRegistration} className="register-form">
                
              
                <div className="form-group"><label htmlFor="name">Nombre:</label><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required/></div>
                <div className="form-group"><label htmlFor="lastName">Apellidos:</label><input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Tus apellidos" required/></div>
                <div className="form-group"><label htmlFor="dob">Fecha de Nacimiento:</label><input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required/></div>
                <div className="form-group"><label htmlFor="email">Correo Electrónico:</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@dominio.com" required/></div>
                <div className="form-group"><label htmlFor="phoneNumber">Número de Teléfono:</label><input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Ej. 600112233" required/></div>

                <hr className="divider"/>
                
              
                <div className="form-group role-selection">
                    <label>Selecciona tu Rol:</label>
                    <div className="checkbox-group">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={role === 'medico'} 
                                onChange={() => handleRoleChange('medico')}
                            /> 
                            Médico 🧑‍⚕️
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={role === 'paciente'} 
                                onChange={() => handleRoleChange('paciente')}
                            /> 
                            Paciente 🧍
                        </label>
                    </div>
                </div>

               
                {role === 'medico' && (
                    <div className="form-group license-group">
                        <label htmlFor="licenseNumber">Número de Matrícula de Colegiado (9 dígitos):</label>
                        <input
                            type="number"
                            id="licenseNumber"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)} 
                            placeholder="Introduce tu matrícula (Ej: 123456789)"
                            required={role === 'medico'} 
                            maxLength="9" 
                        />
                    </div>
                )}
              

                <hr className="divider"/>

                
                <div className="form-group"><label htmlFor="password">Contraseña (Mín. 6 chars):</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crea una contraseña segura" required/></div>
                <div className="form-group"><label htmlFor="confirmPassword">Repetir Contraseña:</label><input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite la contraseña" required/></div>

                
                <button type="submit" className="register-button">
                    REGISTRARME
                </button>
            </form>
            
            
            {message.text && (
                <div 
                    className="message" 
                    style={{ 
                        color: message.type === 'error' ? '#e74c3c' : '#2ecc71',
                        fontWeight: 'bold',
                        marginTop: '15px'
                    }}
                >
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default Register;