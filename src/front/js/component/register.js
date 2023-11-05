import React, { useState } from 'react';
import '../../styles/RegisterForm.css'

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password === formData.confirmPassword) {
      const dataToSend = {
        email: formData.email,
        password: formData.password,
      };


      fetch('URL_DEL_SERVIDOR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); 
          } else {
            throw new Error('Error al enviar los datos al servidor');
          }
        })
        .then((data) => {
          console.log('Respuesta del servidor:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <div className='register-container'>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className='register'>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='register'>
          <label htmlFor="password">Contraseña</label>
          <input
          className='password'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='register'>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
          className='password'
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <p className='lost-password'>Sus datos personales se utilizarán para respaldar su experiencia en este sitio web, para administrar el acceso a su cuenta y para otros fines descritos en nuestra política de privacidad.</p>
        <button className='register-button' type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterForm;
